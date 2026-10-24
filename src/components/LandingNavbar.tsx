'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 lg:px-10">

        <Link href="/" className="transition-opacity hover:opacity-85">
          <Logo size={24} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-[#090A0F] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#090A0F] transition-colors">How It Works</a>
          <a href="#threats" className="hover:text-[#090A0F] transition-colors">Common Scams</a>
          <a href="#privacy" className="hover:text-[#090A0F] transition-colors">Privacy</a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/scan"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold tracking-wide uppercase transition-all shadow-xs"
          >
            <span>Launch Scanner</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/scan"
            className="btn-primary inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold tracking-wide uppercase"
          >
            <span>Scan</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-[#090A0F] hover:bg-slate-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-5 py-4 space-y-3 shadow-lg">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#DC2626] py-1 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#DC2626] py-1 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#threats"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#DC2626] py-1 transition-colors"
          >
            Common Scams
          </a>
          <a
            href="#privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 hover:text-[#DC2626] py-1 transition-colors"
          >
            Privacy Guarantee
          </a>
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/scan"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold tracking-wide uppercase shadow-sm"
            >
              <span>Open Threat Scanner</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
