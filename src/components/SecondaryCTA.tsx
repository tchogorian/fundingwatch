"use client";

import { ArrowRight } from "lucide-react";

export default function SecondaryCTA() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="hero-bg relative overflow-hidden py-16 md:py-24"
      style={{ background: "#F8FAFC" }}
    >
      <div className="relative mx-auto max-w-[var(--max-width-narrow)] px-4 text-center sm:px-6">
        <h2
          className="text-2xl font-semibold leading-tight md:text-3xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          Don&apos;t Pay More Than You Have To
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-[var(--text-base)] leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Courts are ruling that fixed daily payments without reconciliation may make your advance a loan subject to usury limits. See if your contract has red flags.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={scrollToUpload}
            className="btn-primary inline-flex items-center gap-2 px-8 py-4"
          >
            Analyze My Contract Free
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
