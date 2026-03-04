"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Resources", href: "#resources" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-[100] h-16 border-b border-[var(--color-border-default)]"
        style={{
          background: "rgba(6, 11, 20, 0.85)",
          backdropFilter: "blur(16px) saturate(180%)",
        }}
      >
        <div className="mx-auto flex h-full max-w-[var(--max-width-content)] items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-[18px] font-semibold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            <Shield
              className="h-5 w-5 shrink-0"
              style={{ color: "var(--color-accent-primary)" }}
              aria-hidden
            />
            <span>
              Funding<span style={{ color: "var(--color-accent-primary)" }}>Watch</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map(({ label, href }) => {
              const isHash = href.startsWith("#");
              return isHash ? (
                <button
                  key={href}
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="text-[14px] font-normal transition-colors duration-200 hover:text-[var(--color-text-primary)]"
                  style={{
                    color: "var(--color-text-secondary)",
                    textUnderlineOffset: "4px",
                  }}
                >
                  <span className="border-b border-transparent hover:border-[var(--color-accent-primary)]">
                    {label}
                  </span>
                </button>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-[14px] font-normal transition-colors duration-200 hover:text-[var(--color-text-primary)]"
                  style={{
                    color: "var(--color-text-secondary)",
                    textUnderlineOffset: "4px",
                  }}
                >
                  <span className="border-b border-transparent hover:border-[var(--color-accent-primary)]">
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToUpload}
              className="btn-primary hidden items-center gap-2 px-5 py-2.5 text-[13px] uppercase tracking-[0.06em] md:flex"
            >
              Analyze Contract
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center md:hidden"
              style={{ color: "var(--color-text-primary)" }}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — slides in from RIGHT, 300px wide */}
      <div
        className="fixed inset-y-0 right-0 z-[90] w-[300px] transform border-l border-[var(--color-border-strong)] transition-transform duration-300 ease-[var(--ease-out)] md:hidden"
        style={{
          background: "var(--color-bg-elevated)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          top: "64px",
          height: "calc(100vh - 64px)",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-0 px-4 pt-6 pb-8" aria-label="Mobile">
          {navLinks.map(({ label, href }) => {
            const isHash = href.startsWith("#");
            if (isHash) {
              return (
                <button
                  key={href}
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="flex min-h-[56px] cursor-pointer items-center text-[20px] font-normal transition-colors"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {label}
                </button>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className="flex min-h-[56px] cursor-pointer items-center text-[20px] font-normal transition-colors"
                style={{ color: "var(--color-text-primary)" }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={scrollToUpload}
            className="btn-primary mt-8 flex w-full items-center justify-center gap-2 py-4 text-[13px] uppercase tracking-[0.06em]"
          >
            Analyze Contract
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </nav>
      </div>

      {/* Overlay when drawer open */}
      <div
        className="fixed inset-0 z-[80] bg-black/40 transition-opacity duration-300 md:hidden"
        style={{
          top: "64px",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
    </>
  );
}
