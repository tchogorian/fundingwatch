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
      className="section-card section-card--dark"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand (wider) */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-[18px] font-semibold transition hover:opacity-90"
              style={{ color: "var(--on-dark-1)" }}
            >
              Funding<span style={{ color: "var(--accent-cyan)" }}>Watch</span>
            </Link>
            <p
              className="mt-2 text-[var(--text-sm)]"
              style={{ color: "var(--on-dark-2)" }}
            >
              Free MCA Contract Intelligence
            </p>
            <p
              className="mt-4 max-w-[280px] text-[var(--text-sm)] leading-[1.6]"
              style={{ color: "var(--on-dark-2)" }}
            >
              Helping small business owners understand their MCA contracts. Free contract intelligence.
            </p>
            <a
              href="mailto:hello@fundingwatch.org"
              className="mt-4 inline-block text-[var(--text-sm)] transition hover:underline"
              style={{ color: "var(--accent-cyan)" }}
            >
              hello@fundingwatch.org
            </a>
            <p className="mt-2 text-[var(--text-sm)]" style={{ color: "var(--on-dark-3)" }}>
              Miami, FL
            </p>
          </div>

          {/* Column 2: How It Works + Lender Risk Index + Analyze */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--on-dark-3)" }}
            >
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#how-it-works")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link
                  href="/lender-risk-index"
                  className="text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  Lender Risk Index
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  Analyze Your Contract
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#faq")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#about")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources (matches nav dropdown) */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--on-dark-3)" }}
            >
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/apr-calculator"
                  className="text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  MCA Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--on-dark-2)" }}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--on-dark-2)" }}>
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/sample-report"
                  className="text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  Sample Report
                </Link>
              </li>
              <li>
                <Link
                  href="/questionnaire"
                  className="text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--on-dark-3)" }}
            >
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#about")}
                  className="text-left text-[var(--text-sm)] transition-colors hover:underline"
                  style={{ color: "var(--on-dark-2)" }}
                >
                  About
                </button>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--on-dark-2)" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--on-dark-2)" }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:hello@fundingwatch.org" className="text-[var(--text-sm)] transition-colors hover:underline" style={{ color: "var(--on-dark-2)" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h3
              className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
              style={{ color: "var(--on-dark-3)" }}
            >
              MCA Industry Updates
            </h3>
            <p className="mt-2 text-[var(--text-sm)]" style={{ color: "var(--on-dark-2)" }}>
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
                className="min-h-[44px] flex-1 rounded-[var(--radius-full)] border px-4 text-[var(--text-base)] outline-none transition focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-opacity-30"
                style={{ color: "var(--on-dark-1)", background: "var(--bg-dark-card)", borderColor: "var(--border-dark)" }}
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn-primary shrink-0 px-5 py-2.5 text-[13px] uppercase">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--border-dark)" }}>
          <p className="text-[12px] text-center max-w-[720px] mx-auto mb-4" style={{ color: "var(--on-dark-3)" }}>
            Funding Watch is a licensed commercial financing broker (NMLS# pending). When you apply through our lender network, we may receive compensation from the lender. This does not affect your terms.
          </p>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[13px]" style={{ color: "var(--on-dark-3)" }}>
            © 2026 FundingWatch · Miami, FL
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[13px] transition hover:underline" style={{ color: "var(--on-dark-3)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[13px] transition hover:underline" style={{ color: "var(--on-dark-3)" }}>
              Terms of Service
            </Link>
            <a href="mailto:hello@fundingwatch.org" className="text-[13px] transition hover:underline" style={{ color: "var(--on-dark-3)" }}>
              Contact
            </a>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
