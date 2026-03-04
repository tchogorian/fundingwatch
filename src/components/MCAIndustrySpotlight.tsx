"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

const cards = [
  {
    date: "November 2023",
    title: "New York's Landmark MCA Settlement Signals Industry Shift",
    summary:
      "A major MCA provider agreed to a $534 million settlement over allegations of deceptive lending practices. The case highlighted widespread issues with undisclosed fees, inflated factor rates, and aggressive collection tactics targeting small businesses.",
  },
  {
    date: "January 2024",
    title: "California Enacts MCA Disclosure Requirements",
    summary:
      "California's Department of Financial Protection and Innovation now requires MCA providers to disclose the equivalent annual percentage rate before funding. Providers must present total cost comparisons in standardized formats, giving borrowers clear information for the first time.",
  },
  {
    date: "September 2025",
    title: "Texas Transparency Law Takes Effect",
    summary:
      "Texas HB 700 requires MCA providers to register with the OCCC and meet new disclosure requirements. The law establishes transparency standards for commercial financing, joining a growing number of states regulating the MCA industry.",
  },
];

export default function MCAIndustrySpotlight() {
  return (
    <section className="bg-primary py-section-y-mobile sm:py-section-y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-eyebrow font-semibold uppercase tracking-widest text-accent">
            INDUSTRY NEWS
          </p>
          <h2 className="mt-3 text-center text-section-mobile font-semibold text-dark-text sm:text-section-desktop">
            What&apos;s Happening in the MCA Industry
          </h2>
          <p className="mt-4 text-center text-body text-muted">
            Recent legal developments and regulatory actions affecting MCA borrowers.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <article className="flex cursor-default flex-col rounded-card border border-border bg-primary p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                <p className="text-small text-[#94A3B8]">{card.date}</p>
                <h3 className="mt-2 text-[18px] font-semibold leading-snug text-dark-text">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.5] text-muted">
                  {card.summary}
                </p>
                <Link
                  href="#"
                  className="mt-4 cursor-pointer text-[15px] font-medium text-accent transition-colors hover:text-accent-dark"
                >
                  Read More →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
