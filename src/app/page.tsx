'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  ArrowRight,
  Link2,
  ChevronRight,
  Zap,
  Cpu,
  Globe,
} from 'lucide-react';
import { LandingNavbar } from '@/components/LandingNavbar';
import { Footer } from '@/components/Footer';
import { SplineBackground } from '@/components/SplineBackground';

export default function LandingPage() {
  const threatVectors = [
    {
      title: 'Fake Bank & UPI Alerts',
      desc: 'Messages pretending to be your bank claiming your card is suspended, urging you to tap a fake login link.',
      badge: 'High Risk',
      color: 'text-red-400 bg-red-500/10 border-red-500/25',
      glow: 'rgba(239,68,68,0.12)',
    },
    {
      title: 'Delivery & Package Scams',
      desc: 'Fake USPS, FedEx, or courier texts claiming a package is delayed and asking you to pay a redelivery fee.',
      badge: 'SMS Vector',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
      glow: 'rgba(245,158,11,0.12)',
    },
    {
      title: 'Fake Bills & Auto-Renewals',
      desc: 'Fake Norton or subscription invoices claiming you were charged $400+ to panic you into calling.',
      badge: 'Email Vector',
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
      glow: 'rgba(139,92,246,0.12)',
    },
    {
      title: 'Password & OTP Stealers',
      desc: 'Deceptive login screens that steal your username, password, or one-time verification SMS code.',
      badge: 'Critical Threat',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
      glow: 'rgba(244,63,94,0.12)',
    },
    {
      title: 'Lottery & Prize Traps',
      desc: 'Fake notices saying you won money or prizes, but asking you to send an upfront fee to collect.',
      badge: 'Financial Trap',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
      glow: 'rgba(59,130,246,0.12)',
    },
    {
      title: 'Fake Police & Tax Warnings',
      desc: 'Scary messages pretending to be tax agencies or police threatening legal action for immediate payment.',
      badge: 'Fear Tactic',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/25',
      glow: 'rgba(249,115,22,0.12)',
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Instant Safety Rating',
      desc: 'Clear Red, Yellow, or Green indicator so you know in one glance if a message is safe, suspicious, or dangerous.',
      accent: '#7c3aed',
      glow: 'rgba(124,58,237,0.15)',
    },
    {
      icon: Link2,
      title: 'Safe Link Inspector',
      desc: 'Inspects web addresses without clicking them. Catches fake bank portals and copycat websites instantly.',
      accent: '#0891b2',
      glow: 'rgba(8,145,178,0.15)',
    },
    {
      icon: Eye,
      title: 'Highlighted Proof',
      desc: 'Highlights the exact urgency phrases, scare tactics, and credential lures scammers use to trick you.',
      accent: '#4f46e5',
      glow: 'rgba(79,70,229,0.15)',
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      desc: 'Your messages are checked volatilely in-memory and deleted immediately. We never store, log, or sell anything.',
      accent: '#0d9488',
      glow: 'rgba(13,148,136,0.15)',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-white" style={{ background: '#020408' }}>
      {/* ── 3D Live Background ── */}
      <SplineBackground />

      {/* ── Subtle mesh grid overlay ── */}
      <div className="pointer-events-none fixed inset-0 -z-[5] perspective-grid opacity-60" />

      <LandingNavbar />

      <main className="flex-1">
        {/* ════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════ */}
        <section className="relative pt-24 pb-32 md:pt-36 md:pb-44 text-center">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-violet-500/8 backdrop-blur-xl px-5 py-2 text-xs font-semibold text-violet-300 mb-10 shadow-[0_0_24px_rgba(124,58,237,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              <span>Smart Scam & Phishing Detector</span>
              <span className="text-white/20">•</span>
              <span className="text-white font-medium">100% Free & Private</span>
            </div>

            {/* Headline */}
            <h1
              className="font-['Plus_Jakarta_Sans',sans-serif] text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.05]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Know Instantly If A<br />
              Message Is A{' '}
              <span className="aurora-text">Scam.</span>
            </h1>

            {/* Sub */}
            <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
              Paste any suspicious SMS, email, or chat. AlertIQ instantly checks if it&apos;s safe or dangerous, flags hidden scam links, and shows you exactly what to do — in under 500ms.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/scan"
                className="btn-aurora w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl px-9 py-4 text-sm sm:text-base font-bold text-white"
              >
                <Zap className="h-4 w-4 text-amber-300" />
                <span>Launch Threat Scanner</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 backdrop-blur-md px-8 py-4 text-sm sm:text-base font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                <span>Explore Features</span>
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-violet-400" />
                <span>Zero Server Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>SSRF-proof Link Inspector</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>Under 500ms Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>Works on Any Device</span>
              </div>
            </div>
          </div>

          {/* Hero glow disc */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full blur-[120px] -z-10 aurora-pulse"
            style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(79,70,229,0.08) 60%, transparent 100%)' }}
          />
        </section>

        {/* ════════════════════════════════════════════════════
            FEATURES — 4 GLASS CARDS
        ════════════════════════════════════════════════════ */}
        <section id="features" className="py-24 relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-violet-400">
                Core Capabilities
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Everything You Need to{' '}
                <span className="aurora-text">Spot Scams</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3">
                Modern social engineering is sophisticated. AlertIQ gives you clarity in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="glass-card rounded-3xl p-7 group"
                    style={{ '--card-glow': feat.glow } as React.CSSProperties}
                  >
                    {/* Icon orb */}
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${feat.accent}22, ${feat.accent}11)`,
                        border: `1px solid ${feat.accent}33`,
                        boxShadow: `0 0 20px ${feat.accent}20`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: feat.accent }} />
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            HOW IT WORKS — 3 STEPS
        ════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="py-24 relative">
          {/* Section glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.10) 0%, transparent 70%)' }} />
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
                Operating Protocol
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-3">
                How AlertIQ{' '}
                <span className="aurora-text">Intercepts Threats</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3">
                A simple 3-step security check executing in under 500 milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  step: '01',
                  color: 'text-violet-400',
                  title: 'Paste Any Message',
                  desc: 'Copy and paste any suspicious SMS, email, or chat message into the scanner.',
                  tag: 'SMS • Email • WhatsApp',
                  accent: '#7c3aed',
                },
                {
                  step: '02',
                  color: 'text-cyan-400',
                  title: 'Instant Smart Check',
                  desc: 'Our neural engine evaluates fake websites, urgency words, and brand impersonation patterns.',
                  tag: 'Under 500ms • Safe Inspection',
                  accent: '#0891b2',
                },
                {
                  step: '03',
                  color: 'text-emerald-400',
                  title: 'Get Clear Action Steps',
                  desc: 'See the safety score, highlighted red flags, and exact advice on whether to delete or block.',
                  tag: 'Verified Proof • Clear Advice',
                  accent: '#0d9488',
                },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-3xl p-7 flex flex-col justify-between">
                  <div>
                    <span className={`font-mono text-xs font-bold uppercase tracking-widest ${item.color}`}>
                      Step {item.step}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white mt-2">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="mt-6 pt-4 border-t font-mono text-[11px]"
                    style={{ borderColor: `${item.accent}25`, color: item.accent }}
                  >
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            THREAT TAXONOMY — 6 CARDS
        ════════════════════════════════════════════════════ */}
        <section id="taxonomy" className="py-24 relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-violet-400">
                Threat Classification
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Common Scams{' '}
                <span className="aurora-text">AlertIQ Catches</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3">
                Dissecting modern fraud attempts across SMS, messaging apps, and email bodies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {threatVectors.map((tv, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${tv.color}`}>
                        {tv.badge}
                      </span>
                      <span className="text-slate-600 font-mono text-xs">#{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-white mt-2">
                      {tv.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {tv.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs font-semibold text-violet-400">
                    <Link href="/scan" className="hover:text-violet-300 flex items-center gap-1 transition-colors group-hover:translate-x-0.5 duration-200">
                      Check a message <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            FINAL CTA
        ════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 relative">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div
              className="glass-card rounded-[2rem] p-10 sm:p-16 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(10,15,35,0.90) 40%, rgba(37,99,235,0.10) 100%)',
                border: '1px solid rgba(124,58,237,0.30)',
                boxShadow: '0 0 80px rgba(124,58,237,0.12), 0 24px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* BG shimmer */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full blur-[80px]" style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.20) 0%, transparent 70%)' }} />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-block rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300 backdrop-blur-sm mb-6">
                  Instant Web App Access • 100% Free
                </span>

                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Check Any Suspicious Message{' '}
                  <span className="aurora-text">in Seconds.</span>
                </h2>

                <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
                  No account setup, credit card, or browser extension needed. Paste your text, inspect evidence, and stay completely safe.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/scan"
                    className="btn-aurora w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl px-9 py-4 text-sm sm:text-base font-bold text-white"
                  >
                    <Zap className="h-4 w-4 text-amber-300" />
                    <span>Launch Free Scanner Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap justify-center gap-6 text-xs text-slate-500 font-medium">
                  <span>✓ No login required</span>
                  <span>✓ No data stored</span>
                  <span>✓ Works on any device</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer setActiveTab={() => {}} />
    </div>
  );
}
