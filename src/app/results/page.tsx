"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  XCircle,
} from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";

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
    name: "",
    email: "",
    phone: "",
    business: "",
    consent: false,
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "error">("idle");

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

  const handleOptInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.business.trim() || !form.consent) return;
    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          business: form.business.trim(),
          consent: true,
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
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--color-bg-base)" }}>
        <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>
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
        <main className="min-h-screen px-4 py-16" style={{ background: "var(--color-bg-base)" }}>
          <div className="mx-auto max-w-[560px] text-center">
            <div className="flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: "var(--color-accent-muted)" }}
              >
                <CheckCircle className="h-12 w-12" style={{ color: "var(--accent-green)" }} aria-hidden />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
              You&apos;re All Set
            </h1>
            <p className="mt-4 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
              A licensed professional will review your contract and reach out within 1–2 business days. Check your email for a confirmation.
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-12" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[900px]">
          {/* Risk Score Header */}
          <section
            className="rounded-xl border p-6 sm:p-8"
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

          {/* CTA Banner */}
          <section
            className="mt-12 rounded-xl border p-6 sm:p-8"
            style={{ background: "var(--bg-dark)", borderColor: "var(--border-dark)" }}
          >
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Want a Licensed Professional to Review?
            </h2>
            <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--on-dark-2)" }}>
              Our analysis found {highRiskCount > 0 ? highRiskCount + " critical flags" : "several items to review"}. A licensed attorney can advise you on your options — no cost, no obligation.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95"
              style={{ background: "var(--accent-blue)" }}
            >
              Yes, I&apos;d Like a Free Professional Review
            </button>
            <p className="mt-4 text-xs" style={{ color: "var(--on-dark-3)" }}>
              <Link href="/privacy" className="underline hover:no-underline">Privacy Policy</Link>
              {" · "}
              <Link href="/terms" className="underline hover:no-underline">Terms</Link>
            </p>
          </section>
        </div>
      </main>

      {/* Opt-in Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border p-6 sm:p-8"
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
              Get a Free Professional Review
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              A licensed attorney will review your contract and advise you on your options.
            </p>
            <form onSubmit={handleOptInSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="optin-name" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Full Name</label>
                <input
                  id="optin-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 h-11 w-full rounded-lg border px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
              </div>
              <div>
                <label htmlFor="optin-email" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Email</label>
                <input
                  id="optin-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 h-11 w-full rounded-lg border px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
              </div>
              <div>
                <label htmlFor="optin-phone" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Phone</label>
                <input
                  id="optin-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="mt-1 h-11 w-full rounded-lg border px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
              </div>
              <div>
                <label htmlFor="optin-business" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>Business Name</label>
                <input
                  id="optin-business"
                  type="text"
                  value={form.business}
                  onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
                  className="mt-1 h-11 w-full rounded-lg border px-3 text-base"
                  style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                  required
                />
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
                    I consent to being contacted by a licensed attorney or their representative regarding my merchant cash advance contract. I understand my information will be shared with a legal professional for the purpose of reviewing my contract. I may revoke this consent at any time.{" "}
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
                disabled={submitStatus === "submitting" || !form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.business.trim() || !form.consent}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-full font-semibold text-white disabled:opacity-50"
                style={{ background: "var(--accent-blue)" }}
              >
                {submitStatus === "submitting" ? "Submitting..." : "Submit — Get My Free Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
