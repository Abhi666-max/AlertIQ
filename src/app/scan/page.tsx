'use client';

import React, { useState, useEffect } from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { AnalyzerForm } from '@/components/AnalyzerForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { Footer } from '@/components/Footer';
import { AnalysisResult } from '@/lib/types';
import { ShieldAlert, Zap, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const [message, setMessage] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('alertiq_session_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read history from localStorage:', e);
    }
  }, []);

  const saveToHistory = (newResult: AnalysisResult) => {
    try {
      const updated = [newResult, ...history.filter((h) => h.id !== newResult.id)].slice(0, 30);
      setHistory(updated);
      localStorage.setItem('alertiq_session_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save history to localStorage:', e);
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('alertiq_session_history');
      setHistory([]);
    } catch (e) {
      console.warn('Could not clear history:', e);
    }
  };

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

      if (!response.ok) {
        throw new Error(data.error || `Analysis request failed with status ${response.status}`);
      }

      setCurrentResult(data);
      saveToHistory(data);

      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'An unexpected error occurred during message analysis.';
      setErrorMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col text-white overflow-hidden" style={{ background: '#020408' }}>
      {/* Background deep space orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-48 left-1/4 h-[600px] w-[700px] rounded-full blur-[130px] aurora-orb-1" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] -right-32 h-[500px] w-[600px] rounded-full blur-[120px] aurora-orb-2" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[500px] rounded-full blur-[100px] aurora-orb-3" style={{ background: 'radial-gradient(ellipse, rgba(8,145,178,0.12) 0%, transparent 70%)' }} />
        {/* Mesh grid */}
        <div className="absolute inset-0 mesh-grid opacity-40" />
      </div>

      <AppNavbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Overview
            </Link>

            <button
              onClick={() => setIsHistoryOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Session Vault ({history.length} saved)</span>
            </button>
          </div>
        </div>

        <AnalyzerForm
          message={message}
          setMessage={setMessage}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        {currentResult && (
          <AnalysisResults
            result={currentResult}
            onReset={() => {
              setCurrentResult(null);
              const el = document.getElementById('analyzer-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={(item) => {
          setCurrentResult(item);
          setMessage(item.originalMessage);
          setTimeout(() => {
            const el = document.getElementById('results-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
        onClearHistory={handleClearHistory}
      />

      <Footer setActiveTab={() => {}} />
    </div>
  );
}
