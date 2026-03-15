import Link from "next/link";

export const metadata = {
  title: "MCA Glossary — Debtura",
  description:
    "Definitions of common merchant cash advance (MCA) terms: factor rate, holdback, effective APR, confession of judgment, and more.",
  alternates: {
    canonical: "https://www.debtura.com/glossary",
  },
};

const TERMS: { term: string; definition: string }[] = [
  {
    term: "Merchant Cash Advance (MCA)",
    definition:
      "A financing product where a business receives an upfront sum in exchange for a percentage of future daily or weekly credit card sales (or sometimes bank deposits). Repayment is typically expressed as a factor rate rather than an interest rate.",
  },
  {
    term: "Factor Rate",
    definition:
      "A multiplier applied to the advance amount to determine total payback. For example, a 1.25 factor on $10,000 means you repay $12,500. Factor rates do not directly indicate an annual percentage rate (APR); converting to APR often yields very high equivalent rates.",
  },
  {
    term: "Effective APR",
    definition:
      "The annualized cost of financing expressed as a percentage. For MCAs with short terms and high factor rates, the effective APR can be well over 100% when calculated like a traditional loan.",
  },
  {
    term: "Holdback",
    definition:
      "The percentage of daily or weekly receivables withheld by the MCA provider until the agreed payback amount is satisfied. A 10% daily holdback means 10% of each day's eligible sales go to the funder.",
  },
  {
    term: "Confession of Judgment (COJ)",
    definition:
      "A clause that can allow the funder to obtain a judgment against the borrower without notice or a court hearing. In some states these are restricted or unenforceable; they are considered a high-risk term for borrowers.",
  },
  {
    term: "Personal Guarantee",
    definition:
      "An agreement that makes the business owner personally liable for the debt if the business cannot pay. Assets such as a home or personal bank accounts may be at risk.",
  },
  {
    term: "Stacking",
    definition:
      "Taking multiple MCAs (or other financing) at the same time. Many MCA contracts prohibit stacking; violating this can trigger default and acceleration.",
  },
  {
    term: "Reconciliation Clause",
    definition:
      "Language that can allow the funder to adjust the amount owed or the holdback if the borrower's sales differ from what was represented, sometimes leading to larger or faster payback obligations.",
  },
  {
    term: "Payback Amount",
    definition:
      "The total amount the business must repay (advance amount × factor rate, before any fees). This is the principal figure used to determine how much will be withheld from sales.",
  },
  {
    term: "Estimated Term",
    definition:
      "The expected length of time to complete repayment based on the holdback percentage and projected sales. Actual term can be shorter or longer if sales vary.",
  },
];

export default function GlossaryPage() {
  return (
    <main className="min-h-screen py-12 px-6 md:px-8 sm:py-16" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-[720px]">
        <Link href="/" className="text-sm font-medium transition hover:underline" style={{ color: "var(--blue)" }}>
          ← Back to Debtura
        </Link>
        <div className="mt-8 mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Reference</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          MCA Glossary
        </h1>
        <p className="mt-2 text-base" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
          Common terms you may see in a merchant cash advance contract.
        </p>

        <dl className="mt-10 space-y-8 border-t border-[var(--line)] pt-10">
          {TERMS.map(({ term, definition }) => (
            <div key={term} className="border-b border-[var(--line)] pb-8 last:border-b-0">
              <dt className="text-lg font-semibold" style={{ fontFamily: "var(--font-sans)", color: "var(--body)" }}>
                {term}
              </dt>
              <dd className="mt-2 leading-relaxed" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
                {definition}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 text-base" style={{ color: "var(--muted)" }}>
          <Link href="/analyze" className="font-medium transition hover:underline" style={{ color: "var(--blue)" }}>
            Upload your contract
          </Link>
          {" "}for a free analysis of your specific terms and risk flags.
        </p>
      </div>
    </main>
  );
}
