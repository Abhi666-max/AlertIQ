'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  ArrowRight,
  Link2,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { LandingNavbar } from '@/components/LandingNavbar';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const threatVectors = [
    {
      title: 'Fake Bank & UPI Alerts',
      desc: 'Messages pretending to be your bank claiming your card or account is suspended, urging you to tap a fake login link.',
      badge: 'High Risk',
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
    },
    {
      title: 'Delivery & Package Scams',
      desc: 'Fake USPS, FedEx, or courier texts claiming a package is delayed and asking you to pay a small redelivery fee.',
      badge: 'SMS Vector',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Fake Bills & Auto-Renewals',
      desc: 'Fake Norton, Geek Squad, or subscription invoices claiming you were charged $400+ to panic you into calling.',
      badge: 'Email Vector',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Password & OTP Stealers',
      desc: 'Deceptive login screens that try to steal your username, password, or one-time verification SMS code.',
      badge: 'Critical Threat',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'Lottery & Prize Money Traps',
      desc: 'Fake notices saying you won money, crypto, or prizes, but asking you to send an upfront fee to collect it.',
      badge: 'Financial Trap',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Fake Police & Tax Warnings',
      desc: 'Scary messages pretending to be tax agencies or police threatening legal action unless you pay immediately.',
      badge: 'Fear Tactic',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#08090A] text-white">
      {/* Background Ambient Glow Orbs for Midnight Obsidian depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-indigo-600/15 blur-[140px] animate-float-1" />
        <div className="absolute top-[35%] -left-40 h-[500px] w-[600px] rounded-full bg-violet-600/10 blur-[130px] animate-float-2" />
        <div className="absolute top-[65%] -right-40 h-[550px] w-[650px] rounded-full bg-cyan-600/10 blur-[140px] animate-float-1" />
      </div>

      {/* Landing Navbar: Purely marketing & anchor links */}
      <LandingNavbar />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION (LEAN & PUNCHY)
        ========================================================================= */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-2xs mb-8 transition-all hover:bg-indigo-500/15">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Smart Scam &amp; Phishing Detector</span>
              <span className="text-white/20">•</span>
              <span className="text-white font-medium">100% Free &amp; Private</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Know Instantly If A Message <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Is A Scam or Legitimate.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
              Paste any suspicious SMS, email, or chat message. AlertIQ immediately checks if it&apos;s safe or dangerous, flags hidden scam links, and shows you what to do.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/scan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-[0.98]"
              >
                <span>Launch Threat Scanner</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm sm:text-base font-bold text-slate-300 shadow-xs hover:bg-white/10 hover:text-white transition-all"
              >
                <span>Explore Features</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-indigo-400" />
                <span>100% Private (Zero server retention)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Safe Link Inspector (SSRF-proof)</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>Instant Results (&lt;500ms)</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. CORE FEATURES (CLEAN 4 CARDS)
        ========================================================================= */}
        <section id="features" className="py-20 border-t border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                Core Capabilities
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Everything You Need to Spot Scams
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Modern social engineering is tricky. AlertIQ gives you clarity in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="lux-card rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white">
                  1. Instant Safety Rating
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Clear Red, Yellow, or Green indicator so you know in one glance whether a message is safe, suspicious, or dangerous.
                </p>
              </div>

              <div className="lux-card rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Link2 className="h-5 w-5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white">
                  2. Safe Link Inspector
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Inspects web addresses without clicking them. Catches fake bank portals and copycat websites before they can infect your device.
                </p>
              </div>

              <div className="lux-card rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white">
                  3. Highlighted Proof You Can See
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Highlights the exact urgency phrases, scare tactics, and credential lures scammers use to trick you into sending money.
                </p>
              </div>

              <div className="lux-card rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white">
                  4. Complete Personal Privacy
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Your messages are checked volatilely in-memory and deleted immediately. We never store, log, or sell your communications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. HOW IT WORKS (3 SIMPLE STEPS)
        ========================================================================= */}
        <section id="how-it-works" className="py-20 border-t border-white/[0.08] bg-[#0A0C10]/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                Operating Protocol
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-2">
                How AlertIQ Intercepts Threats
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                A simple 3-step security check executing in under 500 milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="lux-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-400 uppercase">
                    Step 01
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white mt-1">
                    Paste Any Message
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Copy and paste any suspicious text, SMS, email, or chat message into the scanner box.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.08] font-mono text-[11px] text-slate-500">
                  SMS • Email • WhatsApp
                </div>
              </div>

              <div className="lux-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase">
                    Step 02
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white mt-1">
                    Instant Smart Check
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Our neural reasoning engine evaluates fake websites, urgency words, and brand impersonation.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.08] font-mono text-[11px] text-slate-500">
                  Under 500ms • Safe Inspection
                </div>
              </div>

              <div className="lux-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
                    Step 03
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-white mt-1">
                    Get Clear Action Steps
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    See the safety score, highlighted red flags, and exact advice on whether to delete or block the sender.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.08] font-mono text-[11px] text-slate-500">
                  Verified Proof • Clear Advice
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. COMMON SCAMS DETECTED
        ========================================================================= */}
        <section id="taxonomy" className="py-20 border-t border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                Threat Classification
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Common Scams AlertIQ Catches
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Dissecting modern fraud attempts across SMS, messaging apps, and email bodies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {threatVectors.map((tv, idx) => (
                <div key={idx} className="lux-card rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${tv.color}`}>
                        {tv.badge}
                      </span>
                      <span className="text-slate-500 font-mono text-xs">#{idx + 1}</span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-white mt-1">
                      {tv.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed font-normal">
                      {tv.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-indigo-400">
                    <Link href="/scan" className="hover:underline flex items-center gap-1">
                      Check a message <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. FINAL HIGH-IMPACT LAUNCH CTA
        ========================================================================= */}
        <section className="py-20 md:py-24 border-t border-white/[0.08]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#11131F] to-[#0A0C14] p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
                  Instant Web App Access • 100% Free
                </span>

                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-4">
                  Check Any Suspicious Message in Seconds.
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  No account setup, credit card, or browser extension required. Paste your text, inspect verified evidence, and stay completely safe.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/scan"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-[0.98]"
                  >
                    <span>Launch Free Scanner Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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
