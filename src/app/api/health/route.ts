import { NextResponse } from 'next/server';

export async function GET() {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  const hasSafeBrowsingKey = Boolean(process.env.GOOGLE_SAFE_BROWSING_API_KEY);
  const configuredModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  return NextResponse.json(
    {
      status: 'operational',
      name: 'AlertIQ Scam Detection Engine',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      config: {
        aiProvider: hasGeminiKey ? 'Google Gemini' : 'Simulated Rule-Based Engine (Demo Mode)',
        model: hasGeminiKey ? configuredModel : 'AlertIQ Heuristic Parser',
        hasGeminiKey,
        hasSafeBrowsingKey,
        safeBrowsing: hasSafeBrowsingKey ? 'Google Safe Browsing v4 Active' : 'Heuristic Domain Scanner Only',
      },
    },
    { status: 200 }
  );
}
