'use client';

import React from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { EvaluationView } from '@/components/EvaluationView';
import { Footer } from '@/components/Footer';

export default function BenchmarkPage() {
  return (
    <div className="relative flex min-h-screen flex-col text-white overflow-hidden" style={{ background: '#020408' }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-48 left-1/3 h-[600px] w-[700px] rounded-full blur-[130px] aurora-orb-1" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 right-1/4 h-[500px] w-[600px] rounded-full blur-[120px] aurora-orb-2" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 mesh-grid opacity-30" />
      </div>

      <AppNavbar />

      <main className="flex-1 py-4">
        <EvaluationView />
      </main>

      <Footer setActiveTab={() => {}} />
    </div>
  );
}
