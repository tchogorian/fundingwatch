"use client";

import { ChevronUp } from "lucide-react";
import FadeIn from "./FadeIn";

const statCards = [
  {
    stat: "$12-20B",
    title: "Annual MCA Market",
    text: "The merchant cash advance industry processes billions annually. Many borrowers sign agreements without fully understanding the effective cost.",
  },
  {
    stat: "40-350%",
    title: "Typical Effective APR Range",
    text: "Factor rates obscure the real annual cost. A factor rate of 1.35 on a 6-month advance translates to an effective APR over 100%.",
  },
  {
    stat: "100,000+",
    title: "Distressed Borrowers Per Year",
    text: "Industry estimates suggest over a hundred thousand small businesses struggle with MCA repayment obligations annually.",
  },
  {
    stat: "25%",
    title: "NY Criminal Usury Cap",
    text: "New York courts have ruled that certain cash advances with fixed daily payments may be classified as loans subject to the state's 25% criminal usury cap.",
  },
];

const legalItems = [
  {
    title: "Courts Apply Loan Classification Test",
    text: "Multiple New York courts have applied a three-factor test to determine whether an MCA is actually a loan: fixed payment amounts, a finite term, and a personal guarantee. When all three are present and the funder never adjusts payments based on actual receivables, courts have reclassified the advance as a loan subject to usury limits.",
  },
  {
    title: "Confession of Judgment Restrictions",
    text: "New York banned out-of-state enforcement of confessions of judgment in 2019 after investigations revealed widespread abuse. A confession of judgment allows a lender to seize assets without a court hearing — a clause still present in many active MCA contracts.",
  },
  {
    title: "Reconciliation Failures Under Scrutiny",
    text: "MCA agreements typically include a reconciliation clause promising to adjust daily payments if the borrower's revenue declines. Regulators and courts are increasingly examining whether funders actually honor these provisions. When they don't, the fixed-payment structure strengthens the argument that the advance is a loan.",
  },
  {
    title: "State Regulatory Expansion",
    text: "Multiple states are tightening MCA oversight. New disclosure requirements, registration mandates, and transparency rules are taking effect, giving borrowers new protections and legal avenues.",
  },
];

export default function IndustryInfoSection() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="industry-info"
      className="bg-secondary-bg py-section-y-mobile sm:py-section-y"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-eyebrow font-semibold uppercase tracking-widest text-accent">
            THE MCA INDUSTRY
          </p>
          <h2 className="mt-3 text-center text-[40px] font-semibold leading-tight tracking-tight text-dark-text">
            What Every Borrower Should Know
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2">
          {statCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div className="rounded-card bg-white p-8 shadow-card transition-all duration-200 hover:shadow-card-hover">
                <p className="text-3xl font-bold text-accent">{card.stat}</p>
                <h3 className="mt-3 text-xl font-semibold text-dark-text">
                  {card.title}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">
                  {card.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <FadeIn delay={200}>
            <h3 className="text-left text-[28px] font-semibold text-dark-text">
              Recent Legal Developments
            </h3>
          </FadeIn>

          <div className="relative mt-10">
            {/* Vertical line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-accent/30 sm:left-[9px]"
              aria-hidden
            />
            <div className="space-y-4">
              {legalItems.map((item, i) => (
                <FadeIn key={item.title} delay={300 + i * 80}>
                  <div className="relative flex gap-4 pl-8 sm:pl-10">
                    <div
                      className="absolute left-0 top-6 h-3 w-3 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1 rounded-card border-l-[3px] border-accent bg-white py-6 pl-6 pr-6 shadow-card">
                      <h4 className="text-[18px] font-semibold text-dark-text">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-[16px] leading-[1.6] text-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <FadeIn delay={500}>
          <button
            type="button"
            onClick={scrollToUpload}
            className="group mx-auto mt-12 flex cursor-pointer flex-col items-center gap-2 rounded-lg px-4 py-2 text-muted transition-colors hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-bg"
          >
            <ChevronUp className="h-8 w-8 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="text-center text-[16px] leading-relaxed">
              FundingWatch analyzes your contract against these legal standards
              automatically.
            </span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
