"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Globe, HelpCircle, User, ChevronDown, ChevronRight } from "lucide-react";

type DropdownItem = { label: string; href: string } | { label: string; disabled: true };

const productsItems: DropdownItem[] = [
  { label: "Merchant Cash Advance", href: "/products/merchant-cash-advance" },
  { label: "Mortgage", href: "/products/mortgage" },
  { label: "SBA Loans", href: "/products/sba-loans" },
];

const toolsItems: DropdownItem[] = [
  { label: "Contract Intelligence Tool", href: "/tools/contract-analyzer" },
  { label: "Lender Matching AI", href: "/tools/lender-matching" },
  { label: "MCA Calculator", href: "/tools/mca-calculator" },
  { label: "Quick Assessment", href: "/tools/quick-assessment" },
];

const researchItems: DropdownItem[] = [
  { label: "Industry Insights", href: "/intelligence" },
  { label: "Lender Risk Index", href: "/lender-risk-index" },
];

const comingSoonItem: DropdownItem[] = [{ label: "Coming Soon", disabled: true }];

const SUBNAV_DROPDOWN_BG = "#1a1a1a";

type SubnavEntry =
  | { label: string; href: string; dropdown?: false }
  | { label: string; dropdown: true; items: DropdownItem[] };

const subnavEntries: SubnavEntry[] = [
  { label: "Products", dropdown: true, items: productsItems },
  { label: "Tools", dropdown: true, items: toolsItems },
  { label: "Research", dropdown: true, items: researchItems },
  { label: "Events", dropdown: true, items: comingSoonItem },
  { label: "Regulatory", dropdown: true, items: comingSoonItem },
  { label: "Ratings", href: "/lender-risk-index", dropdown: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href));
  const isDropdownActive = (items: DropdownItem[]) =>
    items.some((sub) => "href" in sub && isActive(sub.href));

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

      {/* Sub nav — black bar, real dropdowns (hover), no scroll anchors */}
      <nav
        className="sticky top-[52px] z-[200] flex h-[46px] items-center overflow-visible px-6 md:px-8"
        style={{ background: SUBNAV_DROPDOWN_BG, fontFamily: "var(--font-sans)" }}
        aria-label="Section"
      >
        <div className="relative flex h-full items-center gap-0 overflow-visible">
          {subnavEntries.map((entry) => {
            const isDropdownOpen = openDropdown === entry.label;

            if (entry.dropdown && entry.items) {
              return (
                <div
                  key={entry.label}
                  className="relative flex"
                  onMouseEnter={() => setOpenDropdown(entry.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className="relative flex h-[46px] items-center border-b-2 border-transparent px-4 text-[13px] font-medium text-white/90 transition-colors hover:text-white"
                    style={{ borderBottomColor: isDropdownActive(entry.items) ? "var(--red)" : "transparent" }}
                    onClick={() => setOpenDropdown(isDropdownOpen ? null : entry.label)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    {entry.label}
                    <ChevronDown className="ml-1 h-3 w-3" strokeWidth={2} />
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="absolute left-0 top-[42px] z-[9999] min-w-[220px] rounded-b py-1 shadow-2xl"
                      style={{ background: SUBNAV_DROPDOWN_BG, fontFamily: "var(--font-sans)", border: "1px solid rgba(255,255,255,0.08)", borderTop: "none" }}
                    >
                      {entry.items.map((sub) => {
                        if ("href" in sub) {
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                            className="block px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
                            onClick={() => setOpenDropdown(null)}
                          >
                              {sub.label}
                            </Link>
                          );
                        }
                        return (
                          <div
                            key={sub.label}
                            className="cursor-not-allowed px-4 py-2.5 text-[13px] font-medium text-white/50"
                          >
                            {sub.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            if (!("href" in entry)) return null;
            const href = entry.href;
            const active = isActive(href);
            return (
              <Link
                key={entry.label}
                href={href}
                className="relative flex h-[46px] items-center border-b-2 px-4 text-[13px] font-medium text-white/90 transition-colors hover:text-white"
                style={{
                  borderBottomColor: active ? "var(--red)" : "transparent",
                  textDecoration: "none",
                }}
              >
                {entry.label}
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
          {subnavEntries.map((entry) => {
            if (entry.dropdown && entry.items) {
              const expanded = mobileExpanded === entry.label;
              return (
                <div key={entry.label}>
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(expanded ? null : entry.label)}
                    className="flex w-full items-center justify-between px-6 py-3 text-left text-[14px] font-medium"
                    style={{ color: "var(--body)" }}
                  >
                    {entry.label}
                    <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
                  </button>
                  {expanded && (
                    <div className="border-t border-[var(--line)] bg-[var(--bg)]">
                      {entry.items.map((sub) => {
                        if ("href" in sub) {
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block px-6 py-2.5 pl-10 text-[13px] font-medium"
                              style={{ color: "var(--body)" }}
                              onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                            >
                              {sub.label}
                            </Link>
                          );
                        }
                        return (
                          <div
                            key={sub.label}
                            className="px-6 py-2.5 pl-10 text-[13px] text-[var(--muted)]"
                          >
                            {sub.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            if ("href" in entry) {
              return (
                <Link
                  key={entry.label}
                  href={entry.href}
                  className="px-6 py-3 text-[14px] font-medium"
                  style={{ color: "var(--body)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {entry.label}
                </Link>
              );
            }
            return null;
          })}
          <Link href="/#application" className="mt-2 px-6 py-3 text-[13px] font-semibold" style={{ color: "var(--red)" }} onClick={() => setMobileOpen(false)}>
            Apply / Login
          </Link>
        </nav>
      </div>
    </>
  );
}
