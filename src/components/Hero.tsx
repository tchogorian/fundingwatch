"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const HERO_DOCUMENT_IMAGE =
  process.env.NEXT_PUBLIC_HERO_DOCUMENT_IMAGE_URL ?? "/images/hero-contract-document.png";

export default function Hero() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLearn = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero relative overflow-hidden" aria-label="Hero">
      <div className="hero-inner">
        {/* Left column */}
        <div>
          <p className="eyebrow hero-eyebrow">
            MCA INTELLIGENCE FOR BUSINESS OWNERS
          </p>

          <h1
            className="hero-title"
            style={{
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Find a Better MCA. We Did the Research.</span>
          </h1>
          <p className="hero-sub">
            We rate every lender. We analyze every contract. And when you&apos;re ready,
            we connect you with lenders that passed our standards — not the ones that pay the most.
          </p>

          <div className="hero-btns">
            <button
              type="button"
              onClick={scrollToUpload}
              className="btn-hero-primary inline-flex min-h-[48px] items-center justify-center gap-2 w-full sm:w-auto"
            >
              Analyze My Contract →
            </button>
            <Link
              href="/lender-risk-index"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10 w-full sm:w-auto"
            >
              Look Up a Lender →
            </Link>
          </div>
        </div>

        {/* Right column: contract document image */}
        <div className="hero-document-wrapper">
          <img
            src={HERO_DOCUMENT_IMAGE}
            alt="Merchant Cash Advance Agreement document with warning"
            className="hero-contract-document-img"
          />
        </div>
      </div>

      {/* Scroll indicator — centered at bottom */}
      <button
        type="button"
        onClick={scrollToLearn}
        className="hero-scroll-btn"
        aria-label="Scroll to learn more"
      >
        <span>Scroll to learn more</span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
      </button>
    </section>
  );
}
