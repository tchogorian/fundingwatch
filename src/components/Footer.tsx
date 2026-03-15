"use client";

import Link from "next/link";

const footerLinks = [
  ["About Debtura", "Investor Relations", "Contact Us", "Careers"],
  ["Lender Risk Index", "News & Research", "Support by Division", "Corporate Responsibility"],
  ["Contract Analyzer", "MCA Calculator", "Report an Ethics Concern", "Leadership"],
  ["Press Center", "Glossary", "Office Locations", "ESG & Regulatory Statements"],
];

export default function Footer() {
  return (
    <footer className="pt-11 pb-0 px-6 md:px-8" style={{ background: "#e8eaec", fontFamily: "var(--font-sans)" }} aria-label="Footer">
      <div className="mx-auto max-w-[1160px]">
        <div className="pb-2.5 mb-2.5 border-b text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--body)", borderColor: "#c5cacf", letterSpacing: "0.12em" }}>
          Debtura
        </div>
        <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-4">
          {footerLinks.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-0.5">
              {col.map((label) => {
                const href = label === "Lender Risk Index" ? "/lender-risk-index" : label === "Contract Analyzer" ? "/analyze" : label === "MCA Calculator" ? "/apr-calculator" : label === "News & Research" ? "/intelligence" : label === "Glossary" ? "/glossary" : label === "Privacy Policy" ? "/privacy" : label === "Terms of Use" ? "/terms" : "#";
                return (
                  <Link key={label} href={href} className="py-0.5 text-[13px] no-underline hover:text-[var(--red)] transition-colors" style={{ color: "var(--body)" }}>
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <hr className="border-none border-t mb-5" style={{ borderColor: "#c5cacf" }} />
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 pt-3">
          <p className="text-[11.5px]" style={{ color: "var(--muted)" }}>© 2026 Debtura · Licensed commercial financing broker · NMLS# pending</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/terms" className="text-[11.5px] no-underline hover:text-[var(--body)] transition-colors" style={{ color: "var(--muted)" }}>Legal Disclaimers</Link>
            <Link href="/terms" className="text-[11.5px] no-underline hover:text-[var(--body)] transition-colors" style={{ color: "var(--muted)" }}>Terms of Use</Link>
            <Link href="/privacy" className="text-[11.5px] no-underline hover:text-[var(--body)] transition-colors" style={{ color: "var(--muted)" }}>Privacy Policy</Link>
            <a href="#" className="text-[11.5px] no-underline hover:text-[var(--body)] transition-colors" style={{ color: "var(--muted)" }}>Cookie Notice</a>
            <a href="#" className="text-[11.5px] no-underline hover:text-[var(--body)] transition-colors" style={{ color: "var(--muted)" }}>Do Not Sell My Information</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
