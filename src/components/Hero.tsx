"use client";

import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLearn = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="hero-bg relative min-h-[calc(100vh-64px)] overflow-hidden pt-[120px] pb-20 md:pb-24"
      style={{ background: "#F8FAFC" }}
      aria-label="Hero"
    >
      <div className="relative mx-auto grid w-full max-w-[var(--max-width-content)] grid-cols-1 gap-12 px-4 lg:grid-cols-[60%_40%] lg:items-center lg:gap-16 lg:px-6">
        {/* Left column — content */}
        <div className="flex flex-col">
          <p className="eyebrow">FREE MCA CONTRACT INTELLIGENCE</p>
          <h1
            className="mt-4 font-display text-[2.25rem] leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-[3rem] lg:text-[4.768rem]"
            style={{ letterSpacing: "-0.02em" }}
          >
            What&apos;s Your MCA
            <br />
            Really
            <br />
            Costing You?
          </h1>
          <p
            className="mt-6 max-w-[480px] text-[var(--text-lg)] font-light leading-relaxed"
            style={{ color: "#334155" }}
          >
            Upload your contract. Our AI reveals your true APR, hidden terms, and red flags —
            free, in under 30 seconds.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            <button
              type="button"
              onClick={scrollToUpload}
              className="btn-primary inline-flex w-fit items-center gap-2 px-8 py-4 text-base"
            >
              Analyze My Contract Free
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
            <p
              className="flex flex-wrap gap-x-6 gap-y-1 text-[var(--text-sm)]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <span>✓ No signup</span>
              <span>✓ Never stored</span>
              <span>✓ Free forever</span>
            </p>
          </div>
        </div>

        {/* Right column — sample report card (desktop) */}
        <div className="hidden lg:block">
          <SampleReportCard onAnalyze={scrollToUpload} />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToLearn}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-colors hover:opacity-80"
        style={{ color: "var(--color-text-tertiary)" }}
        aria-label="Scroll to learn more"
      >
        <span className="text-[12px]">Scroll to learn more</span>
        <ChevronDown className="h-5 w-5 animate-bounce-soft" aria-hidden />
      </button>
    </section>
  );
}

function SampleReportCard({ onAnalyze }: { onAnalyze: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] shadow-[var(--shadow-md)]"
      style={{
        background: "#FFFFFF",
        borderLeftWidth: "3px",
        borderLeftColor: "#DC2626",
        animation: "fadeInUp 600ms var(--ease-out) 200ms both",
      }}
    >
      <div className="p-6">
        <p
          className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Sample Report Preview
        </p>
        <p className="mt-1 font-mono text-[var(--text-base)] font-medium text-[var(--color-text-primary)]">
          Sample MCA Co. &nbsp;&nbsp;
          <span className="text-[var(--color-accent-primary)]">████████ 78/100</span>
        </p>
        <hr className="my-4 border-[var(--color-border-default)]" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text-secondary)" }}>Effective APR</span>
            <span className="font-mono font-medium text-[var(--color-accent-primary)]">187%</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text-secondary)" }}>Factor Rate</span>
            <span className="font-mono font-medium text-[var(--color-text-primary)]">1.45×</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text-secondary)" }}>Daily Payment</span>
            <span className="font-mono font-medium text-[var(--color-text-primary)]">$892</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge badge-danger">Red Flag</span>
          <span className="text-[var(--text-xs)]" style={{ color: "var(--color-text-secondary)" }}>
            Confession of Judgment
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="badge badge-danger">Red Flag</span>
          <span className="text-[var(--text-xs)]" style={{ color: "var(--color-text-secondary)" }}>
            No Reconciliation Clause
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="badge badge-warning">Caution</span>
          <span className="text-[var(--text-xs)]" style={{ color: "var(--color-text-secondary)" }}>
            Personal Guarantee
          </span>
        </div>
        <hr className="my-4 border-[var(--color-border-default)]" />
        <p className="text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>
          Advance → Repayment
        </p>
        <p className="font-mono text-[var(--text-base)] font-medium text-[var(--color-text-primary)]">
          $50,000 → $72,500
        </p>
        <button
          type="button"
          onClick={onAnalyze}
          className="btn-primary mt-4 flex w-full items-center justify-center gap-2 py-3 text-[13px] uppercase tracking-[0.06em]"
        >
          Analyze Your Contract
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
