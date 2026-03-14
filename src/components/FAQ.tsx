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
      "Only you. Your analysis is displayed directly in your browser and is not shared with anyone. If you choose to explore better options through our lender network, your information is shared only with lenders you're matched with — and only after you give explicit consent.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. Funding Watch provides factual analysis of your contract terms — things like your effective APR, payment structure, and whether specific clauses are present. We present data, not legal opinions. If your analysis reveals concerning terms, we can help you explore better financing options through our lender network. For legal questions about an existing contract or active litigation, we recommend consulting a business attorney.",
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
      "If your analysis reveals concerning terms and you choose to explore better options, a Funding Watch advisor will review your situation and reach out within 24 hours with financing alternatives from our lender network. There's no cost or obligation — we get paid by lenders when a deal funds, never by you.",
  },
  {
    question: "How does Funding Watch make money?",
    answer:
      "Funding Watch is a licensed commercial financing broker. When you apply for financing through our lender network and a deal funds, the lender pays us a referral fee. This is standard in the lending industry and does not affect your cost — you receive the same terms whether you apply through us or directly. Our contract analysis tool is and will always be free.",
  },
  {
    question: "What is a Certified lender?",
    answer:
      "Certified is the rating we give to MCA lenders that meet our standards for transparency, fair terms, and responsible lending practices. To earn Certified status, a lender must score in the top tier of our Lender Risk Index — which evaluates complaint history, regulatory record, contract terms, litigation behavior, and pricing transparency. Not every lender qualifies. See the full criteria and every rated lender on our Lender Risk Index.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-card" aria-label="FAQ">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center" style={{ color: "var(--accent-blue)" }}>FAQ</p>
          <h2 className="section-heading text-center" style={{ color: "var(--color-text-primary)" }}>
            Frequently Asked Questions
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
