"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Resources", href: "#resources" },
  { label: "MCA Calculator", href: "/apr-calculator" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
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
      <div
        className="sticky top-0 z-[100] w-full px-4 py-3 sm:px-6"
        style={{ background: "#2E75B6" }}
      >
        <nav
          className="mx-auto flex h-[60px] max-w-[1180px] items-center justify-between rounded-full px-7"
          style={{
            background: "#2E75B6",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-[17px] font-extrabold tracking-tight"
            style={{ color: "#FFFFFF", letterSpacing: "-0.03em" }}
          >
            <Shield
              className="h-5 w-5 shrink-0"
              style={{ color: "rgba(255,255,255,0.9)" }}
              aria-hidden
            />
            <span>
              Funding<span style={{ color: "#4AE8A4" }}>Watch</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map(({ label, href }) => {
              const isHash = href.startsWith("#");
              if (isHash && !isHome) {
                return (
                  <a
                    key={href}
                    href={`/#${href.slice(1)}`}
                    className="text-[14px] font-medium transition-colors hover:opacity-90 min-h-[48px] min-w-[48px] inline-flex items-center"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {label}
                  </a>
                );
              }
              if (isHash) {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => scrollTo(href)}
                    className="text-[14px] font-medium transition-colors hover:opacity-90 min-h-[48px] min-w-[48px] flex items-center"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {label}
                  </button>
                );
              }
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-[14px] font-medium transition-colors hover:opacity-90 min-h-[48px] min-w-[48px] inline-flex items-center"
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {isHome ? (
              <Link
                href="#upload"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToUpload();
                }}
                className="hidden items-center gap-2 md:inline-flex nav-cta min-h-[48px]"
                style={{
                  background: "#FFFFFF",
                  color: "#0B1F3A",
                  borderRadius: "9999px",
                  padding: "10px 22px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Analyze My Contract
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : (
              <a
                href="/#upload"
                className="hidden items-center gap-2 md:inline-flex nav-cta min-h-[48px]"
                style={{
                  background: "#FFFFFF",
                  color: "#0B1F3A",
                  borderRadius: "9999px",
                  padding: "10px 22px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Analyze My Contract
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            )}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-12 w-12 min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center md:hidden"
              style={{ color: "#FFFFFF" }}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className="fixed inset-y-0 right-0 z-[90] w-[300px] transform border-l border-[#E5E7EB] transition-transform duration-300 md:hidden"
        style={{
          background: "#FFFFFF",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          top: "84px",
          height: "calc(100vh - 84px)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-0 px-4 pt-6 pb-8" aria-label="Mobile">
          {navLinks.map(({ label, href }) => {
            const isHash = href.startsWith("#");
            if (isHash && !isHome) {
              return (
                <a
                  key={href}
                  href={`/#${href.slice(1)}`}
                  className="flex min-h-[56px] min-w-[48px] cursor-pointer items-center text-[20px] font-normal transition-colors hover:opacity-80 py-3"
                  style={{ color: "#0B1F3A" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              );
            }
            if (isHash) {
              return (
                <button
                  key={href}
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="flex min-h-[56px] min-w-[48px] cursor-pointer items-center text-[20px] font-normal transition-colors hover:opacity-80 py-3 text-left w-full"
                  style={{ color: "#0B1F3A" }}
                >
                  {label}
                </button>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className="flex min-h-[56px] min-w-[48px] cursor-pointer items-center text-[20px] font-normal transition-colors hover:opacity-80 py-3"
                style={{ color: "#0B1F3A" }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          {isHome ? (
            <Link
              href="#upload"
              onClick={(e) => {
                e.preventDefault();
                scrollToUpload();
              }}
              className="btn-primary mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 py-4 text-[13px] font-semibold"
            >
              Analyze My Contract
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <a
              href="/#upload"
              className="btn-primary mt-8 flex min-h-[48px] w-full items-center justify-center gap-2 py-4 text-[13px] font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Analyze My Contract
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          )}
        </nav>
      </div>

      <div
        className="fixed inset-0 z-[80] bg-black/10 transition-opacity duration-300 md:hidden"
        style={{
          top: "84px",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
    </>
  );
}
