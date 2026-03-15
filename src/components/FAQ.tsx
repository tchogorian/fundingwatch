"use client";

import { useState } from "react";

const items: [string, string][] = [
  ["How is Debtura different from other MCA brokers?", "Most brokers route your application to whoever pays the highest commission. We built an independent rating system that evaluates lenders on complaints, contract terms, litigation history, and transparency — so you get matched with lenders who deserve your business."],
  ["What does the Lender Risk Index measure?", "The Lender Risk Index rates every MCA lender across six dimensions: complaint density (25%), regulatory exposure (25%), contract risk (20%), litigation aggressiveness (15%), transparency (10%), and stacking behavior (5%). We use public data, UCC filings, and borrower complaints to calculate scores that translate to S&P-style ratings (A, Baa, Ba, B, Caa, Ca, C)."],
  ["Is the contract analyzer really free?", "Yes. Upload any MCA contract and our AI extracts the real APR, flags hidden terms, and scores your lender in seconds — completely free, with no signup required. We make money when you get matched with a vetted lender through our platform, not by charging borrowers for analysis."],
  ["How do you make money if the tools are free?", "We're a licensed commercial financing broker. When you apply through Debtura and get matched with a lender, we earn a commission from the lender — not from you. This aligns our incentives: we only make money when you get funded with terms that work for your business."],
  ["I already have an MCA — can you help?", "Yes. Upload your contract to our free analyzer. If you're overpaying, we can connect you with refinancing options from lenders in our network who may offer better terms. Many borrowers use Debtura to compare their current MCA against alternatives."],
  ["How fast can I get funded?", "Some lending partners approve and fund in as little as 2 hours. Most applications receive initial offers within 24 hours. Applying through Debtura does not require a hard credit check, so the process is faster than traditional loans."],
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-b border-[var(--line)] py-11 px-6 md:px-8" style={{ background: "var(--white)", fontFamily: "var(--font-sans)" }} aria-label="FAQ">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>FAQ</span>
        </div>
        <h2 className="mb-5 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          Common Questions
        </h2>
        <div className="mt-5 max-w-[720px] border border-[var(--line)]">
          {items.map(([q, a], i) => (
            <div key={q} className="border-b border-[var(--line)] last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-2 border-none bg-transparent px-4 py-3.5 text-left text-[12.5px] font-medium cursor-pointer transition-colors hover:text-[var(--blue)]"
                style={{ color: "var(--body)" }}
              >
                <span>{q}</span>
                <span className="shrink-0 text-[13px]" style={{ color: "var(--blue)" }}>{openIndex === i ? "−" : "+"}</span>
              </button>
              <div className={openIndex === i ? "block px-4 pb-3" : "hidden"} style={{ fontFamily: "var(--font-sans)" }}>
                <p className="text-[12px] font-light leading-[1.75]" style={{ color: "var(--muted)" }}>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
