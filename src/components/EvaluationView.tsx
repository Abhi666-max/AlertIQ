'use client';

import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, XCircle, RefreshCw, BarChart3, ShieldCheck, Database, Award } from 'lucide-react';
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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-0.5 text-xs font-mono font-medium text-cyan-300 mb-2">
            <Award className="h-3.5 w-3.5 text-cyan-400" />
            <span>Academic Mini-Project Evaluation Standard</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-extrabold text-white">
            Model Evaluation & Faculty Benchmark
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Live statistical validation across a held-out, labeled test dataset of 20 realistic phishing, social engineering, and legitimate communication specimens.
          </p>
        </div>

        <button
          onClick={fetchMetrics}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Re-run Evaluation Suite</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <RefreshCw className="h-8 w-8 animate-spin text-cyan-400 mb-3" />
          <p className="text-sm font-mono">Executing benchmark test suite...</p>
        </div>
      ) : metrics ? (
        <div className="mt-8 space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="surface-card rounded-2xl p-5 border border-slate-800 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Exact Accuracy</span>
              <div className="mt-1 font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-cyan-400">
                {Math.round(metrics.accuracy * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Across 3-class ground truth</p>
            </div>

            <div className="surface-card rounded-2xl p-5 border border-slate-800 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Precision</span>
              <div className="mt-1 font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-teal-400">
                {Math.round(metrics.precision * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500">TP / (TP + FP)</p>
            </div>

            <div className="surface-card rounded-2xl p-5 border border-slate-800 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Recall / Sensitivity</span>
              <div className="mt-1 font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-indigo-400">
                {Math.round(metrics.recall * 100)}%
              </div>
              <p className="mt-1 text-[11px] text-slate-500">TP / (TP + FN)</p>
            </div>

            <div className="surface-card rounded-2xl p-5 border border-slate-800 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Harmonic F1-Score</span>
              <div className="mt-1 font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-emerald-400">
                {metrics.f1Score.toFixed(2)}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Balanced Threat Score</p>
            </div>
          </div>

          {/* Confusion Matrix & Dataset Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confusion Matrix Table */}
            <div className="surface-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-3 border-b border-slate-800">
                <BarChart3 className="h-4 w-4 text-cyan-400" />
                Binary Threat Confusion Matrix
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Positive = Threat (High / Medium Risk) | Negative = Benign (Low Apparent Risk)
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-center font-mono">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <span className="text-[11px] text-emerald-400 uppercase font-semibold">True Positives (TP)</span>
                  <div className="text-3xl font-bold text-white mt-1">
                    {metrics.confusionMatrix.truePositive}
                  </div>
                  <span className="text-[10px] text-slate-400">Threats correctly flagged</span>
                </div>

                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
                  <span className="text-[11px] text-red-400 uppercase font-semibold">False Positives (FP)</span>
                  <div className="text-3xl font-bold text-white mt-1">
                    {metrics.confusionMatrix.falsePositive}
                  </div>
                  <span className="text-[10px] text-slate-400">Benign flagged as threat</span>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                  <span className="text-[11px] text-amber-400 uppercase font-semibold">False Negatives (FN)</span>
                  <div className="text-3xl font-bold text-white mt-1">
                    {metrics.confusionMatrix.falseNegative}
                  </div>
                  <span className="text-[10px] text-slate-400">Threats missed</span>
                </div>

                <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                  <span className="text-[11px] text-cyan-400 uppercase font-semibold">True Negatives (TN)</span>
                  <div className="text-3xl font-bold text-white mt-1">
                    {metrics.confusionMatrix.trueNegative}
                  </div>
                  <span className="text-[10px] text-slate-400">Benign verified safe</span>
                </div>
              </div>
            </div>

            {/* Dataset Distribution */}
            <div className="surface-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-3 border-b border-slate-800">
                <Database className="h-4 w-4 text-cyan-400" />
                Held-Out Dataset Stratification
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Balanced distribution across 20 synthetic & realistic message vectors.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-red-400">High Risk Attacks: {metrics.highRiskCount}</span>
                    <span className="text-slate-400">40%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-amber-400">Medium Risk / Ambiguous: {metrics.mediumRiskCount}</span>
                    <span className="text-slate-400">20%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-emerald-400">Low Apparent Risk (Benign): {metrics.lowRiskCount}</span>
                    <span className="text-slate-400">40%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#090d16] p-3 text-xs text-slate-400 font-mono flex items-center justify-between">
                <span>Evaluation Date: {new Date(metrics.evaluatedAt).toLocaleDateString()}</span>
                <span className="text-cyan-400 font-semibold">{metrics.totalSamples} Total Samples</span>
              </div>
            </div>
          </div>

          {/* Itemized Benchmark Results Table */}
          <div className="surface-card rounded-2xl p-6 border border-slate-800 overflow-hidden">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-4 border-b border-slate-800">
              Granular Test Case Evaluations ({metrics.results.length} Scenarios)
            </h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#090d16] text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="px-3 py-2.5">ID</th>
                    <th className="px-3 py-2.5">Attack / Message Category</th>
                    <th className="px-3 py-2.5">Expected Label</th>
                    <th className="px-3 py-2.5">Engine Assessment</th>
                    <th className="px-3 py-2.5 text-right">Score</th>
                    <th className="px-3 py-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {metrics.results.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-900/40">
                      <td className="px-3 py-3 text-slate-500">{res.id}</td>
                      <td className="px-3 py-3 font-sans font-medium text-slate-200">{res.category}</td>
                      <td className="px-3 py-3 text-slate-400">{res.expected.replace('_RISK', '')}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] ${
                            res.actual === 'HIGH_RISK'
                              ? 'bg-red-950/80 text-red-300 border border-red-800/40'
                              : res.actual === 'MEDIUM_RISK'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                              : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                          }`}
                        >
                          {res.actual.replace('_RISK', '')}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right text-slate-300">{res.score}/100</td>
                      <td className="px-3 py-3 text-center">
                        {res.passed ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-[11px]">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Match
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-sans text-[11px]">
                            <XCircle className="h-3.5 w-3.5" /> Variance
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
