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

function aprPillStyle(apr: number | null) {
  if (apr == null) return "bg-muted/20 text-muted";
  if (apr > 100) return "bg-danger text-white";
  if (apr >= 50) return "bg-warning text-white";
  return "bg-success text-white";
}

export default function SummaryCard({ data }: { data: AnalysisResult }) {
  const apr = data.effective_apr;
  return (
    <div className="rounded-card border border-border bg-primary p-8 shadow-card">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-subhead-desktop font-semibold text-dark-text">
            {data.lender_name ?? "Unknown lender"}
          </h3>
          <p className="mt-4 text-small text-muted">Effective APR</p>
          <span
            className={`mt-2 inline-flex rounded-button px-4 py-2 text-[48px] font-bold ${aprPillStyle(apr)}`}
          >
            {apr != null ? apr.toFixed(1) + "%" : "—"}
          </span>
        </div>
        <div>
          <p className="text-small text-muted">Advance → Repayment</p>
          <p className="mt-1 flex items-center gap-1 text-subhead-desktop font-semibold text-dark-text">
            {formatCurrency(data.funded_amount ?? 0)}
            <ArrowRight className="h-6 w-6 text-muted" />
            {formatCurrency(data.payback_amount ?? 0)}
          </p>
          <p className="mt-4 text-body text-dark-text">
            {data.daily_payment != null ? formatCurrency(data.daily_payment) : "—"}/day
            {data.estimated_term_months != null ? ` · ~${data.estimated_term_months} mo` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
