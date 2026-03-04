"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

function calculateAPR(
  advance: number,
  factorRate: number,
  termMonths: number
): { totalRepayment: number; totalCost: number; effectiveAPR: number; dailyPayment: number } {
  const totalRepayment = advance * factorRate;
  const totalCost = totalRepayment - advance;
  const termYears = termMonths / 12;
  // Simplified APR: (total cost / advance) / term in years * 100
  const effectiveAPR = termYears > 0 ? (totalCost / advance / termYears) * 100 : 0;
  const totalDays = Math.round(termMonths * (365 / 12));
  const dailyPayment = totalDays > 0 ? totalRepayment / totalDays : 0;
  return { totalRepayment, totalCost, effectiveAPR, dailyPayment };
}

const TERM_OPTIONS = [3, 6, 9, 12, 18, 24];

export default function APRCalculatorPage() {
  const [advance, setAdvance] = useState<string>("50000");
  const [factorRate, setFactorRate] = useState<string>("1.45");
  const [termMonths, setTermMonths] = useState<number>(6);

  const advanceNum = useMemo(() => parseFloat(advance) || 0, [advance]);
  const factorNum = useMemo(() => parseFloat(factorRate) || 1, [factorRate]);
  const valid = advanceNum > 0 && factorNum >= 1.1 && factorNum <= 1.99;

  const results = useMemo(() => {
    if (!valid) return null;
    return calculateAPR(advanceNum, factorNum, termMonths);
  }, [advanceNum, factorNum, termMonths, valid]);

  return (
    <>
      <section
        className="py-16 md:py-20"
        style={{ background: "#F8FAFC" }}
      >
        <div className="mx-auto max-w-[680px] px-4 text-center sm:px-6">
          <h1
            className="font-display text-3xl font-semibold leading-tight md:text-4xl"
            style={{ color: "#0F172A" }}
          >
            MCA APR Calculator
          </h1>
          <p
            className="mt-4 text-lg"
            style={{ color: "#64748B" }}
          >
            See what your merchant cash advance really costs — in real terms.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[680px] px-4 pb-20 sm:px-6">
        <div
          className="rounded-xl border p-8 md:p-12"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="advance" className="block text-sm font-medium" style={{ color: "#374151" }}>
                Advance amount ($)
              </label>
              <input
                id="advance"
                type="number"
                min={1000}
                max={10000000}
                step={1000}
                value={advance}
                onChange={(e) => setAdvance(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 font-mono text-base outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20"
                style={{ color: "#0F172A" }}
              />
            </div>
            <div>
              <label htmlFor="factor" className="block text-sm font-medium" style={{ color: "#374151" }}>
                Factor rate
              </label>
              <input
                id="factor"
                type="number"
                min={1.1}
                max={1.99}
                step={0.01}
                value={factorRate}
                onChange={(e) => setFactorRate(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 font-mono text-base outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20"
                style={{ color: "#0F172A" }}
              />
              <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>e.g. 1.35 = 35% in fees</p>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="term" className="block text-sm font-medium" style={{ color: "#374151" }}>
              Repayment term
            </label>
            <select
              id="term"
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-base outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20"
              style={{ color: "#0F172A" }}
            >
              {TERM_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} months
                </option>
              ))}
            </select>
          </div>

          {results && (
            <div
              className="mt-10 rounded-lg border p-6"
              style={{
                background: results.effectiveAPR > 100 ? "#FEF2F2" : "#F8FAFC",
                borderColor: results.effectiveAPR > 100 ? "#FECACA" : "#E2E8F0",
              }}
            >
              <p className="text-sm font-medium uppercase tracking-wider" style={{ color: "#6B7280" }}>
                Effective APR
              </p>
              <p
                className="mt-1 font-mono text-3xl font-bold md:text-4xl"
                style={{ color: results.effectiveAPR > 100 ? "#DC2626" : "#0F172A" }}
              >
                {results.effectiveAPR.toFixed(1)}%
              </p>
              <dl className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <dt style={{ color: "#64748B" }}>Total repayment</dt>
                  <dd className="font-mono font-medium" style={{ color: "#0F172A" }}>
                    ${results.totalRepayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt style={{ color: "#64748B" }}>Total cost (fees)</dt>
                  <dd className="font-mono font-medium" style={{ color: "#0F172A" }}>
                    ${results.totalCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt style={{ color: "#64748B" }}>Daily payment</dt>
                  <dd className="font-mono font-medium" style={{ color: "#0F172A" }}>
                    ${results.dailyPayment.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs" style={{ color: "#94A3B8" }}>
                For comparison: SBA 7(a) loans often run ~10–13% APR.
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-sm" style={{ color: "#64748B" }}>
            Does this concern you?{" "}
            <Link
              href="/#upload"
              className="font-medium underline underline-offset-2"
              style={{ color: "#0D9488" }}
            >
              Analyze your actual contract →
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
