'use client';

import React, { useState } from 'react';
import { Send, Trash2, ShieldAlert, Sparkles, MessageSquare, Mail, MessageCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { SAMPLE_MESSAGES } from '@/lib/sampleMessages';

interface AnalyzerFormProps {
  message: string;
  setMessage: (msg: string) => void;
  onAnalyze: (msg: string, channel: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

export function AnalyzerForm({
  message,
  setMessage,
  onAnalyze,
  isLoading,
  errorMessage,
}: AnalyzerFormProps) {
  const [channel, setChannel] = useState<'auto' | 'sms' | 'email' | 'chat'>('auto');
  const [selectedPresetCategory, setSelectedPresetCategory] = useState<string>('all');

  const charCount = message.length;
  const maxChars = 4000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || charCount < 5 || isLoading) return;
    onAnalyze(message.trim(), channel);
  };

  const handleClear = () => {
    setMessage('');
  };

  const filteredSamples = selectedPresetCategory === 'all'
    ? SAMPLE_MESSAGES
    : SAMPLE_MESSAGES.filter((s) => s.category === selectedPresetCategory);

  return (
    <div id="analyzer-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="surface-card rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow corner accent */}
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-cyan-400" />
              Message Risk Analyzer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Paste suspicious SMS text, phishing email headers/body, or chat messages for inspection.
            </p>
          </div>

          {/* Channel selector */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#090d16] p-1 text-xs">
            <button
              type="button"
              onClick={() => setChannel('auto')}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                channel === 'auto' ? 'bg-cyan-500 text-slate-950 font-semibold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Auto
            </button>
            <button
              type="button"
              onClick={() => setChannel('sms')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition-all ${
                channel === 'sms' ? 'bg-cyan-500 text-slate-950 font-semibold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" /> SMS
            </button>
            <button
              type="button"
              onClick={() => setChannel('email')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition-all ${
                channel === 'email' ? 'bg-cyan-500 text-slate-950 font-semibold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
            <button
              type="button"
              onClick={() => setChannel('chat')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition-all ${
                channel === 'chat' ? 'bg-cyan-500 text-slate-950 font-semibold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageCircle className="h-3.5 w-3.5" /> Chat
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste suspicious message text here... (e.g., 'URGENT: Your Chase account is locked. Click http://chase-update.xyz/login to verify your identity within 24 hours.')"
              rows={6}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-700/80 bg-[#090d16] p-4 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all resize-y disabled:opacity-60"
            />

            {/* Character counter & quick clear */}
            <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className={charCount > maxChars ? 'text-red-400 font-bold' : ''}>
                  {charCount} / {maxChars} characters
                </span>
                {charCount < 5 && charCount > 0 && (
                  <span className="text-amber-400 text-[11px]">(minimum 5 characters required)</span>
                )}
              </div>

              {message && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear text</span>
                </button>
              )}
            </div>
          </div>

          {/* Validation Error banner */}
          {errorMessage && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Preset Sample Gallery Toggle */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-[#0c121e]/60 p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Test with Pre-labeled Examples:</span>
              </span>

              <div className="flex items-center gap-1 text-[11px]">
                {['all', 'phishing', 'delivery', 'lottery', 'legitimate'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedPresetCategory(cat)}
                    className={`rounded px-2 py-0.5 capitalize transition-colors ${
                      selectedPresetCategory === cat
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredSamples.slice(0, 6).map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setMessage(sample.fullText);
                    if (sample.channel) setChannel(sample.channel);
                  }}
                  className="text-left rounded-lg border border-slate-800/80 bg-[#070b13] p-2.5 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 truncate">{sample.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase ${
                        sample.expectedRisk === 'HIGH_RISK'
                          ? 'bg-red-950/60 text-red-300 border border-red-800/40'
                          : sample.expectedRisk === 'MEDIUM_RISK'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {sample.expectedRisk.replace('_RISK', '')}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{sample.preview}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-500 text-center sm:text-left">
              🔒 <strong className="text-slate-400">Privacy Notice:</strong> Messages are processed strictly in-memory for risk evaluation and never stored on server storage.
            </p>

            <button
              type="submit"
              disabled={isLoading || charCount < 5 || charCount > maxChars}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                  <span>Evaluating Threat Vectors...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Analyze Message Risk</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
