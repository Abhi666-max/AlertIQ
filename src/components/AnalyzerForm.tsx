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
      <div className="glass-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2.5">
              <ShieldAlert className="h-5 w-5 text-blue-600" />
              Check Any Suspicious Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
              Paste any SMS, WhatsApp text, or email to verify its threat profile instantly.
            </p>
          </div>

          {/* Channel selector segmented control */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs">
            <button
              type="button"
              onClick={() => setChannel('auto')}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'auto' ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Auto
            </button>
            <button
              type="button"
              onClick={() => setChannel('sms')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'sms' ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" /> SMS
            </button>
            <button
              type="button"
              onClick={() => setChannel('email')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'email' ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
            <button
              type="button"
              onClick={() => setChannel('chat')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
                channel === 'chat' ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' : 'text-slate-600 hover:text-slate-900'
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 font-mono transition-all resize-y disabled:opacity-60 shadow-inner"
            />

            {/* Character counter & quick clear */}
            <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className={charCount > maxChars ? 'text-red-600 font-bold' : ''}>
                  {charCount} / {maxChars} characters
                </span>
                {charCount < 5 && charCount > 0 && (
                  <span className="text-amber-600 text-[11px] font-semibold">(minimum 5 characters required)</span>
                )}
              </div>

              {message && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors font-semibold"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear input</span>
                </button>
              )}
            </div>
          </div>

          {/* Validation Error banner */}
          {errorMessage && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Specimen Presets Gallery */}
          <div className="mt-6 rounded-2xl p-4 bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Try Real-World Examples:</span>
              </span>

              <div className="flex items-center gap-1 text-[11px]">
                {['all', 'phishing', 'delivery', 'lottery', 'legitimate'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedPresetCategory(cat)}
                    className={`rounded-md px-2.5 py-0.5 capitalize font-medium transition-all ${
                      selectedPresetCategory === cat
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
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
                  className="text-left rounded-xl p-3 transition-all text-xs bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 truncate group-hover:text-blue-700 transition-colors">{sample.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase font-bold ${
                        sample.expectedRisk === 'HIGH_RISK'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : sample.expectedRisk === 'MEDIUM_RISK'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {sample.expectedRisk.replace('_RISK', '')}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">{sample.preview}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-500 text-center sm:text-left font-medium">
              🔒 <strong className="text-slate-700">100% Private:</strong> Checked in memory and deleted immediately. Nothing saved.
            </p>

            <button
              type="submit"
              disabled={isLoading || charCount < 5 || charCount > maxChars}
              className="btn-aurora w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
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
