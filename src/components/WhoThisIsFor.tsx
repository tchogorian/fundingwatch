"use client";

import { FileSearch, FileWarning, Files } from "lucide-react";
import FadeIn from "./FadeIn";

const cards = [
  {
    icon: FileSearch,
    title: "Considering an MCA?",
    description:
      "Before you sign, understand what you're agreeing to. Upload any offer or contract to see the true cost, hidden terms, and how it compares to fair market rates.",
  },
  {
    icon: FileWarning,
    title: "Already Have an MCA?",
    description:
      "Find out if your current terms are fair. See your real APR — not the factor rate your lender quoted — and identify contract clauses that could put your business at risk.",
  },
  {
    icon: Files,
    title: "Stacked Multiple MCAs?",
    description:
      "Multiple advances compound the problem. When you're paying two or three lenders at once, the combined cost can be staggering. Upload any of your contracts to see the full picture.",
  },
];

export default function WhoThisIsFor() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-primary py-section-y-mobile sm:py-section-y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-eyebrow font-semibold uppercase tracking-widest text-accent">
            WHO THIS IS FOR
          </p>
          <h2 className="mt-3 text-center text-section-mobile font-semibold text-dark-text sm:text-section-desktop">
            Every MCA Borrower Deserves Clarity
          </h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div className="flex cursor-default flex-col rounded-card border border-border bg-primary p-8 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-card bg-trust-bg text-accent">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-subhead-mobile font-semibold text-dark-text sm:text-subhead-desktop">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-muted">
                  {card.description}
                </p>
                <button
                  type="button"
                  onClick={scrollToUpload}
                  className="mt-6 cursor-pointer text-[15px] font-medium text-accent transition-colors hover:text-accent-dark"
                >
                  Check Your Contract →
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
