'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenHistory?: () => void;
  historyCount?: number;
}

export function Navbar({ onOpenHistory, historyCount = 0 }: NavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Overview', href: '/' },
    { label: 'Threat Scanner', href: '/scan' },
    { label: 'Security Benchmark', href: '/benchmark' },
    { label: 'Architecture & Privacy', href: '/architecture' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo size={36} />
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side status & action buttons */}
        <div className="flex items-center gap-3">
          {/* Active Cloud Engine Status */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3 py-1 text-xs text-slate-700 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            <span className="font-mono text-[11px] font-semibold text-slate-700">
              Neural Threat Engine Active
            </span>
          </div>

          {/* History drawer button (if on scan page or handler provided) */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-2xs"
              title="Inspect previous scans in session vault"
            >
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">Vault</span>
              {historyCount > 0 && (
                <span className="rounded-full bg-slate-900 px-1.5 py-0.2 font-mono text-[10px] text-white">
                  {historyCount}
                </span>
              )}
            </button>
          )}

          {/* Primary Action CTA */}
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            <span>Launch Scanner</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
