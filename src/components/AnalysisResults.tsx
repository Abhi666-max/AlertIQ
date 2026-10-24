'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  Download,
  Link2,
  CheckCircle2,
  FileText,
  ExternalLink,
  AlertCircle,
  Search,
  CheckSquare,
} from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

const getRiskConfig = (classification: string) => {
  switch (classification) {
    case 'HIGH_RISK':
      return {
        title: 'High Risk — Probable Scam',
        label: 'High Threat Level',
        badgeColor: 'border-red-200 bg-red-100 text-red-800',
        scoreColor: 'text-[#DC2626]',
        gaugeColor: 'bg-[#DC2626]',
        bannerBg: 'bg-red-50/80 border-red-200',
        icon: ShieldAlert,
        oneLiner: 'Critical Warning: Strong indicators of financial fraud, fake urgency, or credential theft detected.',
      };
    case 'MEDIUM_RISK':
      return {
        title: 'Suspicious — Exercise Caution',
        label: 'Medium Threat Level',
        badgeColor: 'border-amber-200 bg-amber-100 text-amber-800',
        scoreColor: 'text-amber-600',
        gaugeColor: 'bg-amber-500',
        bannerBg: 'bg-amber-50/80 border-amber-200',
        icon: AlertTriangle,
        oneLiner: 'Caution: Unverified sender or suspicious request patterns present. Verify before responding.',
      };
    case 'LOW_APPARENT_RISK':
      return {
        title: 'Low Risk — Likely Legitimate',
        label: 'Low Threat Level',
        badgeColor: 'border-emerald-200 bg-emerald-100 text-emerald-800',
        scoreColor: 'text-emerald-600',
        gaugeColor: 'bg-emerald-600',
        bannerBg: 'bg-emerald-50/80 border-emerald-200',
        icon: ShieldCheck,
        oneLiner: 'Safe: No known phishing signatures, disguised links, or credential extortion identified.',
      };
    default:
      return {
        title: 'Inconclusive Analysis',
        label: 'Inconclusive',
        badgeColor: 'border-slate-200 bg-slate-100 text-slate-700',
        scoreColor: 'text-slate-600',
        gaugeColor: 'bg-slate-400',
        bannerBg: 'bg-slate-50 border-slate-200',
        icon: HelpCircle,
        oneLiner: 'Ambiguous: Message text is too brief or lacks sufficient signals for a definitive verdict.',
      };
  }
};

