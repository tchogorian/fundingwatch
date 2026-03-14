"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

// Order: How It Works | Lender Risk Index | Resources (dropdown) | FAQ | About.
const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Lender Risk Index", href: "/lender-risk-index", highlight: true },
  {
    label: "Resources",
    dropdown: [
      { label: "MCA Calculator", href: "/apr-calculator" },
      { label: "Blog", href: "/blog" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

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

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main" style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
          {navLinks.map((item) => {
            if ("dropdown" in item && item.dropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setResourcesOpen(true)}
                  onMouseLeave={() => setResourcesOpen(false)}
                >
                  <button
                    type="button"
                    className="text-inherit transition-colors hover:opacity-90 min-h-[48px] inline-flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                    aria-expanded={resourcesOpen}
                    aria-haspopup="true"
                  >
                    {item.label} <span className="opacity-80">▾</span>
                  </button>
                  {resourcesOpen && (
                    <div className="absolute left-0 top-full pt-1" role="menu">
                      <div className="rounded-lg border border-white/20 py-2 shadow-lg min-w-[180px]" style={{ background: "rgba(42, 106, 158, 0.98)" }}>
                        {item.dropdown.map(({ label, href }) => (
                          <Link
                            key={href}
                            href={href}
                            role="menuitem"
                            className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/15 text-white"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            const href = "href" in item ? item.href : "";
            const label = item.label;
            const highlight = "highlight" in item && item.highlight;
            const isHash = href.startsWith("#");
            const linkClass = "min-h-[48px] inline-flex items-center transition-colors hover:opacity-90 text-inherit no-underline bg-transparent border-0 cursor-pointer";
            const linkStyle = highlight ? { color: "#fff", fontWeight: 600 } : {};
            if (isHash && !isHome) {
              return (
                <a key={href} href={`/#${href.slice(1)}`} className={linkClass} style={linkStyle}>
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
                  className={linkClass}
                  style={linkStyle}
                >
                  {label}
                </button>
              );
            }
            return (
              <Link key={href} href={href} className={linkClass} style={linkStyle}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-12 w-12 min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center md:hidden text-white bg-transparent border-0"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

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
          {navLinks.map((item) => {
            if ("dropdown" in item && item.dropdown) {
              return (
                <div key={item.label} className="flex flex-col gap-0">
                  <p className="py-3 text-[12px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-tertiary)" }}>
                    {item.label}
                  </p>
                  {item.dropdown.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex min-h-[48px] items-center pl-4 text-[16px] font-normal transition-colors hover:opacity-80 py-2"
                      style={{ color: "#0B1F3A" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              );
            }
            const href = "href" in item ? item.href : "";
            const label = item.label;
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
