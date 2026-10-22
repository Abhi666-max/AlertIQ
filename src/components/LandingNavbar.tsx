'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#08090A]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo size={24} />
        </Link>

        {/* Informational marketing navigation for landing page */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#taxonomy" className="hover:text-white transition-colors">
            Threat Taxonomy
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>v1.0 Live</span>
          </div>

          <Link
            href="/scan"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-[0.98]"
          >
            <span>Launch Scanner</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
