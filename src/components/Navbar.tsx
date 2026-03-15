"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Lender Risk Index", href: "/lender-risk-index" },
  { label: "Contract Analyzer", href: "/analyze" },
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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #1a3a5c 0%, #1e5a8a 50%, #2a6a9e 100%)",
    padding: "14px 32px",
  };

  return (
    <>
      <header
        className="sticky top-0 z-[100] w-full flex items-center justify-between px-4 py-3.5 sm:px-8"
        style={headerStyle}
      >
        <Link
          href="/"
          className="text-[22px] text-white lowercase tracking-tight"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", letterSpacing: "-0.5px" }}
        >
          debtura
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}
        >
          {navLinks.map((item) => {
            const href = item.href;
            const isHash = href.startsWith("#");
            const linkClass = "min-h-[48px] inline-flex items-center transition-colors hover:opacity-90 text-inherit no-underline bg-transparent border-0 cursor-pointer";
            if (isHash && !isHome) {
              return (
                <a key={href} href={`/#${href.slice(1)}`} className={linkClass}>
                  {item.label}
                </a>
              );
            }
            if (isHash) {
              return (
                <button key={href} type="button" onClick={() => scrollTo(href)} className={linkClass}>
                  {item.label}
                </button>
              );
            }
            return (
              <Link key={href} href={href} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-12 w-12 min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center md:hidden text-white bg-transparent border-0"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div
        className="fixed inset-y-0 right-0 z-[90] w-[300px] transform border-l border-[#e2e8f0] transition-transform duration-300 md:hidden"
        style={{
          background: "#fff",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          top: "84px",
          height: "calc(100vh - 84px)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-0 px-4 pt-6 pb-8" aria-label="Mobile">
          {navLinks.map((item) => {
            const href = item.href;
            const isHash = href.startsWith("#");
            const style = { color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" };
            if (isHash && !isHome) {
              return (
                <a key={href} href={`/#${href.slice(1)}`} className="flex min-h-[56px] items-center py-3 text-[16px] transition-colors hover:opacity-80" style={style} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              );
            }
            if (isHash) {
              return (
                <button key={href} type="button" onClick={() => scrollTo(href)} className="flex min-h-[56px] w-full items-center py-3 text-left text-[16px] transition-colors hover:opacity-80 bg-transparent border-0 cursor-pointer" style={style}>
                  {item.label}
                </button>
              );
            }
            return (
              <Link key={href} href={href} className="flex min-h-[56px] items-center py-3 text-[16px] transition-colors hover:opacity-80 no-underline" style={style} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className="fixed inset-0 z-[80] bg-black/10 transition-opacity duration-300 md:hidden"
        style={{ top: "84px", opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
    </>
  );
}
