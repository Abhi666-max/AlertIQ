'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo size={24} />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors hover:text-violet-300">
            Capabilities
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors hover:text-violet-300">
            How It Works
          </a>
          <a href="#taxonomy" className="hover:text-white transition-colors hover:text-violet-300">
            Threat Taxonomy
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 font-mono text-[11px] text-slate-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span>v1.0 Live</span>
          </div>

          <Link
            href="/scan"
            className="btn-aurora inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white"
          >
            <span>Launch Scanner</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
