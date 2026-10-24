'use client';

import React, { useState } from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { AnalyzerForm } from '@/components/AnalyzerForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AnalysisResult } from '@/lib/types';
import { ShieldCheck, Link2, Eye, ShieldAlert, ArrowDown, ArrowUp } from 'lucide-react';

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

      // On mobile devices, smoothly scroll down to the generated report automatically
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setTimeout(() => {
          const reportEl = document.getElementById('report-container');
          if (reportEl) {
            reportEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToScanner = () => {
    const scannerEl = document.getElementById('scanner-container');
    if (scannerEl) {
      scannerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToReport = () => {
    const reportEl = document.getElementById('report-container');
    if (reportEl) {
      reportEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#090A0F] overflow-x-hidden">
      <AppNavbar />

      {/* Main Split Screen Area (Responsive Grid) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">

          {/* ══════════════════════════════════
              LEFT SIDE: PINNED / STICKY SCANNER
              (Pinned on desktop, top container on mobile)
              ══════════════════════════════════ */}
          <div
            id="scanner-container"
            className="w-full lg:w-[440px] xl:w-[480px] shrink-0 lg:sticky lg:top-[76px] lg:h-[calc(100vh-96px)]"
          >
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
              (Smoothly scrolls independently on desktop, flows naturally on mobile)
              ══════════════════════════════════ */}
          <div
            id="report-container"
            className="flex-1 w-full min-w-0 lg:h-[calc(100vh-96px)] lg:overflow-y-auto lg:pr-1"
          >
            {currentResult ? (
              <div>
                {/* Mobile Quick Return Link */}
                <div className="lg:hidden mb-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-700">Report Ready</span>
                  <button
                    type="button"
                    onClick={scrollToScanner}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626]"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                    <span>Back to Scanner</span>
                  </button>
                </div>

                <AnalysisResults
                  result={currentResult}
                  onReset={() => {
                    setCurrentResult(null);
                    setMessage('');
                    scrollToScanner();
                  }}
                />
              </div>
            ) : (
              /* Awaiting Message Placeholder */
              <div className="min-h-[300px] lg:h-full flex flex-col items-center justify-center p-5 sm:p-8 bg-white border border-dashed border-slate-200 rounded-2xl text-center">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center mb-3 sm:mb-4">
                  <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-[#090A0F]">
                  Awaiting Message To Analyze
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1 leading-relaxed">
                  Paste any SMS, WhatsApp alert, or email into the scanner and click{' '}
                  <strong className="text-[#090A0F]">Analyze Message</strong> to generate your safety report here.
                </p>

                {/* Features Checklist */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-lg text-left">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldAlert className="h-4 w-4 text-[#DC2626] mb-1 sm:mb-1.5" />
                    <div className="text-xs font-bold text-[#090A0F]">Impersonation</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Detects fake banks and brands</div>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Link2 className="h-4 w-4 text-[#DC2626] mb-1 sm:mb-1.5" />
                    <div className="text-xs font-bold text-[#090A0F]">Link Inspection</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Checks disguised web addresses</div>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Eye className="h-4 w-4 text-[#DC2626] mb-1 sm:mb-1.5" />
                    <div className="text-xs font-bold text-[#090A0F]">Exact Evidence</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Highlights deceitful wording</div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Mobile Floating Action Pill when report is loaded */}
      {currentResult && (
        <div className="lg:hidden fixed bottom-4 right-4 z-40">
          <button
            type="button"
            onClick={scrollToReport}
            className="btn-primary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            <span>View Report</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
