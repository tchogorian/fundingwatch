"use client";

import Link from "next/link";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 sm:px-6" style={{ background: "#0f172a" }} aria-label="Footer">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-[20px] font-normal lowercase tracking-tight text-white no-underline"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", letterSpacing: "-0.5px" }}
            >
              debtura
            </Link>
          </div>
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button type="button" onClick={() => scrollTo("#how-it-works")} className="text-left text-sm transition hover:underline bg-transparent border-0 cursor-pointer" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  How It Works
                </button>
              </li>
              <li>
                <Link href="/lender-risk-index" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Lender Risk Index
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Contract Analyzer
                </Link>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo("#application")} className="text-left text-sm transition hover:underline bg-transparent border-0 cursor-pointer" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Apply for Funding
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo("#faq")} className="text-left text-sm transition hover:underline bg-transparent border-0 cursor-pointer" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/blog" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/apr-calculator" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  MCA Calculator
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Glossary
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button type="button" onClick={() => scrollTo("#about")} className="text-left text-sm transition hover:underline bg-transparent border-0 cursor-pointer" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  About
                </button>
              </li>
              <li>
                <Link href="/privacy" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:hello@debtura.com" className="text-sm transition hover:underline" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-[12px] text-center" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            © 2026 Debtura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
