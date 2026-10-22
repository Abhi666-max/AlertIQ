'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { ShieldCheck } from 'lucide-react';

export function Footer({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <footer
      className="mt-auto text-slate-400 py-12"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: 'linear-gradient(0deg, rgba(2,4,8,0.95) 0%, rgba(5,8,15,0.90) 100%)',
        backdropFilter: 'blur(24px)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo size={24} />
            </Link>
            <p className="text-[11px] text-slate-600 font-mono max-w-xs text-center md:text-left">
              Zero-Knowledge Cognitive Threat Intelligence Platform
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/scan" className="hover:text-violet-400 transition-colors">
              Threat Scanner
            </Link>
            <Link href="/benchmark" className="hover:text-white transition-colors">
              Benchmark
            </Link>
            <Link href="/architecture" className="hover:text-white transition-colors">
              Architecture
            </Link>
          </div>

          {/* Shield badge */}
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
            style={{
              border: '1px solid rgba(13,148,136,0.25)',
              background: 'rgba(13,148,136,0.08)',
              color: '#34d399',
            }}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Private · Zero Retention</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <p>AlertIQ &copy; 2026 &bull; Advanced Social Engineering Defense Platform</p>
          <p className="font-mono text-[11px]">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
