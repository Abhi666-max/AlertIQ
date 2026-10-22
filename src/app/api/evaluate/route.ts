import { NextResponse } from 'next/server';
import { runBenchmarkEvaluation } from '@/lib/evaluationRunner';

export async function GET() {
  const metrics = runBenchmarkEvaluation();
  return NextResponse.json(metrics, { status: 200 });
}
