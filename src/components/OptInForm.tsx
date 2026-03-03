"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
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
      <section className="border-t border-gray-200/80 bg-sky-50/70 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-card">
          <p className="text-xl font-semibold text-gray-900">
            Thank you. A professional will review your situation and reach out within 24–48 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-gray-200/80 bg-sky-50/60 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200/80 bg-white p-8 shadow-card sm:p-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Would you like a licensed professional to review your situation?
        </h2>
        <p className="mt-4 text-base font-normal text-gray-600">
          Get a free, no-obligation review of your contract by a qualified expert.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-3 font-normal focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {errors.name && <p className="mt-1.5 text-sm font-medium text-critical">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-3 font-normal focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {errors.email && <p className="mt-1.5 text-sm font-medium text-critical">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-3 font-normal focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {errors.phone && <p className="mt-1.5 text-sm font-medium text-critical">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700">
              Business Name
            </label>
            <input
              id="businessName"
              type="text"
              value={form.businessName}
              onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-3 font-normal focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            {errors.businessName && (
              <p className="mt-1.5 text-sm font-medium text-critical">{errors.businessName}</p>
            )}
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-gray-700">
              State
            </label>
            <select
              id="state"
              value={form.state}
              onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-3 font-normal focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && <p className="mt-1.5 text-sm font-medium text-critical">{errors.state}</p>}
          </div>
          <div>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <span className="flex items-start gap-2 text-sm font-normal text-gray-700">
                <Lock className="h-4 w-4 shrink-0 text-gray-500" />
                I consent to being contacted by a licensed professional regarding my MCA contract.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1.5 text-sm font-medium text-critical">{errors.consent}</p>
            )}
          </div>
          {status === "error" && (
            <p className="text-sm font-medium text-critical">Something went wrong. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 w-full rounded-xl bg-accent py-4 text-lg font-semibold text-white shadow-lg shadow-accent/20 transition hover:scale-[1.02] hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "submitting"
              ? "Sending..."
              : "Yes, Have a Professional Review My Contract"}
          </button>
        </form>
      </div>
    </section>
  );
}
