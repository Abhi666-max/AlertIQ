import { NextResponse } from 'next/server';

export async function GET() {
  const hasGroqKey = Boolean(process.env.GROQ_API_KEY);
  const hasSafeBrowsingKey = Boolean(process.env.GOOGLE_SAFE_BROWSING_API_KEY);
  const configuredModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  return NextResponse.json(
    {
      status: 'operational',
      name: 'AlertIQ Scam Detection & Threat Intelligence Platform',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      config: {
        aiProvider: hasGroqKey ? 'AlertIQ Neural Defense Network' : 'AlertIQ Heuristic Rules Engine',
        model: hasGroqKey ? 'Neural Engine (Enterprise v3.3)' : 'AlertIQ Heuristic Parser',
        hasGroqKey,
        hasSafeBrowsingKey,
        safeBrowsing: hasSafeBrowsingKey ? 'Google Safe Browsing Active' : 'Heuristic Domain Engine Active',
      },
    },
    { status: 200 }
  );
}
