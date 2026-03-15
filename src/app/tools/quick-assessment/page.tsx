import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InnerPageHeader from "@/components/InnerPageHeader";

export const metadata = {
  title: "Quick Assessment — Debtura",
  description: "Answer a few questions about your MCA situation. No contract needed.",
};

export default function QuickAssessmentPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="border-b border-[var(--line)] bg-white">
        <InnerPageHeader
          eyebrow="Tools"
          title="Quick Assessment"
          description="Don&apos;t have a contract? Answer a few questions about your MCA situation and we&apos;ll help you understand your options."
        />
      </section>

      {/* What to expect */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>What to Expect</span>
          </div>
          <h2 className="mb-8 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Simple questions, actionable insights
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-[var(--line)] p-6" style={{ background: "var(--bg)" }}>
              <h3 className="mb-3 text-[16px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Section 1: Your Business</h3>
              <p className="text-[13px] font-light leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                Tell us about your business, location, and contact information. This helps us understand your profile.
              </p>
            </div>
            <div className="border border-[var(--line)] p-6" style={{ background: "var(--bg)" }}>
              <h3 className="mb-3 text-[16px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Section 2: Your MCA Situation</h3>
              <p className="text-[13px] font-light leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                Share details about your current MCA lenders, payment status, and any concerns. We&apos;ll provide personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Start assessment CTA — links to full questionnaire form */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="mb-4 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Start your assessment
          </h2>
          <p className="mb-8 text-[14px] font-light" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            No contract needed. Answer a few questions and we&apos;ll give you a personalized snapshot based on your lenders and situation.
          </p>
          <Link
            href="/questionnaire"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-[13px] font-semibold rounded transition-opacity hover:opacity-90"
            style={{ background: "var(--blue)", color: "var(--white)", fontFamily: "var(--font-sans)" }}
          >
            Start assessment
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* What you get */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)] py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <h2 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            What You&apos;ll Receive
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Personalized assessment of your MCA situation",
              "Guidance on your rights and options",
              "Information about refinancing possibilities",
              "Access to our lender matching service",
              "Free contract analysis if you get a contract later",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-[18px] shrink-0" style={{ color: "var(--blue)" }}>—</span>
                <p className="text-[13px] font-light leading-[1.65]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px] text-center">
          <h2 className="mb-4 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Ready to get started?
          </h2>
          <p className="mb-8 text-[13px] font-light max-w-[560px] mx-auto" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            Takes about 5 minutes. No contract needed. Free and confidential.
          </p>
          <Link
            href="/questionnaire"
            className="inline-flex items-center gap-2 px-6 py-3 text-[10.5px] font-bold uppercase tracking-wider rounded"
            style={{ background: "var(--blue)", color: "var(--white)", fontFamily: "var(--font-sans)" }}
          >
            Start Assessment
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
