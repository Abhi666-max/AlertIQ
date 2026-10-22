'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  ArrowRight,
  Link2,
  ChevronRight,
  Zap,
  Globe,
} from 'lucide-react';
import { LandingNavbar } from '@/components/LandingNavbar';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const threatVectors = [
    {
      title: 'Fake Bank & UPI Alerts',
      desc: 'Messages pretending to be your bank claiming your card is suspended, urging you to tap a fake login link.',
      badge: 'High Risk',
      color: 'text-red-400 bg-red-500/10 border-red-500/25',
    },
    {
      title: 'Delivery & Package Scams',
      desc: 'Fake USPS, FedEx, or courier texts claiming a package is delayed and asking you to pay a redelivery fee.',
      badge: 'SMS Vector',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    },
    {
      title: 'Fake Bills & Auto-Renewals',
      desc: 'Fake Norton or subscription invoices claiming you were charged $400+ to panic you into calling.',
      badge: 'Email Vector',
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
    },
    {
      title: 'Password & OTP Stealers',
      desc: 'Deceptive login screens that steal your username, password, or one-time verification SMS code.',
      badge: 'Critical Threat',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
    },
    {
      title: 'Lottery & Prize Traps',
      desc: 'Fake notices saying you won money or prizes, but asking you to send an upfront fee to collect.',
      badge: 'Financial Trap',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
    },
    {
      title: 'Fake Police & Tax Warnings',
      desc: 'Scary messages pretending to be agencies or police threatening legal action for immediate payment.',
      badge: 'Fear Tactic',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/25',
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Instant Safety Rating',
      desc: 'Clear Red, Yellow, or Green indicator so you know in one glance if a message is safe, suspicious, or dangerous.',
      accent: '#7c3aed',
    },
    {
      icon: Link2,
      title: 'Safe Link Inspector',
      desc: 'Inspects web addresses without clicking them. Catches fake bank portals and copycat websites instantly.',
      accent: '#0891b2',
    },
    {
      icon: Eye,
      title: 'Highlighted Proof',
      desc: 'Highlights the exact urgency phrases, scare tactics, and credential lures scammers use to trick you.',
      accent: '#4f46e5',
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      desc: 'Your messages are checked volatilely in-memory and deleted immediately. Nothing is stored or logged.',
      accent: '#0d9488',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-white">

      {/* ── CSS Animated Background ── */}
      <div className="animated-bg" aria-hidden="true">
        <div className="absolute inset-0 star-field" />
        <div className="absolute inset-0 mesh-grid opacity-100" />
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      <LandingNavbar />

      <main className="flex-1">

        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section className="relative pt-28 pb-32 md:pt-40 md:pb-44 text-center">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-violet-500/8 backdrop-blur-xl px-5 py-2 text-xs font-semibold text-violet-300 mb-10"
              style={{ boxShadow: '0 0 20px rgba(124,58,237,0.12)' }}>
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

            <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
              Paste any suspicious SMS, email, or chat. AlertIQ instantly checks if it&apos;s safe
              or dangerous, flags hidden scam links, and shows you exactly what to do — in under 500ms.
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 backdrop-blur-md px-8 py-4 text-sm sm:text-base font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Explore Features
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-violet-400" />
                <span>Zero Server Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>SSRF-proof Link Inspector</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
                <span>Under 500ms Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-blue-400" />
                <span>Works on Any Device</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FEATURES
        ═══════════════════════════════════════════ */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-violet-400">
                Core Capabilities
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Everything You Need to{' '}
                <span className="aurora-text">Spot Scams</span>
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Modern social engineering is sophisticated. AlertIQ gives you clarity in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="glass-card p-7 group">
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300 shrink-0"
                      style={{
                        background: `${feat.accent}18`,
                        border: `1px solid ${feat.accent}30`,
                        boxShadow: `0 0 16px ${feat.accent}18`,
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

        {/* ═══════════════════════════════════════════
            HOW IT WORKS
        ═══════════════════════════════════════════ */}
        <section id="how-it-works" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-cyan-400">
                Operating Protocol
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-3">
                How AlertIQ{' '}
                <span className="aurora-text">Works</span>
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                A 3-step security check in under 500 milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { step: '01', color: '#7c3aed', title: 'Paste Any Message', desc: 'Copy and paste any suspicious SMS, email, or chat message into the scanner.', tag: 'SMS • Email • WhatsApp' },
                { step: '02', color: '#0891b2', title: 'Instant Smart Check', desc: 'Our neural engine evaluates fake websites, urgency patterns, and brand impersonation.', tag: 'Under 500ms • Safe Inspection' },
                { step: '03', color: '#0d9488', title: 'Get Clear Advice', desc: 'See the safety score, highlighted red flags, and exact advice on whether to delete or block.', tag: 'Verified Proof • Clear Advice' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-7 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: item.color }}>
                      Step {item.step}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white mt-2">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 font-mono text-[11px]" style={{ borderTop: `1px solid ${item.color}22`, color: item.color }}>
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            THREAT TAXONOMY
        ═══════════════════════════════════════════ */}
        <section id="taxonomy" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-violet-400">
                Threat Classification
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Common Scams{' '}
                <span className="aurora-text">AlertIQ Catches</span>
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Dissecting modern fraud attempts across SMS, messaging apps, and email.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {threatVectors.map((tv, idx) => (
                <div key={idx} className="glass-card p-6 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${tv.color}`}>
                        {tv.badge}
                      </span>
                      <span className="text-slate-700 font-mono text-xs">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-white mt-1">
                      {tv.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {tv.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 flex items-center text-xs font-semibold text-violet-400"
                    style={{ borderTop: '1px solid rgba(124,58,237,0.12)' }}>
                    <Link href="/scan" className="hover:text-violet-300 flex items-center gap-1 transition-colors">
                      Check a message <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
