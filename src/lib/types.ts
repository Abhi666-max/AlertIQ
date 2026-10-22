import { z } from 'zod';

export type RiskLevel = 'HIGH_RISK' | 'MEDIUM_RISK' | 'LOW_APPARENT_RISK' | 'INCONCLUSIVE';

export type IndicatorType =
  | 'urgency'
  | 'impersonation'
  | 'payment_request'
  | 'credential_request'
  | 'suspicious_url'
  | 'prize_claim'
  | 'threat_intimidation'
  | 'other';

export type IndicatorSeverity = 'low' | 'medium' | 'high';

export interface AnalysisIndicator {
  type: IndicatorType;
  evidence: string;
  explanation: string;
  severity: IndicatorSeverity;
}

export type ThreatReputationStatus = 'clean' | 'malicious' | 'suspicious' | 'unknown' | 'not_checked';

export interface ExtractedUrl {
  url: string;
  domain: string;
  status: ThreatReputationStatus;
  threatDetails?: string;
  checkedAt?: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  classification: RiskLevel;
  riskScore: number; // 0 to 100 normalized score for visual gauges
  summary: string;
  indicators: AnalysisIndicator[];
  recommended_actions: string[];
  limitations: string[];
  extracted_urls: ExtractedUrl[];
  analysisMode: 'real_llm' | 'simulated_rules';
  providerDetails: {
    model: string;
    threatIntelProvider: string;
    latencyMs: number;
    evidenceVerified: boolean;
  };
  originalMessage: string;
}

// Request validation schema
export const analysisRequestSchema = z.object({
  message: z
    .string()
    .min(5, 'Message is too short to analyze (minimum 5 characters).')
    .max(4000, 'Message exceeds maximum length limit of 4000 characters.'),
  channel: z.enum(['sms', 'email', 'chat', 'url_only', 'auto']).default('auto'),
});

export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;

// Raw LLM output schema before post-processing and evidence verification
export const rawLlmOutputSchema = z.object({
  classification: z.enum(['HIGH_RISK', 'MEDIUM_RISK', 'LOW_APPARENT_RISK', 'INCONCLUSIVE']),
  estimatedRiskScore: z.number().min(0).max(100),
  summary: z.string().min(10).max(500),
  indicators: z.array(
    z.object({
      type: z.enum([
        'urgency',
        'impersonation',
        'payment_request',
        'credential_request',
        'suspicious_url',
        'prize_claim',
        'threat_intimidation',
        'other',
      ]),
      evidence: z.string().max(200),
      explanation: z.string().max(300),
      severity: z.enum(['low', 'medium', 'high']),
    })
  ).max(8),
  recommended_actions: z.array(z.string().max(200)).min(1).max(6),
  limitations: z.array(z.string().max(200)).min(1).max(5),
});

export type RawLlmOutput = z.infer<typeof rawLlmOutputSchema>;
