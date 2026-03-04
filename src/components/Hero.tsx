"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLearn = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero relative min-h-screen overflow-hidden" aria-label="Hero">
      <div className="hero-inner">
        {/* Left column — content */}
        <div>
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            FREE MCA CONTRACT INTELLIGENCE
          </p>
          <h1
            className="mb-6"
            style={{
              fontSize: "clamp(3rem, 6.5vw, 5.2rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            <span className="hero-white">What&apos;s Your MCA</span>
            <br />
            <span className="hero-gradient">Really Costing</span>
            <br />
            <span className="hero-white">You?</span>
          </h1>
          <p className="hero-sub">
            Upload your contract. Our system reveals your true APR, hidden terms, and red flags —
            free, in under 30 seconds.
          </p>
          <div className="hero-btns">
            <button
              type="button"
              onClick={scrollToUpload}
              className="btn-hero-outline inline-flex items-center gap-2"
            >
              Analyze My Contract Free
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={scrollToUpload}
              className="btn-hero-dark inline-flex items-center gap-2"
            >
              See Your Report
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="trust-logos">
            <span className="trust-logos-label">Trusted by business owners in:</span>
            <span className="trust-logo-item">NY</span>
            <span className="trust-logo-item">CA</span>
            <span className="trust-logo-item">FL</span>
            <span className="trust-logo-item">TX</span>
            <span className="trust-logo-item">IL</span>
          </div>
        </div>

        {/* Right column — hero illustration: gradient layer + image blend (no black box), bigger, stitched */}
        <div className="hero-illustration-wrap max-lg:mx-auto max-lg:mt-12">
          <div className="hero-illustration-bg" aria-hidden="true" />
          <div
            className="hero-illustration-img"
            role="img"
            aria-hidden="true"
            style={{ backgroundImage: "url(/images/robin-hood.png)" }}
          />
          <div className="hero-illustration-stitch" aria-hidden="true" />
        </div>
      </div>

      {/* Sample report card — mobile only (hero right column alternative) */}
      <div className="relative z-10 mx-4 mt-8 lg:hidden" style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        <SampleReportCard onAnalyze={scrollToUpload} />
      </div>

      {/* Floating notification card — bottom left */}
      <div className="hero-notify max-md:left-4 max-md:right-4 max-md:bottom-6 max-md:left-4">
        <div className="notify-thumb">📄</div>
        <div>
          <p className="notify-title">New red flag detected 🚨</p>
          <Link href="#upload" onClick={(e) => { e.preventDefault(); scrollToUpload(); }} className="notify-sub hover:underline">
            See what&apos;s in your contract →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToLearn}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white/90"
        aria-label="Scroll to learn more"
      >
        <span className="text-xs">Scroll to learn more</span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
      </button>
    </section>
  );
}

function SampleReportCard({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <div
      className="overflow-hidden rounded-[18px]"
      style={{
        background: "#FFFFFF",
        borderTop: "3px solid var(--danger)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        animation: "slideUpFade 600ms 400ms both cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="p-6">
        <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#6B7280" }}>
          SAMPLE ANALYSIS REPORT
        </p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold" style={{ fontSize: "15px", color: "#0B1F3A" }}>
              Riverside Deli & Catering LLC
            </p>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>New York, NY</p>
          </div>
          <div className="flex flex-col items-end">
            <div
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full font-mono text-[16px] font-bold"
              style={{
                border: "2.5px solid var(--danger)",
                background: "var(--danger-bg)",
                color: "var(--danger)",
              }}
            >
              78
            </div>
            <span style={{ fontSize: "9px", color: "#9CA3AF", marginTop: "2px" }}>/100</span>
            <span style={{ fontSize: "10px", color: "var(--danger)", fontWeight: 700 }}>
              HIGH RISK
            </span>
          </div>
        </div>
        <hr className="my-5 border-[#F3F4F6]" />
        <p style={{ fontSize: "11px", color: "#9CA3AF" }}>You&apos;re paying</p>
        <p className="font-mono font-bold" style={{ fontSize: "38px", color: "var(--danger)", lineHeight: 1 }}>
          187% APR
        </p>
        <p style={{ fontSize: "12px", color: "#6B7280", marginTop: 6 }}>
          on a $50,000 advance. <strong style={{ color: "#0B1F3A" }}>That&apos;s $22,500 in fees</strong> — for 6 months.
        </p>
        <hr className="my-5 border-[#F3F4F6]" />
        <p className="font-semibold" style={{ fontSize: "13px", color: "#374151" }}>
          3 Contract Problems Found:
        </p>
        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <span
              className="shrink-0 rounded px-2 py-[3px] text-[9px] font-bold uppercase"
              style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}
            >
              RED FLAG
            </span>
            <div>
              <span className="font-semibold" style={{ fontSize: "13px", color: "#0B1F3A" }}>
                Confession of Judgment
              </span>
              <p className="text-[11px] leading-snug" style={{ color: "#6B7280", marginTop: 2 }}>
                Lender can freeze your bank account without warning
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span
              className="shrink-0 rounded px-2 py-[3px] text-[9px] font-bold uppercase"
              style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}
            >
              RED FLAG
            </span>
            <div>
              <span className="font-semibold" style={{ fontSize: "13px", color: "#0B1F3A" }}>
                No Reconciliation Clause
              </span>
              <p className="text-[11px] leading-snug" style={{ color: "#6B7280", marginTop: 2 }}>
                Payments won&apos;t adjust if your revenue drops
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span
              className="shrink-0 rounded px-2 py-[3px] text-[9px] font-bold uppercase"
              style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E" }}
            >
              CAUTION
            </span>
            <div>
              <span className="font-semibold" style={{ fontSize: "13px", color: "#0B1F3A" }}>
                Personal Guarantee
              </span>
              <p className="text-[11px] leading-snug" style={{ color: "#6B7280", marginTop: 2 }}>
                Your personal assets are at risk
              </p>
            </div>
          </div>
        </div>
        <hr className="my-5 border-[#F3F4F6]" />
        <button
          type="button"
          onClick={onAnalyze}
          className="btn-hero-dark flex w-full items-center justify-center gap-2 py-3 text-[13px] font-semibold"
        >
          Analyze Your Contract Free
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
