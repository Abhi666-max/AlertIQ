'use client';

import React from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { MethodologyView } from '@/components/MethodologyView';
import { Footer } from '@/components/Footer';

export default function ArchitecturePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavbar />

      <main className="flex-1 py-4">
        <MethodologyView />
      </main>

      <Footer setActiveTab={() => {}} />
    </div>
  );
}
