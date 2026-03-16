import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Score Lenders — Debtura Trust Grade Methodology",
  description:
    "Learn how Debtura calculates independent risk ratings for MCA lenders using court outcomes, borrower sentiment, and regulatory data.",
};

const DIMENSIONS = [
  {
    label: "Borrower Sentiment",
    weight: "40%",
    barColor: "var(--blue)",
    body: "What real borrowers and industry professionals say about this lender. We track Reddit discussions, DailyFunder industry forums, BBB complaints, Trustpilot reviews, and consumer complaint platforms. We measure the ratio of negative-to-total mentions, not raw volume — so a large lender isn't unfairly penalized for scale.",
  },
  {
    label: "Court Outcomes",
    weight: "40%",
    barColor: "var(--navy)",
    body: "When borrowers push back in court, who wins? We track every federal case where a borrower challenged a lender — recharacterization rulings (courts that found MCA products were actually usurious loans), vacated judgments, consent orders, and settlements where lenders paid. Being a plaintiff in collection cases does not count against a lender.",
  },
  {
    label: "Regulatory Actions",
    weight: "20%",
    barColor: "var(--red)",
    body: "Has the government intervened? State attorney general investigations, FTC enforcement actions, consent orders, and financial penalties all factor here. A single FTC action with asset freezes weighs more than an unresolved AG inquiry.",
  },
];

const GRADE_SCALE = [
  { range: "0–5",    letter: "A+", meaning: "Exemplary. No evidence of borrower harm found in our data sources.",                                                            color: "#166534", bg: "#dcfce7" },
  { range: "6–15",   letter: "A",  meaning: "Strong. Minor complaints with no systemic pattern.",                                                                             color: "#166534", bg: "#dcfce7" },
  { range: "16–25",  letter: "B+", meaning: "Good. Some complaints but lender has responded and remediated.",                                                                 color: "#1e40af", bg: "#dbeafe" },
  { range: "26–35",  letter: "B",  meaning: "Fair. Documented issues but no regulatory action.",                                                                              color: "#1e40af", bg: "#dbeafe" },
  { range: "36–50",  letter: "C+", meaning: "Caution. Patterns of complaints and/or legal challenges.",                                                                       color: "#92400e", bg: "#fef3c7" },
  { range: "51–65",  letter: "C",  meaning: "Warning. Significant borrower complaints, active litigation against lender.",                                                    color: "#9a3412", bg: "#ffedd5" },
  { range: "66–80",  letter: "D",  meaning: "Avoid. Regulatory actions, court losses, or systematic harm documented.",                                                        color: "#9a3412", bg: "#ffedd5" },
  { range: "81–100", letter: "F",  meaning: "Predatory. FTC enforcement, AG settlements, or judicial recharacterization of product as usurious loan.",                        color: "#991b1b", bg: "#fef2f2" },
];

const SOURCES = [
  "CourtListener (federal court dockets)",
  "Reddit (r/smallbusiness, r/entrepreneur, r/merchantcashadvance)",
  "DailyFunder (industry professional forum)",
  "BBB (Better Business Bureau complaint database)",
  "Trustpilot (verified review platform)",
  "FTC Enforcement Actions",
  "State AG Databases (NY, CA, NJ, IL)",
  "PACER (federal court filings)",
];

