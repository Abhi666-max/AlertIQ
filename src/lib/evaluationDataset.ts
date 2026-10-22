import { RiskLevel } from './types';

export interface EvaluationItem {
  id: string;
  category: string;
  expectedClassification: RiskLevel;
  channel: 'sms' | 'email' | 'chat';
  message: string;
  keyThreatSignals: string[];
}

export const EVALUATION_DATASET: EvaluationItem[] = [
  // 1. Phishing & Credential Theft (High Risk)
  {
    id: 'eval-01',
    category: 'Bank Impersonation Phishing',
    expectedClassification: 'HIGH_RISK',
    channel: 'sms',
    message: 'CHASE-ALERT: Unusual sign-in attempt detected from IP 185.220.101.5. Your account has been restricted. Visit https://chase-security-verify.xyz/login immediately to confirm identity.',
    keyThreatSignals: ['Impersonation', 'Urgency', 'Credential Gateway', 'Suspicious .xyz TLD'],
  },
  {
    id: 'eval-02',
    category: 'Urgent OTP Theft',
    expectedClassification: 'HIGH_RISK',
    channel: 'sms',
    message: 'Bank of America Fraud Dept: Someone is attempting to transfer $849.00 via Zelle. If this was not you, reply with your 6-digit OTP passcode immediately to cancel the transaction.',
    keyThreatSignals: ['OTP Harvesting', 'Panic induction', 'Direct credential theft'],
  },
  {
    id: 'eval-03',
    category: 'Fake Delivery Notification',
    expectedClassification: 'HIGH_RISK',
    channel: 'sms',
    message: 'USPS: Your package US-89218 cannot be delivered due to incomplete street address. Update address and pay $1.95 redelivery fee at http://usps-redelivery-portal.site/confirm within 12 hours.',
    keyThreatSignals: ['Courier impersonation', 'Fake fee', 'Malicious link'],
  },
  {
    id: 'eval-04',
    category: 'Advance-Fee Lottery / Prize Scam',
    expectedClassification: 'HIGH_RISK',
    channel: 'email',
    message: 'Congratulations! You have been selected as the 1st prize winner of $750,000 in the Mega Millions International draw. Send a processing fee of $250 via Western Union or Bitcoin to our payout fiduciary.',
    keyThreatSignals: ['Unsolicited high-value prize', 'Advance fee requirement', 'Irreversible payment method'],
  },
  {
    id: 'eval-05',
    category: 'Tech Support Invoice Fraud',
    expectedClassification: 'HIGH_RISK',
    channel: 'email',
    message: 'Geek Squad Invoice #GS-9912: Your subscription auto-renewed for $499.00 and charged to your checking account. If you did not authorize this payment, call our fraud desk immediately at +1-800-555-0199.',
    keyThreatSignals: ['Fake renewal invoice', 'Urgent call-to-action', 'Refund scam lure'],
  },
  {
    id: 'eval-06',
    category: 'Tax / Law Enforcement Threat',
    expectedClassification: 'HIGH_RISK',
    channel: 'sms',
    message: 'IRS LEGAL NOTICE: An arrest warrant has been issued in your name regarding tax evasion. Call immediately or police officers will arrive at your residence in 2 hours.',
    keyThreatSignals: ['Severe intimidation', 'False legal urgency', 'Coercive threat'],
  },
  {
    id: 'eval-07',
    category: 'Account Suspension Lockout Threat',
    expectedClassification: 'HIGH_RISK',
    channel: 'email',
    message: 'Netflix Account Notice: Your payment method failed and your streaming subscription is scheduled for termination. Update your credit card details at http://netflix-billing-update.top to prevent suspension.',
    keyThreatSignals: ['Suspension threat', 'Payment harvesting', 'Suspicious .top TLD'],
  },
  {
    id: 'eval-08',
    category: 'Crypto Doubling / Investment Fraud',
    expectedClassification: 'HIGH_RISK',
    channel: 'chat',
    message: 'Elon Musk Live Crypto Giveaway! Send 0.1 BTC to wallet 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa and receive 0.2 BTC back immediately. Offer valid for the next 30 minutes only!',
    keyThreatSignals: ['Celebrity impersonation', 'Crypto multiplier scam', 'Artificial countdown'],
  },

  // 2. Ambiguous & Medium Risk Messages (Moderate / Caution)
  {
    id: 'eval-09',
    category: 'Unsolicited Job Offer',
    expectedClassification: 'MEDIUM_RISK',
    channel: 'sms',
    message: 'Hello! Our remote marketing agency has part-time openings paying $300-$500 daily for 1 hour of work on your phone. No experience needed. Contact our manager on WhatsApp: +1-202-555-0143.',
    keyThreatSignals: ['Unrealistic salary', 'Unsolicited offer', 'Off-platform redirect'],
  },
  {
    id: 'eval-10',
    category: 'Generic Security Warning Without Link',
    expectedClassification: 'MEDIUM_RISK',
    channel: 'sms',
    message: 'Security Alert: We noticed a new login to your account from Chrome on Windows. If this was you, you can ignore this alert.',
    keyThreatSignals: ['Missing sender company name', 'Vague warning', 'No credential demand'],
  },
  {
    id: 'eval-11',
    category: 'Promotional Offer with Shortlink',
    expectedClassification: 'MEDIUM_RISK',
    channel: 'sms',
    message: 'FLASH SALE: Get 50% off select apparel this weekend only with code SPRING50 at http://bit.ly/3xXyZ9q. Reply STOP to opt out.',
    keyThreatSignals: ['Opaque shortened link', 'Commercial urgency', 'Standard marketing language'],
  },
  {
    id: 'eval-12',
    category: 'Unknown Contact Request',
    expectedClassification: 'MEDIUM_RISK',
    channel: 'chat',
    message: 'Hey David, is this your new number? I got disconnected earlier. Can you message me back when you get this?',
    keyThreatSignals: ['Wrong number lure', 'Unconfirmed identity'],
  },

  // 3. Legitimate & Low Apparent Risk Messages
  {
    id: 'eval-13',
    category: 'Legitimate Bank 2FA Code',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'sms',
    message: '392014 is your verification code for Chase Online Banking. We will NEVER call or text you to ask for this code. Do not share it with anyone.',
    keyThreatSignals: ['Explicit warning never to share code', 'Standard authentic format', 'No external link'],
  },
  {
    id: 'eval-14',
    category: 'Legitimate Courier Tracking',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'sms',
    message: 'FedEx: Your order #489102 has been delivered to your front porch. View delivery proof photo on fedex.com/tracking or through the FedEx app.',
    keyThreatSignals: ['No urgent fee request', 'References official domain', 'Informational only'],
  },
  {
    id: 'eval-15',
    category: 'Casual Personal Chat',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'chat',
    message: 'Hey Mom, I just landed at JFK airport and picked up my luggage. Taking an Uber home now, see you in about 45 minutes!',
    keyThreatSignals: ['Personal context', 'No requests or links'],
  },
  {
    id: 'eval-16',
    category: 'Legitimate Appointment Confirmation',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'sms',
    message: 'Reminder: You have a dental cleaning appointment with Dr. Henderson tomorrow, Oct 24 at 10:00 AM. Reply C to confirm or call 555-0182 to reschedule.',
    keyThreatSignals: ['Standard appointment reminder', 'Expected local clinic format'],
  },
  {
    id: 'eval-17',
    category: 'Legitimate E-commerce Order Receipt',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'email',
    message: 'Amazon.com: Thank you for your order #114-8920182-3849102. Your item "Mechanical Keyboard Switches" has shipped and will arrive Thursday. Track your package in the Amazon app.',
    keyThreatSignals: ['Standard order summary', 'No credential or payment prompt'],
  },
  {
    id: 'eval-18',
    category: 'Harmless Work Coordination',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'chat',
    message: 'Good morning team, the slide deck for our quarterly sprint review is ready on Google Drive. Please review slides 4-8 before our 2pm standup.',
    keyThreatSignals: ['Normal workplace communication', 'No coercive or suspicious signs'],
  },
  {
    id: 'eval-19',
    category: 'Legitimate Two-Factor Push Notification Notice',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'sms',
    message: 'Google Verification: A sign-in request was approved for your account. If this was you, no action is needed. Review device activity at myaccount.google.com/security.',
    keyThreatSignals: ['Official verified domain', 'Post-authentication informational receipt'],
  },
  {
    id: 'eval-20',
    category: 'Legitimate Restaurant Reservation',
    expectedClassification: 'LOW_APPARENT_RISK',
    channel: 'sms',
    message: 'OpenTable: Your reservation for 2 guests at Bella Italia is confirmed for Friday, Oct 24 at 7:30 PM. To modify or cancel, please use the OpenTable app.',
    keyThreatSignals: ['Standard confirmation', 'No fee or password requests'],
  },
];
