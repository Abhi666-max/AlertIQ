import { AnalysisIndicator, IndicatorSeverity, IndicatorType, RawLlmOutput } from './types';
import { extractUrls, inspectDomainHeuristics } from './urlSafety';

interface PatternRule {
  type: IndicatorType;
  regex: RegExp;
  explanation: string;
  severity: IndicatorSeverity;
  scoreWeight: number;
}

const HEURISTIC_RULES: PatternRule[] = [
  // 1. Credential Harvesting & OTP
  {
    type: 'credential_request',
    regex: /\b(share|send|confirm|verify|enter|reply\s+with)\s+(your\s+)?(\d+-digit\s+)?(otp|pin|password|passcode|one-time\s+password|ssn|social\s+security|cvv|identity)\b/i,
    explanation: 'Requests sensitive authentication credentials, OTPs, or security codes that reputable entities never ask for via message.',
    severity: 'high',
    scoreWeight: 35,
  },
  {
    type: 'credential_request',
    regex: /\b(account\s+access\s+locked|verify\s+your\s+identity\s+now|unauthorized\s+sign-in\s+attempt|account\s+has\s+been\s+restricted|update\s+your\s+credit\s+card\s+details)\b/i,
    explanation: 'Uses security panic or account restriction warnings to lure you into clicking a fake credential verification gateway.',
    severity: 'high',
    scoreWeight: 30,
  },

  // 2. Urgent Threats & Intimidation
  {
    type: 'threat_intimidation',
    regex: /\b(arrest\s+warrant|police\s+officers|law\s+enforcement|tax\s+evasion|irs\s+legal\s+notice|warrant\s+has\s+been\s+issued)\b/i,
    explanation: 'Manufactures false legal intimidation or government arrest threats to coerce immediate panic.',
    severity: 'high',
    scoreWeight: 45,
  },
  {
    type: 'urgency',
    regex: /\b(immediate(ly)?\s+action|within\s+(12|24|48|\d+)\s+hours|account\s+will\s+be\s+suspended|warrant\s+issued|legal\s+action\s+pending|final\s+notice|scheduled\s+for\s+termination)\b/i,
    explanation: 'Manufactures artificial urgency and coercive pressure to bypass critical thinking.',
    severity: 'high',
    scoreWeight: 25,
  },

  // 3. Fake Prize / Sweepstakes / Unexpected Windfall / Crypto Giveaways
  {
    type: 'prize_claim',
    regex: /\b(you\s+(have\s+)?won|selected\s+as\s+(the\s+)?winner|claim\s+your\s+(\$|gift|prize|reward|voucher|iphone|inheritance)|crypto\s+giveaway|receive\s+0\.\d+\s+btc)\b/i,
    explanation: 'Promotes an unearned reward, lottery payout, or crypto multiplier, a classic advance-fee scam lure.',
    severity: 'high',
    scoreWeight: 35,
  },

  // 4. Unusual / Irreversible Payment Requests
  {
    type: 'payment_request',
    regex: /\b(gift\s+cards?|target\s+card|apple\s+gift\s+card|bitcoin|crypto|usdt|wire\s+transfer|western\s+union|zelle\s+immediately|send(ing)?\s+(a\s+)?fee|advance\s+fee|processing\s+fee|fee\s+to\s+our\s+agent|send\s+0\.\d+\s+btc)\b/i,
    explanation: 'Requests payment or advance fees via irreversible methods, typical of fraudulent advance-fee schemes.',
    severity: 'high',
    scoreWeight: 35,
  },

  // 5. Impersonation of High-Trust Entities & Invoicing Fraud
  {
    type: 'impersonation',
    regex: /\b(geek\s+squad|norton\s+lifelock|paypal\s+security|bank\s+of\s+america|chase\s+fraud|usps\s+tracking|fedex\s+parcel|irs\s+notice|chase-alert|netflix\s+account\s+notice)\b/i,
    explanation: 'References a high-profile institution, streaming service, or courier service without official sender authentication.',
    severity: 'medium',
    scoreWeight: 25,
  },
  {
    type: 'payment_request',
    regex: /\b(auto-renewed\s+for|subscription\s+auto-renewed|call\s+our\s+fraud\s+desk|invoice\s+#[a-z0-9-]+)\b/i,
    explanation: 'Fake subscription renewal invoice designed to trigger anxiety and coerce inbound phone calls.',
    severity: 'high',
    scoreWeight: 35,
  },

  // 6. Suspicious Job Scams
  {
    type: 'other',
    regex: /\b(part-time\s+openings|paying\s+\$\d+|daily\s+for\s+\d+\s+hour|no\s+experience\s+needed|contact\s+our\s+manager\s+on\s+whatsapp)\b/i,
    explanation: 'Unsolicited high-paying job offer with low qualifications, typical of task or advance-fee employment scams.',
    severity: 'medium',
    scoreWeight: 25,
  },

  // 7. Security Warnings / Unsolicited Prompts
  {
    type: 'urgency',
    regex: /\b(security\s+alert:\s+we\s+noticed\s+a\s+new\s+login|flash\s+sale:\s+get\s+\d+%\s+off)\b/i,
    explanation: 'Unsolicited security notification or marketing alert warranting moderate caution.',
    severity: 'low',
    scoreWeight: 20,
  },

  // 8. Wrong Number / Ambient Lures
  {
    type: 'other',
    regex: /\b(is\s+this\s+your\s+new\s+number|wrong\s+number|got\s+disconnected\s+earlier)\b/i,
    explanation: 'Conversational pretext designed to initiate contact with unknown parties (conversational pig-butchering precursor).',
    severity: 'low',
    scoreWeight: 20,
  },

  // 6. Delivery scam triggers
  {
    type: 'urgency',
    regex: /\b(package\s+delayed|delivery\s+failed|incomplete\s+address|update\s+address\s+to\s+deliver)\b/i,
    explanation: 'Pretends an imminent parcel delivery requires urgent link-clicking or fee payment.',
    severity: 'medium',
    scoreWeight: 20,
  },
];

/**
 * Deterministic rule-based scam analyzer.
 * Used when an external LLM is not configured, or as a baseline heuristic validator.
 */
export function analyzeWithHeuristics(message: string): RawLlmOutput {
  const indicators: AnalysisIndicator[] = [];
  let totalScore = 0;

  // Evaluate rule set against original message
  for (const rule of HEURISTIC_RULES) {
    const match = message.match(rule.regex);
    if (match) {
      // Find actual substring match for exact evidence grounding
      const matchedSnippet = match[0];
      indicators.push({
        type: rule.type,
        evidence: matchedSnippet,
        explanation: rule.explanation,
        severity: rule.severity,
      });
      totalScore += rule.scoreWeight;
    }
  }

  // Evaluate extracted URLs for heuristic anomalies
  const urls = extractUrls(message);
  for (const item of urls) {
    const domainCheck = inspectDomainHeuristics(item.domain);
    if (domainCheck.isSuspicious) {
      indicators.push({
        type: 'suspicious_url',
        evidence: item.url,
        explanation: domainCheck.reason || 'Deceptive or anomalous domain structure identified.',
        severity: 'high',
      });
      totalScore += 30;
    } else if (item.url) {
      // General presence of link with urgent call
      if (indicators.some((i) => i.type === 'urgency' || i.type === 'credential_request')) {
        indicators.push({
          type: 'suspicious_url',
          evidence: item.url,
          explanation: 'External link provided alongside urgency/credential alerts.',
          severity: 'medium',
        });
        totalScore += 15;
      }
    }
  }

  // Calculate normalized risk score between 0 and 100
  const normalizedScore = Math.min(100, Math.max(5, totalScore));

  let classification: 'HIGH_RISK' | 'MEDIUM_RISK' | 'LOW_APPARENT_RISK' = 'LOW_APPARENT_RISK';
  const hasMultipleHigh = indicators.filter((i) => i.severity === 'high').length >= 2;
  const hasCriticalHigh = indicators.some((i) => i.severity === 'high') && (normalizedScore >= 50 || indicators.some((i) => i.type === 'payment_request' || i.type === 'credential_request'));

  if (normalizedScore >= 55 || hasMultipleHigh || hasCriticalHigh) {
    classification = 'HIGH_RISK';
  } else if (normalizedScore >= 20 || indicators.length >= 1) {
    classification = 'MEDIUM_RISK';
  }

  // Generate dynamic contextual recommendations
  const recommended_actions: string[] = [];
  if (classification === 'HIGH_RISK') {
    recommended_actions.push('Do NOT click any links, open attachments, or dial phone numbers listed in this message.');
    recommended_actions.push('Never disclose OTPs, passwords, banking PINs, or personal identification details.');
    recommended_actions.push('If this claims to be from your bank or service, navigate to their verified official website independently.');
  } else if (classification === 'MEDIUM_RISK') {
    recommended_actions.push('Verify the identity of the sender through a known, independent contact channel before taking action.');
    recommended_actions.push('Inspect any embedded link addresses carefully before clicking.');
  } else {
    recommended_actions.push('No obvious scam signatures were identified in this message snippet.');
    recommended_actions.push('Remain cautious: sophisticated targeted scams may mimic legitimate messages.');
  }

  // Generate summary
  let summary = '';
  if (classification === 'HIGH_RISK') {
    summary = `High risk detected. This message exhibits ${indicators.length} critical social engineering indicators, including ${indicators.map((i) => i.type.replace('_', ' ')).slice(0, 2).join(' and ')}.`;
  } else if (classification === 'MEDIUM_RISK') {
    summary = `Moderate caution advised. The message contains ${indicators.length} warning indicators that warrant independent verification before you respond or click.`;
  } else {
    summary = 'Low apparent risk. No recognized scam, phishing, or high-pressure social engineering patterns were detected in the text.';
  }

  return {
    classification,
    estimatedRiskScore: normalizedScore,
    summary,
    indicators,
    recommended_actions,
    limitations: [
      'Heuristic analysis evaluated observable lexical indicators without external intelligence databases.',
      'Decision-support only: unflagged messages may still be fraudulent if crafted legitimately.',
    ],
  };
}
