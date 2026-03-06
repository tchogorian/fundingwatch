"use client";

import { ArrowRight } from "lucide-react";

export default function SecondaryCTA() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-card section-card--cta" aria-label="Call to action">
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
          Don&apos;t Pay More Than You Have To
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed" style={{ color: "var(--on-dark-2)" }}>
          Courts are ruling that fixed daily payments without reconciliation may make your advance a loan subject to usury limits. See if your contract has red flags.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={scrollToUpload}
            className="btn-primary inline-flex items-center gap-2 px-8 py-4"
          >
            Analyze My Contract →
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
