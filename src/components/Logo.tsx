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
      {/* Icon container with glow */}
      <div
        className="relative flex items-center justify-center rounded-xl shrink-0 overflow-hidden"
        style={{
          width: `${size + 10}px`,
          height: `${size + 10}px`,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(79,70,229,0.15) 100%)',
          border: '1px solid rgba(124,58,237,0.35)',
          boxShadow: '0 0 16px rgba(124,58,237,0.25), 0 1px 0 rgba(255,255,255,0.08) inset',
        }}
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
            <span
              className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold tracking-tight"
              style={{ color: '#f0f4ff' }}
            >
              Alert<span style={{ color: '#a78bfa' }}>IQ</span>
            </span>
            <span
              className="rounded-md px-1.5 py-px font-mono text-[9px] font-bold uppercase tracking-wider"
              style={{
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.30)',
                color: '#c4b5fd',
              }}
            >
              Platform
            </span>
          </div>
          <span className="text-[9px] font-medium tracking-wide" style={{ color: '#4d5c80' }}>
            Threat Defense
          </span>
        </div>
      )}
    </div>
  );
}
