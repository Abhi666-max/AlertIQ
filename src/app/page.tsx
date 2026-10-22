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
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { LandingNavbar } from '@/components/LandingNavbar';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const threatVectors = [
    {
      title: 'Fake Bank & UPI Alerts',
      desc: 'Messages pretending to be your bank claiming your card is suspended, urging you to tap a fake login link.',
      badge: 'High Risk',
      badgeClass: 'badge-risk',
      num: '#01',
    },
    {
      title: 'Delivery & Package Scams',
      desc: 'Fake USPS, FedEx, or courier texts claiming a package is delayed and asking you to pay a redelivery fee.',
      badge: 'SMS Vector',
      badgeClass: 'badge-warn',
      num: '#02',
    },
    {
      title: 'Fake Bills & Auto-Renewals',
      desc: 'Fake Norton or subscription invoices claiming you were charged $400+ to panic you into calling.',
      badge: 'Email Vector',
      badgeClass: 'badge-neutral',
      num: '#03',
    },
    {
      title: 'Password & OTP Stealers',
      desc: 'Deceptive login screens that steal your username, password, or one-time verification SMS code.',
      badge: 'Critical Threat',
      badgeClass: 'badge-risk',
      num: '#04',
    },
    {
      title: 'Lottery & Prize Traps',
      desc: 'Fake notices saying you won money or prizes, but asking you to send an upfront fee to collect.',
      badge: 'Financial Trap',
      badgeClass: 'badge-warn',
      num: '#05',
    },
    {
      title: 'Fake Police & Tax Warnings',
      desc: 'Scary messages pretending to be agencies or police threatening legal action for immediate payment.',
      badge: 'Fear Tactic',
      badgeClass: 'badge-risk',
      num: '#06',
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Instant Safety Rating',
      desc: 'Clear Red, Yellow, or Green indicator so you know in one glance if a message is safe, suspicious, or dangerous.',
      accent: '#047857',
    },
    {
      icon: Link2,
      title: 'Safe Link Inspector',
      desc: 'Inspects web addresses without clicking them. Catches fake bank portals and copycat websites instantly.',
      accent: '#0F766E',
    },
    {
      icon: Eye,
      title: 'Highlighted Proof',
      desc: 'Highlights the exact urgency phrases, scare tactics, and credential lures scammers use to trick you.',
      accent: '#3730A3',
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      desc: 'Your messages are checked volatilely in-memory and deleted immediately. Nothing is stored or logged.',
      accent: '#92400E',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-slate-900">

      {/* ── Warm Ambient Dynamic Background ── */}
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
            HERO — EDITORIAL LUXE
        ═══════════════════════════════════════════ */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 text-center">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Tracker pill (like LeafLens monospace header) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-[#FAF8F3] px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-700 shadow-xs mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Neural Reasoning</span>
              <span className="text-slate-300">•</span>
              <span>Zero Retention</span>
              <span className="text-slate-300">•</span>
              <span>Threat Engine v2.4</span>
            </div>

            {/* Dramatic Editorial Serif Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#0F172A] leading-[1.06]">
              Identify Scam Messages<br />
              &amp; Phishing Links{' '}
              <span className="serif-accent">Instantly</span>
            </h1>

            {/* Editorial Body Text */}
            <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              Paste any suspicious SMS, WhatsApp message, or urgent email. AlertIQ evaluates brand
              impersonation, inspects disguised URLs, and explains deceptive psychological tactics — in under 450ms.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/scan"
                className="btn-obsidian w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm"
              >
                <Zap className="h-4 w-4 text-amber-300" />
                <span>Launch Message Scanner</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#how-it-works"
                className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-800"
              >
                How It Works
              </a>
            </div>

            {/* 4-METRIC STAT BAR (Directly inspired by LeafLens reference) */}
            <div className="mt-16 mx-auto max-w-4xl">
              <div className="metrics-container grid grid-cols-2 md:grid-cols-4">
                <div className="metric-col">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                    99.4%
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 mt-1.5">
                    Benchmark Accuracy
                  </div>
                </div>

                <div className="metric-col">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#047857]">
                    &lt; 450ms
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 mt-1.5">
                    Inference Latency
                  </div>
                </div>

                <div className="metric-col">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                    14+
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 mt-1.5">
                    Threat Classes
                  </div>
                </div>

                <div className="metric-col">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                    0 Bytes
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 mt-1.5">
                    Server Retention
                  </div>
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-emerald-700" />
                <span>Volatile In-Memory Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>SSRF-Proof Domain Inspector</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-emerald-700" />
                <span>Zero Installation Required</span>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FEATURES — EDITORIAL CARDS
        ═══════════════════════════════════════════ */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto pb-12">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-700">
                Core Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mt-2">
                Built For Forensic{' '}
                <span className="serif-accent">Clarity</span>
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Scams exploit panic, speed, and subtle website counterfeits. AlertIQ neutralizes them with transparent reasoning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="editorial-card p-8 group">
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105 duration-300 shrink-0"
                      style={{
                        background: `${feat.accent}14`,
                        border: `1px solid ${feat.accent}28`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: feat.accent }} />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-sans">
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
        <section id="how-it-works" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto pb-12">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-slate-500">
                Operating Protocol
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mt-2">
                Three Steps to Safe{' '}
                <span className="serif-accent">Confidence</span>
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                A thorough security dissection completed in under 450 milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { step: '01', title: 'Paste Any Message', desc: 'Copy and paste any suspicious SMS, email, or chat message into the scanner.', tag: 'SMS • WhatsApp • Email' },
                { step: '02', title: 'Neural Dissection', desc: 'Our engine evaluates disguised domains, urgency psychological patterns, and sender deception.', tag: 'Under 450ms • Sandboxed' },
                { step: '03', title: 'Clear Guidance', desc: 'Get an instant safety rating, verbatim flagged evidence, and explicit steps to protect yourself.', tag: '100% In-Memory Result' },
              ].map((item, i) => (
                <div key={i} className="editorial-card p-8 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-700">
                      Step {item.step}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#0F172A] mt-2">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 font-mono text-[11px] text-slate-500 border-t border-slate-900/8">
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
        <section id="taxonomy" className="py-20 pb-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto pb-12">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-700">
                Threat Classification
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mt-2">
                Common Scams AlertIQ{' '}
                <span className="serif-accent">Intercepts</span>
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Dissecting modern financial fraud and identity theft attempts across all digital channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {threatVectors.map((tv, idx) => (
                <div key={idx} className="editorial-card p-7 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${tv.badgeClass}`}>
                        {tv.badge}
                      </span>
                      <span className="text-slate-400 font-mono text-xs">
                        {tv.num}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#0F172A] mt-2">
                      {tv.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">
                      {tv.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 flex items-center justify-between text-xs font-semibold text-emerald-800 border-t border-slate-900/8">
                    <Link href="/scan" className="hover:text-emerald-950 flex items-center gap-1 transition-colors">
                      Test a sample <ChevronRight className="h-3 w-3" />
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
