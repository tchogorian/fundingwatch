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
    return "bg-positive/15 text-positive ring-1 ring-positive/30";
  if (apr <= 100)
    return "bg-warning/15 text-warning ring-1 ring-warning/30";
  return "bg-critical/15 text-critical ring-1 ring-critical/30";
}

export default function SummaryCard({ data }: { data: AnalysisResult }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
      <h3 className="text-xl font-semibold text-gray-900">{data.lender_name}</h3>
      <div className="mt-6 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-sm font-semibold text-gray-500">Effective APR</p>
          <span
            className={`mt-2 inline-flex items-baseline rounded-full px-4 py-2 text-4xl font-bold sm:text-5xl ${aprPillStyle(data.effective_apr)}`}
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
