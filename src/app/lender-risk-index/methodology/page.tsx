import Link from "next/link";
import InnerPageHeader from "@/components/InnerPageHeader";

const GRADE_SCALE = [
  { range: "0–5", letter: "A+", tier: "Certified", color: "#166534", bg: "#dcfce7" },
  { range: "6–15", letter: "A", tier: "Certified", color: "#166534", bg: "#dcfce7" },
  { range: "16–25", letter: "B+", tier: "Standard", color: "#1e40af", bg: "#dbeafe" },
  { range: "26–35", letter: "B", tier: "Standard", color: "#1e40af", bg: "#dbeafe" },
  { range: "36–50", letter: "C+", tier: "Caution", color: "#92400e", bg: "#fef3c7" },
  { range: "51–65", letter: "C", tier: "Caution", color: "#92400e", bg: "#fef3c7" },
  { range: "66–80", letter: "D", tier: "Warning", color: "#9a3412", bg: "#ffedd5" },
  { range: "81–100", letter: "F", tier: "Avoid", color: "#991b1b", bg: "#fef2f2" },
];

const DIMENSIONS = [
  { name: "Complaint Density (25%)", desc: "CFPB and state AG complaints relative to filing volume." },
  { name: "Regulatory Exposure (25%)", desc: "AG actions, consent orders, state investigations." },
  { name: "Contract Risk Signals (20%)", desc: "COJ clauses, reconciliation terms, hidden fees, factor rate transparency." },
  { name: "Litigation Aggressiveness (15%)", desc: "Frequency of lawsuits against borrowers, default judgment rate." },
  { name: "Transparency (10%)", desc: "APR disclosure, clear terms, responsiveness to disputes." },
  { name: "Stacking Behavior (5%)", desc: "Pattern of funding on top of existing MCAs." },
];

export const metadata = {
  title: "How We Score Lenders — Debtura",
  description: "Debtura Trust Grade methodology: six scoring dimensions, data sources, and grade scale.",
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto max-w-[720px] px-6 md:px-8 pt-8 pb-6">
          <Link href="/lender-risk-index" className="text-[13px] font-medium no-underline hover:opacity-80" style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}>
            ← Back to Lender Risk Index
          </Link>
          <InnerPageHeader
          eyebrow="Methodology"
          title="How We Score Lenders"
          description="Debtura Trust Grades are based on six dimensions and publicly available data. Lower scores indicate lower risk."
        />
        </div>
      </section>
      <div className="mx-auto max-w-[720px] px-6 md:px-8 py-10">
        <div className="mt-0 border border-[var(--line)] bg-white overflow-hidden">
          <h2 className="px-6 py-4 text-[18px] font-semibold border-b border-[var(--line)]" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Debtura Trust Grade scale
          </h2>
          <table className="w-full text-left" style={{ fontFamily: "var(--font-sans)" }}>
            <thead>
              <tr style={{ background: "var(--bg)" }}>
                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Score range</th>
                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Grade</th>
                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Tier</th>
              </tr>
            </thead>
            <tbody>
              {GRADE_SCALE.map((row) => (
                <tr key={row.letter + row.range} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="px-6 py-3 text-[14px]" style={{ color: "var(--body)" }}>{row.range}</td>
                  <td className="px-6 py-3">
                    <span className="font-bold" style={{ color: row.color }}>{row.letter}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-[12px] font-medium px-2 py-0.5" style={{ background: row.bg, color: row.color }}>{row.tier}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 mb-4 text-[18px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          Six scoring dimensions
        </h2>
        <ul className="space-y-4 list-none pl-0">
          {DIMENSIONS.map((d) => (
            <li key={d.name} className="border-l-4 pl-4" style={{ borderColor: "var(--blue)" }}>
              <strong className="text-[15px]" style={{ color: "var(--body)" }}>{d.name}</strong>
              <p className="mt-1 text-[14px] leading-[1.6]" style={{ color: "var(--muted)" }}>{d.desc}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 mb-4 text-[18px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          Data sources
        </h2>
        <p className="text-[14px] leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
          CourtListener federal dockets, state AG databases, CFPB complaint database, UCC filing records, and direct contract analysis.
        </p>

        <div className="mt-10 p-6 border border-[var(--line)] rounded" style={{ background: "var(--bg)" }}>
          <p className="text-[13px] leading-[1.6] italic" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            Debtura Trust Grades represent the independent analytical opinion of the Debtura Intelligence Team. Grades are based on publicly available data and are updated as new information becomes available.
          </p>
        </div>
      </div>
    </main>
  );
}

