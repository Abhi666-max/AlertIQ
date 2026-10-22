'use client';

import React from 'react';
import { X, Clock, Trash2, ArrowRight, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0f1b] border-l border-slate-800 p-6 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyan-400" />
              <h2 className="font-['Space_Grotesk'] text-lg font-bold text-white">Session Analysis History</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Stored locally in your browser memory/storage only. You have full privacy control to clear this anytime.
          </p>

          {/* List of items */}
          <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-xs text-slate-500">
                <Clock className="h-8 w-8 mb-2 opacity-40" />
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
                  className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0e1524] p-3.5 hover:border-cyan-500/50 hover:bg-[#121c30] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                        item.classification === 'HIGH_RISK'
                          ? 'bg-red-950/80 text-red-300 border border-red-800/40'
                          : item.classification === 'MEDIUM_RISK'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {item.classification.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-300 font-mono line-clamp-2">
                    {item.originalMessage}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-cyan-300">
                    <span>Risk Index: {item.riskScore}/100</span>
                    <span className="flex items-center gap-1 font-medium">
                      Inspect <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer controls */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Purge Session History</span>
              </button>
              <span className="text-xs text-slate-500">{history.length} saved</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
