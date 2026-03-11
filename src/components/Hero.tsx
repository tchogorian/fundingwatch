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
            Upload your contract for a full analysis, or answer a few questions
            if you don&apos;t have it handy.
          </p>

          <div className="hero-btns grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <button
              type="button"
              onClick={scrollToUpload}
              className="btn-hero-primary inline-flex min-h-[52px] flex-col items-center justify-center gap-1 py-3 text-left sm:min-h-[120px]"
            >
              <span className="font-semibold">I have my contract</span>
              <span className="text-sm font-normal opacity-90">
                Upload it and get a full AI analysis in 60 seconds
              </span>
              <span className="mt-1 text-sm opacity-90">Upload now →</span>
            </button>
            <a
              href="/questionnaire"
              className="inline-flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-white/40 bg-white/10 px-6 py-3 text-left font-medium text-white backdrop-blur transition hover:border-white/60 hover:bg-white/20 sm:min-h-[120px]"
            >
              <span className="font-semibold">I don&apos;t have my contract</span>
              <span className="text-sm font-normal opacity-90">
                Answer a few questions and find out where you stand
              </span>
              <span className="mt-1 text-sm opacity-90">Start assessment →</span>
            </a>
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
