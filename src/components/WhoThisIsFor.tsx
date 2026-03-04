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
    <section className="section-dark who-section reveal" aria-label="Who this is for">
      <div className="section-inner mx-auto max-w-[1280px] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center">WHO THIS IS FOR</p>
          <h2 className="section-title text-center">
            Every MCA Borrower Deserves Clarity
          </h2>
          <p
            className="mx-auto mt-2 max-w-[600px] text-center text-[var(--text-base)]"
            style={{ color: "var(--on-dark-2)" }}
          >
            Choose your situation below.
          </p>
        </FadeIn>
        <div className="who-grid mt-12 sm:mt-16">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div className="who-card flex h-full flex-col">
                <span className="who-card-num">{String(i + 1).padStart(2, "0")}</span>
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  <card.icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="who-card-title">{card.title}</h3>
                <p className="who-card-desc flex-1">{card.description}</p>
                <button
                  type="button"
                  onClick={scrollToUpload}
                  className="who-card-link"
                >
                  Check Your Contract
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
