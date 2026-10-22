'use client';

import React from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { MethodologyView } from '@/components/MethodologyView';
import { Footer } from '@/components/Footer';

export default function ArchitecturePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#08090A] text-white overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-indigo-600/10 blur-[140px] animate-float-1" />
      </div>

      <AppNavbar />

      <main className="flex-1 py-4">
        <MethodologyView />
      </main>

      <Footer setActiveTab={() => {}} />
    </div>
  );
}
