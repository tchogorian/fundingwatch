"use client";

import { useState } from "react";
import { Lock, ArrowRight, Shield, CheckCircle } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";

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

interface OptInFormProps {
  analysisData: AnalysisResult | null;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  state: string;
  consent: boolean;
}

export default function OptInForm({ analysisData }: OptInFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    state: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.businessName.trim()) next.businessName = "Required";
    if (!form.state) next.state = "Required";
    if (!form.consent) next.consent = "You must consent to be contacted.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          business_name: form.businessName,
          state: form.state,
          consent_timestamp: new Date().toISOString(),
          analysis_data: analysisData,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="section-card" aria-label="Submission complete">
        <div className="mx-auto max-w-[560px] px-4 text-center sm:px-6">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "var(--color-accent-muted)" }}>
              <CheckCircle className="h-12 w-12" style={{ color: "var(--color-accent-primary)" }} aria-hidden />
            </div>
          </div>
          <h2 className="mt-6 text-[32px] font-semibold" style={{ color: "var(--color-text-primary)" }}>
            You&apos;re All Set
          </h2>
          <p className="mt-4 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            A licensed professional will review your contract and reach out within 24–48 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-card" aria-label="Get professional help">
      <div className="mx-auto max-w-[560px] px-4 sm:px-6">
        <h2 className="text-center text-[32px] font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Concerned About Your Current Contract?
        </h2>
        <p className="mt-4 text-center text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
          If your contract contains serious red flags like confessions of judgment, UCC liens, or predatory terms, a licensed professional can review your situation and advise you on your rights — at no cost.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-8"
          style={{ background: "var(--color-bg-elevated)" }}
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="text-[var(--text-sm)] font-medium" style={{ color: "var(--color-text-primary)" }}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1.5 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-[16px] transition-all focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-30"
                style={{ color: "var(--color-text-primary)" }}
                aria-required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-[var(--text-sm)] font-medium" style={{ color: "var(--color-danger)" }} role="alert">{errors.name}</p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-[var(--text-sm)] font-medium" style={{ color: "var(--color-text-primary)" }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1.5 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-[16px] transition-all focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-30"
                  style={{ color: "var(--color-text-primary)" }}
                  aria-required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-[var(--text-sm)] font-medium" style={{ color: "var(--color-danger)" }} role="alert">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="text-[var(--text-sm)] font-medium" style={{ color: "var(--color-text-primary)" }}>
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="mt-1.5 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-[16px] transition-all focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-30"
                  style={{ color: "var(--color-text-primary)" }}
                  aria-required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 text-[var(--text-sm)] font-medium" style={{ color: "var(--color-danger)" }} role="alert">{errors.phone}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="businessName" className="text-[var(--text-sm)] font-medium" style={{ color: "var(--color-text-primary)" }}>
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                className="mt-1.5 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-[16px] transition-all focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-30"
                style={{ color: "var(--color-text-primary)" }}
                aria-required
                aria-invalid={!!errors.businessName}
                aria-describedby={errors.businessName ? "businessName-error" : undefined}
              />
              {errors.businessName && (
                <p id="businessName-error" className="mt-1.5 text-[var(--text-sm)] font-medium" style={{ color: "var(--color-danger)" }} role="alert">{errors.businessName}</p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="text-[var(--text-sm)] font-medium" style={{ color: "var(--color-text-primary)" }}>
                State
              </label>
              <select
                id="state"
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                className="mt-1.5 h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-[16px] transition-all focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-30"
                style={{ color: "var(--color-text-primary)" }}
                aria-required
                aria-invalid={!!errors.state}
                aria-describedby={errors.state ? "state-error" : undefined}
              >
                <option value="">Select state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p id="state-error" className="mt-1.5 text-[var(--text-sm)] font-medium" style={{ color: "var(--color-danger)" }} role="alert">{errors.state}</p>
              )}
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded border-[var(--color-border-strong)] focus:ring-[var(--color-accent-primary)]"
                  style={{ accentColor: "var(--color-accent-primary)" }}
                  aria-required
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                />
                <span className="flex items-start gap-2 text-[var(--text-sm)]" style={{ color: "var(--color-text-primary)" }}>
                  <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--color-text-secondary)" }} aria-hidden />
                  I consent to being contacted by a licensed professional regarding my MCA contract.
                </span>
              </label>
              {errors.consent && (
                <p id="consent-error" className="mt-1.5 text-[var(--text-sm)] font-medium" style={{ color: "var(--color-danger)" }} role="alert">{errors.consent}</p>
              )}
            </div>
          </div>
          {status === "error" && (
            <p className="mt-4 text-[var(--text-sm)] font-medium" style={{ color: "var(--color-danger)" }} role="alert">
              Something went wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary mt-8 flex h-[52px] w-full items-center justify-center gap-2 py-3 disabled:opacity-70 disabled:pointer-events-none"
          >
            {status === "submitting" ? (
              <>
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Get Free Expert Review
                <ArrowRight className="h-5 w-5" aria-hidden />
              </>
            )}
          </button>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>
            <Shield className="h-4 w-4" aria-hidden />
            256-bit encryption · Your data is private and secure
          </p>
        </form>
      </div>
    </section>
  );
}
