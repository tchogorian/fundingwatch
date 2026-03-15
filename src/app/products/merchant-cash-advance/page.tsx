import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InnerPageHeader from "@/components/InnerPageHeader";

export const metadata = {
  title: "Merchant Cash Advance — Debtura",
  description: "Get matched with vetted MCA lenders. Fast approvals, transparent terms, zero fees to borrowers.",
};

export default function MCAProductPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="border-b border-[var(--line)] bg-white">
        <InnerPageHeader
          eyebrow="Products"
          title="Merchant Cash Advance"
          description="Fast, flexible funding for businesses that need working capital now. Get matched with vetted lenders rated by our independent system."
        />
      </section>

      {/* How it works */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>How It Works</span>
          </div>
          <h2 className="mb-8 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Simple, transparent process
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: "1", title: "Apply in 2 minutes", desc: "No hard credit check. Tell us about your business and funding needs." },
              { step: "2", title: "Get matched", desc: "We match you with certified lenders based on your profile and the terms you deserve." },
              { step: "3", title: "Fund in hours", desc: "Some partners approve and fund in as little as 2 hours. Zero fees charged to borrowers." },
            ].map((item) => (
              <div key={item.step} className="border border-[var(--line)] p-6" style={{ background: "var(--white)" }}>
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
            Why choose Debtura for MCA?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Approvals in as little as 2 hours",
              "Zero fees charged to borrowers",
              "Only certified lenders in our network",
              "Free contract analysis included",
              "Independent lender ratings — not commission-driven",
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
            Ready to get funded?
          </h2>
          <p className="mb-8 text-[13px] font-light max-w-[560px] mx-auto" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            No obligation. No hard credit check. Takes 2 minutes.
          </p>
          <Link
            href="/questionnaire"
            className="inline-flex items-center gap-2 px-6 py-3 text-[10.5px] font-bold uppercase tracking-wider rounded"
            style={{ background: "var(--blue)", color: "var(--white)", fontFamily: "var(--font-sans)" }}
          >
            Get My Options
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* Related tools */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)] py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <h2 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Related Tools
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/tools/contract-analyzer" className="border border-[var(--line)] p-5 hover:border-[var(--blue)] transition-colors" style={{ background: "var(--white)" }}>
              <h3 className="mb-2 text-[15px] font-semibold hover:text-[var(--red)]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Contract Analyzer</h3>
              <p className="text-[12px] font-light" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Upload your MCA contract for free analysis</p>
            </Link>
            <Link href="/tools/mca-calculator" className="border border-[var(--line)] p-5 hover:border-[var(--blue)] transition-colors" style={{ background: "var(--white)" }}>
              <h3 className="mb-2 text-[15px] font-semibold hover:text-[var(--red)]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>MCA Calculator</h3>
              <p className="text-[12px] font-light" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Calculate the true APR of your MCA</p>
            </Link>
            <Link href="/lender-risk-index" className="border border-[var(--line)] p-5 hover:border-[var(--blue)] transition-colors" style={{ background: "var(--white)" }}>
              <h3 className="mb-2 text-[15px] font-semibold hover:text-[var(--red)]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Lender Risk Index</h3>
              <p className="text-[12px] font-light" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Browse our database of rated lenders</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
