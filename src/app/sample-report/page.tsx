"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  XCircle,
} from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";

function formatCurrency(val: number | null): string {
  if (val == null) return "Not found";
  return "$" + val.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatPct(val: number | null): string {
  if (val == null) return "Not found";
  return val.toFixed(1) + "%";
}

function formatFactor(val: number | null): string {
  if (val == null) return "Not found";
  return val.toFixed(2) + "x";
}

function riskScoreColor(score: number): string {
  if (score >= 8) return "var(--danger)";
  if (score >= 6) return "var(--warning)";
  if (score >= 4) return "var(--accent-yellow)";
  return "var(--accent-green)";
}

function riskLabelBg(label: AnalysisResult["overall_risk_label"]): string {
  if (label === "Very High Risk") return "var(--danger)";
  if (label === "High Risk") return "var(--danger)";
  if (label === "Moderate Risk") return "var(--warning)";
  return "var(--accent-green)";
}

const severityConfig = {
  high: { color: "var(--danger)", Icon: AlertCircle, label: "High" },
  medium: { color: "var(--warning)", Icon: AlertTriangle, label: "Medium" },
  low: { color: "var(--accent-blue)", Icon: Info, label: "Low" },
} as const;

const SAMPLE_RESULT: AnalysisResult = {
  summary:
    "This sample contract shows a $25,000 advance with a 1.28 factor rate and a high effective APR. The agreement includes a confession of judgment and personal guarantee, which increase risk. Daily holdback is 12% of card sales.",
  funded_amount: 25000,
  payback_amount: 32000,
  factor_rate: 1.28,
  effective_apr: 127.4,
  daily_payment: 420,
  weekly_payment: 2100,
  estimated_term_months: 4,
  lender_name: "Sample Funding Co.",
  business_name: "Sample Business LLC",
  signing_date: null,
  red_flags: [
    {
      severity: "high",
      flag: "Confession of judgment present",
      description: "You may waive notice and hearing before a judgment is entered against you.",
    },
    {
      severity: "high",
      flag: "Personal guarantee required",
      description: "Your personal assets may be at risk if the business cannot repay.",
    },
    {
      severity: "medium",
      flag: "Effective APR over 100%",
      description: "The annualized cost of this advance is very high compared to traditional loans.",
    },
  ],
  key_terms: [],
  confession_of_judgment: {
    present: true,
    explanation: "The contract contains a confession of judgment clause that can allow the funder to obtain a judgment without a court hearing.",
  },
  personal_guarantee: {
    present: true,
    explanation: "The business owner is personally liable for repayment.",
  },
  reconciliation_clause: {
    present: false,
    explanation: null,
  },
  stacking_prohibition: {
    present: true,
    explanation: "The contract restricts taking additional MCAs or similar financing during the term.",
  },
  overall_risk_score: 7,
  overall_risk_label: "High Risk",
  recommended_actions: [
    "Explore better options through our lender network; for legal questions, consult a business attorney.",
    "Request removal or limitation of the confession of judgment if possible.",
    "Compare this offer with other funding options and calculate true cost.",
  ],
};

export default function SampleReportPage() {
  const data = SAMPLE_RESULT;
  const sortedFlags = [...(data.red_flags || [])].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <>
      <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-12" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[900px]">
          <Link
            href="/"
            className="text-sm font-medium transition hover:underline"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ← Back to FundingWatch
          </Link>

          <div
            className="mt-4 rounded-xl border p-4"
            style={{ background: "var(--color-accent-muted)", borderColor: "var(--color-border-default)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
              This is a sample report. Upload your own MCA contract to get a personalized analysis.
            </p>
            <Link
              href="/#upload"
              className="mt-2 inline-block text-sm font-semibold transition hover:underline"
              style={{ color: "var(--color-accent-primary)" }}
            >
              Analyze your contract →
            </Link>
          </div>

          {/* Risk Score Header */}
          <section
            className="mt-8 rounded-xl border p-6 sm:p-8"
            style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
                  style={{ background: riskScoreColor(data.overall_risk_score ?? 0) }}
                >
                  {data.overall_risk_score ?? "—"}
                </div>
                <div>
                  <span
                    className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold text-white"
                    style={{ background: riskLabelBg(data.overall_risk_label ?? "Moderate Risk") }}
                  >
                    {data.overall_risk_label ?? "Moderate Risk"}
                  </span>
                  <p className="mt-2 text-2xl font-bold" style={{ color: data.effective_apr != null && data.effective_apr > 100 ? "var(--danger)" : "var(--color-text-primary)" }}>
                    Effective APR: {formatPct(data.effective_apr)}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {data.summary || "No summary available."}
            </p>
          </section>

          {/* Key Financial Terms */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Key Financial Terms
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { label: "Funded Amount", value: formatCurrency(data.funded_amount) },
                { label: "Payback Amount", value: formatCurrency(data.payback_amount) },
                { label: "Factor Rate", value: formatFactor(data.factor_rate) },
                { label: "Daily Payment", value: formatCurrency(data.daily_payment) },
                { label: "Est. Term", value: data.estimated_term_months != null ? `${data.estimated_term_months} mo` : "Not found" },
                { label: "Effective APR", value: formatPct(data.effective_apr) },
              ].map((row) => (
                <div
                  key={row.label}
                  className="rounded-xl border p-4"
                  style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
                >
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-tertiary)" }}>{row.label}</p>
                  <p className="mt-1 font-semibold" style={{ color: "var(--color-text-primary)" }}>{row.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contract Clauses */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Contract Clauses
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { key: "confession_of_judgment", label: "Confession of Judgment" },
                { key: "personal_guarantee", label: "Personal Guarantee" },
                { key: "reconciliation_clause", label: "Reconciliation Clause" },
                { key: "stacking_prohibition", label: "Stacking Prohibition" },
              ].map(({ key, label }) => {
                const clause = data[key as keyof AnalysisResult] as { present?: boolean; explanation?: string | null } | undefined;
                const present = clause && typeof clause === "object" && clause.present;
                return (
                  <div
                    key={key}
                    className="rounded-xl border p-4"
                    style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
                  >
                    <div className="flex items-center gap-3">
                      {present ? (
                        <XCircle className="h-6 w-6 shrink-0" style={{ color: "var(--danger)" }} aria-hidden />
                      ) : (
                        <Check className="h-6 w-6 shrink-0" style={{ color: "var(--accent-green)" }} aria-hidden />
                      )}
                      <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{label}</span>
                    </div>
                    {clause?.explanation && (
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        {clause.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Red Flags */}
          {sortedFlags.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Red Flags ({sortedFlags.length})
              </h2>
              <div className="mt-4 space-y-3">
                {sortedFlags.map((flag, i) => {
                  const config = severityConfig[flag.severity];
                  const Icon = config.Icon;
                  return (
                    <div
                      key={i}
                      className="flex gap-4 rounded-xl border p-4"
                      style={{
                        background: "var(--bg-light)",
                        borderColor: "var(--color-border-default)",
                        borderLeftWidth: "4px",
                        borderLeftColor: config.color,
                      }}
                    >
                      <Icon className="h-5 w-5 shrink-0" style={{ color: config.color }} aria-hidden />
                      <div>
                        <span className="rounded px-2 py-0.5 text-xs font-semibold text-white" style={{ background: config.color }}>
                          {config.label}
                        </span>
                        <p className="mt-1 font-semibold" style={{ color: "var(--color-text-primary)" }}>{flag.flag}</p>
                        {flag.description && (
                          <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>{flag.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Recommended Actions */}
          {data.recommended_actions?.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Recommended Actions
              </h2>
              <ol className="mt-4 list-inside list-decimal space-y-2 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
                {data.recommended_actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ol>
            </section>
          )}

          <section
            className="mt-12 rounded-xl border p-6 sm:p-8"
            style={{ background: "var(--bg-dark)", borderColor: "var(--border-dark)" }}
          >
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Get your own free report
            </h2>
            <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--on-dark-2)" }}>
              Upload your MCA contract for a personalized analysis in under 30 seconds.
            </p>
            <Link
              href="/#upload"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95"
              style={{ background: "var(--accent-blue)" }}
            >
              Analyze your contract
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
