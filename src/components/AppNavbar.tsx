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
            className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-violet-300 transition-colors pl-3 border-l border-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Overview</span>
          </Link>
        </div>

        {/* Center: Tab switcher */}
        <nav className="flex items-center gap-1 bg-white/[0.04] backdrop-blur-sm p-1 rounded-xl border border-white/10">
          {workspaceTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-violet-600/25 text-violet-200 shadow-sm border border-violet-500/25 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm px-3 py-1 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <ShieldCheck className="h-3 w-3 text-cyan-400" />
            <span className="font-mono text-[10px] font-semibold text-slate-400">
              Neural Defense Active
            </span>
          </div>

          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-violet-300 transition-all"
              title="Inspect previous scans in session vault"
            >
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Vault</span>
              {historyCount > 0 && (
                <span className="rounded-full bg-violet-600 px-1.5 py-0.5 font-mono text-[9px] text-white">
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