/** Build a print-ready A4 HTML document that does NOT cut off when printed or saved to PDF */
const handleDownloadPDF = (result: AnalysisResult) => {
  const risk = getRiskConfig(result.classification);
  const formattedDate = new Date(result.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = new Date(result.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const indicatorsRows =
    result.indicators.length === 0
      ? '<tr><td colspan="3" style="padding:12px;text-align:center;color:#64748b;font-style:italic">No deceptive indicators flagged.</td></tr>'
      : result.indicators
          .map(
            (ind, idx) => `
        <tr style="border-bottom:1px solid #e2e8f0;background:${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}">
          <td style="padding:10px 12px;font-weight:700;color:#090a0f;vertical-align:top;width:25%">
            ${ind.type.replace(/_/g, ' ').toUpperCase()}<br/>
            <span style="display:inline-block;margin-top:4px;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;
              background:${ind.severity === 'high' ? '#fee2e2' : ind.severity === 'medium' ? '#fef3c7' : '#f1f5f9'};
              color:${ind.severity === 'high' ? '#991b1b' : ind.severity === 'medium' ? '#92400e' : '#334155'}">
              ${ind.severity.toUpperCase()}
            </span>
          </td>
          <td style="padding:10px 12px;font-family:monospace;font-size:11px;color:#991b1b;background:rgba(254,226,226,0.3);vertical-align:top;width:35%;word-break:break-word">
            "${ind.evidence.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"
          </td>
          <td style="padding:10px 12px;color:#334155;font-size:12px;line-height:1.4;vertical-align:top;width:40%">
            ${ind.explanation}
          </td>
        </tr>`
          )
          .join('');

  const urlsRows =
    result.extracted_urls.length === 0
      ? '<tr><td colspan="3" style="padding:10px;text-align:center;color:#64748b;font-size:11px">No external links found in message body.</td></tr>'
      : result.extracted_urls
          .map(
            (u) => `
        <tr style="border-bottom:1px solid #e2e8f0">
          <td style="padding:8px 12px;font-family:monospace;font-weight:700;font-size:12px;color:#090a0f">${u.domain}</td>
          <td style="padding:8px 12px;width:15%">
            <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;
              background:${u.status === 'malicious' ? '#fee2e2' : u.status === 'suspicious' ? '#fef3c7' : '#dcfce7'};
              color:${u.status === 'malicious' ? '#991b1b' : u.status === 'suspicious' ? '#92400e' : '#166534'}">
              ${u.status.toUpperCase()}
            </span>
          </td>
          <td style="padding:8px 12px;font-size:11px;color:#475569">${u.threatDetails || u.url}</td>
        </tr>`
          )
          .join('');

  const actionsList = result.recommended_actions
    .map(
      (act, i) =>
        `<li style="margin-bottom:6px;font-size:12px;color:#1e293b;line-height:1.5"><strong>Step ${i + 1}:</strong> ${act}</li>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>AlertIQ Threat Intelligence Report - ${result.id.slice(0, 8)}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #090a0f;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 12px;
      line-height: 1.45;
    }
    .page-container {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #dc2626;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #090a0f;
      letter-spacing: -0.02em;
    }
    .brand-title span {
      color: #dc2626;
    }
    .doc-meta {
      font-size: 10px;
      color: #64748b;
      font-family: monospace;
      text-align: right;
    }
    .banner {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 14px 18px;
      background: #f8fafc;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .banner-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .verdict-title {
      font-size: 16px;
      font-weight: 800;
      color: #090a0f;
    }
    .verdict-score {
      font-size: 28px;
      font-weight: 900;
      color: ${result.classification === 'HIGH_RISK' ? '#dc2626' : result.classification === 'MEDIUM_RISK' ? '#d97706' : '#16a34a'};
      line-height: 1;
    }
    .verdict-desc {
      font-size: 12px;
      color: #475569;
      margin-top: 4px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #090a0f;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 14px;
      margin-bottom: 8px;
    }
    .specimen-box {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 12px;
      font-family: monospace;
      font-size: 11px;
      color: #0f172a;
      white-space: pre-wrap;
      word-break: break-word;
      page-break-inside: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    th {
      background: #f1f5f9;
      color: #475569;
      font-weight: 700;
      text-align: left;
      padding: 8px 12px;
      border-bottom: 1px solid #cbd5e1;
      font-size: 10px;
      text-transform: uppercase;
    }
    .avoid-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .action-box {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 14px;
      margin-top: 6px;
      page-break-inside: avoid;
    }
    .action-box ul {
      margin: 0;
      padding-left: 18px;
    }
    .footer {
      margin-top: 24px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      font-size: 9px;
      color: #94a3b8;
      text-align: center;
      font-family: monospace;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="header">
      <div>
        <div class="brand-title">Alert<span>IQ</span> Security Intelligence Report</div>
        <div style="font-size:10px;color:#64748b">Automated Phishing & Social Engineering Verification</div>
      </div>
      <div class="doc-meta">
        <strong>Report ID:</strong> ${result.id.slice(0, 12)}<br/>
        <strong>Analyzed:</strong> ${formattedDate} at ${formattedTime}
      </div>
    </div>

    <!-- Executive Verdict -->
    <div class="banner">
      <div class="banner-top">
        <div>
          <div class="verdict-title">${risk.title}</div>
          <div class="verdict-desc">${result.summary}</div>
        </div>
        <div style="text-align:right">
          <div class="verdict-score">${result.riskScore}/100</div>
          <div style="font-size:9px;font-weight:700;color:#64748b;text-transform:uppercase">${risk.label}</div>
        </div>
      </div>
    </div>

    <!-- Message Specimen -->
    <div class="avoid-break">
      <div class="section-title">1. Analyzed Specimen Content</div>
      <div class="specimen-box">${result.originalMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>

    <!-- Verified Proof Table -->
    <div class="avoid-break">
      <div class="section-title">2. Verified Proof & Threat Indicators (${result.indicators.length})</div>
      <table>
        <thead>
          <tr>
            <th>Threat Vector</th>
            <th>Flagged Specimen Text (Proof)</th>
            <th>Forensic Reasoning</th>
          </tr>
        </thead>
        <tbody>
          ${indicatorsRows}
        </tbody>
      </table>
    </div>

    <!-- Links Table -->
    <div class="avoid-break">
      <div class="section-title">3. Domain & Hyperlink Inspection (${result.extracted_urls.length})</div>
      <table>
        <thead>
          <tr>
            <th>Domain Target</th>
            <th>Reputation</th>
            <th>Risk Details</th>
          </tr>
        </thead>
        <tbody>
          ${urlsRows}
        </tbody>
      </table>
    </div>

    <!-- Recommended Solutions -->
    <div class="avoid-break">
      <div class="section-title">4. Recommended Next Steps (Solution)</div>
      <div class="action-box">
        <ul>${actionsList}</ul>
      </div>
    </div>

    <div class="footer">
      Generated by AlertIQ Enterprise Threat Engine &bull; Private Ephemeral Scan &bull; Zero Log Retention Guaranteed
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) {
    win.onafterprint = () => URL.revokeObjectURL(url);
  }
};

const renderHighlightedMessage = (result: AnalysisResult) => {
  const rawText = result.originalMessage;
  if (!result.indicators || result.indicators.length === 0) {
    return (
      <div className="font-mono text-xs sm:text-sm text-slate-800 leading-relaxed break-words whitespace-pre-wrap">
        {rawText}
      </div>
    );
  }

  interface TextSpan { start: number; end: number; severity: string; type: string; }
  const spans: TextSpan[] = [];
  result.indicators.forEach((ind) => {
    if (!ind.evidence) return;
    let startIdx = 0;
    const lowerRaw = rawText.toLowerCase();
    const lowerEvidence = ind.evidence.toLowerCase();
    while ((startIdx = lowerRaw.indexOf(lowerEvidence, startIdx)) !== -1) {
      spans.push({ start: startIdx, end: startIdx + ind.evidence.length, severity: ind.severity, type: ind.type });
      startIdx += ind.evidence.length;
    }
  });

  if (spans.length === 0) {
    return <div className="font-mono text-xs sm:text-sm text-slate-800 leading-relaxed break-words whitespace-pre-wrap">{rawText}</div>;
  }

  spans.sort((a, b) => a.start - b.start);
  const merged: TextSpan[] = [];
  for (const span of spans) {
    if (!merged.length) { merged.push(span); continue; }
    const last = merged[merged.length - 1];
    if (span.start < last.end) { last.end = Math.max(last.end, span.end); if (span.severity === 'high') last.severity = 'high'; }
    else merged.push(span);
  }

  const elements: React.ReactNode[] = [];
  let lastIdx = 0;
  merged.forEach((span, i) => {
    if (span.start > lastIdx) elements.push(<span key={`t-${lastIdx}`}>{rawText.substring(lastIdx, span.start)}</span>);
    elements.push(
      <mark
        key={`m-${i}`}
        title={`Warning: ${span.type}`}
        className={`rounded px-1.5 py-0.5 font-bold ${
          span.severity === 'high'
            ? 'bg-red-100 text-red-900 border border-red-300'
            : 'bg-amber-100 text-amber-900 border border-amber-300'
        }`}
      >
        {rawText.substring(span.start, span.end)}
      </mark>
    );
    lastIdx = span.end;
  });
  if (lastIdx < rawText.length) elements.push(<span key="t-end">{rawText.substring(lastIdx)}</span>);
  return <div className="font-mono text-xs sm:text-sm text-slate-900 leading-relaxed break-words">{elements}</div>;
};

export function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
  const [copied, setCopied] = useState(false);
  const risk = getRiskConfig(result.classification);
  const RiskIcon = risk.icon;

  const handleCopy = () => {
    const text = `AlertIQ Scam Analysis Report
Verdict: ${risk.title} (Risk Score: ${result.riskScore}/100)
Report ID: ${result.id}

Summary:
${result.summary}

Proof & Flagged Evidence (${result.indicators.length}):
${result.indicators.map((i) => `• [${i.severity.toUpperCase()}] ${i.type.replace(/_/g, ' ')}: "${i.evidence}" — ${i.explanation}`).join('\n')}

What You Should Do:
${result.recommended_actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4 pb-10">

      {/* ── SECTION 1: VERDICT BANNER ── */}
      <div className={`p-6 rounded-2xl border ${risk.bannerBg} saas-card`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-5 border-b border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 shrink-0 flex items-center justify-center rounded-xl border ${risk.badgeColor}`}>
              <RiskIcon className={`h-6 w-6 ${risk.scoreColor}`} />
            </div>
            <div>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${risk.badgeColor}`}>
                {risk.label}
              </span>
              <h2 className="font-display text-2xl font-extrabold text-[#090A0F] mt-1">
                {risk.title}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">{risk.oneLiner}</p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">Threat Score</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`font-display text-4xl font-black ${risk.scoreColor}`}>{result.riskScore}</span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
            </div>
            <div className="w-24 h-2 bg-slate-200/70 rounded-full mt-2 overflow-hidden">
              <div className={`h-full rounded-full ${risk.gaugeColor}`} style={{ width: `${result.riskScore}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
          <span>Report #{result.id.slice(0, 10)} &bull; {new Date(result.timestamp).toLocaleTimeString()}</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified &bull; {result.providerDetails.latencyMs}ms
          </span>
        </div>
      </div>

      {/* ── SECTION 2: EXECUTIVE SUMMARY ── */}
      <div className="saas-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-[#DC2626] shrink-0" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#090A0F]">
            1. Threat Summary (Nishkarsh)
          </h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-sans">{result.summary}</p>
      </div>

      {/* ── SECTION 3: HIGHLIGHTED MESSAGE (PROOF IN CONTEXT) ── */}
      <div className="saas-card p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-[#DC2626] shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#090A0F]">
              2. Analyzed Message Specimen
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {result.indicators.length} warning phrase{result.indicators.length !== 1 ? 's' : ''} tagged
          </span>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          {renderHighlightedMessage(result)}
        </div>
      </div>

      {/* ── SECTION 4: VERIFIED EVIDENCE / PROOF LIST ── */}
      <div className="saas-card p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#090A0F] mb-3">
          3. Verified Proof & Threat Indicators ({result.indicators.length})
        </h3>

        {result.indicators.length === 0 ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
            <ShieldCheck className="h-7 w-7 text-emerald-600 mx-auto mb-1" />
            <p className="text-xs text-emerald-800 font-medium">No deceptive manipulation or urgency vectors detected.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {result.indicators.map((ind, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-[#090A0F]">
                    {ind.type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase border ${
                    ind.severity === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                    ind.severity === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {ind.severity} severity
                  </span>
                </div>

                {/* Evidence Quote */}
                <div className="rounded-lg bg-red-50/60 border border-red-100 p-2.5 font-mono text-xs text-red-950 mb-2">
                  <span className="text-slate-500 font-sans font-medium">Flagged Words (Saboot): </span>
                  <strong className="text-red-700">&ldquo;{ind.evidence}&rdquo;</strong>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{ind.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SECTION 5: URL & DOMAIN INSPECTION ── */}
      <div className="saas-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="h-4 w-4 text-[#DC2626] shrink-0" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#090A0F]">
            4. Web Links & Domain Safety
          </h3>
        </div>

        {result.extracted_urls.length === 0 ? (
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-center text-xs text-slate-500 font-mono">
            No external hyperlinks found in this specimen.
          </div>
        ) : (
          <div className="space-y-2.5">
            {result.extracted_urls.map((urlItem, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <code className="font-bold text-sm text-[#090A0F] font-mono">{urlItem.domain}</code>
                  <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase border ${
                    urlItem.status === 'malicious' ? 'bg-red-50 text-red-700 border-red-200' :
                    urlItem.status === 'suspicious' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    urlItem.status === 'clean' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {urlItem.status}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-[11px] font-medium text-amber-700">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Do not open in browser
                  </span>
                </div>
                <p className="font-mono text-[11px] text-slate-500 truncate">{urlItem.url}</p>
                {urlItem.threatDetails && (
                  <p className="text-xs text-slate-600 mt-1">{urlItem.threatDetails}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SECTION 6: WHAT YOU SHOULD DO (SOLUTION / UPAY) ── */}
      <div className="saas-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#090A0F]">
            5. Recommended Solutions & Next Steps (Upay)
          </h3>
        </div>
        <div className="space-y-2">
          {result.recommended_actions.map((act, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 7: ACTIONS & EXPORT TOOLBAR ── */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handleCopy}
          className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-700">Summary Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-slate-600" />
              <span>Copy Summary</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleDownloadPDF(result)}
          className="btn-dark inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold tracking-wide uppercase shadow-sm"
        >
          <Download className="h-4 w-4 text-[#DC2626]" />
          <span>Export PDF Report</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </button>
      </div>

    </div>
  );
}
