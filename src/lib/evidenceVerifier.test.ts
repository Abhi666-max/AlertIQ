import { describe, it, expect } from 'vitest';
import { verifyAndCleanEvidence } from './evidenceVerifier';
import { AnalysisIndicator } from './types';

describe('Evidence Verification Engine', () => {
  const originalMessage = 'URGENT: Your Wells Fargo account is suspended. Click http://wellsfargo-verify.xyz to confirm your OTP immediately!';

  it('keeps genuine verbatim excerpts from the message', () => {
    const indicators: AnalysisIndicator[] = [
      {
        type: 'urgency',
        evidence: 'account is suspended',
        explanation: 'Uses account suspension threat',
        severity: 'high',
      },
      {
        type: 'credential_request',
        evidence: 'confirm your OTP',
        explanation: 'Requests one-time password',
        severity: 'high',
      },
    ];

    const { verifiedIndicators, allVerified } = verifyAndCleanEvidence(indicators, originalMessage);
    expect(allVerified).toBe(true);
    expect(verifiedIndicators).toHaveLength(2);
    expect(verifiedIndicators[0].evidence).toBe('account is suspended');
  });

  it('drops hallucinated excerpts that do not appear anywhere in the source text', () => {
    const indicators: AnalysisIndicator[] = [
      {
        type: 'urgency',
        evidence: 'account is suspended',
        explanation: 'Real excerpt',
        severity: 'high',
      },
      {
        type: 'payment_request',
        evidence: 'send 500 dollars via Western Union wire transfer', // Complete hallucination
        explanation: 'Fake indicator',
        severity: 'high',
      },
    ];

    const { verifiedIndicators, allVerified } = verifyAndCleanEvidence(indicators, originalMessage);
    expect(allVerified).toBe(false);
    expect(verifiedIndicators).toHaveLength(1);
    expect(verifiedIndicators[0].evidence).toBe('account is suspended');
  });
});
