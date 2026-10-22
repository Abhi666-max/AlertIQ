'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <footer className="mt-auto border-t border-white/[0.08] bg-[#060708] text-slate-400 py-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Logo & description */}
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size={28} />
          </Link>

          {/* Quick navigation */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/scan" className="hover:text-indigo-400 transition-colors">
              Threat Scanner
            </Link>
            <Link href="/benchmark" className="hover:text-white transition-colors">
              Security Benchmark
            </Link>
            <Link href="/architecture" className="hover:text-white transition-colors">
              Architecture &amp; Privacy
            </Link>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <p>
            AlertIQ &copy; 2026 &bull; Advanced Social Engineering Defense Platform &bull; All Rights Reserved
          </p>
          <p className="font-mono text-center sm:text-right text-slate-500 text-[11px]">
            Zero-Knowledge Cognitive Threat Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
