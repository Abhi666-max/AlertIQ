'use client';

import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'analyzer' | 'evaluation' | 'methodology') => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-500 py-10 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          {/* Logo & description */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-slate-900">
                Alert<span className="text-blue-600">IQ</span>
              </span>
              <p className="text-xs text-slate-500">Autonomous Social Engineering & Scam Defense Platform</p>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('analyzer')}
              className="hover:text-slate-900 transition-colors"
            >
              Threat Analyzer
            </button>
            <button
              onClick={() => setActiveTab('evaluation')}
              className="hover:text-slate-900 transition-colors"
            >
              Security Benchmark
            </button>
            <button
              onClick={() => setActiveTab('methodology')}
              className="hover:text-slate-900 transition-colors"
            >
              Architecture & Privacy
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
          <p>
            AlertIQ &copy; 2026 &bull; Production Cybersecurity Systems &bull; All Rights Reserved
          </p>
          <p className="font-mono text-center sm:text-right text-slate-500">
            Engineered with Groq Llama 3.3 70B &bull; Next.js 16 &bull; React 19 &bull; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
