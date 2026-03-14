"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { NO_LENDER_MATCH_MESSAGE } from "@/lib/questionnaire-assessment";

const STORAGE_KEY = "questionnaireAssessment";

interface StoredResult {
  sessionId: string;
  assessment: {
    riskLevel: string;
    firstName: string;
    lenderSection: string | null;
    stackingSection: string | null;
    stateSection: string | null;
    paymentStressSection: string;
    primaryLenderName: string | null;
  };
  contact: {
    name: string;
    businessName: string;
    email: string;
    phone: string;
    state: string;
  };
}

const CONSENT_LANGUAGE =
  "I consent to Funding Watch sharing my information with its lender network to provide me with financing options. I understand Funding Watch may receive compensation from lenders for this service. This does not affect my cost.";

export default function QuestionnaireResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<StoredResult | null>(null);
  const [optInSuccess, setOptInSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", consent: false });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      router.replace("/questionnaire");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoredResult;
      setData(parsed);
      setForm((f) => ({
        ...f,
        name: parsed.contact.name,
        email: parsed.contact.email,
        phone: parsed.contact.phone,
        business: parsed.contact.businessName,
      }));
    } catch {
      router.replace("/questionnaire");
    }
  }, [router]);

  const handleOptInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.business.trim() || !form.consent) return;
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
          session_id: data.sessionId,
          source: "questionnaire",
          lender_name: data.assessment.primaryLenderName ?? null,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setOptInSuccess(true);
    } catch {
      setSubmitStatus("error");
    }
  };

  if (data === null) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--color-bg-base)" }}>
        <p style={{ color: "var(--color-text-secondary)" }}>Loading…</p>
      </div>
    );
  }

  const a = data.assessment;

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
              A licensed professional will review your situation and reach out within 1–2 business days. Check your email for a confirmation.
            </p>
            <Link
              href="/"
              className="btn-primary mt-10 inline-flex min-h-[48px] items-center justify-center px-8 py-3"
            >
              Back to FundingWatch
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-12" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[720px]">
          <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>
            Your MCA Assessment
          </h1>
          <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            Based on what you shared, here&apos;s what we found. This is not legal advice — only a licensed professional can review your actual agreements.
          </p>

          <div
            className="mt-8 space-y-6 rounded-xl border p-6 sm:p-8"
            style={{ background: "var(--bg-light)", borderColor: "var(--color-border-default)" }}
          >
            <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              Hi {a.firstName},
            </p>
            <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Based on what you&apos;ve shared, here&apos;s what we found:
            </p>

            {a.lenderSection && (
              <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {a.lenderSection}
              </p>
            )}
            {!a.lenderSection && (
              <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {NO_LENDER_MATCH_MESSAGE}
              </p>
            )}

            {a.stackingSection && (
              <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {a.stackingSection}
              </p>
            )}

            {a.stateSection && (
              <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {a.stateSection}
              </p>
            )}

            <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {a.paymentStressSection}
            </p>

            <hr style={{ borderColor: "var(--color-border-default)" }} />

            <p className="text-[var(--text-base)] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              We can&apos;t tell you whether your specific agreements have legal issues — that requires a licensed professional reviewing your actual terms. But based on what you&apos;ve described, a review would be worth your time.
            </p>
          </div>

          {/* Opt-in CTA */}
          <section
            className="mt-10 rounded-xl border p-6 sm:p-8"
            style={{ background: "var(--bg-dark)", borderColor: "var(--border-dark)" }}
          >
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Get a free professional review
            </h2>
            <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--on-dark-2)" }}>
              A licensed professional will review your situation at no cost and explain your options.
            </p>

            <form onSubmit={handleOptInSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="q-name" className="block text-sm font-medium text-white/90">Full name</label>
                <input
                  id="q-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-white placeholder:text-white/50"
                  placeholder="First and last"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="q-email" className="block text-sm font-medium text-white/90">Email</label>
                  <input
                    id="q-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label htmlFor="q-phone" className="block text-sm font-medium text-white/90">Phone</label>
                  <input
                    id="q-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="q-business" className="block text-sm font-medium text-white/90">Business name</label>
                <input
                  id="q-business"
                  type="text"
                  required
                  value={form.business}
                  onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
                  className="mt-1 h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                    className="mt-1 h-4 w-4 rounded"
                    style={{ accentColor: "var(--accent-cyan)" }}
                  />
                  <span className="text-sm text-white/90">
                    {CONSENT_LANGUAGE}{" "}
                    <Link href="/privacy" className="underline hover:no-underline">Privacy Policy</Link>
                    {" · "}
                    <Link href="/terms" className="underline hover:no-underline">Terms</Link>
                  </span>
                </label>
              </div>
              {submitStatus === "error" && (
                <p className="text-sm font-medium text-red-300" role="alert">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={submitStatus === "submitting" || !form.consent}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-full font-semibold text-white transition hover:opacity-95 disabled:opacity-70"
                style={{ background: "var(--accent-blue)" }}
              >
                {submitStatus === "submitting" ? "Submitting…" : "Yes, have someone call me"}
              </button>
            </form>

            <p className="mt-4 text-xs" style={{ color: "var(--on-dark-3)" }}>
              Your information is kept confidential. By clicking above you consent to being contacted by a licensed professional regarding your MCA agreements.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
