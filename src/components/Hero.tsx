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
          <p
            className="uppercase"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#0D9488",
              marginBottom: "20px",
            }}
          >
            FREE MCA CONTRACT INTELLIGENCE
          </p>
          <h1
            className="mt-0"
            style={{
              fontFamily: "var(--font-hero), 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              lineHeight: 1.1,
              color: "#0F172A",
              letterSpacing: "-0.03em",
            }}
          >
            What&apos;s Your MCA
            <br />
            Really
            <br />
            Costing You?
          </h1>
          <p
            className="mt-6 max-w-[460px] font-normal leading-relaxed"
            style={{ fontSize: "18px", color: "#4B5563", lineHeight: 1.6 }}
          >
            Upload your contract. Our system reveals your true APR, hidden terms, and red flags —
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
      className="rounded-[var(--radius-xl)] overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderTop: "3px solid #DC2626",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        animation: "fadeInUp 600ms var(--ease-out) 200ms both",
      }}
    >
      <div className="p-6">
        <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#6B7280" }}>
          SAMPLE ANALYSIS REPORT
        </p>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold" style={{ fontSize: "15px", color: "#0F172A" }}>
              Riverside Deli & Catering LLC
            </p>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>New York, NY</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-0.5">
              <div
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full font-mono text-[18px] font-bold"
                style={{
                  border: "3px solid #DC2626",
                  background: "#FEF2F2",
                  color: "#DC2626",
                }}
              >
                78
              </div>
              <span style={{ fontSize: "12px", color: "#9CA3AF", marginLeft: "2px" }}>/100</span>
            </div>
            <span style={{ fontSize: "10px", color: "#DC2626", fontWeight: 700, marginTop: "4px" }}>
              HIGH RISK
            </span>
          </div>
        </div>

        <hr className="my-5 border-[#E2E8F0]" />

        <p style={{ fontSize: "12px", color: "#6B7280" }}>You&apos;re paying</p>
        <p className="font-mono font-extrabold" style={{ fontSize: "32px", color: "#DC2626" }}>
          187% APR
        </p>
        <p style={{ fontSize: "13px", color: "#6B7280" }}>on a $50,000 advance</p>
        <p className="mt-2 italic" style={{ fontSize: "14px", color: "#374151" }}>
          That&apos;s $22,500 in fees — for 6 months.
        </p>

        <hr className="my-5 border-[#E2E8F0]" />

        <p className="font-semibold" style={{ fontSize: "13px", color: "#374151" }}>
          3 Contract Problems Found:
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <span
              className="inline-block px-2 py-[3px] text-[10px] font-bold uppercase"
              style={{
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#991B1B",
                borderRadius: "4px",
              }}
            >
              RED FLAG
            </span>
            <span className="ml-2 font-medium" style={{ fontSize: "13px", color: "#374151" }}>
              Confession of Judgment
            </span>
            <p className="mt-1 pl-0" style={{ fontSize: "12px", color: "#6B7280" }}>
              Lender can freeze your bank account without warning
            </p>
          </div>
          <div>
            <span
              className="inline-block px-2 py-[3px] text-[10px] font-bold uppercase"
              style={{
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#991B1B",
                borderRadius: "4px",
              }}
            >
              RED FLAG
            </span>
            <span className="ml-2 font-medium" style={{ fontSize: "13px", color: "#374151" }}>
              No Reconciliation Clause
            </span>
            <p className="mt-1 pl-0" style={{ fontSize: "12px", color: "#6B7280" }}>
              Payments won&apos;t adjust if your revenue drops
            </p>
          </div>
          <div>
            <span
              className="inline-block px-2 py-[3px] text-[10px] font-bold uppercase"
              style={{
                background: "#FFFBEB",
                border: "1px solid #FDE68A",
                color: "#92400E",
                borderRadius: "4px",
              }}
            >
              CAUTION
            </span>
            <span className="ml-2 font-medium" style={{ fontSize: "13px", color: "#374151" }}>
              Personal Guarantee
            </span>
            <p className="mt-1 pl-0" style={{ fontSize: "12px", color: "#6B7280" }}>
              Your personal assets are at risk
            </p>
          </div>
        </div>

        <hr className="my-5 border-[#E2E8F0]" />

        <button
          type="button"
          onClick={onAnalyze}
          className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-[13px] uppercase tracking-[0.06em]"
        >
          Analyze Your Contract Free
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
