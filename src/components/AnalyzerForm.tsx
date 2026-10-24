'use client';

import React, { useState } from 'react';
import {
  Trash2,
  ShieldCheck,
  MessageSquare,
  Mail,
  MessageCircle,
  AlertCircle,
  RefreshCw,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';

interface AnalyzerFormProps {
  message: string;
  setMessage: (msg: string) => void;
  onAnalyze: (msg: string, channel: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const SPECIMENS: Record<string, { label: string; text: string }> = {
  sms: {
    label: 'SMS Sample',
    text: 'URGENT: Your Chase banking debit card has been temporarily locked due to suspicious activity. Visit https://chase-card-restore-online.top immediately to verify identity or account will be permanently closed.',
  },
  email: {
    label: 'Email Sample',
    text: 'From: support@service-paypal-account.info\nSubject: URGENT: Unauthorized login detected from Moscow\n\nDear Customer, We have detected suspicious activity. Your account access has been restricted. Click here to confirm your credentials: http://paypal-resolution-center-auth.xyz/verify?id=99281',
  },
  chat: {
    label: 'Chat Sample',
    text: 'Hey! I noticed you are in the crypto trading group. My firm offers an automated AI bot with guaranteed 250% weekly returns. Send a minimum of $200 in USDT to our smart contract address to activate your VIP wallet now: 0x71C...39F',
  },
};

const CHANNEL_CONFIG = {
  auto: {
    placeholder: 'Paste any suspicious message here — SMS alert, phishing email, WhatsApp text, or direct message...',
    label: 'All Channels',
  },
  sms: {
    placeholder: 'Paste incoming SMS text (e.g. Fake bank alert, package redelivery fee, OTP verification)...',
    label: 'SMS Smishing',
  },
  email: {
    placeholder: 'Paste suspicious email body or subject (e.g. Fake subscription invoice, password reset lure)...',
    label: 'Email Phishing',
  },
  chat: {
    placeholder: 'Paste WhatsApp, Telegram, or chat message (e.g. Fake crypto investment, urgent job offer)...',
    label: 'Chat Scam',
  },
};

export function AnalyzerForm({
  message,
  setMessage,
  onAnalyze,
  isLoading,
  errorMessage,
}: AnalyzerFormProps) {
  const [channel, setChannel] = useState<'auto' | 'sms' | 'email' | 'chat'>('auto');

  const charCount = message.length;
  const maxChars = 4000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || charCount < 5 || isLoading) return;
    onAnalyze(message.trim(), channel);
  };

  const handleClear = () => setMessage('');

  const currentConfig = CHANNEL_CONFIG[channel];

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-display text-lg font-bold text-[#090A0F]">
              Message Scanner
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste suspicious text to detect scams & fake links
            </p>
          </div>

          {/* Channel selector */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs shrink-0">
            {([  
              { key: 'auto',  label: 'Auto',  icon: Layers },
              { key: 'sms',   label: 'SMS',   icon: MessageSquare },
              { key: 'email', label: 'Email', icon: Mail },
              { key: 'chat',  label: 'Chat',  icon: MessageCircle },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setChannel(key)}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                  channel === key
                    ? 'bg-white text-[#DC2626] shadow-xs font-bold border border-slate-200'
                    : 'text-slate-600 hover:text-[#090A0F]'
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Specimen Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-[#DC2626]" />
            Test Samples:
          </span>
          {Object.entries(SPECIMENS).map(([key, spec]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setChannel(key as 'sms' | 'email' | 'chat');
                setMessage(spec.text);
              }}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-[#090A0F] transition-colors"
            >
              {spec.label}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="mt-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={currentConfig.placeholder}
            rows={9}
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-200 bg-[#FAFAFA] p-3.5 text-sm text-[#090A0F] placeholder-slate-400 focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 font-mono transition-all resize-none disabled:opacity-60 leading-relaxed"
          />

          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className={charCount > maxChars ? 'text-red-600 font-bold' : ''}>
                {charCount}/{maxChars}
              </span>
              {charCount < 5 && charCount > 0 && (
                <span className="text-amber-600 font-medium">(min 5 characters)</span>
              )}
            </div>
            {message && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-slate-400 hover:text-red-600 transition-colors font-medium"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Footer / Submit */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Lock className="h-3.5 w-3.5 text-slate-400" />
          <span>Processed in volatile memory &bull; Zero data stored</span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || charCount < 5 || charCount > maxChars}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold tracking-wide uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-white" />
              <span>Analyzing Message...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Analyze Message</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
