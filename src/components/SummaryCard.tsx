"use client";

import type { AnalysisResult } from "@/types/analysis";
import { ArrowRight } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function aprPillStyle(apr: number) {
  if (apr > 100) return "bg-danger text-white";
  if (apr >= 50) return "bg-warning text-white";
  return "bg-success text-white";
}

export default function SummaryCard({ data }: { data: AnalysisResult }) {
  return (
    <div className="rounded-card border border-border bg-primary p-8 shadow-card">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-subhead-desktop font-semibold text-dark-text">
            {data.lender_name}
          </h3>
          <p className="mt-4 text-small text-muted">Effective APR</p>
          <span
            className={`mt-2 inline-flex rounded-button px-4 py-2 text-[48px] font-bold ${aprPillStyle(data.effective_apr)}`}
          >
            {data.effective_apr.toFixed(1)}%
          </span>
        </div>
        <div>
          <p className="text-small text-muted">Advance → Repayment</p>
          <p className="mt-1 flex items-center gap-1 text-subhead-desktop font-semibold text-dark-text">
            {formatCurrency(data.advance_amount)}
            <ArrowRight className="h-6 w-6 text-muted" />
            {formatCurrency(data.repayment_amount)}
          </p>
          <p className="mt-4 text-body text-dark-text">
            {formatCurrency(data.payment_amount)}/{data.payment_frequency} · ~{data.estimated_term_days} days
          </p>
        </div>
      </div>
    </div>
  );
}
