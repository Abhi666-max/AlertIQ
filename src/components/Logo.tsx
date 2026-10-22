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
      {/* Icon */}
      <div
        className="relative flex items-center justify-center rounded-xl shrink-0 overflow-hidden"
        style={{
          width: `${size + 10}px`,
          height: `${size + 10}px`,
          background: '#0F172A',
          border: '1px solid rgba(15, 23, 42, 0.16)',
          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.12)',
        }}
      >
        <Image
          src="/logo.svg"
          alt="AlertIQ Logo"
          width={size}
          height={size}
          style={{ width: `${size}px`, height: `${size}px` }}
          priority
          className="shrink-0 brightness-110"
        />
      </div>

      {showText && (
        <span
          className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-extrabold tracking-tight"
          style={{ color: '#0F172A' }}
        >
          Alert<span style={{ color: '#2563EB' }}>IQ</span>
        </span>
      )}
    </div>
  );
}
