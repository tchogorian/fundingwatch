import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Lender Risk Index — FundingWatch",
  description:
    "See how MCA lenders compare: our ratings for transparency, fair terms, and responsible lending practices.",
  alternates: {
    canonical: "https://www.fundingwatch.org/lender-risk-index",
  },
};

export default function LenderRiskIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-16 sm:px-6" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
            Lender Risk Index
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            We rate MCA lenders on transparency, contract terms, complaint history, and regulatory record. Certified lenders meet our standards for fair dealing; others are flagged as Caution, Warning, or Avoid.
          </p>
          <p className="mt-4 text-base" style={{ color: "var(--color-text-tertiary)" }}>
            The full index and criteria are being updated. Check back soon or analyze your contract to see how your lender compares.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/#upload"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95"
              style={{ background: "var(--accent-blue)" }}
            >
              Analyze My Contract
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 px-6 py-3 font-semibold transition hover:opacity-90"
              style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
