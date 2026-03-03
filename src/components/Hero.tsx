"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] flex-col overflow-hidden bg-hero-from">
      {/* Sophisticated dark gradient + radial blue */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 60%),
            linear-gradient(180deg, #0F172A 0%, #1E293B 100%)
          `,
        }}
      />
      {/* Grid pattern overlay */}
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

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 pt-12 pb-24 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:pt-0 lg:pb-20">
        {/* Left column — content */}
        <div className="flex w-full max-w-[55%] flex-col text-left lg:max-w-none">
          <p
            className="animate-fade-in text-eyebrow font-semibold uppercase tracking-widest text-accent"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            FREE MCA CONTRACT ANALYSIS
          </p>
          <h1
            className="mt-4 animate-fade-in text-hero-mobile font-bold leading-[1.1] tracking-tight text-white opacity-0 lg:text-hero-desktop"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            What&apos;s Your MCA{" "}
            <span className="text-accent-light">Really Costing You?</span>
          </h1>
          <p
            className="mt-6 max-w-[520px] animate-fade-in text-[20px] leading-[1.6] text-slate-400 opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Upload your contract. Our AI reveals your true APR, hidden terms, and red flags in seconds.
          </p>
          <div
            className="mt-10 animate-fade-in opacity-0"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <button
              type="button"
              onClick={scrollToUpload}
              className="group flex cursor-pointer items-center rounded-button bg-accent px-8 py-4 text-body font-semibold text-white shadow-button-accent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-button-accent-hover"
              style={{
                background: "linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)",
              }}
            >
              Analyze My Contract Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-small text-muted">
              No signup required · Free forever
            </p>
          </div>
        </div>

        {/* Right column — product mockup */}
        <div
          className="mt-16 w-full max-w-[90%] animate-fade-in opacity-0 lg:mt-0 lg:max-w-[45%]"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <div
            className="animate-float overflow-hidden rounded-card border border-white/10 bg-slate-900/90 shadow-mockup"
            style={{
              transform: "perspective(1000px) rotateY(-2deg) rotateX(2deg)",
            }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/80 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
              </div>
              <div className="ml-3 flex flex-1 items-center rounded-input bg-slate-800 px-3 py-2">
                <span className="text-small text-slate-500">
                  fundingwatch.org/report
                </span>
              </div>
            </div>
            {/* Report preview card */}
            <div className="border-t border-white/5 bg-secondary-bg p-5">
              <p className="text-small font-semibold uppercase tracking-wider text-muted">
                Sample Report
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-4">
                <div>
                  <p className="text-small text-muted">Effective APR</p>
                  <p className="text-2xl font-bold text-danger">187%</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-small text-muted">Advance → Repayment</p>
                  <p className="text-lg font-semibold text-dark-text">
                    $50,000 → $72,500
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-button bg-danger/10 px-2.5 py-1 text-small font-medium text-danger">
                  Confession of Judgment
                </span>
                <span className="rounded-button bg-warning/10 px-2.5 py-1 text-small font-medium text-warning">
                  No Reconciliation
                </span>
                <span className="rounded-button bg-danger/10 px-2.5 py-1 text-small font-medium text-danger">
                  187% APR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px]"
        style={{
          background: "linear-gradient(to top, #FFFFFF, transparent)",
        }}
      />
    </section>
  );
}
