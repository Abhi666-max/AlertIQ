'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Activity, Clock, ShieldCheck, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenHistory?: () => void;
  historyCount?: number;
  activeTab: 'analyzer' | 'evaluation' | 'methodology';
  setActiveTab: (tab: 'analyzer' | 'evaluation' | 'methodology') => void;
}

export function Navbar({ onOpenHistory, historyCount = 0, activeTab, setActiveTab }: NavbarProps) {
  const [systemStatus, setSystemStatus] = useState<{
    aiProvider: string;
    safeBrowsing: string;
    hasGeminiKey: boolean;
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
          aiProvider: 'Local Engine Active',
          safeBrowsing: 'Heuristics Only',
          hasGeminiKey: false,
        });
      });
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f293d] bg-[#070a12]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link
          href="/"
          onClick={() => setActiveTab('analyzer')}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white">
                Alert<span className="text-cyan-400">IQ</span>
              </span>
              <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-cyan-400 border border-cyan-800/60">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">AI Scam Intelligence</p>
          </div>
        </Link>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'analyzer'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Analyzer
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'evaluation'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Faculty Benchmark
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'methodology'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Methodology & Privacy
          </button>
        </nav>

        {/* Right side status & history */}
        <div className="flex items-center gap-3">
          {/* Engine indicator pill */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-800 bg-[#0d131f] px-3 py-1 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <Cpu className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-mono text-[11px] text-slate-400">
              {systemStatus ? (systemStatus.hasGeminiKey ? 'Gemini 2.5 Flash' : 'Rule Engine (Demo)') : 'Initializing...'}
            </span>
          </div>

          {/* Local History toggle */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#111827] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all"
              title="View session analysis history stored in your browser"
            >
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="ml-1 rounded-full bg-cyan-500/20 px-1.5 py-0.2 font-mono text-[10px] text-cyan-300 border border-cyan-500/40">
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
