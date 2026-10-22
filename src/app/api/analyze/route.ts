import { NextRequest, NextResponse } from 'next/server';
import { analysisRequestSchema, AnalysisResult } from '@/lib/types';
import { extractUrls, checkUrlsReputation } from '@/lib/urlSafety';
import { analyzeMessageWithGemini } from '@/lib/geminiProvider';
import { verifyAndCleanEvidence } from '@/lib/evidenceVerifier';

// Simple in-memory sliding window rate limiter (max 20 requests per IP per minute)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 30;

  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'anonymous-client';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before analyzing more messages.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = analysisRequestSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage = validation.error.issues.map((e) => e.message).join(' ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { message } = validation.data;

    // Step 1: Safely extract candidate URLs
    const candidateUrls = extractUrls(message);

    // Step 2: Check URL reputation concurrently with AI analysis
    const [urlReputationResult, aiResult] = await Promise.all([
      checkUrlsReputation(candidateUrls),
      analyzeMessageWithGemini(message),
    ]);

    // Step 3: Ground & Verify Evidence against the original message
    const { verifiedIndicators, allVerified } = verifyAndCleanEvidence(
      aiResult.output.indicators,
      message
    );

    // Step 4: Merge external Threat Intelligence with AI indicators
    let finalClassification = aiResult.output.classification;
    let finalRiskScore = aiResult.output.estimatedRiskScore;

    const hasMaliciousUrl = urlReputationResult.checkedUrls.some((u) => u.status === 'malicious');
    const hasSuspiciousUrl = urlReputationResult.checkedUrls.some((u) => u.status === 'suspicious');

    if (hasMaliciousUrl) {
      finalClassification = 'HIGH_RISK';
      finalRiskScore = Math.max(finalRiskScore, 95);
      verifiedIndicators.unshift({
        type: 'suspicious_url',
        evidence: urlReputationResult.checkedUrls.find((u) => u.status === 'malicious')?.url || 'Embedded URL',
        explanation: 'Independently confirmed malicious destination by threat intelligence database.',
        severity: 'high',
      });
    } else if (hasSuspiciousUrl && finalClassification === 'LOW_APPARENT_RISK') {
      finalClassification = 'MEDIUM_RISK';
      finalRiskScore = Math.max(finalRiskScore, 50);
    }

    // Step 5: Construct complete validated result
    const resultId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `alertiq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const responseData: AnalysisResult = {
      id: resultId,
      timestamp: new Date().toISOString(),
      classification: finalClassification,
      riskScore: finalRiskScore,
      summary: aiResult.output.summary,
      indicators: verifiedIndicators,
      recommended_actions: aiResult.output.recommended_actions,
      limitations: [
        ...aiResult.output.limitations,
        'AlertIQ is an AI decision-support system and does not replace professional security auditing.',
      ],
      extracted_urls: urlReputationResult.checkedUrls,
      analysisMode: aiResult.mode,
      providerDetails: {
        model: aiResult.modelName,
        threatIntelProvider: urlReputationResult.providerName,
        latencyMs: aiResult.latencyMs,
        evidenceVerified: allVerified,
      },
      originalMessage: message,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    console.error('Unhandled analysis API error:', error);
    const errMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: `An unexpected server error occurred: ${errMessage}` },
      { status: 500 }
    );
  }
}
