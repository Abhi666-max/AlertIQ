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
          background: 'linear-gradient(135deg, rgba(124,58,237,0.22) 0%, rgba(79,70,229,0.12) 100%)',
          border: '1px solid rgba(124,58,237,0.32)',
          boxShadow: '0 0 14px rgba(124,58,237,0.22), 0 1px 0 rgba(255,255,255,0.07) inset',
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
        <span
          className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold tracking-tight"
          style={{ color: '#f0f4ff' }}
        >
          Alert<span style={{ color: '#a78bfa' }}>IQ</span>
        </span>
      )}
    </div>
  );
}
