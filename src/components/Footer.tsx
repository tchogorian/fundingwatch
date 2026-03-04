"use client";

import Link from "next/link";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-hero-from py-section-y-mobile sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <Link
              href="/"
              className="cursor-pointer text-[20px] font-semibold text-white transition hover:opacity-90"
            >
              FundingWatch
            </Link>
            <p className="mt-2 text-small text-[#94A3B8]">
              Free MCA Contract Intelligence
            </p>
            <p className="mt-4 max-w-[280px] text-small leading-[1.6] text-[#94A3B8]">
              Helping small business owners understand their MCA contracts. Free AI-powered analysis that reveals your true APR, hidden terms, and red flags.
            </p>
            <a
              href="mailto:hello@fundingwatch.org"
              className="mt-4 inline-block cursor-pointer text-small text-accent-light transition hover:underline"
            >
              hello@fundingwatch.org
            </a>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-small font-semibold uppercase tracking-wider text-white">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#how-it-works")}
                  className="cursor-pointer text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("upload");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="cursor-pointer text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  Analyze Your Contract
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  Sample Report
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  APR Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-small font-semibold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#resources")}
                  className="cursor-pointer text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  Understanding MCAs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#faq")}
                  className="cursor-pointer text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  Industry News
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  MCA Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-small font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#about")}
                  className="cursor-pointer text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  About
                </button>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@fundingwatch.org"
                  className="text-small text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#1E293B] pt-6 sm:mt-16">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[13px] text-muted">© 2026 FundingWatch</p>
            <p className="text-[13px] text-muted">Miami, FL</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
