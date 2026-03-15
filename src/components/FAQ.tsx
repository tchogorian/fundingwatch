"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeIn from "./FadeIn";

const items = [
  {
    question: "How does Debtura make money?",
    answer: "We earn a fee from the lender when a deal funds. You never pay Debtura directly.",
  },
  {
    question: "Is this a loan?",
    answer:
      "A merchant cash advance is technically a purchase of future receivables, not a loan. That distinction matters — it's why traditional lending protections often don't apply, and why understanding your contract terms is critical.",
  },
  {
    question: "What if I already have an MCA?",
    answer:
      "Upload your contract to our analyzer. If the terms are worse than what's available through our network, we'll walk you through refinancing options.",
  },
  {
    question: "How fast can I get funded?",
    answer: "Some of our lending partners approve and fund in as little as 2 hours. Timing depends on your business profile.",
  },
  {
    question: "Do you check my credit?",
    answer: "Applying through Debtura does not trigger a hard credit pull. Individual lenders may run soft checks as part of underwriting.",
  },
  {
    question: "What makes Debtura different from other brokers?",
    answer:
      "We built the Lender Risk Index — a public, independent rating system for MCA lenders. We only route applications to lenders that passed our review. Most brokers optimize for their commission. We optimize for your terms.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work with businesses across all industries, but have particular depth in trucking, restaurants, construction, retail, and professional services — the sectors most active in MCA financing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-card py-20 bg-white" aria-label="FAQ">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center" style={{ color: "#2a6a9e" }}>FAQ</p>
          <h2 className="section-heading text-center" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-dm-serif), Georgia, serif", fontWeight: 400 }}>
            Common Questions
          </h2>
        </FadeIn>

        <div className="mt-12 accordion-simple">
          {items.map((item, i) => (
            <div key={item.question} className="accordion-simple-item">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(openIndex === i ? null : i);
                  }
                }}
                className="flex w-full cursor-pointer items-center justify-between py-4 text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 rounded-xl"
                style={{ color: "var(--color-text-primary)" }}
                aria-expanded={openIndex === i}
                aria-controls={`faq-content-${i}`}
                id={`faq-header-${i}`}
              >
                <span className="pr-4 text-[16px] font-semibold">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  style={{ color: "var(--color-text-secondary)" }}
                  aria-hidden
                />
              </button>
              <div
                id={`faq-content-${i}`}
                role="region"
                aria-labelledby={`faq-header-${i}`}
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? "800px" : "0" }}
              >
                <div className="border-t border-[var(--border-light)] pt-3 pb-4">
                  <p className="text-[15px] leading-[1.7]" style={{ color: "var(--color-text-secondary)" }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
