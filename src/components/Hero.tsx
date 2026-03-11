"use client";

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
            For business owners with Merchant Cash Advances
          </p>

          <h1
            className="hero-title"
            style={{
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Something About</span>
            <br />
            <span style={{ color: "#FFFFFF" }}>Your </span>
            <span style={{ color: "#F87171" }}>MCA</span>
            <span style={{ color: "#FFFFFF" }}> Feels Off.</span>
            <br />
            <span style={{ color: "#FFFFFF" }}>You&apos;re </span>
            <span style={{ color: "#00C170" }}>Probably Right.</span>
          </h1>
          <p className="hero-sub">
            Upload the contract. The analyzer highlights hidden terms, real
            cost, and the parts most people miss.
          </p>

          <div className="hero-btns">
            <button
              type="button"
              onClick={scrollToUpload}
              className="btn-hero-primary inline-flex min-h-[48px] items-center justify-center gap-2 w-full sm:w-auto"
            >
              Analyze My Contract →
            </button>
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
