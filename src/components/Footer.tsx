'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <Link href="/" className="hover:opacity-85 transition-opacity">
            <Logo size={22} />
          </Link>

          <p className="text-xs text-slate-500 text-center sm:text-left">
            AlertIQ &copy; 2026 &bull; Real-Time Scam & Phishing Detection Platform &bull; Zero Data Retention
          </p>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Volatile Memory Only</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
