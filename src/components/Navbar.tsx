"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Globe, HelpCircle, User } from "lucide-react";

const subnavLinks = [
  { label: "Ratings", href: "/lender-risk-index" },
  { label: "Products", href: "#how-it-works", dropdown: true },
  { label: "Research", href: "/intelligence", dropdown: true },
  { label: "Events", href: "#", dropdown: true },
  { label: "Regulatory", href: "#", dropdown: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLRI = pathname?.startsWith("/lender-risk-index");

  return (
    <>
      {/* Top nav — white bar, 52px */}
      <header
        className="sticky top-0 z-[100] flex h-[52px] items-center justify-between border-b px-6 md:px-8"
        style={{ background: "var(--white)", borderColor: "#e5e9ed", fontFamily: "var(--font-sans)" }}
      >
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="shrink-0 text-[22px] font-bold leading-none tracking-tight"
            style={{ fontFamily: "var(--font-serif)", color: "var(--red)", letterSpacing: "-0.3px" }}
          >
            debtura
          </Link>
          <button
            type="button"
            className="hidden items-center gap-1.5 text-[13px] font-medium md:flex"
            style={{ color: "var(--body)", cursor: "pointer" }}
            aria-label="Explore"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="shrink-0">
              <rect x="1" y="1" width="5" height="5" rx="0.5" fill="#333" />
              <rect x="8" y="1" width="5" height="5" rx="0.5" fill="#333" />
              <rect x="1" y="8" width="5" height="5" rx="0.5" fill="#333" />
              <rect x="8" y="8" width="5" height="5" rx="0.5" fill="#333" />
            </svg>
            Explore
          </button>
        </div>

        <div className="hidden items-center gap-6 md:flex" style={{ marginLeft: "auto" }}>
          <Link href="/lender-risk-index" className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--mid)" }}>
            <Search className="h-3.5 w-3.5" strokeWidth={2} />
            Search
          </Link>
          <button type="button" className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--mid)", background: "none", border: "none", cursor: "pointer" }}>
            <Globe className="h-3.5 w-3.5" strokeWidth={2} />
            EN
          </button>
          <Link href="/#check-contract" className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--mid)" }}>
            <HelpCircle className="h-3.5 w-3.5" strokeWidth={2} />
            Support
          </Link>
          <Link
            href="/#application"
            className="flex items-center gap-1.5 rounded px-3.5 py-1.5 text-[12px] font-semibold"
            style={{ background: "var(--navy)", color: "var(--white)", letterSpacing: "0.04em" }}
          >
            <User className="h-3.25 w-3.25" strokeWidth={2} />
            Login
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          style={{ color: "var(--body)", background: "none", border: "none", cursor: "pointer" }}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sub nav — black bar, 46px */}
      <nav
        className="sticky top-[52px] z-[99] flex h-[46px] items-center px-6 md:px-8"
        style={{ background: "#1a1a1a", fontFamily: "var(--font-sans)" }}
        aria-label="Section"
      >
        <div className="flex h-full">
          {subnavLinks.map((item) => {
            const isActive = item.href === "/lender-risk-index" && isLRI;
            const style = {
              color: isActive ? "white" : "rgba(255,255,255,0.8)",
              borderBottomColor: isActive ? "var(--red)" : "transparent",
              background: "none",
              borderLeft: "none",
              borderRight: "none",
              borderTop: "none",
              cursor: "pointer",
              textDecoration: "none",
            };
            const className = "flex h-[46px] items-center border-b-2 px-4 text-[13px] font-medium transition-colors";
            if (item.href.startsWith("#")) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })}
                  className={className}
                  style={style}
                >
                  {item.label}
                  {item.dropdown ? " ▾" : ""}
                </button>
              );
            }
            return (
              <Link key={item.label} href={item.href} className={className} style={style}>
                {item.label}
                {item.dropdown ? " ▾" : ""}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-[90] bg-black/20 md:hidden"
        style={{ top: "98px", opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      <div
        className="fixed right-0 top-[98px] z-[91] w-[280px] border-l bg-white shadow-xl md:hidden"
        style={{ transform: mobileOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.2s" }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col py-4" style={{ fontFamily: "var(--font-sans)" }}>
          {subnavLinks.map((item) => {
            const Comp = item.href.startsWith("#") ? "a" : Link;
            const href = item.href.startsWith("#") ? `/${item.href}` : item.href;
            return (
              <Comp
                key={item.label}
                href={href}
                className="px-6 py-3 text-[14px] font-medium"
                style={{ color: "var(--body)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Comp>
            );
          })}
          <Link href="/#application" className="mt-2 px-6 py-3 text-[13px] font-semibold" style={{ color: "var(--red)" }} onClick={() => setMobileOpen(false)}>
            Apply / Login
          </Link>
        </nav>
      </div>
    </>
  );
}
