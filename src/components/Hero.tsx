'use client';

import React from 'react';
import { ShieldCheck, Eye, Lock, ArrowDown, Sparkles } from 'lucide-react';
import { SAMPLE_MESSAGES } from '@/lib/sampleMessages';

interface HeroProps {
  onSelectSample: (message: string) => void;
  onScrollToAnalyzer: () => void;
}

export function Hero({ onSelectSample, onScrollToAnalyzer }: HeroProps) {
  const quickPicks = [
    { label: 'Bank Phishing', id: 'sample-1' },
    { label: 'Zelle OTP Scam', id: 'sample-2' },
    { label: 'USPS Delivery Fee', id: 'sample-3' },
    { label: 'Authentic 2FA (Safe)', id: 'sample-7' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-10 text-center md:pt-16 md:pb-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Subtle top banner badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-medium text-cyan-300 backdrop-blur-sm mb-6 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Decision-Support Scam Intelligence</span>
          <span className="text-cyan-600">•</span>
          <span className="text-slate-400">Verifiable Excerpts</span>
        </div>

        {/* Primary headline */}
        <h1 className="font-['Space_Grotesk'] text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Think before you <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">trust</span>.
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl font-normal leading-relaxed">
          Analyze suspicious SMS, email, and chat messages with evidence-based AI risk analysis. Inspect indicators, verify exact excerpts, and check link reputations before you click.
        </p>

        {/* Trust features row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-cyan-400" />
            <span>Zero Server Message Retention</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-teal-400" />
            <span>Verbatim Evidence Grounding</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Multi-Vector Threat Radar</span>
          </div>
        </div>

        {/* Quick sample pickers */}
        <div className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Quick Live Test Cases:
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
                  className="rounded-lg border border-slate-800 bg-[#0d131f] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-950/30 hover:text-cyan-200 transition-all shadow-sm"
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
