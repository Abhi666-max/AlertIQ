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
  RotateCcw,
  ExternalLink,
  Link2,
  CheckCircle2,
  Info,
  Clock,
  Cpu,
} from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
  const [copied, setCopied] = useState(false);

  // Classification styling tokens
  const getRiskConfig = (classification: string) => {
    switch (classification) {
      case 'HIGH_RISK':
        return {
          title: 'High Risk Detected',
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          badgeBg: 'bg-red-950/80',
          badgeText: 'text-red-400',
          badgeBorder: 'border-red-800/80',
          icon: ShieldAlert,
          description: 'Strong deceptive indicators or known social engineering attack signatures were detected.',
        };
      case 'MEDIUM_RISK':
        return {
          title: 'Medium Risk / Caution Advised',
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          badgeBg: 'bg-amber-950/80',
          badgeText: 'text-amber-400',
          badgeBorder: 'border-amber-800/80',
          icon: AlertTriangle,
          description: 'Suspicious elements are present, but context is ambiguous. Exercise caution before proceeding.',
        };
      case 'LOW_APPARENT_RISK':
        return {
          title: 'Low Apparent Risk',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          badgeBg: 'bg-emerald-950/80',
          badgeText: 'text-emerald-400',
          badgeBorder: 'border-emerald-800/80',
          icon: ShieldCheck,
          description: 'No obvious scam signatures, coercive language, or credential theft vectors were detected.',
        };
      default:
        return {
          title: 'Inconclusive Result',
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          badgeBg: 'bg-purple-950/80',
          badgeText: 'text-purple-400',
          badgeBorder: 'border-purple-800/80',
          icon: HelpCircle,
          description: 'Insufficient content or ambiguous evidence to make a definitive classification.',
        };
    }
  };

  const risk = getRiskConfig(result.classification);
  const RiskIcon = risk.icon;

  // Copy summary to clipboard
  const handleCopy = () => {
    const summaryText = `[AlertIQ Analysis Report]
Classification: ${result.classification.replace('_', ' ')} (Score: ${result.riskScore}/100)
Engine: ${result.providerDetails.model}
Summary: ${result.summary}
Indicators: ${result.indicators.length}
${result.indicators.map((i) => `- [${i.severity.toUpperCase()}] ${i.type}: "${i.evidence}" -> ${i.explanation}`).join('\n')}
Recommendations:
${result.recommended_actions.map((a) => `- ${a}`).join('\n')}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download Markdown report
  const handleDownload = () => {
    const markdownContent = `# AlertIQ Scam Analysis Report
**Generated:** ${new Date(result.timestamp).toLocaleString()}
**Analysis ID:** \`${result.id}\`
**Classification:** **${result.classification.replace('_', ' ')}** (Calibrated Risk Index: ${result.riskScore}/100)
**Engine Attribution:** ${result.providerDetails.model} (${result.analysisMode})
**Threat Intel Provider:** ${result.providerDetails.threatIntelProvider}
**Analysis Latency:** ${result.providerDetails.latencyMs}ms

---

## Submitted Message Specimen
\`\`\`
${result.originalMessage}
\`\`\`

---

## Executive Summary
${result.summary}

---

## Observable Threat Indicators (${result.indicators.length})
${result.indicators.map((ind, idx) => `### ${idx + 1}. ${ind.type.toUpperCase()} [Severity: ${ind.severity.toUpperCase()}]
- **Verbatim Evidence:** "${ind.evidence}"
- **Technical Explanation:** ${ind.explanation}`).join('\n\n')}

---

## URL Threat Intelligence
${result.extracted_urls.length > 0 ? result.extracted_urls.map((u) => `- **URL:** \`${u.url}\` | **Host:** \`${u.domain}\` | **Status:** **${u.status.toUpperCase()}** (${u.threatDetails || 'Checked'})`).join('\n') : 'No embedded URLs detected in message content.'}

---

## Recommended Defensive Actions
${result.recommended_actions.map((act) => `- [ ] ${act}`).join('\n')}

