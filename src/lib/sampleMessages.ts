export interface SampleMessage {
  id: string;
  title: string;
  category: 'phishing' | 'lottery' | 'delivery' | 'tech_support' | 'legitimate' | 'ambiguous';
  channel: 'sms' | 'email' | 'chat';
  preview: string;
  fullText: string;
  expectedRisk: 'HIGH_RISK' | 'MEDIUM_RISK' | 'LOW_APPARENT_RISK';
}

export const SAMPLE_MESSAGES: SampleMessage[] = [
  {
    id: 'sample-1',
    title: 'Urgent Bank Account Restriction',
    category: 'phishing',
    channel: 'sms',
    preview: 'CHASE-ALERT: Unusual sign-in attempt detected from IP...',
    fullText: 'CHASE-ALERT: Unusual sign-in attempt detected from IP 185.220.101.5. Your account has been restricted. Visit https://chase-security-verify.xyz/login immediately to confirm identity.',
    expectedRisk: 'HIGH_RISK',
  },
  {
    id: 'sample-2',
    title: 'Zelle Fraud OTP Harvesting',
    category: 'phishing',
    channel: 'sms',
    preview: 'Bank of America Fraud Dept: Someone is attempting to transfer $849.00...',
    fullText: 'Bank of America Fraud Dept: Someone is attempting to transfer $849.00 via Zelle. If this was not you, reply with your 6-digit OTP passcode immediately to cancel the transaction.',
    expectedRisk: 'HIGH_RISK',
  },
  {
    id: 'sample-3',
    title: 'USPS Incomplete Address Fee',
    category: 'delivery',
    channel: 'sms',
    preview: 'USPS: Your package US-89218 cannot be delivered due to incomplete street address...',
    fullText: 'USPS: Your package US-89218 cannot be delivered due to incomplete street address. Update address and pay $1.95 redelivery fee at http://usps-redelivery-portal.site/confirm within 12 hours.',
    expectedRisk: 'HIGH_RISK',
  },
  {
    id: 'sample-4',
    title: 'Mega Millions International Winner',
    category: 'lottery',
    channel: 'email',
    preview: 'Congratulations! You have been selected as the 1st prize winner of $750,000...',
    fullText: 'Congratulations! You have been selected as the 1st prize winner of $750,000 in the Mega Millions International draw. Send a processing fee of $250 via Western Union or Bitcoin to our payout fiduciary.',
    expectedRisk: 'HIGH_RISK',
  },
  {
    id: 'sample-5',
    title: 'Geek Squad Auto-Renewal Invoice',
    category: 'tech_support',
    channel: 'email',
    preview: 'Geek Squad Invoice #GS-9912: Your subscription auto-renewed for $499.00...',
    fullText: 'Geek Squad Invoice #GS-9912: Your subscription auto-renewed for $499.00 and charged to your checking account. If you did not authorize this payment, call our fraud desk immediately at +1-800-555-0199.',
    expectedRisk: 'HIGH_RISK',
  },
  {
    id: 'sample-6',
    title: 'IRS Arrest Warrant Threat',
    category: 'phishing',
    channel: 'sms',
    preview: 'IRS LEGAL NOTICE: An arrest warrant has been issued in your name...',
    fullText: 'IRS LEGAL NOTICE: An arrest warrant has been issued in your name regarding tax evasion. Call immediately or police officers will arrive at your residence in 2 hours.',
    expectedRisk: 'HIGH_RISK',
  },
  {
    id: 'sample-7',
    title: 'Authentic Bank 2FA Code (Safe)',
    category: 'legitimate',
    channel: 'sms',
    preview: '392014 is your verification code for Chase Online Banking. We will NEVER call or text...',
    fullText: '392014 is your verification code for Chase Online Banking. We will NEVER call or text you to ask for this code. Do not share it with anyone.',
    expectedRisk: 'LOW_APPARENT_RISK',
  },
  {
    id: 'sample-8',
    title: 'Authentic FedEx Delivery Notice (Safe)',
    category: 'legitimate',
    channel: 'sms',
    preview: 'FedEx: Your order #489102 has been delivered to your front porch...',
    fullText: 'FedEx: Your order #489102 has been delivered to your front porch. View delivery proof photo on fedex.com/tracking or through the FedEx app.',
    expectedRisk: 'LOW_APPARENT_RISK',
  },
  {
    id: 'sample-9',
    title: 'Harmless Family Text (Safe)',
    category: 'legitimate',
    channel: 'chat',
    preview: 'Hey Mom, I just landed at JFK airport and picked up my luggage...',
    fullText: 'Hey Mom, I just landed at JFK airport and picked up my luggage. Taking an Uber home now, see you in about 45 minutes!',
    expectedRisk: 'LOW_APPARENT_RISK',
  },
  {
    id: 'sample-10',
    title: 'Shortened Link Promotional SMS',
    category: 'ambiguous',
    channel: 'sms',
    preview: 'FLASH SALE: Get 50% off select apparel this weekend only with code SPRING50...',
    fullText: 'FLASH SALE: Get 50% off select apparel this weekend only with code SPRING50 at http://bit.ly/3xXyZ9q. Reply STOP to opt out.',
    expectedRisk: 'MEDIUM_RISK',
  },
];
