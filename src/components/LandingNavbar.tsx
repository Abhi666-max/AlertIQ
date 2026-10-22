'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo size={24} />
        </Link>

        {/* Informational marketing navigation for landing page */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-slate-600">
          <a href="#capabilities" className="hover:text-slate-900 transition-colors">
            Capabilities
          </a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
            How It Works
          </a>
          <a href="#taxonomy" className="hover:text-slate-900 transition-colors">
            Threat Vectors
          </a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-500 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>v1.0 Live</span>
          </div>

          <Link
            href="/scan"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0071E3] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98]"
          >
            <span>Launch Scanner</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
