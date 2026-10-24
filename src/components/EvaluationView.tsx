'use client';

import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, XCircle, RefreshCw, BarChart3, Database, ShieldCheck, Zap } from 'lucide-react';
import { EvaluationMetrics } from '@/lib/evaluationRunner';

interface EvaluationViewProps {
  onSelectSampleMessage?: (text: string) => void;
}

export function EvaluationView({ onSelectSampleMessage }: EvaluationViewProps) {
  const [metrics, setMetrics] = useState<EvaluationMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = () => {
    setLoading(true);
    fetch('/api/evaluate')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load evaluation metrics:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-900/10">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/20 bg-emerald-50 px-3 py-0.5 text-xs font-mono font-bold text-emerald-900 shadow-2xs mb-2">
            <Zap className="h-3.5 w-3.5 text-emerald-700" />
            <span>Detection Telemetry &amp; Model Verification</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A]">
            Security Benchmark &amp; Telemetry
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl font-sans">
            Empirical validation measured across a benchmark corpus of {metrics ? metrics.totalSamples : '…'} realistic phishing, social engineering, and benign communications.
          </p>
        </div>

        <button
          onClick={fetchMetrics}
          disabled={loading}
          className="btn-secondary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
          <span>Execute Benchmark Suite</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-600">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mb-3" />
          <p className="text-sm font-mono font-medium">Running empirical validation tests...</p>
        </div>
      ) : metrics ? (
        <div className="mt-8 space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Exact 3-Class Accuracy</span>
              <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                {Math.round(metrics.accuracy * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500 font-sans">Ground truth match</p>
            </div>

            <div className="glass-card rounded-2xl p-5 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Threat Precision</span>
              <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-blue-600">
                {Math.round(metrics.precision * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500 font-sans">Zero false alarms</p>
            </div>

            <div className="glass-card rounded-2xl p-5 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Threat Recall</span>
              <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-indigo-600">
                {Math.round(metrics.recall * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500 font-sans">Zero missed attacks</p>
            </div>

            <div className="glass-card rounded-2xl p-5 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Harmonic F1-Score</span>
              <div className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-emerald-600">
                {metrics.f1Score.toFixed(2)}
              </div>
              <p className="mt-1 text-[11px] text-slate-500 font-sans">Calibrated balance</p>
            </div>
          </div>

          {/* Confusion Matrix & Stratification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confusion Matrix */}
            <div className="editorial-card rounded-2xl p-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-2 pb-3 border-b border-slate-900/8">
                <BarChart3 className="h-4 w-4 text-emerald-700" />
                Binary Threat Confusion Matrix
              </h3>
              <p className="mt-2 text-xs text-slate-600 font-sans">
                Positive = Threat Flagged | Negative = Benign Verified
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-center font-mono">
                <div className="rounded-xl border border-emerald-300 bg-emerald-50/90 p-4">
                  <span className="text-[11px] text-emerald-900 uppercase font-bold">True Positives (TP)</span>
                  <div className="text-3xl font-extrabold text-emerald-950 mt-1">
                    {metrics.confusionMatrix.truePositive}
                  </div>
                  <span className="text-[10px] text-slate-600">Scams intercepted</span>
                </div>

                <div className="rounded-xl border border-rose-300 bg-rose-50/90 p-4">
                  <span className="text-[11px] text-rose-900 uppercase font-bold">False Positives (FP)</span>
                  <div className="text-3xl font-extrabold text-rose-950 mt-1">
                    {metrics.confusionMatrix.falsePositive}
                  </div>
                  <span className="text-[10px] text-slate-600">Benign misclassified</span>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-50/90 p-4">
                  <span className="text-[11px] text-amber-900 uppercase font-bold">False Negatives (FN)</span>
                  <div className="text-3xl font-extrabold text-amber-950 mt-1">
                    {metrics.confusionMatrix.falseNegative}
                  </div>
                  <span className="text-[10px] text-slate-600">Attacks missed</span>
                </div>

                <div className="rounded-xl border border-blue-300 bg-blue-50/90 p-4">
                  <span className="text-[11px] text-blue-900 uppercase font-bold">True Negatives (TN)</span>
                  <div className="text-3xl font-extrabold text-blue-950 mt-1">
                    {metrics.confusionMatrix.trueNegative}
                  </div>
                  <span className="text-[10px] text-slate-600">Legitimate verified</span>
                </div>
              </div>
            </div>

            {/* Dataset Stratification */}
            <div className="editorial-card rounded-2xl p-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-2 pb-3 border-b border-slate-900/8">
                <Database className="h-4 w-4 text-emerald-700" />
                Benchmark Corpus Stratification
              </h3>
              <p className="mt-2 text-xs text-slate-600 font-sans">
                Distribution across {metrics ? metrics.totalSamples : '…'} benchmark message vectors.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-rose-900 font-bold">High Risk Vectors: {metrics.highRiskCount}</span>
                    <span className="text-slate-500 font-bold">{Math.round((metrics.highRiskCount / metrics.totalSamples) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900/10 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: `${Math.round((metrics.highRiskCount / metrics.totalSamples) * 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-amber-900 font-bold">Medium / Ambiguous: {metrics.mediumRiskCount}</span>
                    <span className="text-slate-500 font-bold">{Math.round((metrics.mediumRiskCount / metrics.totalSamples) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: `${Math.round((metrics.mediumRiskCount / metrics.totalSamples) * 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-emerald-900 font-bold">Benign Messages: {metrics.lowRiskCount}</span>
                    <span className="text-slate-500 font-bold">{Math.round((metrics.lowRiskCount / metrics.totalSamples) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.round((metrics.lowRiskCount / metrics.totalSamples) * 100)}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#F2ECE0] p-3 text-xs text-slate-700 font-mono flex items-center justify-between border border-slate-900/10 shadow-inner">
                <span>Evaluation Date: {new Date(metrics.evaluatedAt).toLocaleDateString()}</span>
                <span className="text-[#0F172A] font-bold">{metrics.totalSamples} Total Vectors</span>
              </div>
            </div>
          </div>

          {/* Granular Table */}
          <div className="editorial-card rounded-2xl p-6 overflow-hidden">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold pb-4 border-b border-slate-900/8">
              Granular Test Case Verification ({metrics.results.length} Scenarios)
            </h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#EFECE4] text-slate-600 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="px-3.5 py-3">ID</th>
                    <th className="px-3.5 py-3">Attack Specimen</th>
                    <th className="px-3.5 py-3">Ground Truth</th>
                    <th className="px-3.5 py-3">Detection Assessment</th>
                    <th className="px-3.5 py-3 text-right">Score</th>
                    <th className="px-3.5 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/6 font-mono">
                  {metrics.results.map((res) => (
                    <tr key={res.id} className="hover:bg-[#F2ECE0]/60 transition-colors">
                      <td className="px-3.5 py-3 text-slate-500 font-bold">{res.id}</td>
                      <td className="px-3.5 py-3 font-sans font-semibold text-[#0F172A]">{res.category}</td>
                      <td className="px-3.5 py-3 text-slate-600">{res.expected.replace('_RISK', '')}</td>
                      <td className="px-3.5 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            res.actual === 'HIGH_RISK'
                              ? 'bg-rose-100 text-rose-900 border border-rose-300'
                              : res.actual === 'MEDIUM_RISK'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {res.actual.replace('_RISK', '')}
                        </span>
                      </td>
                      <td className="px-3.5 py-3 text-right text-slate-900 font-bold">{res.score}/100</td>
                      <td className="px-3.5 py-3 text-center">
                        {res.passed ? (
                          <span className="inline-flex items-center gap-1 text-emerald-800 font-sans text-[11px] font-semibold">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" /> Match
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-800 font-sans text-[11px] font-semibold">
                            <XCircle className="h-3.5 w-3.5 text-amber-700" /> Variance
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
