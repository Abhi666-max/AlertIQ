'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Lock,
  Eye,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Link2,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { LandingNavbar } from '@/components/LandingNavbar';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const threatVectors = [
    {
      title: 'Fake Bank & UPI Alerts',
      desc: 'Messages pretending to be your bank claiming your card or account is suspended, urging you to tap a fake login link.',
      badge: 'Very Common',
      color: 'text-red-700 bg-red-50 border-red-200',
    },
    {
      title: 'Delivery & Package Scams',
      desc: 'Fake USPS, FedEx, or courier texts claiming a package is delayed and asking you to pay a small redelivery fee.',
      badge: 'SMS Target',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      title: 'Fake Bills & Auto-Renewals',
      desc: 'Fake Norton, Geek Squad, or streaming bills claiming you were charged $400+ to panic you into calling their number.',
      badge: 'Email Vector',
      color: 'text-purple-700 bg-purple-50 border-purple-200',
    },
    {
      title: 'Password & OTP Stealers',
      desc: 'Deceptive login screens that try to steal your username, password, or one-time verification SMS code.',
      badge: 'Critical Threat',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
    },
    {
      title: 'Lottery & Prize Money Traps',
      desc: 'Fake notices saying you won money, crypto, or prizes, but asking you to send an upfront fee to collect it.',
      badge: 'Money Loss',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      title: 'Fake Police & Tax Warnings',
      desc: 'Scary messages pretending to be tax agencies or police threatening legal action unless you pay immediately.',
      badge: 'Fear Tactic',
      color: 'text-orange-700 bg-orange-50 border-orange-200',
    },
  ];

  const faqs = [
    {
      q: 'Is AlertIQ completely free to use?',
      a: 'Yes, AlertIQ is 100% free. You can scan as many suspicious messages as you need without creating an account, paying anything, or installing extensions.',
    },
    {
      q: 'Can anyone read or save my personal messages?',
      a: 'No. AlertIQ is built with absolute zero server retention. Your messages are checked instantly in private memory and erased immediately. Nothing is stored on our servers or sold to third parties.',
    },
    {
      q: 'Does AlertIQ click on dangerous links in my message?',
      a: 'Never. AlertIQ inspects web addresses safely from the outside using reputation databases. It never opens or follows links, meaning your phone or computer is 100% safe from viruses and malware.',
    },
    {
      q: 'What should I do if a message is marked High Risk?',
      a: 'Do not click any links, do not call any phone numbers listed inside, and never share OTP codes. Simply delete the message and block the sender on your phone.',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F5F5F7]">
      {/* Background Floating Ambient Glow Orbs for visual depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-blue-500/10 blur-[130px] animate-float-1" />
        <div className="absolute top-[35%] -left-32 h-[450px] w-[500px] rounded-full bg-indigo-500/8 blur-[120px] animate-float-2" />
        <div className="absolute top-[60%] -right-32 h-[500px] w-[550px] rounded-full bg-cyan-500/8 blur-[130px] animate-float-1" />
      </div>

      {/* Landing Navbar: Purely marketing & anchor links */}
      <LandingNavbar />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION
        ========================================================================= */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs mb-8 transition-all hover:bg-white">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Smart Scam & Fake Message Detector</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-bold">100% Free & Private</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Stop Scam Messages &amp; Fake Links <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Before They Trick You.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Paste any suspicious SMS, email, or chat message. AlertIQ instantly tells you if it&apos;s safe or dangerous, exposes hidden fake websites, and shows you what to do.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/scan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0071E3] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-600 transition-all active:scale-[0.98]"
              >
                <span>Scan a Message Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/90 backdrop-blur-sm px-7 py-3.5 text-sm sm:text-base font-bold text-slate-700 shadow-xs hover:bg-white hover:border-slate-400 transition-all"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-slate-700" />
                <span>100% Private (No data saved)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-blue-600" />
                <span>Shows Why It&apos;s Fake</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Safe Link Inspector</span>
              </div>
            </div>

            {/* Interactive Showcase Preview Mockup with Animated Scanline */}
            <div className="mt-14 mx-auto max-w-3xl rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xl shadow-slate-900/8 text-left relative overflow-hidden ring-1 ring-black/[0.03]">
              {/* Animated cyber scanner radar beam */}
              <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-blue-500/10 via-cyan-400/20 to-transparent animate-scanline" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-xs font-semibold text-slate-400">
                    live-scam-scanner.preview
                  </span>
                </div>
                <span className="rounded-full bg-red-50 px-3 py-1 font-mono text-[11px] font-bold text-red-700 border border-red-200 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                  HIGH RISK SCAM (98/100)
                </span>
              </div>

              {/* Mockup content */}
              <div className="mt-5 space-y-4 font-mono text-xs text-slate-800">
                <div className="rounded-2xl bg-slate-50/90 p-4 border border-slate-200/80 leading-relaxed relative">
                  <span className="text-slate-400 select-none block text-[10px] uppercase font-bold mb-1">
                    Sample Suspicious Text Received:
                  </span>
                  &ldquo;CHASE-ALERT: Unusual sign-in attempt detected from unfamiliar IP.{' '}
                  <mark className="bg-red-100 text-red-900 px-1.5 py-0.5 rounded font-bold border border-red-300">
                    Your account has been restricted.
                  </mark>{' '}
                  Visit{' '}
                  <mark className="bg-red-100 text-red-900 px-1.5 py-0.5 rounded font-bold border border-red-300">
                    https://chase-security-verify.xyz/login
                  </mark>{' '}
                  immediately to confirm identity.&rdquo;
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-red-700">
                      Red Flag #1: Fake Website
                    </span>
                    <p className="mt-1 font-semibold text-slate-900">Copycat Chase Bank Domain</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Uses fake `.xyz` address to steal your bank password. Real Chase is `chase.com`.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                    <span className="font-mono text-[10px] uppercase font-bold text-red-700">
                      Red Flag #2: Fake Urgency
                    </span>
                    <p className="mt-1 font-semibold text-slate-900">Scare Tactic Lure</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Fakes an emergency lockout to make you panic and click without thinking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Scanned in: 380 milliseconds</span>
                <Link
                  href="/scan"
                  className="font-bold text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  Test your own message <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. STATS & TELEMETRY BAND
        ========================================================================= */}
        <section className="border-y border-slate-200/80 bg-white/80 backdrop-blur-sm py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl font-extrabold text-slate-900">
                  &lt;1 Sec
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
                  Instant Results
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Checks messages in milliseconds</p>
              </div>

              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#0071E3]">
                  100%
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
                  Completely Private
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Zero messages saved on servers</p>
              </div>

              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl font-extrabold text-emerald-600">
                  10+
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
                  Scam Types Detected
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Bank fraud, packages, bills &amp; more</p>
              </div>

              <div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl font-extrabold text-indigo-600">
                  Free
                </div>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
                  No Sign Up Needed
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Open web app, no card or login</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. FOUR CORE FEATURES (SIMPLE & UNDERSTANDABLE)
        ========================================================================= */}
        <section id="capabilities" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3]">
                Why People Use AlertIQ
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Simple Protection Against Modern Tricks.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3">
                Scammers have become sophisticated. AlertIQ makes it easy for anyone to spot fraud and stay safe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="lux-card rounded-2xl p-6 bg-white">
                <div className="h-9 w-9 rounded-lg bg-blue-50 text-[#0071E3] flex items-center justify-center mb-4 border border-blue-200">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900">
                  1. Instant Safety Rating
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clear Red, Yellow, or Green indicator so you know in one glance whether a message is safe, suspicious, or dangerous.
                </p>
              </div>

              <div className="lux-card rounded-2xl p-6 bg-white">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
                  <Link2 className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900">
                  2. Safe Fake Link Inspector
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  AlertIQ checks web addresses without opening them. It catches fake bank links and copycat sites before they can infect your device.
                </p>
              </div>

              <div className="lux-card rounded-2xl p-6 bg-white">
                <div className="h-9 w-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-200">
                  <Eye className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900">
                  3. Highlighted Proof You Can See
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We highlight the exact words scammers use to rush you or trick you into giving away passwords, cards, or one-time codes.
                </p>
              </div>

              <div className="lux-card rounded-2xl p-6 bg-white">
                <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900">
                  4. Complete Personal Privacy
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your messages are checked in private memory and instantly erased. We never store, read, or sell your private conversations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. HOW IT WORKS (3 SIMPLE STEPS)
        ========================================================================= */}
        <section id="how-it-works" className="py-20 bg-white/70 border-t border-slate-200/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3]">
                Simple 3-Step Process
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                How AlertIQ Keeps You Safe
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Get an answer on any suspicious text in under 1 second.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="lux-card rounded-2xl p-6 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#0071E3] uppercase">
                    Step 01
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900 mt-1">
                    Paste Your Message
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Copy and paste any suspicious text, SMS, email, or chat you received into the scanner box.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                  SMS • Email • WhatsApp
                </div>
              </div>

              <div className="lux-card rounded-2xl p-6 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 uppercase">
                    Step 02
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900 mt-1">
                    Instant Smart Check
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our intelligent engine checks for fake links, urgency scare tactics, and impersonation of trusted brands.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                  Under 500ms • Link Safety
                </div>
              </div>

              <div className="lux-card rounded-2xl p-6 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-600 uppercase">
                    Step 03
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900 mt-1">
                    Get Clear Action Steps
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    See the safety score, highlighted red flags, and exact advice on whether to delete, block, or report the sender.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 font-mono text-[11px] text-slate-400">
                  Clear Advice • Safe Next Steps
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. THREAT TAXONOMY GRID (COMMON SCAMS)
        ========================================================================= */}
        <section id="taxonomy" className="py-20 md:py-24 border-t border-slate-200/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3]">
                Common Scam Examples
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                The Types of Scams AlertIQ Catches.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Recognize the everyday fraud attempts sent to millions of phones and inboxes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {threatVectors.map((tv, idx) => (
                <div key={idx} className="lux-card rounded-2xl p-6 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${tv.color}`}>
                        {tv.badge}
                      </span>
                      <span className="text-slate-400 font-mono text-xs">#{idx + 1}</span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-slate-900 mt-1">
                      {tv.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                      {tv.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0071E3]">
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
            6. FREQUENTLY ASKED QUESTIONS (SIMPLE & DIRECT)
        ========================================================================= */}
        <section id="faq" className="py-20 bg-white/70 border-t border-slate-200/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center pb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0071E3]">
                Got Questions?
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold text-slate-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="lux-card rounded-2xl p-6 bg-white">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-slate-900 flex items-start gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 shrink-0 text-[#0071E3] mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. FINAL HIGH-IMPACT CTA BANNER
        ========================================================================= */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-blue-300 border border-white/10">
                  Instant Access • Free
                </span>

                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-4">
                  Check Any Suspicious Message Right Now.
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  No sign up or credit card required. Paste your text, inspect the proof, and stay completely safe.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/scan"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0071E3] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-600 transition-all active:scale-[0.98]"
                  >
                    <span>Launch Free Scanner Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="#capabilities"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-7 py-3.5 text-sm sm:text-base font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
                  >
                    <span>Explore Features</span>
                  </a>
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
