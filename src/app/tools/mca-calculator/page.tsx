"use client";

import { useState } from "react";
import Link from "next/link";
import InnerPageHeader from "@/components/InnerPageHeader";

export default function MCACalculatorPage() {
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [factorRate, setFactorRate] = useState("");
  const [paybackPeriod, setPaybackPeriod] = useState("");

  const calculateAPR = () => {
    const amount = parseFloat(advanceAmount);
    const rate = parseFloat(factorRate);
    const days = parseFloat(paybackPeriod);

    if (!amount || !rate || !days || days <= 0) return null;

    const totalPayback = amount * rate;
    const fees = totalPayback - amount;
    const dailyRate = fees / days;
    const annualRate = (dailyRate * 365) / amount;
    const apr = annualRate * 100;

    return {
      totalPayback,
      fees,
      apr: apr.toFixed(1),
    };
  };

  const result = calculateAPR();

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="border-b border-[var(--line)] bg-white">
        <InnerPageHeader
          eyebrow="Tools"
          title="MCA Calculator"
          description="Convert factor rates to annual percentage rates (APR) to understand the true cost of your merchant cash advance."
        />
      </section>

      {/* Calculator */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Calculator</span>
          </div>
          <h2 className="mb-8 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Calculate Your APR
          </h2>

          <div className="grid gap-6 md:grid-cols-2 border border-[var(--line)] p-8" style={{ background: "var(--bg)" }}>
            <div>
              <label className="block mb-2 text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--mid)", fontFamily: "var(--font-sans)" }}>
                Advance Amount ($)
              </label>
              <input
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                placeholder="50,000"
                className="w-full border border-[var(--line)] px-3 py-2 text-[12.5px]"
                style={{ fontFamily: "var(--font-sans)", background: "var(--white)" }}
              />
            </div>
            <div>
              <label className="block mb-2 text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--mid)", fontFamily: "var(--font-sans)" }}>
                Factor Rate
              </label>
              <input
                type="number"
                step="0.01"
                value={factorRate}
                onChange={(e) => setFactorRate(e.target.value)}
                placeholder="1.35"
                className="w-full border border-[var(--line)] px-3 py-2 text-[12.5px]"
                style={{ fontFamily: "var(--font-sans)", background: "var(--white)" }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--mid)", fontFamily: "var(--font-sans)" }}>
                Payback Period (days)
              </label>
              <input
                type="number"
                value={paybackPeriod}
                onChange={(e) => setPaybackPeriod(e.target.value)}
                placeholder="90"
                className="w-full border border-[var(--line)] px-3 py-2 text-[12.5px]"
                style={{ fontFamily: "var(--font-sans)", background: "var(--white)" }}
              />
            </div>
          </div>

          {result && (
            <div className="mt-8 border border-[var(--line)] p-8" style={{ background: "var(--bg)" }}>
              <h3 className="mb-4 text-[16px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Results</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Total Payback</div>
                  <div className="text-[24px] font-bold" style={{ color: "var(--body)", fontFamily: "var(--font-mono)" }}>${result.totalPayback.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Total Fees</div>
                  <div className="text-[24px] font-bold" style={{ color: "var(--body)", fontFamily: "var(--font-mono)" }}>${result.fees.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Estimated APR</div>
                  <div className="text-[24px] font-bold" style={{ color: "var(--red)", fontFamily: "var(--font-mono)" }}>{result.apr}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)] py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[720px]">
          <h2 className="mb-4 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Understanding Factor Rates vs APR
          </h2>
          <div className="space-y-4 text-[13px] font-light leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            <p>
              Factor rates (like 1.35) look simple, but they don&apos;t tell you the annual cost. A factor rate of 1.35 means you pay back $1.35 for every $1.00 you borrow.
            </p>
            <p>
              APR (Annual Percentage Rate) converts that cost to an annual percentage, making it easier to compare MCAs to loans and other financing options.
            </p>
            <p>
              <strong style={{ color: "var(--body)" }}>Example:</strong> A $50,000 advance with a 1.35 factor rate paid back over 90 days has an APR of approximately 142%. That&apos;s much higher than most business loans.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/intelligence/factor-rate-vs-apr" className="text-[13px] font-medium underline" style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}>
              Learn more about factor rates →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
