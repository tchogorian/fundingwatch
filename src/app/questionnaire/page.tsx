"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
];

const LENDER_COUNT_OPTIONS = [1, 2, 3, 4, "5+"] as const;
const TOTAL_OWED_RANGES = [
  { value: "10k-25k", label: "$10K – $25K" },
  { value: "25k-50k", label: "$25K – $50K" },
  { value: "50k-100k", label: "$50K – $100K" },
  { value: "100k-250k", label: "$100K – $250K" },
  { value: "250k+", label: "$250K+" },
] as const;
const PAYMENT_STATUS_OPTIONS = [
  { value: "current", label: "Current" },
  { value: "behind", label: "Behind" },
  { value: "missed", label: "Missed payments" },
  { value: "legal_threat", label: "Lender is threatening legal action" },
] as const;
const CONSIDERING_ANOTHER_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "in_process", label: "Already in process" },
] as const;
const CARD_PERCENTAGE_OPTIONS = [
  { value: "0-25%", label: "0–25%" },
  { value: "25-50%", label: "25–50%" },
  { value: "50-75%", label: "50–75%" },
  { value: "75-100%", label: "75–100%" },
] as const;

const STORAGE_KEY = "questionnaireAssessment";

export default function QuestionnairePage() {
  const router = useRouter();
  const [section, setSection] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    // Section 1
    name: "",
    businessName: "",
    businessDescription: "",
    state: "",
    phone: "",
    email: "",
    // Section 2
    lenderNames: "",
    lenderCount: 1 as number | "5+",
    totalPayment: "",
    paymentFrequency: "daily" as "daily" | "weekly",
    totalOwedRange: "" as string,
    paymentStatus: "" as string,
    consideringAnotherMca: "" as string,
    cardPaymentPercentage: "" as string,
  });

  const validateSection1 = (): boolean => {
    if (!form.name.trim()) return false;
    if (!form.businessName.trim()) return false;
    if (!form.businessDescription.trim()) return false;
    if (!form.state) return false;
    if (!form.phone.trim()) return false;
    if (!form.email.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return false;
    return true;
  };

  const validateSection2 = (): boolean => {
    if (!form.lenderNames.trim()) return false;
    if (form.lenderCount === undefined) return false;
    const payment = Number(form.totalPayment);
    if (!Number.isFinite(payment) || payment < 0) return false;
    if (!form.totalOwedRange) return false;
    if (!form.paymentStatus) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (section === 1) {
      if (!validateSection1()) return;
      setSection(2);
      return;
    }
    if (!validateSection2()) return;
    setStatus("submitting");
    setError(null);
    try {
      const lenderCountNum = form.lenderCount === "5+" ? 5 : form.lenderCount;
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          businessName: form.businessName.trim(),
          businessDescription: form.businessDescription.trim(),
          state: form.state,
          phone: form.phone.trim(),
          email: form.email.trim(),
          lenderNames: form.lenderNames.trim(),
          lenderCount: lenderCountNum,
          totalPayment: Number(form.totalPayment),
          paymentFrequency: form.paymentFrequency,
          totalOwedRange: form.totalOwedRange,
          paymentStatus: form.paymentStatus,
          consideringAnotherMca: form.consideringAnotherMca || null,
          cardPaymentPercentage: form.cardPaymentPercentage || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong");
      }
      const data = await res.json();
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      router.push("/questionnaire/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setStatus("error");
    }
  };

  return (
    <>
      <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-12" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[640px]">
          <Link
            href="/"
            className="text-sm font-medium transition hover:underline"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ← Back to FundingWatch
          </Link>
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>
            Quick MCA Assessment
          </h1>
          <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            No contract needed. Answer a few questions and we&apos;ll give you a personalized snapshot based on what we know about your lenders and situation.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            {section === 1 && (
              <section
                className="rounded-xl border p-6 sm:p-8"
                style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
              >
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  About you
                </h2>
                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Your name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-1.5 h-11 w-full rounded-lg border px-3"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                      placeholder="First and last"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Business name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      required
                      value={form.businessName}
                      onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                      className="mt-1.5 h-11 w-full rounded-lg border px-3"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="businessDescription" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      What does your business do? <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="businessDescription"
                      required
                      rows={3}
                      value={form.businessDescription}
                      onChange={(e) => setForm((f) => ({ ...f, businessDescription: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border px-3 py-2"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                      placeholder="1–2 sentences"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      State <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="state"
                      required
                      value={form.state}
                      onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                      className="mt-1.5 h-11 w-full rounded-lg border px-3"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                    >
                      <option value="">Select state</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="mt-1.5 h-11 w-full rounded-lg border px-3"
                        style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="mt-1.5 h-11 w-full rounded-lg border px-3"
                        style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {section === 2 && (
              <section
                className="rounded-xl border p-6 sm:p-8"
                style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
              >
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  Your MCA situation
                </h2>
                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="lenderNames" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Who are your MCA lenders? <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="lenderNames"
                      required
                      rows={2}
                      value={form.lenderNames}
                      onChange={(e) => setForm((f) => ({ ...f, lenderNames: e.target.value }))}
                      className="mt-1.5 w-full rounded-lg border px-3 py-2"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                      placeholder="e.g. Yellowstone Capital, Pearl Capital"
                    />
                    <p className="mt-1 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                      List all current MCA lenders.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="lenderCount" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      How many MCA lenders do you currently have? <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="lenderCount"
                      required
                      value={form.lenderCount}
                      onChange={(e) => setForm((f) => ({ ...f, lenderCount: e.target.value === "5+" ? "5+" : Number(e.target.value) }))}
                      className="mt-1.5 h-11 w-full rounded-lg border px-3"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                    >
                      {LENDER_COUNT_OPTIONS.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Total daily or weekly MCA payments <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <span className="text-[var(--color-text-secondary)]">$</span>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        required
                        value={form.totalPayment}
                        onChange={(e) => setForm((f) => ({ ...f, totalPayment: e.target.value }))}
                        className="h-11 w-32 rounded-lg border px-3"
                        style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentFrequency"
                          checked={form.paymentFrequency === "daily"}
                          onChange={() => setForm((f) => ({ ...f, paymentFrequency: "daily" }))}
                          className="h-4 w-4"
                          style={{ accentColor: "var(--color-accent-primary)" }}
                        />
                        <span style={{ color: "var(--color-text-primary)" }}>Daily</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentFrequency"
                          checked={form.paymentFrequency === "weekly"}
                          onChange={() => setForm((f) => ({ ...f, paymentFrequency: "weekly" }))}
                          className="h-4 w-4"
                          style={{ accentColor: "var(--color-accent-primary)" }}
                        />
                        <span style={{ color: "var(--color-text-primary)" }}>Weekly</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="totalOwedRange" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Roughly how much do you still owe across all MCAs? <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="totalOwedRange"
                      required
                      value={form.totalOwedRange}
                      onChange={(e) => setForm((f) => ({ ...f, totalOwedRange: e.target.value }))}
                      className="mt-1.5 h-11 w-full rounded-lg border px-3"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                    >
                      <option value="">Select range</option>
                      {TOTAL_OWED_RANGES.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Are you current on your MCA payments? <span className="text-red-600">*</span>
                    </span>
                    <div className="mt-2 space-y-2">
                      {PAYMENT_STATUS_OPTIONS.map((o) => (
                        <label key={o.value} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentStatus"
                            required
                            value={o.value}
                            checked={form.paymentStatus === o.value}
                            onChange={() => setForm((f) => ({ ...f, paymentStatus: o.value }))}
                            className="h-4 w-4"
                            style={{ accentColor: "var(--color-accent-primary)" }}
                          />
                          <span style={{ color: "var(--color-text-primary)" }}>{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Are you considering taking on another MCA?
                    </span>
                    <div className="mt-2 flex flex-wrap gap-4">
                      {CONSIDERING_ANOTHER_OPTIONS.map((o) => (
                        <label key={o.value} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="consideringAnotherMca"
                            value={o.value}
                            checked={form.consideringAnotherMca === o.value}
                            onChange={() => setForm((f) => ({ ...f, consideringAnotherMca: o.value }))}
                            className="h-4 w-4"
                            style={{ accentColor: "var(--color-accent-primary)" }}
                          />
                          <span style={{ color: "var(--color-text-primary)" }}>{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardPaymentPercentage" className="block text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      What percentage of your revenue comes from credit/debit card or electronic payments?
                    </label>
                    <select
                      id="cardPaymentPercentage"
                      value={form.cardPaymentPercentage}
                      onChange={(e) => setForm((f) => ({ ...f, cardPaymentPercentage: e.target.value }))}
                      className="mt-1.5 h-11 w-full rounded-lg border px-3"
                      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)", background: "var(--color-bg-base)" }}
                    >
                      <option value="">Select</option>
                      {CARD_PERCENTAGE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
            )}

            {error && (
              <p className="text-sm font-medium" style={{ color: "var(--danger)" }} role="alert">
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {section === 2 && (
                <button
                  type="button"
                  onClick={() => setSection(1)}
                  className="text-sm font-medium transition hover:underline"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  ← Back
                </button>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary inline-flex min-h-[48px] items-center justify-center px-8 py-3 disabled:opacity-70"
              >
                {status === "submitting" ? "Calculating…" : section === 1 ? "Continue" : "See my assessment"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
