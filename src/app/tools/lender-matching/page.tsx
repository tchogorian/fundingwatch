import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Lender Matching AI — Debtura",
  description: "Get matched with vetted, rated lenders based on your business profile.",
};

export default function LenderMatchingPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="lri-hero relative overflow-hidden border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1160px] px-6 md:px-8 py-16 md:py-20">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Tools</span>
          </div>
          <h1 className="lri-hero-title mb-4" style={{ fontFamily: "var(--font-serif)", color: "white" }}>
            Lender Matching AI
          </h1>
          <p className="lri-hero-sub max-w-[640px]" style={{ fontFamily: "var(--font-sans)" }}>
            We match you with certified lenders based on your profile and the terms you deserve. No hard credit check. Takes 2 minutes.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>How It Works</span>
          </div>
          <h2 className="mb-8 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Vetted Lender Matching
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: "1", title: "Tell us about your business", desc: "Share your monthly revenue, funding needs, and business details. No hard credit check required." },
              { step: "2", title: "AI matches you with lenders", desc: "Our system analyzes your profile and matches you with certified lenders from our rated network." },
              { step: "3", title: "Compare offers", desc: "Review multiple offers with transparent terms. All lenders are independently rated in our Lender Risk Index." },
            ].map((item) => (
              <div key={item.step} className="border border-[var(--line)] p-6" style={{ background: "var(--bg)" }}>
                <div className="mb-3 text-[32px] font-bold" style={{ color: "var(--blue)", fontFamily: "var(--font-serif)" }}>{item.step}</div>
                <h3 className="mb-2 text-[16px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>{item.title}</h3>
                <p className="text-[13px] font-light leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)] py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <h2 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Why use Debtura matching?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Only certified lenders in our network",
              "Independent ratings — not commission-driven",
              "Zero fees charged to borrowers",
              "Approvals in as little as 2 hours",
              "Free contract analysis included",
              "Transparent terms, no hidden fees",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <span className="text-[18px] shrink-0" style={{ color: "var(--blue)" }}>—</span>
                <p className="text-[13px] font-light leading-[1.65]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px] text-center">
          <h2 className="mb-4 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Ready to get matched?
          </h2>
          <p className="mb-8 text-[13px] font-light max-w-[560px] mx-auto" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            No obligation. No hard credit check. Takes 2 minutes.
          </p>
          <Link
            href="/#application"
            className="inline-flex items-center gap-2 px-6 py-3 text-[10.5px] font-bold uppercase tracking-wider rounded"
            style={{ background: "var(--blue)", color: "var(--white)", fontFamily: "var(--font-sans)" }}
          >
            Get Matched
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
