"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-[var(--color-border-default)] pt-16 pb-8"
      style={{ background: "#F8FAFC" }}
    >
      <div className="mx-auto max-w-[var(--max-width-content)] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand (wider) */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-[18px] font-semibold transition hover:opacity-90"
              style={{ color: "var(--color-text-primary)" }}
            >
              Funding<span style={{ color: "var(--color-accent-primary)" }}>Watch</span>
            </Link>
            <p
              className="mt-2 text-[var(--text-sm)]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Free MCA Contract Intelligence
            </p>
            <p
              className="mt-4 max-w-[280px] text-[var(--text-sm)] leading-[1.6]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Helping small business owners understand their MCA contracts. Free AI-powered analysis.
            </p>
            <a
              href="mailto:hello@fundingwatch.org"
              className="mt-4 inline-block text-[var(--text-sm)] transition hover:underline"
              style={{ color: "var(--color-accent-primary)" }}
            >
              hello@fundingwatch.org
            </a>
            <p className="mt-2 text-[var(--text-sm)]" style={{ color: "var(--color-text-tertiary)" }}>
              Miami, FL
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-primary)" }}
            >
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#how-it-works")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Analyze Your Contract
                </button>
              </li>
              <li>
                <Link
                  href="/sample-report"
                  className="text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Sample Report
                </Link>
              </li>
              <li>
                <Link
                  href="/apr-calculator"
                  className="text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  APR Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-primary)" }}
            >
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#resources")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Understanding MCAs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#faq")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--color-text-secondary)" }}>
                  Industry News
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--color-text-secondary)" }}>
                  MCA Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-primary)" }}
            >
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#about")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  About
                </button>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--color-text-secondary)" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--color-text-secondary)" }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:hello@fundingwatch.org" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--color-text-secondary)" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-primary)" }}
            >
              MCA Industry Updates
            </h3>
            <p className="mt-2 text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>
              New settlements, regulatory changes, borrower rights.
            </p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="min-h-[44px] flex-1 rounded-[var(--radius-full)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 text-[var(--text-base)] outline-none transition focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-30"
                style={{ color: "var(--color-text-primary)" }}
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn-primary shrink-0 px-5 py-2.5 text-[13px] uppercase">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Trust badges strip */}
        <div className="mt-12 border-t border-[var(--color-border-default)] pt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Bank-Grade Privacy", "Contracts Never Stored", "Free Forever", "Facts Only — Never Legal Advice"].map((text) => (
              <span
                key={text}
                className="rounded-full border px-4 py-2 text-[var(--text-xs)] font-medium uppercase tracking-wider"
                style={{
                  borderColor: "var(--color-border-strong)",
                  background: "var(--color-bg-elevated)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border-default)] pt-6 sm:flex-row">
          <p className="text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
            © 2026 FundingWatch · Miami, FL
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[13px] transition hover:underline" style={{ color: "var(--color-text-tertiary)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[13px] transition hover:underline" style={{ color: "var(--color-text-tertiary)" }}>
              Terms of Service
            </Link>
            <a href="mailto:hello@fundingwatch.org" className="text-[13px] transition hover:underline" style={{ color: "var(--color-text-tertiary)" }}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
