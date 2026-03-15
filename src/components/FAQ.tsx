"use client";

import { useState } from "react";

const items: [string, string][] = [
  [
    "How is Debtura different from other MCA brokers?",
    "Most brokers route your application to whichever lender pays the highest commission. We built an independent lender rating system — every lender in our network is scored on contract terms, complaint history, and transparency before they can receive a single application.",
  ],
  [
    "What does the Lender Risk Index measure?",
    "We score every MCA lender on litigation history, regulatory actions, contract fairness, reconciliation compliance, and borrower complaints. Grades range from A+ (transparent, fair terms) to F (documented predatory behavior).",
  ],
  [
    "Is the contract analyzer really free?",
    "Yes. Upload any MCA contract and our AI extracts the true APR, identifies hidden fees, flags confession of judgment clauses, and scores your lender — no signup, no credit check, completely private.",
  ],
  [
    "How do you make money if the tools are free?",
    "We earn a commission from vetted lenders when we match you with better funding. You never pay a fee. Our incentive is to move you away from bad deals and into better ones.",
  ],
  [
    "I already have an MCA — can you help?",
    "Upload your current contract. If you're overpaying or your lender scores poorly, we can connect you with refinancing options from higher-rated lenders in our network.",
  ],
  [
    "How fast can I get funded?",
    "Some lending partners in our network approve and fund in as little as 2 hours. Timeline depends on your business profile and the amount requested.",
  ],
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
        <div className="mt-5 max-w-full border border-[var(--line)]">
          {items.map(([q, a], i) => (
            <div key={i} className="border-b border-[var(--line)] last:border-b-0">
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
