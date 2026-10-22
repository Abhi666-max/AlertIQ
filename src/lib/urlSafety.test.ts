import { describe, it, expect } from 'vitest';
import { extractUrls, inspectDomainHeuristics } from './urlSafety';

describe('URL Safety & Threat Intel Subsystem', () => {
  it('extracts standard and bare URLs safely from message text', () => {
    const text = 'Urgent: Visit https://secure-bank-login.com/auth now or check www.update-portal.xyz/verify.';
    const results = extractUrls(text);

    expect(results).toHaveLength(2);
    expect(results[0].domain).toBe('secure-bank-login.com');
    expect(results[1].domain).toBe('www.update-portal.xyz');
  });

  it('strips trailing punctuation from extracted URLs', () => {
    const text = 'Click here immediately: https://alert-account.com/action!';
    const results = extractUrls(text);

    expect(results).toHaveLength(1);
    expect(results[0].url).toBe('https://alert-account.com/action');
  });

  it('identifies raw IP address hosts as suspicious', () => {
    const check = inspectDomainHeuristics('192.168.1.100');
    expect(check.isSuspicious).toBe(true);
    expect(check.reason).toContain('raw IP address');
  });

  it('detects Punycode homograph domains', () => {
    const check = inspectDomainHeuristics('xn--pple-43d.com');
    expect(check.isSuspicious).toBe(true);
    expect(check.reason).toContain('Punycode');
  });

  it('flags high-risk disposable phishing TLDs', () => {
    const check = inspectDomainHeuristics('account-update.xyz');
    expect(check.isSuspicious).toBe(true);
    expect(check.reason).toContain('.xyz');
  });

  it('flags popular brand names deceptive placed in subdomains', () => {
    const check = inspectDomainHeuristics('paypal.com.customer-security-portal.info');
    expect(check.isSuspicious).toBe(true);
    expect(check.reason).toContain('paypal');
  });

  it('passes standard legitimate corporate domains', () => {
    const check = inspectDomainHeuristics('www.google.com');
    expect(check.isSuspicious).toBe(false);
  });
});
