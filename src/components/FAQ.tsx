"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeIn from "./FadeIn";

const items = [
  {
    question: "Is this really free?",
    answer:
      "Yes — completely free. No account required, no credit card, no hidden fees, no upsells. FundingWatch is built to help small business owners understand their MCA contracts. Upload your contract, get your analysis, and that's it.",
  },
  {
    question: "Is my contract kept private?",
    answer:
      "Your contract is analyzed in real-time by our system and the contents are never stored on our servers. We don't share your document with anyone. The analysis is generated instantly and exists only in your browser session.",
  },
  {
    question: "Who sees my analysis results?",
    answer:
      "Only you. Your analysis is displayed directly in your browser and is not shared with anyone. If you choose to opt in for an expert review or to explore better lending options, only the specific professional you're connected with receives your information — and only after you give explicit consent.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. FundingWatch provides factual analysis of your contract terms — things like your effective APR, payment structure, and whether specific clauses are present. We present data, not legal opinions. If your analysis reveals concerning terms and you'd like legal guidance, we can connect you with a licensed attorney who specializes in MCA defense.",
  },
  {
    question: "How accurate is the analysis?",
    answer:
      "Our engine analyzes the actual text of your contract and calculates your effective APR using standard financial formulas. It identifies specific clauses, terms, and conditions based on what's written in your document. The analysis is only as complete as the document you provide — clearer documents produce more detailed results.",
  },
  {
    question: "What file types can I upload?",
    answer:
      "PDF, JPG, and PNG files up to 20MB. If you have a paper contract, you can take a photo with your phone and upload the image directly. For best results, make sure the text is legible and all pages are included.",
  },
  {
    question: "Who is behind FundingWatch?",
    answer:
      "FundingWatch was built to bring transparency to an industry that has historically operated without it. The MCA market processes over $12 billion annually, and most borrowers never see their true APR until it's too late. We believe every business owner deserves to understand what they're signing — before and after they sign it.",
  },
  {
    question: "What happens after I opt in for expert review?",
    answer:
      "If your analysis reveals concerning terms and you opt in, a licensed professional will review your contract analysis and reach out within 24-48 hours. There's no cost or obligation — the initial review is free. They'll explain your options based on the specific issues in your contract.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-light" aria-label="FAQ">
      <div className="section-inner mx-auto max-w-[800px] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center">FAQ</p>
          <h2 className="section-heading text-center" style={{ color: "var(--color-text-primary)" }}>
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-4">
          {items.map((item, i) => (
            <FadeIn key={item.question} delay={i * 40}>
              <div className="accordion-card">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenIndex(openIndex === i ? null : i);
                    }
                  }}
                  className="flex w-full cursor-pointer items-center justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-light)] rounded-t-[15px]"
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
                  className="accordion-body"
                  style={{ maxHeight: openIndex === i ? "1000px" : "0", overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}
                >
                  <p style={{ color: "var(--color-text-secondary)" }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
