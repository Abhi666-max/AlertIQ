'use client';

import React from 'react';
import { ShieldCheck, Eye, Lock, Zap, ArrowRight, ShieldAlert } from 'lucide-react';
import { SAMPLE_MESSAGES } from '@/lib/sampleMessages';

interface HeroProps {
  onSelectSample: (message: string) => void;
  onScrollToAnalyzer: () => void;
}

export function Hero({ onSelectSample, onScrollToAnalyzer }: HeroProps) {
  const quickPicks = [
    { label: 'Chase Bank Phishing', id: 'sample-1' },
    { label: 'Zelle OTP Wire Scam', id: 'sample-2' },
    { label: 'USPS Postal Tracking Lure', id: 'sample-3' },
    { label: 'Authentic 2FA (Safe)', id: 'sample-7' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-8 text-center md:pt-16 md:pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-sm mb-6">
          <Zap className="h-3.5 w-3.5 text-blue-600" />
          <span>Groq Ultra-Fast AI Threat Intelligence</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-normal">Llama 3.3 70B</span>
        </div>

        {/* Primary headline */}
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.1]">
          Decipher deceptive messages before you <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">trust them</span>.
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg md:text-xl font-normal leading-relaxed">
          Instantly evaluate suspicious SMS, emails, and chat communications for social engineering, credential harvesting, and fraudulent links with evidence-backed clarity.
        </p>

        {/* Trust features row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-xs">
            <Lock className="h-4 w-4 text-slate-700" />
            <span>Zero Server Data Retention</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-xs">
            <Eye className="h-4 w-4 text-blue-600" />
            <span>Verbatim Evidence Grounding</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Independent Reputation Telemetry</span>
          </div>
        </div>

        {/* Quick test cases selector */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Threat Specimens:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {quickPicks.map((pick) => (
                <button
                  key={pick.id}
                  onClick={() => {
                    const found = SAMPLE_MESSAGES.find((s) => s.id === pick.id);
                    if (found) {
                      onSelectSample(found.fullText);
                      onScrollToAnalyzer();
                    }
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-100 transition-all shadow-2xs"
                >
                  {pick.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