---

## Methodology & Limitations
${result.limitations.map((lim) => `- ${lim}`).join('\n')}

*Disclaimer: AlertIQ is an academic decision-support utility. It does not replace professional cybersecurity analysis.*
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AlertIQ-Report-${result.id.slice(0, 8)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Highlight original message spans based on indicators
  const renderHighlightedMessage = () => {
    const rawText = result.originalMessage;
    if (!rawText) return null;

    // Collect evidence ranges
    const spans: Array<{ start: number; end: number; severity: string; type: string }> = [];

    for (const ind of result.indicators) {
      if (!ind.evidence) continue;
      const idx = rawText.toLowerCase().indexOf(ind.evidence.toLowerCase());
      if (idx !== -1) {
        spans.push({
          start: idx,
          end: idx + ind.evidence.length,
          severity: ind.severity,
          type: ind.type,
        });
      }
    }

    if (spans.length === 0) {
      return <p className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">{rawText}</p>;
    }

    // Sort spans by start index
    spans.sort((a, b) => a.start - b.start);

    // Merge overlapping spans
    const merged: typeof spans = [];
    for (const current of spans) {
      if (merged.length === 0) {
        merged.push(current);
      } else {
        const prev = merged[merged.length - 1];
        if (current.start <= prev.end) {
          prev.end = Math.max(prev.end, current.end);
        } else {
          merged.push(current);
        }
      }
    }

    const elements: React.ReactNode[] = [];
    let lastIdx = 0;

    merged.forEach((span, i) => {
      if (span.start > lastIdx) {
        elements.push(
          <span key={`text-${lastIdx}`}>{rawText.substring(lastIdx, span.start)}</span>
        );
      }
      elements.push(
        <mark
          key={`mark-${i}`}
          className={`rounded px-1.5 py-0.5 font-bold ${
            span.severity === 'high'
              ? 'bg-red-500/25 text-red-200 border border-red-500/50'
              : 'bg-amber-500/25 text-amber-200 border border-amber-500/50'
          }`}
          title={`Detected indicator: ${span.type}`}
        >
          {rawText.substring(span.start, span.end)}
        </mark>
      );
      lastIdx = span.end;
    });

    if (lastIdx < rawText.length) {
      elements.push(<span key={`text-end`}>{rawText.substring(lastIdx)}</span>);
    }

    return <div className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed break-words">{elements}</div>;
  };

  return (
    <div id="results-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
      {/* 1. Header Banner */}
      <div className={`surface-card rounded-2xl border ${risk.border} ${risk.bg} p-6 sm:p-8 relative overflow-hidden shadow-2xl`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${risk.badgeBorder} ${risk.badgeBg} shadow-lg`}>
              <RiskIcon className={`h-8 w-8 ${risk.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${risk.badgeBorder} ${risk.badgeBg} ${risk.badgeText}`}>
                  {result.classification.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-400">ID: {result.id.slice(0, 8)}</span>
              </div>
              <h2 className={`font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold ${risk.color} mt-1`}>
                {risk.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{risk.description}</p>
            </div>
          </div>

          {/* Risk Index Gauge */}
          <div className="flex flex-col items-end text-right w-full sm:w-auto">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Risk Severity Index</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`font-['Space_Grotesk'] text-4xl font-black ${risk.color}`}>
                {result.riskScore}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 100</span>
            </div>
            {/* Gauge bar */}
            <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  result.riskScore >= 60 ? 'bg-red-500' : result.riskScore >= 30 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${result.riskScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Engine metadata bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>Engine: <strong>{result.providerDetails.model}</strong></span>
            {result.analysisMode === 'simulated_rules' && (
              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[10px] text-amber-300 border border-amber-500/30">
                Rule-Based Fallback
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Latency: {result.providerDetails.latencyMs}ms</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Excerpts Verified
            </span>
          </div>
        </div>
      </div>

      {/* 2. Executive Summary */}
      <div className="mt-6 surface-card rounded-2xl p-6 sm:p-7 border border-slate-800">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Info className="h-4 w-4 text-cyan-400" />
          Executive Assessment
        </h3>
        <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
          {result.summary}
        </p>
      </div>

      {/* 3. Message Highlighter Specimen View */}
      <div className="mt-6 surface-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Submitted Specimen (Highlighting Grounded Indicators)
          </h3>
          <span className="text-[11px] text-slate-500">
            {result.indicators.length} threat {result.indicators.length === 1 ? 'phrase' : 'phrases'} flagged
          </span>
        </div>
        <div className="mt-4 rounded-xl bg-[#090d16] p-4 border border-slate-800/80">
          {renderHighlightedMessage()}
        </div>
      </div>

      {/* 4. Observable Threat Indicators */}
      <div className="mt-6 surface-card rounded-2xl p-6 border border-slate-800">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
          Observable Social Engineering Indicators ({result.indicators.length})
        </h3>

        {result.indicators.length === 0 ? (
          <div className="mt-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 p-4 text-center text-xs text-emerald-300">
            No specific social engineering indicators or coercive patterns were identified in this message text.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {result.indicators.map((ind, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800/80 bg-[#0c121e]/70 p-4 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold uppercase text-cyan-400">
                      {ind.type.replace('_', ' ')}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.2 font-mono text-[10px] uppercase font-medium ${
                        ind.severity === 'high'
                          ? 'bg-red-950/80 text-red-300 border border-red-800/60'
                          : ind.severity === 'medium'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {ind.severity} Severity
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Indicator #{idx + 1}</span>
                </div>

                {/* Evidence Quote */}
                <div className="mt-2.5 rounded-lg bg-[#070a12] p-2.5 border border-slate-800 font-mono text-xs text-slate-300">
                  <span className="text-slate-500 select-none">Evidence: </span>
                  <span className="text-cyan-300 font-semibold">&ldquo;{ind.evidence}&rdquo;</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-normal">
                  {ind.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. URL Threat Intelligence Review */}
      <div className="mt-6 surface-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Link2 className="h-4 w-4 text-cyan-400" />
            Embedded URL & Domain Safety Review
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            Provider: {result.providerDetails.threatIntelProvider}
          </span>
        </div>

        {result.extracted_urls.length === 0 ? (
          <div className="mt-4 rounded-xl bg-[#090d16] p-4 text-xs text-slate-400 text-center">
            No external URLs or hyperlinks were found in this message.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {result.extracted_urls.map((urlItem, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#090d16] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-200 truncate max-w-sm">
                      {urlItem.domain}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase font-bold ${
                        urlItem.status === 'malicious'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : urlItem.status === 'suspicious'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : urlItem.status === 'clean'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {urlItem.status}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-slate-400 truncate max-w-md">
                    Target: {urlItem.url}
                  </p>
                  {urlItem.threatDetails && (
                    <p className="text-[11px] text-slate-300">{urlItem.threatDetails}</p>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-500 shrink-0">
                  ⚠️ Do NOT open links directly
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Practical Defensive Recommendations */}
      <div className="mt-6 surface-card rounded-2xl p-6 border border-slate-800">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
          Recommended Defensive Actions
        </h3>
        <ul className="mt-4 space-y-2.5">
          {result.recommended_actions.map((act, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 7. Limitations & Uncertainty */}
      <div className="mt-6 rounded-2xl border border-slate-800/60 bg-[#090d16]/70 p-5 text-xs text-slate-400 space-y-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
          Methodological Limitations:
        </span>
        <ul className="list-disc pl-4 space-y-1 text-[11px]">
          {result.limitations.map((lim, idx) => (
            <li key={idx}>{lim}</li>
          ))}
        </ul>
      </div>

      {/* 8. Action Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5 text-cyan-400" />
          <span>Analyze Another Message</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-cyan-500 shadow-md shadow-cyan-600/20 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Report (.md)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
