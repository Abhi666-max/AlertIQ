'use client';

import React, { useState } from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { AnalyzerForm } from '@/components/AnalyzerForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AnalysisResult } from '@/lib/types';
import { ShieldCheck, Link2, Eye, ShieldAlert } from 'lucide-react';

export default function ScanPage() {
  const [message, setMessage] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnalyze = async (msgToAnalyze: string, channel: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgToAnalyze, channel }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Analysis failed (${response.status})`);
      setCurrentResult(data);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#090A0F]">
      <AppNavbar />

      {/* Main Split Screen Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ══════════════════════════════════
              LEFT SIDE: PINNED / STICKY SCANNER
              (Scanner ke niche kuch nahi hoga, stays in view)
              ══════════════════════════════════ */}
          <div className="w-full lg:w-[440px] xl:w-[480px] shrink-0 lg:sticky lg:top-[80px] lg:h-[calc(100vh-105px)]">
            <AnalyzerForm
              message={message}
              setMessage={setMessage}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
          </div>

          {/* ══════════════════════════════════
              RIGHT SIDE: SCROLLABLE REPORT
              (Reports scroll smoothly without moving the left scanner)
              ══════════════════════════════════ */}
          <div className="flex-1 w-full min-w-0 lg:h-[calc(100vh-105px)] lg:overflow-y-auto pr-1">
            {currentResult ? (
              <AnalysisResults
                result={currentResult}
                onReset={() => {
                  setCurrentResult(null);
                  setMessage('');
                }}
              />
            ) : (
              /* Awaiting Message Placeholder */
              <div className="h-full min-h-[420px] flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200 rounded-2xl text-center">
                <div className="h-14 w-14 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center mb-4">
                  <ShieldCheck className="h-7 w-7" />
                </div>

                <h3 className="font-display text-lg font-bold text-[#090A0F]">
                  Awaiting Message To Analyze
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1 leading-relaxed">
                  Paste any SMS, WhatsApp alert, or email into the scanner on the left and click{' '}
                  <strong className="text-[#090A0F]">Analyze Message</strong> to generate your safety report here.
                </p>

                {/* Features Checklist */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldAlert className="h-4 w-4 text-[#DC2626] mb-1.5" />
                    <div className="text-xs font-bold text-[#090A0F]">Impersonation</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Detects fake banks and brands</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Link2 className="h-4 w-4 text-[#DC2626] mb-1.5" />
                    <div className="text-xs font-bold text-[#090A0F]">Link Inspection</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Checks disguised web addresses</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Eye className="h-4 w-4 text-[#DC2626] mb-1.5" />
                    <div className="text-xs font-bold text-[#090A0F]">Exact Evidence</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Highlights deceitful wording</div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
