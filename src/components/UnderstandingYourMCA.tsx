"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeIn from "./FadeIn";

const items = [
  {
    question: "What Is a Factor Rate — and Why It Hides the True Cost",
    content:
      "When an MCA provider quotes you a factor rate of 1.35, it sounds reasonable — like a 35% fee. But factor rates aren't interest rates. A factor rate of 1.35 on a $50,000 advance means you repay $67,500 — that's $17,500 in fees. If your repayment term is 6 months, your effective APR is closer to 70%. If it's 3 months, you're looking at 140% or higher. Factor rates compress what would be a shocking annual rate into a small-sounding decimal. That's by design. Our tool converts your factor rate into a true APR so you can see what you're actually paying — and compare it to other financing options on equal terms.",
  },
  {
    question: "What Is a Confession of Judgment — and Why It's Dangerous",
    content:
      "A Confession of Judgment (COJ) is a clause buried in many MCA contracts that allows the lender to obtain a court judgment against you without notice, without a hearing, and without giving you a chance to defend yourself. If you miss a payment — or if the lender claims you did — they can go directly to a court, get a judgment, and freeze your bank accounts before you even know what happened. New York banned COJ enforcement against out-of-state borrowers in 2019 after widespread abuse. But many MCA contracts still include this clause. If your contract has a Confession of Judgment, that's a serious red flag.",
  },
  {
    question: "What Does 'Reconciliation' Mean — and Why You Need It",
    content:
      "Reconciliation is a clause that requires the MCA provider to adjust your payments based on your actual sales. If your revenue drops, your payments should drop proportionally — that's the whole premise of a 'purchase of future receivables.' But many MCA providers collect fixed daily payments regardless of your sales volume. If your contract doesn't have a reconciliation clause — or if your lender never actually reconciles — you may be paying a fixed amount that doesn't reflect your real revenue. Courts have found that MCAs without true reconciliation may actually be loans, which subjects them to usury laws and interest rate caps.",
  },
  {
    question: "What Is 'Stacking' — and Why Multiple MCAs Are Dangerous",
    content:
      "Stacking happens when a business owner takes a second, third, or even fourth MCA while still repaying the first. Each new advance adds another daily payment pulled from your bank account. The combined cost can be devastating — we've seen businesses paying the equivalent of 200-350% APR across stacked advances. MCA providers know about stacking and some actively encourage it. A second provider might offer you more cash knowing you're already stretched thin. Each provider files a UCC lien against your business, and if things go wrong, they'll fight each other — and you — over who gets paid first.",
  },
  {
    question: "How Is an MCA Different From a Loan?",
    content:
      "Technically, a merchant cash advance is not a loan — it's a 'purchase of future receivables.' The provider buys a portion of your future sales at a discount and collects until they've received the agreed-upon amount. This distinction matters because loans are regulated. Loans have interest rate caps, disclosure requirements, and consumer protections. MCAs, as 'purchases,' have historically avoided most of these rules. But the legal landscape is shifting. Courts in New York and other states have started looking at the substance of the deal, not just the label. If an MCA has fixed payments, a definite term, and personal guarantees — it may be a loan in disguise, regardless of what the contract calls it.",
  },
  {
    question: "What Rights Do You Have as an MCA Borrower?",
    content:
      "More than you might think. Several states have enacted or are considering MCA-specific regulations. New York banned out-of-state Confession of Judgment enforcement. California now requires MCA providers to disclose the equivalent APR before funding. Texas enacted transparency requirements effective September 2025. At the federal level, the FTC has taken action against MCA providers for deceptive practices. And courts have increasingly been willing to recharacterize MCAs as loans when the terms don't match the 'purchase of receivables' structure. If you believe your MCA has unfair terms, you have options — starting with understanding exactly what's in your contract.",
  },
];

export default function UnderstandingYourMCA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="resources"
      className="bg-secondary-bg py-section-y-mobile sm:py-section-y"
    >
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-eyebrow font-semibold uppercase tracking-widest text-accent">
            MCA EDUCATION
          </p>
          <h2 className="mt-3 text-center text-section-mobile font-semibold text-dark-text sm:text-section-desktop">
            Understanding Your Merchant Cash Advance
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-body text-muted">
            The MCA industry thrives on complexity. Here&apos;s what every business owner should know.
          </p>
        </FadeIn>

        <div className="mt-12 space-y-3">
          {items.map((item, i) => (
            <FadeIn key={item.question} delay={i * 50}>
              <div className="overflow-hidden rounded-card border border-border bg-primary shadow-card">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenIndex(openIndex === i ? null : i);
                    }
                  }}
                  className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition-colors hover:bg-secondary-bg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
                  aria-expanded={openIndex === i}
                  aria-controls={`accordion-content-${i}`}
                  id={`accordion-header-${i}`}
                >
                  <span className="pr-4 text-[16px] font-semibold text-dark-text">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`accordion-content-${i}`}
                  role="region"
                  aria-labelledby={`accordion-header-${i}`}
                  className="transition-[max-height] duration-300 ease-in-out"
                  style={{
                    maxHeight: openIndex === i ? "2000px" : "0",
                    overflow: "hidden",
                  }}
                >
                  <div className="border-t border-border px-6 pb-6 pt-2">
                    <p className="text-[16px] leading-[1.6] text-muted">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
