import { describe, it, expect } from 'vitest';
import { runBenchmarkEvaluation } from './evaluationRunner';

describe('AlertIQ Benchmark & Metric Evaluation', () => {
  it('evaluates all 20 test dataset items and computes measurable metrics', () => {
    const metrics = runBenchmarkEvaluation();

    expect(metrics.totalSamples).toBe(20);
    expect(metrics.accuracy).toBeGreaterThanOrEqual(0.8);
    expect(metrics.precision).toBeGreaterThanOrEqual(0.8);
    expect(metrics.recall).toBeGreaterThanOrEqual(0.8);
    expect(metrics.f1Score).toBeGreaterThanOrEqual(0.8);

    // Verify confusion matrix properties
    const totalMatrix =
      metrics.confusionMatrix.truePositive +
      metrics.confusionMatrix.falsePositive +
      metrics.confusionMatrix.trueNegative +
      metrics.confusionMatrix.falseNegative;
    expect(totalMatrix).toBe(20);
  });
});
