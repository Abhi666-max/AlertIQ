'use client';

import React from 'react';
import { Shield, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'analyzer' | 'evaluation' | 'methodology') => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-slate-900 bg-[#060910] text-slate-400 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Logo & description */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-['Space_Grotesk'] text-base font-bold text-white">
                Alert<span className="text-cyan-400">IQ</span>
              </span>
              <p className="text-xs text-slate-500">AI-Powered Scam Message Detection & Risk Alert System</p>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="flex items-center gap-5 text-xs">
            <button
              onClick={() => setActiveTab('analyzer')}
              className="hover:text-cyan-400 transition-colors"
            >
              Analyzer
            </button>
            <button
              onClick={() => setActiveTab('evaluation')}
              className="hover:text-cyan-400 transition-colors"
            >
              Faculty Benchmark
            </button>
            <button
              onClick={() => setActiveTab('methodology')}
              className="hover:text-cyan-400 transition-colors"
            >
              Methodology & Privacy
            </button>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            AlertIQ &copy; 2026 &bull; Academic Mini-Project &bull; Production Full-Stack Implementation
          </p>
          <p className="text-slate-400 font-mono text-center sm:text-right">
            Powered by Google Gemini 2.5 Flash &bull; Next.js 16 &bull; React 19 &bull; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
