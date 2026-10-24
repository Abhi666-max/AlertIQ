'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = '', size = 30, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* High-Contrast Shield Emblem */}
      <div
        className="relative flex items-center justify-center shrink-0 drop-shadow-sm transition-transform hover:scale-105"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <Image
          src="/logo.svg"
          alt="AlertIQ Logo"
          width={size}
          height={size}
          priority
          className="shrink-0 object-contain"
        />
      </div>

      {showText && (
        <div className="flex items-baseline">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold tracking-tight text-[#090A0F]">
            Alert<span className="text-[#DC2626]">IQ</span>
          </span>
        </div>
      )}
    </div>
  );
}
