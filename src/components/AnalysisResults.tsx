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
  Link2,
  CheckCircle2,
  Info,
  Cpu,
  Zap,
} from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
  const [copied, setCopied] = useState(false);

  // Classification styling tokens (Luxury Light Theme)
  const getRiskConfig = (classification: string) => {
    switch (classification) {
      case 'HIGH_RISK':
        return {
          title: 'High Risk Detected',
          color: 'text-red-700',
          bg: 'bg-red-50/80',
          border: 'border-red-200',
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-800',
          badgeBorder: 'border-red-300',
          gaugeColor: 'bg-red-600',
          icon: ShieldAlert,
          description: 'Strong deceptive indicators or known social engineering attack signatures were detected.',
        };
      case 'MEDIUM_RISK':
        return {
          title: 'Medium Risk / Caution Advised',
          color: 'text-amber-700',
          bg: 'bg-amber-50/80',
          border: 'border-amber-200',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-800',
          badgeBorder: 'border-amber-300',
          gaugeColor: 'bg-amber-500',
          icon: AlertTriangle,
          description: 'Suspicious elements are present, but context is ambiguous. Exercise caution before proceeding.',
        };
      case 'LOW_APPARENT_RISK':
        return {
          title: 'Low Apparent Risk',
          color: 'text-emerald-700',
          bg: 'bg-emerald-50/80',
          border: 'border-emerald-200',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-800',
          badgeBorder: 'border-emerald-300',
          gaugeColor: 'bg-emerald-600',
          icon: ShieldCheck,
          description: 'No obvious scam signatures, coercive language, or credential theft vectors were detected.',
        };
      default:
        return {
          title: 'Inconclusive Result',
          color: 'text-purple-700',
          bg: 'bg-purple-50/80',
          border: 'border-purple-200',
          badgeBg: 'bg-purple-100',
          badgeText: 'text-purple-800',
          badgeBorder: 'border-purple-300',
          gaugeColor: 'bg-purple-600',
          icon: HelpCircle,
          description: 'Insufficient content or ambiguous evidence to make a definitive classification.',
        };
    }
  };

  const risk = getRiskConfig(result.classification);
  const RiskIcon = risk.icon;

  // Copy summary to clipboard
  const handleCopy = () => {
    const summaryText = `[AlertIQ Threat Intelligence Report]
Classification: ${result.classification.replace('_', ' ')} (Calibrated Risk Index: ${result.riskScore}/100)
Engine: ${result.providerDetails.model}
Summary: ${result.summary}
Indicators Flagged: ${result.indicators.length}
${result.indicators.map((i) => `- [${i.severity.toUpperCase()}] ${i.type}: "${i.evidence}" -> ${i.explanation}`).join('\n')}
Recommendations:
${result.recommended_actions.map((a) => `- ${a}`).join('\n')}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download Markdown report
  const handleDownload = () => {
    const markdownContent = `# AlertIQ Threat Intelligence Report
**Generated:** ${new Date(result.timestamp).toLocaleString()}
**Analysis ID:** \`${result.id}\`
**Classification:** **${result.classification.replace('_', ' ')}** (Risk Score: ${result.riskScore}/100)
**Inference Engine:** ${result.providerDetails.model} (${result.analysisMode})
**Threat Intel Provider:** ${result.providerDetails.threatIntelProvider}
**Latency:** ${result.providerDetails.latencyMs}ms

---

## Submitted Message Specimen
\`\`\`
${result.originalMessage}
\`\`\`

---

## Executive Assessment
${result.summary}

---

## Observable Threat Indicators (${result.indicators.length})
${result.indicators.map((ind, idx) => `### ${idx + 1}. ${ind.type.toUpperCase()} [Severity: ${ind.severity.toUpperCase()}]
- **Verbatim Grounded Evidence:** "${ind.evidence}"
- **Threat Vector Analysis:** ${ind.explanation}`).join('\n\n')}

---

## Embedded URL Intelligence
${result.extracted_urls.length > 0 ? result.extracted_urls.map((u) => `- **Target:** \`${u.url}\` | **Domain:** \`${u.domain}\` | **Status:** **${u.status.toUpperCase()}** (${u.threatDetails || 'Clean'})`).join('\n') : 'No external URLs detected in message body.'}

---

## Recommended Defensive Actions
${result.recommended_actions.map((act) => `- [ ] ${act}`).join('\n')}

---

## Confidence Limitations
${result.limitations.map((lim) => `- ${lim}`).join('\n')}

