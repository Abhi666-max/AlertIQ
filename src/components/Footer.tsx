'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <footer
      className="mt-auto py-10"
      style={{
        borderTop: '1px solid rgba(15, 23, 42, 0.08)',
        background: 'rgba(238, 242, 246, 0.90)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size={20} />
          </Link>

          <p className="text-xs text-slate-500 font-medium">
            AlertIQ &copy; 2026 &bull; Advanced Social Engineering Defense &bull; All Rights Reserved
          </p>

          <p className="font-mono text-[11px] text-slate-400">
            Zero-Knowledge Threat Intelligence
          </p>

        </div>
      </div>
    </footer>
  );
}
