'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Clock, Cpu, ChevronRight, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenHistory?: () => void;
  historyCount?: number;
  activeTab: 'analyzer' | 'evaluation' | 'methodology';
  setActiveTab: (tab: 'analyzer' | 'evaluation' | 'methodology') => void;
}

export function Navbar({ onOpenHistory, historyCount = 0, activeTab, setActiveTab }: NavbarProps) {
  const [systemStatus, setSystemStatus] = useState<{
    aiProvider: string;
    model: string;
    hasGroqKey: boolean;
  } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data?.config) {
          setSystemStatus(data.config);
        }
      })
      .catch(() => {
        setSystemStatus({
          aiProvider: 'Groq Cloud Engine',
          model: 'llama-3.3-70b-versatile',
          hasGroqKey: true,
        });
      });
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link
          href="/"
          onClick={() => setActiveTab('analyzer')}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md shadow-slate-900/10 ring-1 ring-slate-900/5">
            <Shield className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold tracking-tight text-slate-900">
                Alert<span className="text-blue-600">IQ</span>
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600 border border-slate-200">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
              AI Threat Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'analyzer'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Threat Analyzer
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'evaluation'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Security Benchmark
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'methodology'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Architecture & Privacy
          </button>
        </nav>

        {/* Right side status & history */}
        <div className="flex items-center gap-2.5">
          {/* Groq Live Engine Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-mono text-[11px] font-medium text-slate-600">
              {systemStatus ? systemStatus.model : 'Groq Llama 3.3 70B'}
            </span>
          </div>

          {/* History drawer button */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
              title="Inspect previous scans in session vault"
            >
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>Vault</span>
              {historyCount > 0 && (
                <span className="ml-1 rounded-full bg-slate-900 px-1.5 py-0.2 font-mono text-[10px] text-white">
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
