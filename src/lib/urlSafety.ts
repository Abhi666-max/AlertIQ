import { ExtractedUrl, ThreatReputationStatus } from './types';

// Safe regular expression for URL extraction (matches http/https URLs, www. prefixes, and bare domains with paths)
const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`[\]]+|(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|edu|gov|io|co|xyz|info|biz|top|online|click|link|club|site|live|security|support|bank|app|ru|cn|in|us|me)\b(?:\/[^\s<>"'{}|\\^`[\]]*)?/gi;

// Known suspicious TLDs often abused in automated phishing kits
const HIGH_RISK_TLDS = new Set(['xyz', 'top', 'click', 'link', 'online', 'club', 'site', 'work', 'loan', 'gq', 'ml', 'cf', 'tk']);

/**
 * Extracts and normalizes URLs from raw message text without executing any network calls.
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
      // Fallback extraction
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
 * Evaluates domain structure for obvious heuristic red flags (Punycode, IP addresses, TLDs)
 */
export function inspectDomainHeuristics(domain: string): { isSuspicious: boolean; reason?: string } {
  // Check for IPv4 address used as host
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
    return { isSuspicious: true, reason: 'URL uses raw IP address instead of a recognized domain name.' };
  }

  // Punycode / Homograph attack indicator
  if (domain.startsWith('xn--')) {
    return { isSuspicious: true, reason: 'Punycode domain detected (potential internationalized homograph impersonation).' };
  }

  // URL shorteners hiding destination
  const URL_SHORTENERS = new Set(['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'cutt.ly', 'rb.gy']);
  if (URL_SHORTENERS.has(domain)) {
    return { isSuspicious: true, reason: 'URL shortener hides actual destination, obscuring the target site from the recipient.' };
  }

  // Deceptive brand impersonation in domain labels (e.g. chase-security-verify.xyz, netflix-billing-update.top)
  const tokens = domain.split(/[-.]/);
  const popularBrands = ['paypal', 'apple', 'google', 'amazon', 'microsoft', 'netflix', 'chase', 'wellsfargo', 'bankofamerica', 'usps', 'fedex', 'dhl'];
  for (const brand of popularBrands) {
    if (tokens.includes(brand)) {
      // If it includes the brand but the primary domain is not the official brand.com
      const isOfficialDomain = domain === `${brand}.com` || domain === `www.${brand}.com` || domain.endsWith(`.${brand}.com`);
      if (!isOfficialDomain) {
        return { isSuspicious: true, reason: `Brand name "${brand}" detected in unaffiliated or hyphenated host ("${domain}"), typical of phishing domains.` };
      }
    }
  }

  // Suspicious TLD
  const parts = domain.split('.');
  const tld = parts[parts.length - 1];
  if (HIGH_RISK_TLDS.has(tld)) {
    return { isSuspicious: true, reason: `Uses high-risk top-level domain (.${tld}) frequently observed in bulk disposable phishing campaigns.` };
  }

  return { isSuspicious: false };
}

/**
 * Queries Google Safe Browsing Lookup API v4 if an API key is available.
 * Never throws; returns updated URL metadata with honest status and attribution.
 */
export async function checkUrlsReputation(
  urls: ExtractedUrl[],
  apiKey?: string
): Promise<{ checkedUrls: ExtractedUrl[]; providerName: string }> {
  if (urls.length === 0) {
    return { checkedUrls: [], providerName: 'None' };
  }

  // First apply domain heuristic analysis
  const inspectedUrls = urls.map((u) => {
    const heuristic = inspectDomainHeuristics(u.domain);
    if (heuristic.isSuspicious) {
      return {
        ...u,
        status: 'suspicious' as ThreatReputationStatus,
        threatDetails: heuristic.reason,
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
        threatDetails: u.threatDetails || 'External threat intelligence lookup not configured (API key missing).',
      })),
      providerName: 'Heuristic Scanner Only (Safe Browsing API Unconfigured)',
    };
  }

  try {
    const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${effectiveKey}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // Strict 4s timeout

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
      // Safe Browsing API may not be enabled on the key, or quota exceeded
      return {
        checkedUrls: inspectedUrls.map((u) => ({
          ...u,
          status: u.status === 'suspicious' ? 'suspicious' : 'unknown',
          threatDetails: u.threatDetails || `Threat lookup returned status ${response.status} (API key may lack Safe Browsing v4 access).`,
        })),
        providerName: 'Google Safe Browsing v4 (Lookup Unavailable)',
      };
    }

    const data = (await response.json()) as { matches?: Array<{ threatType: string; threat: { url: string } }> };
    const matches = data.matches || [];
    const matchedUrlMap = new Map<string, string>();

    for (const match of matches) {
      matchedUrlMap.set(match.threat.url.toLowerCase(), match.threatType);
    }

    const finalUrls = inspectedUrls.map((u) => {
      const formatted = (u.url.startsWith('http://') || u.url.startsWith('https://')
        ? u.url
        : `https://${u.url}`).toLowerCase();

      const matchedThreat = matchedUrlMap.get(formatted);

      if (matchedThreat) {
        return {
          ...u,
          status: 'malicious' as ThreatReputationStatus,
          threatDetails: `Flagged by Google Safe Browsing as ${matchedThreat}.`,
        };
      }

      if (u.status === 'suspicious') {
        return u; // Retain heuristic warning
      }

      return {
        ...u,
        status: 'clean' as ThreatReputationStatus,
        threatDetails: 'No recorded threat matches found in Google Safe Browsing database.',
      };
    });

    return {
      checkedUrls: finalUrls,
      providerName: 'Google Safe Browsing v4 + Heuristic Filter',
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Timeout or network failure';
    return {
      checkedUrls: inspectedUrls.map((u) => ({
        ...u,
        status: u.status === 'suspicious' ? 'suspicious' : 'unknown',
        threatDetails: u.threatDetails || `External threat intelligence query aborted (${errMessage}).`,
      })),
      providerName: 'Google Safe Browsing v4 (Query Failed)',
    };
  }
}
