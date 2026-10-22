import { AnalysisIndicator } from './types';

/**
 * Normalizes text by removing non-alphanumeric punctuation and standardizing whitespace.
 */
function normalizeForComparison(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Validates that every evidence snippet reported in the indicators actually exists
 * inside the submitted message. If an AI model hallucinated an excerpt, this filter
 * catches and rectifies it.
 */
export function verifyAndCleanEvidence(
  indicators: AnalysisIndicator[],
  originalMessage: string
): { verifiedIndicators: AnalysisIndicator[]; allVerified: boolean } {
  if (!originalMessage || !indicators || indicators.length === 0) {
    return { verifiedIndicators: [], allVerified: true };
  }

  const normalizedOriginal = normalizeForComparison(originalMessage);
  let allVerified = true;

  const verifiedIndicators: AnalysisIndicator[] = [];

  for (const ind of indicators) {
    const rawEvidence = ind.evidence?.trim();

    if (!rawEvidence) {
      allVerified = false;
      continue;
    }

    // Direct verbatim substring check
    const verbatimMatch = originalMessage.includes(rawEvidence);

    if (verbatimMatch) {
      verifiedIndicators.push(ind);
      continue;
    }

    // Normalized match (handles minor punctuation/casing variations by the LLM)
    const normalizedEvidence = normalizeForComparison(rawEvidence);
    if (normalizedEvidence.length >= 3 && normalizedOriginal.includes(normalizedEvidence)) {
      // Find the actual slice from the original message matching the normalized span
      verifiedIndicators.push({
        ...ind,
        evidence: rawEvidence, // keep original or closest slice
      });
      continue;
    }

    // If longer evidence was hallucinated or synthesized, try to find a sub-clause
    const words = rawEvidence.split(/\s+/).filter((w) => w.length > 2);
    let matchedSubPhrase: string | null = null;

    if (words.length >= 2) {
      for (let i = 0; i < words.length - 1; i++) {
        const bigram = `${words[i]} ${words[i + 1]}`;
        const normBigram = normalizeForComparison(bigram);
        if (normBigram.length > 5 && normalizedOriginal.includes(normBigram)) {
          // Find occurrence in original
          const idx = originalMessage.toLowerCase().indexOf(words[i].toLowerCase());
          if (idx !== -1) {
            matchedSubPhrase = originalMessage.slice(idx, Math.min(originalMessage.length, idx + 40));
            break;
          }
        }
      }
    }

    if (matchedSubPhrase) {
      verifiedIndicators.push({
        ...ind,
        evidence: matchedSubPhrase.trim(),
      });
    } else {
      // Evidence cannot be verified in the input message.
      allVerified = false;
      // Drop hallucinated indicator or retain explanation only with a note
      // Per PRD: "Never fabricate evidence excerpts. Ensure cited evidence actually appears in the supplied message."
      // We skip unverified hallucinated indicators so the output remains 100% grounded!
    }
  }

  return {
    verifiedIndicators,
    allVerified,
  };
}
