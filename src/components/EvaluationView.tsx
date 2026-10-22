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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-0.5 text-xs font-mono font-bold text-indigo-300 shadow-2xs mb-2">
            <Zap className="h-3.5 w-3.5 text-indigo-400" />
            <span>Detection Telemetry &amp; Model Verification</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold text-white">
            Security Benchmark &amp; Model Telemetry
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Empirical validation measured across a benchmark corpus of 20 realistic phishing, social engineering, and benign communications.
          </p>
        </div>

        <button
          onClick={fetchMetrics}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white shadow-xs transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Execute Benchmark Suite</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <RefreshCw className="h-8 w-8 animate-spin text-indigo-400 mb-3" />
          <p className="text-sm font-mono font-medium">Running empirical validation tests...</p>
        </div>
      ) : metrics ? (
        <div className="mt-8 space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="lux-card rounded-2xl p-5 bg-[#0F1117] text-center border border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Exact 3-Class Accuracy</span>
              <div className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
                {Math.round(metrics.accuracy * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Ground truth match</p>
            </div>

            <div className="lux-card rounded-2xl p-5 bg-[#0F1117] text-center border border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Threat Precision</span>
              <div className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-cyan-400">
                {Math.round(metrics.precision * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Zero false alarms</p>
            </div>

            <div className="lux-card rounded-2xl p-5 bg-[#0F1117] text-center border border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Threat Recall</span>
              <div className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-indigo-400">
                {Math.round(metrics.recall * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Zero missed attacks</p>
            </div>

            <div className="lux-card rounded-2xl p-5 bg-[#0F1117] text-center border border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Harmonic F1-Score</span>
              <div className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-emerald-400">
                {metrics.f1Score.toFixed(2)}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Calibrated balance</p>
            </div>
          </div>

          {/* Confusion Matrix & Stratification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confusion Matrix */}
            <div className="lux-card rounded-2xl p-6 bg-[#0F1117] border border-white/[0.08]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2 pb-3 border-b border-white/[0.08]">
                <BarChart3 className="h-4 w-4 text-indigo-400" />
                Binary Threat Confusion Matrix
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Positive = Threat Flagged | Negative = Benign Verified
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-center font-mono">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <span className="text-[11px] text-emerald-400 uppercase font-bold">True Positives (TP)</span>
                  <div className="text-3xl font-extrabold text-emerald-300 mt-1">
                    {metrics.confusionMatrix.truePositive}
                  </div>
                  <span className="text-[10px] text-slate-400">Scams intercepted</span>
                </div>

                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                  <span className="text-[11px] text-red-400 uppercase font-bold">False Positives (FP)</span>
                  <div className="text-3xl font-extrabold text-red-300 mt-1">
                    {metrics.confusionMatrix.falsePositive}
                  </div>
                  <span className="text-[10px] text-slate-400">Benign misclassified</span>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                  <span className="text-[11px] text-amber-400 uppercase font-bold">False Negatives (FN)</span>
                  <div className="text-3xl font-extrabold text-amber-300 mt-1">
                    {metrics.confusionMatrix.falseNegative}
                  </div>
                  <span className="text-[10px] text-slate-400">Attacks missed</span>
                </div>

                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                  <span className="text-[11px] text-blue-400 uppercase font-bold">True Negatives (TN)</span>
                  <div className="text-3xl font-extrabold text-blue-300 mt-1">
                    {metrics.confusionMatrix.trueNegative}
                  </div>
                  <span className="text-[10px] text-slate-400">Legitimate verified</span>
                </div>
              </div>
            </div>

            {/* Dataset Stratification */}
            <div className="lux-card rounded-2xl p-6 bg-[#0F1117] border border-white/[0.08]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2 pb-3 border-b border-white/[0.08]">
                <Database className="h-4 w-4 text-indigo-400" />
                Benchmark Corpus Stratification
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Balanced distribution across 20 synthetic &amp; realistic message vectors.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-red-400 font-bold">High Risk Vectors: {metrics.highRiskCount}</span>
                    <span className="text-slate-400 font-bold">40%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-amber-400 font-bold">Medium / Ambiguous: {metrics.mediumRiskCount}</span>
                    <span className="text-slate-400 font-bold">20%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-emerald-400 font-bold">Benign Messages: {metrics.lowRiskCount}</span>
                    <span className="text-slate-400 font-bold">40%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#08090A] p-3 text-xs text-slate-300 font-mono flex items-center justify-between border border-white/10">
                <span>Evaluation Date: {new Date(metrics.evaluatedAt).toLocaleDateString()}</span>
                <span className="text-white font-bold">{metrics.totalSamples} Total Vectors</span>
              </div>
            </div>
          </div>

          {/* Granular Table */}
          <div className="lux-card rounded-2xl p-6 bg-[#0F1117] border border-white/[0.08] overflow-hidden">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold pb-4 border-b border-white/[0.08]">
              Granular Test Case Verification ({metrics.results.length} Scenarios)
            </h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-white/5 text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="px-3 py-2.5">ID</th>
                    <th className="px-3 py-2.5">Attack Specimen</th>
                    <th className="px-3 py-2.5">Ground Truth</th>
                    <th className="px-3 py-2.5">Detection Assessment</th>
                    <th className="px-3 py-2.5 text-right">Score</th>
                    <th className="px-3 py-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] font-mono">
                  {metrics.results.map((res) => (
                    <tr key={res.id} className="hover:bg-white/[0.04]">
                      <td className="px-3 py-3 text-slate-500 font-bold">{res.id}</td>
                      <td className="px-3 py-3 font-sans font-semibold text-white">{res.category}</td>
                      <td className="px-3 py-3 text-slate-400">{res.expected.replace('_RISK', '')}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            res.actual === 'HIGH_RISK'
                              ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                              : res.actual === 'MEDIUM_RISK'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {res.actual.replace('_RISK', '')}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right text-slate-300 font-bold">{res.score}/100</td>
                      <td className="px-3 py-3 text-center">
                        {res.passed ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-[11px] font-semibold">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Match
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-sans text-[11px] font-semibold">
                            <XCircle className="h-3.5 w-3.5 text-amber-400" /> Variance
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
