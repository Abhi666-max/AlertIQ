'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">

        <Link href="/" className="transition-opacity hover:opacity-85">
          <Logo size={24} />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-[#090A0F] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#090A0F] transition-colors">How It Works</a>
          <a href="#threats" className="hover:text-[#090A0F] transition-colors">Common Scams</a>
          <a href="#privacy" className="hover:text-[#090A0F] transition-colors">Privacy</a>
        </nav>

        <Link
          href="/scan"
          className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold tracking-wide uppercase transition-all"
        >
          <span>Launch Scanner</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

      </div>
    </header>
  );
}
