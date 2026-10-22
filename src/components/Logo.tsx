'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = '', size = 36, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Ambient glow behind logo */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-cyan-500/20 blur-md opacity-80" />
        <div className="relative flex items-center justify-center rounded-xl bg-slate-950 p-1 ring-1 ring-slate-800 shadow-sm">
          <Image
            src="/logo.svg"
            alt="AlertIQ Logo"
            width={size}
            height={size}
            priority
            className="h-auto w-auto"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold tracking-tight text-slate-900">
              Alert<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">IQ</span>
            </span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-blue-700 border border-blue-200/80">
              Security
            </span>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 -mt-0.5">
            Threat Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
