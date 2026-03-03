"use client";

import type { AnalysisResult } from "@/types/analysis";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function aprPillStyle(apr: number) {
  if (apr < 30)
    return "bg-positive/20 text-positive ring-2 ring-positive/40";
  if (apr <= 100)
    return "bg-amber-100 text-amber-800 ring-2 ring-amber-300";
  return "bg-red-100 text-critical ring-2 ring-critical/50";
}

export default function SummaryCard({ data }: { data: AnalysisResult }) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-xl font-semibold text-gray-900">{data.lender_name}</h3>
      <div className="mt-6 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-sm font-semibold text-gray-500">Effective APR</p>
          <span
            className={`mt-3 inline-flex items-baseline rounded-2xl px-6 py-3 text-5xl font-bold sm:text-6xl md:text-7xl ${aprPillStyle(data.effective_apr)}`}
          >
            {data.effective_apr.toFixed(1)}%
          </span>
        </div>
        <div className="border-l border-gray-200 pl-6">
          <p className="text-sm font-semibold text-gray-500">
            Advance → Repayment
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatCurrency(data.advance_amount)} →{" "}
            {formatCurrency(data.repayment_amount)}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-6 text-base">
        <span className="font-normal text-gray-600">
          <span className="font-semibold text-gray-900">Payment:</span>{" "}
          {formatCurrency(data.payment_amount)} / {data.payment_frequency}
        </span>
        <span className="font-normal text-gray-600">
          <span className="font-semibold text-gray-900">Est. term:</span> ~
          {data.estimated_term_days} days
        </span>
      </div>
    </div>
  );
}
