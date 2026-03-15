"use client";

import Link from "next/link";

export default function WhyDebtura() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-[#f8fafb]" aria-label="Why Debtura">
      <div className="mx-auto max-w-[1100px]">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-center"
          style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          WHY DEBTURA
        </p>
        <h2
          className="text-3xl md:text-4xl text-center mt-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
        >
          Not Every Broker Does This
        </h2>

        <div className="mt-14 grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
            >
              We Rate Every Lender
            </h3>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
            >
              Most brokers send your application to whoever pays the highest commission. We built the Debtura Lender Risk Index — a scoring system that rates lenders on complaints, contract terms, litigation history, and transparency. Only lenders that pass get access to our borrowers.
            </p>
            <Link
              href="/lender-risk-index"
              className="inline-block mt-4 text-[14px] font-medium transition hover:underline"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
            >
              Browse the Lender Risk Index →
            </Link>
          </div>
          <div>
            <h3
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
            >
              We Read Every Contract
            </h3>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
            >
              Our AI contract analyzer breaks down factor rates, repayment terms, reconciliation clauses, and hidden fees in plain English. We use it to vet every deal before it reaches you — and you can use it yourself for free.
            </p>
            <Link
              href="/analyze"
              className="inline-block mt-4 text-[14px] font-medium transition hover:underline"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
            >
              Try the Contract Analyzer →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
