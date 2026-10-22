'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface AppNavbarProps {
  onOpenHistory?: () => void;
  historyCount?: number;
}

export function AppNavbar({ onOpenHistory, historyCount = 0 }: AppNavbarProps) {
  const pathname = usePathname();

  const workspaceTabs = [
    { label: 'Threat Scanner', href: '/scan' },
    { label: 'Security Benchmark', href: '/benchmark' },
    { label: 'Architecture & Privacy', href: '/architecture' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left: Logo + back */}
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size={22} />
          </Link>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors pl-3 border-l border-slate-900/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Overview</span>
          </Link>
        </div>

        {/* Center: Tab switcher */}
        <nav className="flex items-center gap-1 bg-[#EFECE4] p-1 rounded-xl border border-slate-900/10">
          {workspaceTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FAF8F3] text-[#0F172A] shadow-xs border border-slate-900/10 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF8F3]/60'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-900/10 bg-[#FAF8F3] px-3.5 py-1 text-xs text-slate-700 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
            <span className="font-mono text-[10px] font-semibold text-slate-600">
              Neural Defense Active
            </span>
          </div>

          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 rounded-xl border border-slate-900/10 bg-[#FAF8F3] px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-[#EFECE4] hover:text-slate-900 transition-all shadow-2xs"
              title="Inspect previous scans in session vault"
            >
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">Vault</span>
              {historyCount > 0 && (
                <span className="rounded-full bg-[#0F172A] px-1.5 py-0.5 font-mono text-[9px] text-white">
                  {historyCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
