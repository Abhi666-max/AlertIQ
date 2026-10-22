'use client';

import React, { useState } from 'react';
import { Send, Trash2, ShieldAlert, Sparkles, MessageSquare, Mail, MessageCircle, AlertCircle, RefreshCw, Zap } from 'lucide-react';
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
      <div className="lux-card rounded-2xl p-6 sm:p-8 bg-[#0F1117] border border-white/[0.08] shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-indigo-400" />
              Check Any Suspicious Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Paste any SMS text, email, or chat message to check if it&apos;s safe or a scam.
            </p>
          </div>

          {/* Channel selector segmented control */}
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
            <button
              type="button"
              onClick={() => setChannel('auto')}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'auto' ? 'bg-white/15 text-white shadow-xs border border-white/15' : 'text-slate-400 hover:text-white'
              }`}
            >
              Auto
            </button>
            <button
              type="button"
              onClick={() => setChannel('sms')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'sms' ? 'bg-white/15 text-white shadow-xs border border-white/15' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" /> SMS
            </button>
            <button
              type="button"
              onClick={() => setChannel('email')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'email' ? 'bg-white/15 text-white shadow-xs border border-white/15' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
            <button
              type="button"
              onClick={() => setChannel('chat')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'chat' ? 'bg-white/15 text-white shadow-xs border border-white/15' : 'text-slate-400 hover:text-white'
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
              className="w-full rounded-xl border border-white/10 bg-[#08090A] p-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono transition-all resize-y disabled:opacity-60 shadow-inner"
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
                  className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors font-medium"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear input</span>
                </button>
              )}
            </div>
          </div>

          {/* Validation Error banner */}
          {errorMessage && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Specimen Presets Gallery */}
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#12141D]/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>Try Real-World Examples:</span>
              </span>

              <div className="flex items-center gap-1 text-[11px]">
                {['all', 'phishing', 'delivery', 'lottery', 'legitimate'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedPresetCategory(cat)}
                    className={`rounded-md px-2 py-0.5 capitalize font-medium transition-colors ${
                      selectedPresetCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredSamples.slice(0, 6).map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setMessage(sample.fullText);
                    if (sample.channel) setChannel(sample.channel);
                  }}
                  className="text-left rounded-xl border border-white/[0.08] bg-[#0F1117] p-3 hover:border-indigo-500/40 hover:bg-[#161824] transition-all text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate">{sample.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase font-bold ${
                        sample.expectedRisk === 'HIGH_RISK'
                          ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                          : sample.expectedRisk === 'MEDIUM_RISK'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
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
            <p className="text-[11px] text-slate-400 text-center sm:text-left">
              🔒 <strong className="text-slate-300">100% Private:</strong> Checked in memory and deleted immediately. Nothing saved.
            </p>

            <button
              type="submit"
              disabled={isLoading || charCount < 5 || charCount > maxChars}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#08090A] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Checking Message Safety...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-amber-300" />
                  <span>Check Message Safety</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
