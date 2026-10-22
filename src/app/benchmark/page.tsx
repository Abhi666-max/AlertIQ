'use client';

import React from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { EvaluationView } from '@/components/EvaluationView';
import { Footer } from '@/components/Footer';

export default function BenchmarkPage() {
  return (
    <div className="relative flex min-h-screen flex-col text-slate-900 overflow-hidden">
      <div className="animated-bg" aria-hidden="true">
        <div className="absolute inset-0 star-field" />
        <div className="absolute inset-0 mesh-grid" style={{ opacity: 0.4 }} />
        <div className="bg-blob bg-blob-2" style={{ opacity: 0.7 }} />
        <div className="bg-blob bg-blob-3" style={{ opacity: 0.6 }} />
      </div>
      <AppNavbar />
      <main className="flex-1 py-4">
        <EvaluationView />
      </main>
      <Footer />
    </div>
  );
}
