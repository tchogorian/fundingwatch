"use client";

import type { AnalysisResult } from "@/types/analysis";

function computeRiskScore(data: AnalysisResult): number {
  let score = 0;
  if (data.effective_apr >= 100) score += 40;
  else if (data.effective_apr >= 50) score += 25;
  else if (data.effective_apr >= 30) score += 15;
  if (data.has_confession_of_judgment) score += 25;
  if (data.has_personal_guarantee) score += 15;
  if (data.has_reconciliation_clause) score += 10;
  data.red_flags.forEach((f) => {
    if (f.severity === "critical") score += 8;
    else if (f.severity === "warning") score += 4;
  });
  return Math.min(100, score);
}

function scoreColor(score: number) {
  if (score >= 60) return "text-critical";
  if (score >= 30) return "text-warning";
  return "text-positive";
}

function strokeColor(score: number) {
  if (score >= 60) return "#C62828";
  if (score >= 30) return "#E65100";
  return "#2E7D32";
}

export default function RiskScoreRing({ data }: { data: AnalysisResult }) {
  const score = computeRiskScore(data);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
        Overall risk score
      </p>
      <div className="relative mt-4 flex items-center justify-center">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={strokeColor(score)}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span
          className={`absolute text-3xl font-bold ${scoreColor(score)}`}
        >
          {score}
        </span>
      </div>
      <p className="mt-2 text-base font-normal text-gray-600">
        {score >= 60
          ? "High risk — review carefully"
          : score >= 30
            ? "Moderate risk — understand your terms"
            : "Lower risk — standard terms"}
      </p>
    </div>
  );
}
