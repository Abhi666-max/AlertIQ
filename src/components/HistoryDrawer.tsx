'use client';

import React from 'react';
import { X, Clock, Trash2, ArrowRight } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onClearHistory: () => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onClearHistory,
}: HistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] border-l border-slate-900/10 p-6 flex flex-col shadow-2xl text-slate-900">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-900/8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-800" />
              <h2 className="font-display text-lg font-bold text-[#0F172A]">Session Vault</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-900/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-600 font-sans">
            Stored locally in your browser session. You retain absolute control to view or purge this history at any time.
          </p>

          {/* List of items */}
          <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-xs text-slate-500">
                <Clock className="h-8 w-8 mb-2 opacity-30 text-slate-400" />
                <p>No messages analyzed in this session yet.</p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectResult(item);
                    onClose();
                  }}
                  className="group cursor-pointer rounded-xl border border-slate-900/8 bg-[#F2ECE0] p-3.5 hover:border-slate-900/20 hover:bg-[#EFECE4] transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.classification === 'HIGH_RISK'
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : item.classification === 'MEDIUM_RISK'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}
                    >
                      {item.classification.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-700 font-mono line-clamp-2">
                    {item.originalMessage}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-600 group-hover:text-slate-900 font-semibold">
                    <span>Threat Index: {item.riskScore}/100</span>
                    <span className="flex items-center gap-1 text-emerald-800">
                      Inspect <ArrowRight className="h-3 w-3 text-emerald-800" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer controls */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-slate-900/8 flex items-center justify-between">
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 transition-colors font-semibold"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Purge Session History</span>
              </button>
              <span className="text-[11px] font-mono text-slate-500">{history.length} scans</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
