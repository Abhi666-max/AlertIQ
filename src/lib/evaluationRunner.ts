import { EVALUATION_DATASET, EvaluationItem } from './evaluationDataset';
import { analyzeWithHeuristics } from './heuristicAnalyzer';
import { RiskLevel } from './types';

export interface EvaluationMetrics {
  totalSamples: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
  results: Array<{
    id: string;
    category: string;
    expected: RiskLevel;
    actual: RiskLevel;
    passed: boolean;
    score: number;
  }>;
  evaluatedAt: string;
  engineName: string;
}

/**
 * Runs offline evaluation against the labeled benchmark dataset.
 * Computes exact statistical classification metrics (Precision, Recall, F1, Confusion Matrix).
 */
export function runBenchmarkEvaluation(): EvaluationMetrics {
  let tp = 0; // True Positive (Expected High/Medium Risk, Predicted High/Medium Risk)
  let fp = 0; // False Positive (Expected Low Risk, Predicted High/Medium Risk)
  let tn = 0; // True Negative (Expected Low Risk, Predicted Low Risk)
  let fn = 0; // False Negative (Expected High/Medium Risk, Predicted Low Risk)

  let exactMatches = 0;
  const itemResults = [];

  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;

  for (const item of EVALUATION_DATASET) {
    if (item.expectedClassification === 'HIGH_RISK') highCount++;
    if (item.expectedClassification === 'MEDIUM_RISK') mediumCount++;
    if (item.expectedClassification === 'LOW_APPARENT_RISK') lowCount++;

    const analysis = analyzeWithHeuristics(item.message);
    const predicted = analysis.classification;

    const isExact = predicted === item.expectedClassification;
    if (isExact) exactMatches++;

    // Binary Scam/Suspicious vs Benign metrics
    const isActuallyThreat = item.expectedClassification === 'HIGH_RISK' || item.expectedClassification === 'MEDIUM_RISK';
    const isPredictedThreat = predicted === 'HIGH_RISK' || predicted === 'MEDIUM_RISK';

    if (isActuallyThreat && isPredictedThreat) {
      tp++;
    } else if (!isActuallyThreat && isPredictedThreat) {
      fp++;
    } else if (!isActuallyThreat && !isPredictedThreat) {
      tn++;
    } else if (isActuallyThreat && !isPredictedThreat) {
      fn++;
    }

    itemResults.push({
      id: item.id,
      category: item.category,
      expected: item.expectedClassification,
      actual: predicted,
      passed: isExact,
      score: analysis.estimatedRiskScore,
    });
  }

  const precision = tp + fp > 0 ? tp / (tp + fp) : 1;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 1;
  const f1Score = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  const accuracy = itemResults.length > 0 ? exactMatches / itemResults.length : 0;

  return {
    totalSamples: EVALUATION_DATASET.length,
    highRiskCount: highCount,
    mediumRiskCount: mediumCount,
    lowRiskCount: lowCount,
    accuracy: Math.round(accuracy * 100) / 100,
    precision: Math.round(precision * 100) / 100,
    recall: Math.round(recall * 100) / 100,
    f1Score: Math.round(f1Score * 100) / 100,
    confusionMatrix: {
      truePositive: tp,
      falsePositive: fp,
      trueNegative: tn,
      falseNegative: fn,
    },
    results: itemResults,
    evaluatedAt: new Date().toISOString(),
    engineName: 'AlertIQ Dual-Engine Benchmark Suite',
  };
}
