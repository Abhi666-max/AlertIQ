'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { EvaluationView } from '@/components/EvaluationView';
import { Footer } from '@/components/Footer';

export default function BenchmarkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-4">
        <EvaluationView />
      </main>

      <Footer setActiveTab={() => {}} />
    </div>
  );
}
