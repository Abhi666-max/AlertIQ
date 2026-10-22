'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AnalyzerForm } from '@/components/AnalyzerForm';
import { AnalysisResults } from '@/components/AnalysisResults';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { EvaluationView } from '@/components/EvaluationView';
import { MethodologyView } from '@/components/MethodologyView';
import { Footer } from '@/components/Footer';
import { AnalysisResult } from '@/lib/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'evaluation' | 'methodology'>('analyzer');
  const [message, setMessage] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Load history from browser localStorage on mount
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

  // Save history to localStorage
  const saveToHistory = (newResult: AnalysisResult) => {
    try {
      const updated = [newResult, ...history.filter((h) => h.id !== newResult.id)].slice(0, 30);
      setHistory(updated);
      localStorage.setItem('alertiq_session_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save history to localStorage:', e);
    }
  };

  // Clear history
  const handleClearHistory = () => {
    try {
      localStorage.removeItem('alertiq_session_history');
      setHistory([]);
    } catch (e) {
      console.warn('Could not clear history:', e);
    }
  };

  // Perform Analysis
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

      // Smooth scroll to results
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

  const handleScrollToAnalyzer = () => {
    const el = document.getElementById('analyzer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Tab Views */}
      <main className="flex-1">
        {activeTab === 'analyzer' && (
          <>
            <Hero
              onSelectSample={(sampleText) => setMessage(sampleText)}
              onScrollToAnalyzer={handleScrollToAnalyzer}
            />

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
                  handleScrollToAnalyzer();
                }}
              />
            )}
          </>
        )}

        {activeTab === 'evaluation' && (
          <EvaluationView
            onSelectSampleMessage={(sampleText) => {
              setMessage(sampleText);
              setActiveTab('analyzer');
              handleScrollToAnalyzer();
            }}
          />
        )}

        {activeTab === 'methodology' && <MethodologyView />}
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={(item) => {
          setCurrentResult(item);
          setMessage(item.originalMessage);
          setActiveTab('analyzer');
          setTimeout(() => {
            const el = document.getElementById('results-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
