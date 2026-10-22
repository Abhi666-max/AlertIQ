'use client';

import React, { useState, useEffect } from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { AnalyzerForm } from '@/components/AnalyzerForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { Footer } from '@/components/Footer';
import { AnalysisResult } from '@/lib/types';
import { ArrowLeft, Clock } from 'lucide-react';
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
        if (Array.isArray(parsed)) setHistory(parsed);
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
      if (!response.ok) throw new Error(data.error || `Analysis failed with status ${response.status}`);
      setCurrentResult(data);
      saveToHistory(data);
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col text-slate-900 bg-[#EEF2F6] overflow-hidden">

      {/* CSS Animated Background */}
      <div className="animated-bg" aria-hidden="true">
        <div className="absolute inset-0 star-field" />
        <div className="absolute inset-0 mesh-grid" style={{ opacity: 0.5 }} />
        <div className="bg-blob bg-blob-1" style={{ opacity: 0.7 }} />
        <div className="bg-blob bg-blob-2" style={{ opacity: 0.6 }} />
      </div>

      <AppNavbar onOpenHistory={() => setIsHistoryOpen(true)} historyCount={history.length} />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Overview
            </Link>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
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

      <Footer />
    </div>
  );
}
