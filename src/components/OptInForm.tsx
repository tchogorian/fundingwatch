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
      <section
        className="py-section-y-mobile sm:py-section-y"
        style={{
          background: "linear-gradient(180deg, #F0F4F8 0%, #F8FAFB 100%)",
        }}
      >
        <div className="mx-auto max-w-[560px] px-4 text-center sm:px-6">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
          </div>
          <h2 className="mt-6 text-[32px] font-semibold text-dark-text">
            You&apos;re All Set
          </h2>
          <p className="mt-4 text-body text-muted">
            A licensed professional will review your contract and reach out within 24–48 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-section-y-mobile sm:py-16"
      style={{
        background: "linear-gradient(180deg, #F0F4F8 0%, #F8FAFB 100%)",
      }}
    >
      <div className="mx-auto max-w-[560px] px-4 sm:px-6">
        <h2 className="text-center text-[32px] font-semibold text-dark-text">
          Want an Expert to Review Your Contract?
        </h2>
        <p className="mt-4 text-center text-body text-muted">
          A licensed professional will review your analysis at no cost or obligation.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-card border border-border bg-primary p-8 shadow-card"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="text-small font-medium text-dark-text">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1.5 h-12 w-full rounded-input border border-border bg-primary px-4 py-3 text-[16px] transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              {errors.name && (
                <p className="mt-1.5 text-small font-medium text-danger">{errors.name}</p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-small font-medium text-dark-text">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1.5 h-12 w-full rounded-input border border-border bg-primary px-4 py-3 text-[16px] transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                {errors.email && (
                  <p className="mt-1.5 text-small font-medium text-danger">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="text-small font-medium text-dark-text">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="mt-1.5 h-12 w-full rounded-input border border-border bg-primary px-4 py-3 text-[16px] transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-small font-medium text-danger">{errors.phone}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="businessName" className="text-small font-medium text-dark-text">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                className="mt-1.5 h-12 w-full rounded-input border border-border bg-primary px-4 py-3 text-[16px] transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              {errors.businessName && (
                <p className="mt-1.5 text-small font-medium text-danger">
                  {errors.businessName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="text-small font-medium text-dark-text">
                State
              </label>
              <select
                id="state"
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                className="mt-1.5 h-12 w-full rounded-input border border-border bg-primary px-4 py-3 text-[16px] transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1.5 text-small font-medium text-danger">{errors.state}</p>
              )}
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="flex items-start gap-2 text-small text-dark-text">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-muted" />
                  I consent to being contacted by a licensed professional regarding my MCA contract.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1.5 text-small font-medium text-danger">{errors.consent}</p>
              )}
            </div>
          </div>
          {status === "error" && (
            <p className="mt-4 text-small font-medium text-danger">
              Something went wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group mt-8 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-button bg-accent py-3 text-body font-semibold text-white shadow-button-accent transition-all duration-200 hover:scale-[1.02] hover:shadow-button-accent-hover disabled:opacity-70"
            style={{
              background:
                status === "submitting"
                  ? "#94A3B8"
                  : "linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)",
            }}
          >
            {status === "submitting" ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Get Free Expert Review
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-small text-muted">
            <Shield className="h-4 w-4" />
            256-bit encryption · Your data is private and secure
          </p>
        </form>
      </div>
    </section>
  );
}
