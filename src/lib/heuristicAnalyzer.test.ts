import { describe, it, expect } from 'vitest';
import { analyzeWithHeuristics } from './heuristicAnalyzer';

describe('Heuristic Rule Scanner', () => {
  it('correctly classifies a high-urgency OTP credential harvesting SMS as HIGH_RISK', () => {
    const phishingSms = 'FINAL NOTICE: Your Chase account is locked. Immediate action required. Enter your OTP at http://chase-update.xyz/login within 24 hours!';
    const result = analyzeWithHeuristics(phishingSms);

    expect(result.classification).toBe('HIGH_RISK');
    expect(result.estimatedRiskScore).toBeGreaterThanOrEqual(60);
    expect(result.indicators.some((i) => i.type === 'credential_request' || i.type === 'urgency')).toBe(true);
  });

  it('correctly identifies fake lottery / prize scams as HIGH_RISK', () => {
    const lotteryMessage = 'Congratulations! You have won $1,000,000 in the UK National Lottery. Claim your gift voucher now by sending fee to our agent.';
    const result = analyzeWithHeuristics(lotteryMessage);

    expect(result.classification).toBe('HIGH_RISK');
    expect(result.indicators.some((i) => i.type === 'prize_claim')).toBe(true);
  });

  it('correctly classifies an ordinary conversational message as LOW_APPARENT_RISK', () => {
    const normalChat = 'Hey Sarah, are we still meeting for lunch at 12:30pm today? Let me know!';
    const result = analyzeWithHeuristics(normalChat);

    expect(result.classification).toBe('LOW_APPARENT_RISK');
    expect(result.indicators).toHaveLength(0);
    expect(result.estimatedRiskScore).toBeLessThan(30);
  });
});
