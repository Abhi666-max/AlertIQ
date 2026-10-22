'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">

        {/* Brand */}
        <Link href="/" className="transition-opacity hover:opacity-85">
          <Logo size={22} />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#features"     className="hover:text-slate-200 transition-colors">Capabilities</a>
          <a href="#how-it-works" className="hover:text-slate-200 transition-colors">How It Works</a>
          <a href="#taxonomy"     className="hover:text-slate-200 transition-colors">Threats</a>
        </nav>

        {/* CTA */}
        <Link
          href="/scan"
          className="btn-aurora inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white"
        >
          <span>Launch Scanner</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

      </div>
    </header>
  );
}
