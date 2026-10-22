'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { MethodologyView } from '@/components/MethodologyView';
import { Footer } from '@/components/Footer';

export default function ArchitecturePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-4">
        <MethodologyView />
      </main>

      <Footer setActiveTab={() => {}} />
    </div>
  );
}