const NOT_MEASURED = [
  "Filing collection lawsuits against borrowers who default — this is normal business",
  "High factor rates alone — expensive credit is not predatory credit",
  "Declining loan applications",
  "Low review counts (insufficient data = no grade)",
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Top nav bar ── */}
      <section className="border-b" style={{ borderColor: "var(--line)", background: "var(--white)" }}>
        <div className="mx-auto max-w-[860px] px-6 md:px-8 pt-8 pb-6">
          <Link
            href="/lender-risk-index"
            className="text-[13px] font-medium no-underline hover:opacity-80 transition-opacity"
            style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}
          >
            ← Lender Risk Index
          </Link>

          {/* Eyebrow */}
          <div className="mt-6 mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}
            >
              Debtura Trust Grade — Methodology
            </span>
          </div>

          <h1
            className="text-[32px] md:text-[40px] font-semibold leading-tight"
            style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
          >
            How We Score Lenders
          </h1>

          <p
            className="mt-3 text-[16px] leading-[1.7]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", maxWidth: 640 }}
          >
            The Debtura Trust Grade is an independent risk assessment for MCA lenders, built on
            publicly available legal, regulatory, and sentiment data. Our scores measure one thing:
            how much evidence exists that a lender has harmed borrowers.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-[860px] px-6 md:px-8 py-12 space-y-14">

        {/* ── Section 1: Three Dimensions ── */}
        <section>
          <h2
            className="text-[20px] font-semibold mb-6"
            style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
          >
            The Three Dimensions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DIMENSIONS.map((d) => (
              <div
                key={d.label}
                className="relative border overflow-hidden"
                style={{ borderColor: "var(--line)", background: "var(--white)" }}
              >
                {/* Colored top bar */}
                <div className="h-[3px] absolute left-0 right-0 top-0" style={{ background: d.barColor }} />
                <div className="pt-6 px-6 pb-6">
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}
                  >
                    {d.label}
                  </p>
                  <p
                    className="text-[11px] font-bold uppercase tracking-wider mt-0.5 mb-3"
                    style={{ color: d.barColor === "var(--red)" ? "var(--red)" : d.barColor === "var(--navy)" ? "var(--navy)" : "var(--blue)", fontFamily: "var(--font-sans)" }}
                  >
                    {d.weight}
                  </p>
                  <p
                    className="text-[14px] leading-[1.65]"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}
                  >
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Grade Scale ── */}
        <section>
          <h2
            className="text-[20px] font-semibold mb-6"
            style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
          >
            The Grade Scale
          </h2>

          <div className="border overflow-hidden" style={{ borderColor: "var(--line)", background: "var(--white)" }}>
            <table className="w-full text-left" style={{ fontFamily: "var(--font-sans)" }}>
              <thead>
                <tr style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
                  <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Score
                  </th>
                  <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Grade
                  </th>
                  <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    What It Means
                  </th>
                </tr>
              </thead>
              <tbody>
                {GRADE_SCALE.map((row) => (
                  <tr key={row.letter} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td
                      className="px-6 py-3 text-[14px] tabular-nums"
                      style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}
                    >
                      {row.range}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className="text-[13px] font-bold px-2 py-0.5"
                        style={{ background: row.bg, color: row.color, fontFamily: "var(--font-sans)" }}
                      >
                        {row.letter}
                      </span>
                    </td>
                    <td
                      className="px-6 py-3 text-[14px] leading-[1.55]"
                      style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}
                    >
                      {row.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 3: What We Don't Measure ── */}
        <section>
          <h2
            className="text-[20px] font-semibold mb-3"
            style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
          >
            What We Don&rsquo;t Measure
          </h2>

          <p
            className="text-[15px] leading-[1.7] mb-4"
            style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}
          >
            The Debtura Trust Grade is not a measure of business success or loan approval rates.
            We do not penalize lenders for:
          </p>

          <ul className="space-y-3 list-none pl-0">
            {NOT_MEASURED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[14px] leading-[1.6]"
                style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}
              >
                <span
                  className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "var(--line)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Section 4: Data Sources ── */}
        <section>
          <h2
            className="text-[20px] font-semibold mb-5"
            style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
          >
            Data Sources
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOURCES.map((src) => (
              <div
                key={src}
                className="px-4 py-3 border text-[13px] font-medium"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--white)",
                  color: "var(--body)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {src}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: Disclaimer ── */}
        <section>
          <div
            className="p-6 border"
            style={{ borderColor: "var(--line)", background: "var(--bg)" }}
          >
            <p
              className="text-[13px] leading-[1.65] italic"
              style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}
            >
              Debtura Trust Grades represent the independent analytical opinion of the Debtura
              Intelligence Team. Grades are based on publicly available data and are updated as new
              information becomes available. Debtura is not a law firm and this is not legal advice.
              Lenders who believe their grade is incorrect may submit documentation for review.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <div
          className="py-8 px-8 text-center border"
          style={{ background: "var(--navy)", borderColor: "var(--navy)" }}
        >
          <p
            className="text-[20px]"
            style={{ fontFamily: "var(--font-serif)", color: "var(--white)" }}
          >
            Concerned about your MCA contract?
          </p>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "rgba(255,255,255,0.80)", fontFamily: "var(--font-sans)" }}
          >
            Upload it free — get APR, red flags, and COJ detection in under 30 seconds.
          </p>
          <Link
            href="/#upload"
            className="inline-block mt-5 px-8 py-3 text-[14px] font-semibold no-underline transition-opacity hover:opacity-90"
            style={{
              background: "var(--white)",
              color: "var(--body)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Analyze Free →
          </Link>
        </div>

      </div>
    </main>
  );
}
