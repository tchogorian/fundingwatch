"use client";

import { useEffect, useState } from "react";
import type { AnalysisResult } from "@/types/analysis";

function computeRiskScore(data: AnalysisResult): number {
  if (data.overall_risk_score != null && data.overall_risk_score >= 1 && data.overall_risk_score <= 10) {
    return Math.round((data.overall_risk_score / 10) * 100);
  }
  let score = 0;
  const apr = data.effective_apr ?? 0;
  if (apr >= 100) score += 40;
  else if (apr >= 50) score += 25;
  else if (apr >= 30) score += 15;
  if (data.confession_of_judgment?.present) score += 25;
  if (data.personal_guarantee?.present) score += 15;
  if (data.reconciliation_clause?.present) score += 10;
  (data.red_flags || []).forEach((f) => {
    if (f.severity === "high") score += 8;
    else if (f.severity === "medium") score += 4;
  });
  return Math.min(100, score);
}

function scoreColor(score: number) {
  if (score >= 75) return "#DC2626";
  if (score >= 50) return "#D97706";
  if (score >= 30) return "#EAB308";
  return "#059669";
}

export default function RiskScoreRing({ data }: { data: AnalysisResult }) {
  const score = computeRiskScore(data);
  const [animatedScore, setAnimatedScore] = useState(0);
  const r = 72;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const duration = 1000;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setAnimatedScore(Math.round(p * score));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="12"
          />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke={scoreColor(score)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-[48px] font-bold text-dark-text">{animatedScore}</span>
          <span className="text-small text-muted">Risk Score</span>
        </div>
      </div>
    </div>
  );
}
