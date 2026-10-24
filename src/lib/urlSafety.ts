import { ExtractedUrl, ThreatReputationStatus } from './types';

// Safe regular expression for URL extraction (matches http/https URLs, www. prefixes, and bare domains with paths)
const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`[\]]+|(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|edu|gov|io|co|xyz|info|biz|top|online|click|link|club|site|live|security|support|bank|app|ru|cn|in|us|me)\b(?:\/[^\s<>"'{}|\\^`[\]]*)?/gi;

// Known suspicious TLDs frequently abused in mass phishing kits
const HIGH_RISK_TLDS = new Set(['xyz', 'top', 'click', 'link', 'online', 'club', 'site', 'work', 'loan', 'gq', 'ml', 'cf', 'tk', 'info', 'live']);

// URL shorteners that obscure destinations
const URL_SHORTENERS = new Set(['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'cutt.ly', 'rb.gy', 'rebrand.ly', 'shorturl.at']);

// Top impersonated brands
const TARGET_BRANDS = [
  'paypal', 'apple', 'google', 'amazon', 'microsoft', 'netflix', 'chase',
  'wellsfargo', 'bankofamerica', 'citibank', 'usps', 'fedex', 'dhl',
  'binance', 'coinbase', 'metamask', 'sbi', 'hdfc', 'icicibank'
];

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1,     // insertion
          dp[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }
  return dp[m][n];
}

/**
 * Checks for Cyrillic / Greek homoglyphs mimicking Latin characters
 */
function detectHomoglyphs(domain: string): boolean {
  // Cyrillic and Greek ranges often used to impersonate Latin letters (e.g. a, e, o, p, c, y, x)
  const homoglyphRegex = /[\u0400-\u04FF\u0370-\u03FF]/;
  return homoglyphRegex.test(domain);
}

/**
 * Extracts and normalizes URLs from raw message text without executing network calls.
 */
export function extractUrls(text: string): ExtractedUrl[] {
  if (!text || typeof text !== 'string') return [];

  const matches = text.match(URL_REGEX) || [];
  const uniqueUrls = Array.from(new Set(matches));

  return uniqueUrls.map((rawUrl) => {
    let cleanUrl = rawUrl.trim().replace(/[.,;:!?]+$/, ''); // Strip trailing punctuation
    let domain = 'unknown';

    try {
      const urlToParse = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')
        ? cleanUrl
        : `https://${cleanUrl}`;

      const parsed = new URL(urlToParse);
      domain = parsed.hostname.toLowerCase();
    } catch {
      const parts = cleanUrl.split('/')[0].replace(/^https?:\/\//i, '');
      domain = parts.toLowerCase();
    }

    return {
      url: cleanUrl,
      domain,
      status: 'not_checked' as ThreatReputationStatus,
      threatDetails: undefined,
      checkedAt: new Date().toISOString(),
    };
  });
}

/**
 * Evaluates domain structure for obvious heuristic red flags (Homoglyphs, IP addresses, Shorteners, TLDs, Brand Levenshtein)
 */
export function inspectDomainHeuristics(domain: string): { isSuspicious: boolean; reason?: string } {
  // 1. Raw IP address check
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
    return { isSuspicious: true, reason: 'URL uses a raw IP address instead of a verified domain name.' };
  }

  // 2. Punycode & Homoglyph detection
  if (domain.startsWith('xn--') || detectHomoglyphs(domain)) {
    return { isSuspicious: true, reason: 'Homoglyph / Punycode domain detected. Uses lookalike characters to spoof a trusted brand.' };
  }

  // 3. Shorteners hiding destination
  if (URL_SHORTENERS.has(domain)) {
    return { isSuspicious: true, reason: 'URL shortener hides actual destination, obscuring the landing page.' };
  }

  // 4. Brand substring or hyphenated impersonation
  const domainLower = domain.toLowerCase();
  const domainParts = domainLower.split('.');
  const primaryName = domainParts.length > 1 ? domainParts[domainParts.length - 2] : domainParts[0];

  for (const brand of TARGET_BRANDS) {
    if (domainLower.includes(brand)) {
      const isOfficial = domainLower === `${brand}.com` || domainLower === `www.${brand}.com` || domainLower.endsWith(`.${brand}.com`);
      if (!isOfficial) {
        return { isSuspicious: true, reason: `Brand name "${brand}" detected in lookalike or hyphenated domain ("${domain}").` };
      }
    }

    // Levenshtein typo-squatting detection
    const dist = levenshteinDistance(primaryName, brand);
    if (dist > 0 && dist <= 2 && primaryName.length >= 4) {
      return { isSuspicious: true, reason: `Typo-squatting detected: "${primaryName}" is dangerously close to brand "${brand}" (edit distance: ${dist}).` };
    }
  }

  // 5. High-risk TLDs
  const tld = domainParts[domainParts.length - 1];
  if (HIGH_RISK_TLDS.has(tld)) {
    return { isSuspicious: true, reason: `Uses high-risk top-level domain (.${tld}) frequently observed in bulk disposable phishing kits.` };
  }

  return { isSuspicious: false };
}

/**
 * Safely resolves HTTP shortener redirects to unmask true final landing URLs.
 */
async function resolveRedirectUrl(rawUrl: string): Promise<{ resolvedUrl: string; wasRedirected: boolean }> {
  try {
    const formattedUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
      ? rawUrl
      : `https://${rawUrl}`;

    const parsed = new URL(formattedUrl);
    if (!URL_SHORTENERS.has(parsed.hostname.toLowerCase())) {
      return { resolvedUrl: formattedUrl, wasRedirected: false };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(formattedUrl, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.url && res.url !== formattedUrl) {
      return { resolvedUrl: res.url, wasRedirected: true };
    }
  } catch {
    // Timeout or network block: continue gracefully without failing
  }
  return { resolvedUrl: rawUrl, wasRedirected: false };
}

/**
 * Queries Google Safe Browsing Lookup API v4 if available, or applies advanced heuristic domain analysis and unshortening.
 */
export async function checkUrlsReputation(
  urls: ExtractedUrl[],
  apiKey?: string
): Promise<{ checkedUrls: ExtractedUrl[]; providerName: string }> {
  if (urls.length === 0) {
    return { checkedUrls: [], providerName: 'None' };
  }

  // Concurrently resolve redirect chains on shorteners
  const resolvedUrls = await Promise.all(
    urls.map(async (u) => {
      const { resolvedUrl, wasRedirected } = await resolveRedirectUrl(u.url);
      if (wasRedirected) {
        let newDomain = u.domain;
        try {
          newDomain = new URL(resolvedUrl).hostname.toLowerCase();
        } catch {}
        return {
          ...u,
          url: resolvedUrl,
          domain: newDomain,
          threatDetails: `Unshortened from ${u.url} -> destination unmasked: ${resolvedUrl}`,
        };
      }
      return u;
    })
  );

  // Apply domain heuristic analysis
  const inspectedUrls = resolvedUrls.map((u) => {
    const heuristic = inspectDomainHeuristics(u.domain);
    if (heuristic.isSuspicious) {
      return {
        ...u,
        status: 'suspicious' as ThreatReputationStatus,
        threatDetails: u.threatDetails
          ? `${u.threatDetails} | ${heuristic.reason}`
          : heuristic.reason,
      };
    }
    return u;
  });

  const effectiveKey = apiKey || process.env.GOOGLE_SAFE_BROWSING_API_KEY || process.env.GEMINI_API_KEY;

  if (!effectiveKey) {
    return {
      checkedUrls: inspectedUrls.map((u) => ({
        ...u,
        status: u.status === 'suspicious' ? 'suspicious' : ('not_checked' as ThreatReputationStatus),
        threatDetails: u.threatDetails || 'Domain analyzed via local heuristic threat intelligence.',
      })),
      providerName: 'AlertIQ Domain Telemetry & Unshortening Engine',
    };
  }

  try {
    const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${effectiveKey}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const requestBody = {
      client: {
        clientId: 'alertiq-scanner',
        clientVersion: '1.0.0',
      },
      threatInfo: {
        threatTypes: [
          'MALWARE',
          'SOCIAL_ENGINEERING',
          'UNWANTED_SOFTWARE',
          'POTENTIALLY_HARMFUL_APPLICATION',
        ],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: inspectedUrls.map((u) => {
          const formatted = u.url.startsWith('http://') || u.url.startsWith('https://')
            ? u.url
            : `https://${u.url}`;
          return { url: formatted };
        }),
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        checkedUrls: inspectedUrls,
        providerName: 'AlertIQ Domain Telemetry (Safe Browsing API Error)',
      };
    }

    const data = await response.json();
    const matches = data.matches || [];

    const finalUrls = inspectedUrls.map((u) => {
      const match = matches.find((m: { threat: { url: string } }) =>
        m.threat.url.includes(u.domain) || u.url.includes(m.threat.url)
      );

      if (match) {
        return {
          ...u,
          status: 'malicious' as ThreatReputationStatus,
          threatDetails: `Flagged as ${match.threatType} by Google Safe Browsing.`,
        };
      }

      return {
        ...u,
        status: u.status === 'suspicious' ? 'suspicious' : ('clean' as ThreatReputationStatus),
        threatDetails: u.threatDetails || 'No active malicious signature reported on public threat lists.',
      };
    });

    return {
      checkedUrls: finalUrls,
      providerName: 'Google Safe Browsing & AlertIQ Heuristics',
    };
  } catch {
    return {
      checkedUrls: inspectedUrls,
      providerName: 'AlertIQ Domain Telemetry (Fallback)',
    };
  }
}
