"use client";

import { ArrowRight } from "lucide-react";

export default function SecondaryCTA() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-hero-from py-section-y-mobile sm:py-section-y">
      {/* Same gradient + grid as hero */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 60%),
            linear-gradient(180deg, #0F172A 0%, #1E293B 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-section-mobile font-bold text-white sm:text-section-desktop">
          Don&apos;t Pay More Than You Have To
        </h2>
        <p className="mt-6 text-body text-slate-400">
          Courts are ruling that fixed daily payments without reconciliation may make your advance a loan subject to usury limits. See if your contract has red flags.
        </p>
        <button
          type="button"
          onClick={scrollToUpload}
          className="group mt-10 flex cursor-pointer items-center justify-center gap-2 rounded-button bg-accent px-8 py-4 text-body font-semibold text-white shadow-button-accent transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-button-accent-hover"
          style={{
            background: "linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)",
          }}
        >
          Analyze My Contract Free
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
