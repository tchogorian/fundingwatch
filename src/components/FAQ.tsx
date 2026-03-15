"use client";

import { useState } from "react";

const items: [string, string][] = [
  ["Is this a loan?", "An MCA is not technically a loan — it's a purchase of future receivables."],
  ["What if I already have an MCA?", "Upload your contract to our free analyzer. If you're overpaying, we can connect you with refinancing options."],
  ["How fast can I get funded?", "Some lending partners approve and fund in as little as 2 hours."],
  ["Do you check my credit?", "Applying through Debtura does not require a hard credit check."],
  ["What makes Debtura different?", "Most brokers route your application to whoever pays the highest commission. We built an independent rating system."],
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
        <div className="mt-5 border border-[var(--line)]">
          {items.map(([q, a], i) => (
            <div key={q} className="border-b border-[var(--line)] last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-2 border-none bg-transparent px-4 py-3.5 text-left text-[12.5px] font-medium cursor-pointer"
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
