"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { getCertifiedLenders, getLenderFromIndexByName } from "@/lib/lenders";

const STORAGE_KEY = "analysisResult";

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

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [optInSuccess, setOptInSuccess] = useState(false);
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    monthly_revenue: "",
    current_advance_balance: "",
    looking_for: "" as "" | "refinance" | "new_capital" | "consolidation" | "just_comparing",
    consent: false,
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "error">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (optInSuccess && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [optInSuccess]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      setData(JSON.parse(raw) as AnalysisResult);
    } catch {
      router.replace("/");
    }
  }, [router]);

  const handleAnalyzeAnother = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
      router.push("/");
    }
  };

  const handleBrokerLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact_name.trim() || !form.email.trim() || !form.phone.trim() || !form.business_name.trim() || !form.monthly_revenue || !form.looking_for || !form.consent || !data) return;
    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/broker-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: form.business_name.trim(),
          contact_name: form.contact_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          monthly_revenue: form.monthly_revenue,
          current_advance_balance: form.current_advance_balance.trim() || undefined,
          looking_for: form.looking_for,
          consent: true,
          lender_name: data.lender_name ?? null,
          risk_score: data.overall_risk_score ?? null,
          effective_apr: data.effective_apr ?? null,
          red_flag_count: data.red_flags?.length ?? null,
          source: "results",
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setOptInSuccess(true);
      setModalOpen(false);
    } catch {
      setSubmitStatus("error");
    }
  };

  if (data === null) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--bg)" }}>
        <p style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Loading...</p>
      </div>
    );
  }

  const highRiskCount = data.red_flags?.filter((f) => f.severity === "high").length ?? 0;
  const sortedFlags = [...(data.red_flags || [])].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  if (optInSuccess) {
    return (
      <>
        <main className="min-h-screen px-6 md:px-8 py-16" style={{ background: "var(--bg)" }}>
          <div ref={successRef} className="mx-auto max-w-[560px] text-center">
            <div className="flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center border border-[var(--line)]"
                style={{ background: "var(--white)" }}
              >
                <CheckCircle className="h-12 w-12" style={{ color: "var(--green)" }} aria-hidden />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
              You&apos;re All Set
            </h1>
            <p className="mt-4 text-base" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
              A Debtura advisor will review your situation and reach out within 24 hours with options from our lender network.
            </p>
            <button
              type="button"
              onClick={handleAnalyzeAnother}
              className="btn-primary mt-10 inline-flex min-h-[48px] items-center justify-center px-8 py-3"
            >
              Analyze Another Contract
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen px-6 md:px-8 py-10 sm:py-12" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-[900px]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Analysis</span>
          </div>
          <h2 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Contract analysis results
          </h2>
          {/* Risk Score Header */}
          <section
            className="border border-[var(--line)] p-6 sm:p-8 relative"
            style={{ background: "var(--white)" }}
          >
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: riskScoreColor(data.overall_risk_score ?? 0) }} />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center text-2xl font-bold text-white border-0"
                  style={{ background: riskScoreColor(data.overall_risk_score ?? 0) }}
                >
                  {data.overall_risk_score ?? "—"}
                </div>
                <div>
                  <span
                    className="inline-block px-4 py-1.5 text-sm font-semibold text-white"
                    style={{ background: riskLabelBg(data.overall_risk_label ?? "Moderate Risk") }}
                  >
                    {data.overall_risk_label ?? "Moderate Risk"}
                  </span>
                  <p className="mt-2 text-2xl font-bold" style={{ fontFamily: "var(--font-sans)", color: data.effective_apr != null && data.effective_apr > 100 ? "var(--red)" : "var(--body)" }}>
                    Effective APR: {formatPct(data.effective_apr)}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
              {data.summary || "No summary available."}
            </p>
          </section>

          {/* Key Financial Terms */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
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
                  className="border border-[var(--line)] p-4"
                  style={{ background: "var(--white)" }}
                >
                  <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>{row.label}</p>
                  <p className="mt-1 font-semibold" style={{ color: "var(--body)" }}>{row.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contract Clauses */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
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
                    className="border border-[var(--line)] p-4"
                    style={{ background: "var(--white)" }}
                  >
                    <div className="flex items-center gap-3">
                      {present ? (
                        <XCircle className="h-6 w-6 shrink-0" style={{ color: "var(--danger)" }} aria-hidden />
                      ) : (
                        <Check className="h-6 w-6 shrink-0" style={{ color: "var(--green)" }} aria-hidden />
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
                      className="flex gap-4 border border-[var(--line)] p-4"
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

          {/* How Does Your Lender Compare? */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
              How Does Your Lender Compare?
            </h2>
            {(() => {
              const indexLender = getLenderFromIndexByName(data.lender_name ?? null);
              const certified = getCertifiedLenders(2);
              return (
                <div className="mt-4 space-y-4">
                  {indexLender ? (
                    <div
                      className="border border-[var(--line)] p-4"
                      style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{indexLender.name}</span>
                        {indexLender.fw_rating && (
                          <span
                            className="px-3 py-1 text-sm font-semibold text-white"
                            style={{
                              background:
                                indexLender.fw_rating === "certified"
                                  ? "var(--accent-green)"
                                  : indexLender.fw_rating === "caution"
                                    ? "var(--accent-yellow)"
                                    : indexLender.fw_rating === "warning"
                                      ? "var(--warning)"
                                      : "var(--danger)",
                            }}
                          >
                            {indexLender.fw_rating.charAt(0).toUpperCase() + indexLender.fw_rating.slice(1)}
                          </span>
                        )}
                        <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                          Risk score: {indexLender.severity_score}/100
                        </span>
                      </div>
                      {indexLender.top_red_flags && indexLender.top_red_flags.length > 0 && (
                        <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                          Top concerns: {indexLender.top_red_flags.join("; ")}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      We don&apos;t have data on this lender yet. Your contract-level red flags are shown above.
                    </p>
                  )}
                  {certified.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium" style={{ color: "var(--color-text-tertiary)" }}>Certified lenders for comparison</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {certified.map((l) => (
                          <div
                            key={l.id}
                            className="flex items-center gap-3 border border-[var(--line)] p-4"
                            style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center" style={{ background: "var(--green)", color: "white" }}>
                              <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{l.name}</p>
                              <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{l.headline_stat}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </section>

          {/* Post-analysis fork */}
          {(() => {
            const riskScore = data.overall_risk_score ?? 0;
            const redFlagCount = data.red_flags?.length ?? 0;
            const indexLender = getLenderFromIndexByName(data.lender_name ?? null);
            const lenderBad = indexLender && (indexLender.fw_rating === "warning" || indexLender.fw_rating === "avoid");
            const lenderCaution = indexLender && indexLender.fw_rating === "caution";
            const lenderCertified = indexLender && indexLender.fw_rating === "certified";
            const aprDisplay = data.effective_apr != null ? data.effective_apr.toFixed(1) : "—";
            const certifiedLenders = getCertifiedLenders(2);

            const isForkA = riskScore >= 6 || lenderBad || redFlagCount >= 2;
            const isForkB = !isForkA && (riskScore >= 3 || riskScore <= 5 || lenderCaution || redFlagCount === 1);
            const isForkC = !isForkA && !isForkB;

            if (isForkA) {
              return (
                <section
                  className="mt-12 border border-[var(--line)] p-6 sm:p-8"
                  style={{ background: "var(--bg-dark)", borderColor: "var(--border-dark)" }}
                >
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    Your contract has {redFlagCount} red flag{redFlagCount !== 1 ? "s" : ""} and an effective APR of {aprDisplay}%.
                  </h2>
                  <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--on-dark-2)" }}>
                    See how your terms compare to lenders in our network — no obligation.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 font-semibold text-white border-0 transition hover:opacity-95"
                      style={{ background: "var(--accent-blue)" }}
                    >
                      See Better Options
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex min-h-[48px] items-center justify-center border-2 border-white/60 bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                    >
                      Talk to a Debtura Advisor
                    </button>
                  </div>
                  {certifiedLenders.length > 0 && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {certifiedLenders.map((l) => (
                        <div
                          key={l.id}
                          className="flex items-center gap-3 border border-white/20 p-4"
                        >
                          <ShieldCheck className="h-6 w-6 shrink-0 text-white" />
                          <div>
                            <p className="font-semibold text-white">{l.name}</p>
                            <p className="text-sm" style={{ color: "var(--on-dark-2)" }}>{l.headline_stat}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-xs" style={{ color: "var(--on-dark-3)" }}>
                    <Link href="/privacy" className="underline hover:no-underline">Privacy Policy</Link>
                    {" · "}
                    <Link href="/terms" className="underline hover:no-underline">Terms</Link>
                  </p>
                </section>
              );
            }
            if (isForkB) {
              return (
                <section
                  className="mt-12 border border-[var(--line)] p-6 sm:p-8"
                  style={{ background: "var(--bg-dark)", borderColor: "var(--border-dark)" }}
                >
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    Your terms are within market range but there may be room for improvement.
                  </h2>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="mt-6 inline-flex min-h-[48px] items-center justify-center px-6 py-3 font-semibold text-white border-0 transition hover:opacity-95"
                    style={{ background: "var(--accent-blue)" }}
                  >
                    Compare Lenders
                  </button>
                  <p className="mt-4 text-xs" style={{ color: "var(--on-dark-3)" }}>
                    <Link href="/privacy" className="underline hover:no-underline">Privacy Policy</Link>
                    {" · "}
                    <Link href="/terms" className="underline hover:no-underline">Terms</Link>
                  </p>
                </section>
              );
            }
            return (
              <section
                className="mt-12 border border-[var(--line)] p-6 sm:p-8"
                style={{ background: "var(--bg-dark)", borderColor: "var(--border-dark)" }}
              >
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  Your contract terms look solid.
                  {lenderCertified && data.lender_name && (
                    <> {data.lender_name} is a Certified lender in our Lender Risk Index.</>
                  )}
                </h2>
                <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--on-dark-2)" }}>
                  Bookmark Debtura — we&apos;re here when you need us.
                </p>
                <Link
                  href="/lender-risk-index"
                  className="mt-6 inline-block text-sm font-medium text-white underline hover:no-underline"
                >
                  Browse Lender Risk Index →
                </Link>
              </section>
            );
          })()}
        </div>
      </main>

      {/* Broker intake modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-[var(--line)] p-6 sm:p-8"
            style={{ background: "var(--bg-white)", borderColor: "var(--color-border-default)" }}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 rounded p-1 transition hover:opacity-70"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 id="modal-title" className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Explore Better Options
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              A Debtura advisor will reach out with options from our lender network. No cost, no obligation.
            </p>
            <form onSubmit={handleBrokerLeadSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="broker-business" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Business name</label>
                <input
                  id="broker-business"
                  type="text"
                  value={form.business_name}
                  onChange={(e) => setForm((f) => ({ ...f, business_name: e.target.value }))}
                  className="mt-1 h-11 w-full border border-[var(--line)] px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
              </div>
              <div>
                <label htmlFor="broker-contact" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Contact name</label>
                <input
                  id="broker-contact"
                  type="text"
                  value={form.contact_name}
                  onChange={(e) => setForm((f) => ({ ...f, contact_name: e.target.value }))}
                  className="mt-1 h-11 w-full border border-[var(--line)] px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
              </div>
              <div>
                <label htmlFor="broker-email" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Email</label>
                <input
                  id="broker-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 h-11 w-full border border-[var(--line)] px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
              </div>
              <div>
                <label htmlFor="broker-phone" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Phone</label>
                <input
                  id="broker-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="mt-1 h-11 w-full border border-[var(--line)] px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
              </div>
              <div>
                <label htmlFor="broker-revenue" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Monthly revenue</label>
                <select
                  id="broker-revenue"
                  value={form.monthly_revenue}
                  onChange={(e) => setForm((f) => ({ ...f, monthly_revenue: e.target.value }))}
                  className="mt-1 h-11 w-full border border-[var(--line)] px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                >
                  <option value="">Select</option>
                  <option value="under_15k">Under $15K</option>
                  <option value="15_30k">$15–30K</option>
                  <option value="30_50k">$30–50K</option>
                  <option value="50_100k">$50–100K</option>
                  <option value="100k_plus">$100K+</option>
                </select>
              </div>
              <div>
                <label htmlFor="broker-balance" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Current advance balance (optional)</label>
                <input
                  id="broker-balance"
                  type="text"
                  value={form.current_advance_balance}
                  onChange={(e) => setForm((f) => ({ ...f, current_advance_balance: e.target.value }))}
                  className="mt-1 h-11 w-full border border-[var(--line)] px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  placeholder="e.g. $25,000"
                />
              </div>
              <div>
                <span className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>What are you looking for?</span>
                <div className="mt-2 space-y-2">
                  {[
                    { value: "refinance", label: "Refinance" },
                    { value: "new_capital", label: "New capital" },
                    { value: "consolidation", label: "Consolidation" },
                    { value: "just_comparing", label: "Just comparing" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="looking_for"
                        value={opt.value}
                        checked={form.looking_for === opt.value}
                        onChange={(e) => setForm((f) => ({ ...f, looking_for: e.target.value as typeof form.looking_for }))}
                        style={{ accentColor: "var(--color-accent-primary)" }}
                        required
                      />
                      <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                    className="mt-1 h-4 w-4 rounded"
                    style={{ accentColor: "var(--color-accent-primary)" }}
                    required
                  />
                  <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>
                    I consent to Debtura sharing my information with its lender network to provide me with financing options. I understand Debtura may receive compensation from lenders for this service. This does not affect my cost.{" "}
                    <Link href="/privacy" className="font-medium underline" style={{ color: "var(--color-accent-primary)" }}>Privacy Policy</Link>
                    {" | "}
                    <Link href="/terms" className="font-medium underline" style={{ color: "var(--color-accent-primary)" }}>Terms</Link>
                  </span>
                </label>
              </div>
              {submitStatus === "error" && (
                <p className="text-sm font-medium" style={{ color: "var(--danger)" }}>Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={submitStatus === "submitting" || !form.contact_name.trim() || !form.email.trim() || !form.phone.trim() || !form.business_name.trim() || !form.monthly_revenue || !form.looking_for || !form.consent}
                className="mt-4 flex h-12 w-full items-center justify-center font-semibold text-white disabled:opacity-50 border-0"
                style={{ background: "var(--accent-blue)" }}
              >
                {submitStatus === "submitting" ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
