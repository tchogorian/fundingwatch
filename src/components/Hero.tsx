"use client";

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
              className="btn-hero-primary inline-flex items-center gap-2"
            >
              Analyze My Contract Free
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

        {/* Spacer for layout on desktop so content doesn't overlap figure */}
        <div className="hero-illustration-spacer max-lg:hidden" aria-hidden="true" />
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
