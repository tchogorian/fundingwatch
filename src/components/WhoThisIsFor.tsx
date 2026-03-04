"use client";

import { FileSearch, FileWarning, Files, ArrowRight } from "lucide-react";
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
    <section
      className="reveal py-16 md:py-24"
      style={{ background: "#F8FAFC" }}
    >
      <div className="mx-auto max-w-[var(--max-width-content)] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center">WHO THIS IS FOR</p>
          <h2 className="mt-3 text-center" style={{ color: "var(--color-text-primary)" }}>
            Every MCA Borrower Deserves Clarity
          </h2>
          <p
            className="mx-auto mt-2 max-w-[600px] text-center text-[var(--text-base)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Choose your situation below.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3 md:items-stretch">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80} className="flex md:h-full">
              <div
                className="card flex h-full w-full cursor-default flex-col border-l-4 p-8 transition-all duration-300"
                style={{
                  borderLeftColor: "var(--color-accent-primary)",
                  background: "var(--color-bg-surface)",
                  borderColor: "var(--color-border-default)",
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  <card.icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                </div>
                <h3
                  className="mt-4 text-[18px] font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-2 flex-1 text-[15px] leading-[1.7]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {card.description}
                </p>
                <button
                  type="button"
                  onClick={scrollToUpload}
                  className="group mt-5 flex shrink-0 cursor-pointer items-center gap-1 text-[14px] font-medium transition-colors"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  Check Your Contract
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
