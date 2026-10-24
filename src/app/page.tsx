'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  ArrowRight,
  Link2,
  AlertTriangle,
  FileSearch,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { LandingNavbar } from '@/components/LandingNavbar';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const [metrics, setMetrics] = useState<{ accuracy: number; totalSamples: number } | null>(null);

  useEffect(() => {
    fetch('/api/evaluate')
      .then((r) => r.json())
      .then((data) => {
        setMetrics({
          accuracy: Math.round(data.accuracy <= 1 ? data.accuracy * 100 : data.accuracy),
          totalSamples: data.totalSamples,
        });
      })
      .catch(() => {});
  }, []);

  const features = [
    {
      icon: ShieldAlert,
      title: 'Instant Risk Rating',
      desc: 'Get an immediate High, Medium, or Low risk score so you know if a message is safe, suspicious, or dangerous.',
    },
    {
      icon: Link2,
      title: 'Safe Link Inspection',
      desc: 'Checks embedded links and website addresses without opening them. Uncovers lookalike bank portals and disguised URLs.',
    },
    {
      icon: Eye,
      title: 'Verbatim Evidence',
      desc: 'Highlights the exact phrases, fake deadlines, and urgency tactics in the message text so you see the proof.',
    },
    {
      icon: Lock,
      title: '100% Private',
      desc: 'Your messages are processed in temporary memory and deleted immediately. We never store, save, or train on your data.',
    },
  ];

  const commonThreats = [
    { title: 'Fake Bank & UPI Alerts', desc: 'Claims your account or card is blocked, urging you to click a fake login link.', tag: 'Financial' },
    { title: 'Delivery & Package Scams', desc: 'SMS claiming a package is delayed and asking for a small re-delivery payment.', tag: 'SMS' },
    { title: 'Subscription Invoices', desc: 'Bogus invoices designed to panic you into calling a scammer call center.', tag: 'Email' },
    { title: 'OTP & Password Theft', desc: 'Phishing pages designed to steal your one-time passwords and access credentials.', tag: 'Account' },
    { title: 'Crypto & Fake Job Offers', desc: 'WhatsApp or Telegram messages promising guaranteed high returns or easy daily money.', tag: 'Chat' },
    { title: 'Legal & Police Threats', desc: 'Intimidation messages threatening arrest or court fines unless you pay immediately.', tag: 'Urgency' },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-[#090A0F] bg-[#F8FAFC]">

      {/* Clean Ambient Background */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="absolute inset-0 mesh-grid opacity-70" />
      </div>

      <LandingNavbar />

      <main className="flex-1">

        {/* ═══════════════════════════════
            HERO SECTION
        ═══════════════════════════════ */}
        <section className="relative pt-10 pb-14 md:pt-14 md:pb-20 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-xs mb-5">
              <span className="h-2 w-2 rounded-full bg-[#DC2626] animate-pulse" />
              <span>Real-Time AI Threat Detection</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-normal">Zero Data Storage</span>
            </div>

            {/* Hero Heading */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#090A0F] leading-[1.08]">
              Check If A Message Is A Scam{' '}
              <span className="text-[#DC2626]">Before You Click.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              Paste any suspicious SMS, WhatsApp message, or email. AlertIQ checks for fake links,
              impersonation, and fraudulent tactics in seconds.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/scan"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold tracking-wide uppercase shadow-md transition-all"
              >
                <span>Scan A Message Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#how-it-works"
                className="btn-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all"
              >
                <span>How It Works</span>
              </a>
            </div>

            {/* 3 Value Pillars */}
            <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="grid grid-cols-3 gap-4 divide-x divide-slate-100 text-center">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#DC2626]">
                    &lt; 1.5s
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    Instant AI Threat Verdict
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#090A0F]">
                    Multi-Vector
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    SMS, Email, Chat & Links
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600">
                    Zero Logs
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    100% Private & Ephemeral
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════
            FEATURES SECTION
        ═══════════════════════════════ */}
        <section id="features" className="py-14 sm:py-18 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#090A0F]">
                Clear, Reliable Scam Protection
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Simple tools designed to protect you from tricky links and deceitful messages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="saas-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-4 bg-red-50 text-[#DC2626]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-base font-bold text-[#090A0F] mb-1.5">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            HOW IT WORKS
        ═══════════════════════════════ */}
        <section id="how-it-works" className="py-14 sm:py-18 relative bg-white border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#090A0F]">
                How AlertIQ Works
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Three quick steps from suspicious message to full safety report.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-[#DC2626] font-display mb-2">01</div>
                <h3 className="text-base font-bold text-[#090A0F] mb-2">Paste The Message</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Copy any suspicious text from SMS, email, WhatsApp, or chat and paste it into the scanner.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-[#DC2626] font-display mb-2">02</div>
                <h3 className="text-base font-bold text-[#090A0F] mb-2">AI Inspects The Details</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The engine evaluates impersonation tactics, urgency traps, and inspects web links safely without clicking them.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-[#DC2626] font-display mb-2">03</div>
                <h3 className="text-base font-bold text-[#090A0F] mb-2">Get Your Clear Report</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  See a straightforward risk score, highlighted warning phrases, domain reputation, and recommended actions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            COMMON SCAMS COVERAGE
        ═══════════════════════════════ */}
        <section id="threats" className="py-14 sm:py-18 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#090A0F]">
                Common Scam Messages We Detect
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                AlertIQ is trained on real-world deceptive formats seen every day.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {commonThreats.map((t, idx) => (
                <div key={idx} className="saas-card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#090A0F]">{t.title}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            PRIVACY PROMISE
        ═══════════════════════════════ */}
        <section id="privacy" className="py-14 sm:py-18 relative bg-white border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-12 w-12 rounded-xl bg-red-50 text-[#DC2626] mx-auto flex items-center justify-center mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#090A0F]">
              Your Privacy Comes First
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              We never save your submitted messages to a database. The text is analyzed strictly in temporary memory and immediately discarded. No logs, no tracking, no history kept.
            </p>

            <div className="mt-8">
              <Link
                href="/scan"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold tracking-wide uppercase shadow-md transition-all"
              >
                <span>Try AlertIQ Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