*AlertIQ provides decision-support risk intelligence. Always verify critical requests through official channels.*
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
      return <p className="font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">{rawText}</p>;
    }

    spans.sort((a, b) => a.start - b.start);

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
          className={`rounded-md px-1.5 py-0.5 font-bold ${
            span.severity === 'high'
              ? 'bg-red-100 text-red-950 border border-red-300'
              : 'bg-amber-100 text-amber-950 border border-amber-300'
          }`}
          title={`Identified threat signal: ${span.type}`}
        >
          {rawText.substring(span.start, span.end)}
        </mark>
      );
      lastIdx = span.end;
    });

    if (lastIdx < rawText.length) {
      elements.push(<span key={`text-end`}>{rawText.substring(lastIdx)}</span>);
    }

    return <div className="font-mono text-xs sm:text-sm text-slate-900 leading-relaxed break-words">{elements}</div>;
  };

  return (
    <div id="results-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
      {/* 1. Header Banner */}
      <div className={`rounded-2xl border ${risk.border} ${risk.bg} p-6 sm:p-8 shadow-sm transition-all`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200/60">
          <div className="flex items-center gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${risk.badgeBorder} ${risk.badgeBg} shadow-2xs`}>
              <RiskIcon className={`h-5 w-5 ${risk.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${risk.badgeBorder} ${risk.badgeBg} ${risk.badgeText}`}>
                  {result.classification.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-slate-500">ID: {result.id.slice(0, 8)}</span>
              </div>
              <h2 className={`font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-extrabold ${risk.color} mt-1`}>
                {risk.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{risk.description}</p>
            </div>
          </div>

          {/* Risk Severity Index */}
          <div className="flex flex-col items-end text-right w-full sm:w-auto">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Calibrated Threat Index</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold ${risk.color}`}>
                {result.riskScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>
            <div className="w-32 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${risk.gaugeColor}`}
                style={{ width: `${result.riskScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Engine metadata bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Engine: <strong className="text-slate-800">{result.providerDetails.model}</strong></span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
            <span>Latency: {result.providerDetails.latencyMs}ms</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Grounded Evidence Verified
            </span>
          </div>
        </div>
      </div>

      {/* 2. Executive Assessment */}
      <div className="mt-6 luxury-card rounded-2xl p-6 sm:p-7 bg-white">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-600" />
          Executive Intelligence Summary
        </h3>
        <p className="mt-3 text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
          {result.summary}
        </p>
      </div>

      {/* 3. Message Highlighter Specimen View */}
      <div className="mt-6 luxury-card rounded-2xl p-6 bg-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
            Inspected Specimen (Flagged Threat Markers)
          </h3>
          <span className="text-[11px] font-semibold text-slate-500">
            {result.indicators.length} observable threat {result.indicators.length === 1 ? 'phrase' : 'phrases'}
          </span>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50/80 p-4 border border-slate-200">
          {renderHighlightedMessage()}
        </div>
      </div>

      {/* 4. Observable Threat Indicators */}
      <div className="mt-6 luxury-card rounded-2xl p-6 bg-white">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold pb-3 border-b border-slate-100">
          Observable Social Engineering Indicators ({result.indicators.length})
        </h3>

        {result.indicators.length === 0 ? (
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center text-xs text-emerald-800 font-medium">
            No specific deceptive indicators or coercive social engineering patterns were detected in this message.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {result.indicators.map((ind, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-all shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase text-slate-900">
                      {ind.type.replace('_', ' ')}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase font-bold ${
                        ind.severity === 'high'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : ind.severity === 'medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {ind.severity} Severity
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Signal #{idx + 1}</span>
                </div>

                {/* Evidence Quote */}
                <div className="mt-2.5 rounded-lg bg-slate-50 p-2.5 border border-slate-200 font-mono text-xs text-slate-800">
                  <span className="text-slate-400 select-none">Evidence: </span>
                  <span className="text-slate-900 font-bold">&ldquo;{ind.evidence}&rdquo;</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-normal">
                  {ind.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. URL Threat Intelligence Review */}
      <div className="mt-6 luxury-card rounded-2xl p-6 bg-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
            <Link2 className="h-4 w-4 text-blue-600" />
            Embedded URL & Domain Safety Review
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            Provider: {result.providerDetails.threatIntelProvider}
          </span>
        </div>

        {result.extracted_urls.length === 0 ? (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-500 text-center">
            No external hyperlinks were found in this message body.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {result.extracted_urls.map((urlItem, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 truncate max-w-sm">
                      {urlItem.domain}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase font-bold ${
                        urlItem.status === 'malicious'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : urlItem.status === 'suspicious'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : urlItem.status === 'clean'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {urlItem.status}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-slate-500 truncate max-w-md">
                    Target: {urlItem.url}
                  </p>
                  {urlItem.threatDetails && (
                    <p className="text-[11px] text-slate-600">{urlItem.threatDetails}</p>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-500 shrink-0 font-medium">
                  ⚠️ Direct opening blocked for safety
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Practical Defensive Recommendations */}
      <div className="mt-6 luxury-card rounded-2xl p-6 bg-white">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold pb-3 border-b border-slate-100">
          Recommended Safety Actions
        </h3>
        <ul className="mt-4 space-y-2.5">
          {result.recommended_actions.map((act, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 7. Action Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Analyze Another Message</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-all"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 shadow-md shadow-slate-900/10 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Report (.md)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
