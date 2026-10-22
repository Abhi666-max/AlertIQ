'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = '', size = 26, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-lg bg-slate-900 ring-1 ring-slate-800 shadow-xs shrink-0 overflow-hidden"
        style={{ width: `${size + 8}px`, height: `${size + 8}px` }}
      >
        <Image
          src="/logo.svg"
          alt="AlertIQ Logo"
          width={size}
          height={size}
          style={{ width: `${size}px`, height: `${size}px` }}
          priority
          className="shrink-0"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold tracking-tight text-white">
              Alert<span className="text-indigo-400">IQ</span>
            </span>
            <span className="rounded-md bg-indigo-500/10 px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase tracking-wider text-indigo-300 border border-indigo-500/20">
              Platform
            </span>
          </div>
          <span className="text-[9px] font-medium tracking-wide text-slate-400">
            Threat Defense
          </span>
        </div>
      )}
    </div>
  );
}
