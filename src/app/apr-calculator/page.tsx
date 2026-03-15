"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import InnerPageHeader from "@/components/InnerPageHeader";

const BUSINESS_DAYS_PER_MONTH = 21.75;
const BUSINESS_DAYS_PER_YEAR = 261;
const COMPARISON_MAX_APR = 200;

// Tab 1 term options: label -> business days in term
const TERM_OPTIONS_TAB1: { label: string; businessDays: number }[] = [
  { label: "30 days", businessDays: 30 },
  { label: "45 days", businessDays: 45 },
  { label: "60 days", businessDays: 60 },
  { label: "90 days", businessDays: 90 },
  { label: "120 days", businessDays: 120 },
  { label: "150 days", businessDays: 150 },
  { label: "180 days", businessDays: 180 },
  { label: "9 months", businessDays: 9 * BUSINESS_DAYS_PER_MONTH },
  { label: "12 months", businessDays: 12 * BUSINESS_DAYS_PER_MONTH },
  { label: "18 months", businessDays: 18 * BUSINESS_DAYS_PER_MONTH },
];

function formatApr(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
}

// -------- Tab 1 types and calc --------
type Tab1Position = {
  advance: string;
  useFactorRate: boolean;
  factorRate: string;
  totalPayback: string;
  termIndex: number;
  frequencyDaily: boolean;
  originationFee: string;
};

function calcTab1(
  advance: number,
  useFactorRate: boolean,
  factorRate: number,
  totalPayback: number,
  termBusinessDays: number,
  originationFee: number
) {
  const totalRepayment = useFactorRate ? advance * factorRate : totalPayback;
  const feeFactorOnly = totalRepayment - advance;
  const totalFees = feeFactorOnly + originationFee;
  const dailyPayment = termBusinessDays > 0 ? totalRepayment / termBusinessDays : 0;
  const aprFactorOnly =
    advance > 0 && termBusinessDays > 0
      ? (feeFactorOnly / advance) * (BUSINESS_DAYS_PER_YEAR / termBusinessDays) * 100
      : 0;
  const aprWithFees =
    advance > 0 && termBusinessDays > 0
      ? (totalFees / advance) * (BUSINESS_DAYS_PER_YEAR / termBusinessDays) * 100
      : aprFactorOnly;
  return {
    totalRepayment,
    totalFees,
    dailyPayment,
    aprFactorOnly,
    aprWithFees,
    termBusinessDays,
  };
}

// -------- Tab 2 types and calc --------
type Tab2Frequency = "daily" | "weekly" | "monthly";

type Tab2Position = {
  debitAmount: string; // raw input: daily, weekly, or monthly amount
  frequency: Tab2Frequency;
  originalAdvance: string;
  remainingBalance: string;
  totalPaybackAmount: string; // optional, from contract
};

function getDailyEquivalent(amount: number, frequency: Tab2Frequency): number {
  if (frequency === "daily") return amount;
  if (frequency === "weekly") return amount / 5;
  return amount / BUSINESS_DAYS_PER_MONTH; // 21.75 monthly
}

function calcTab2Position(p: Tab2Position) {
  const amount = parseFloat(p.debitAmount) || 0;
  const advance = parseFloat(p.originalAdvance) || 0;
  const remaining = parseFloat(p.remainingBalance) || 0;
  if (amount <= 0 || advance <= 0) return null;
  const dailyEquivalent = getDailyEquivalent(amount, p.frequency);
  if (dailyEquivalent <= 0) return null;

  // Exact formulas from spec
  const totalPayback = advance + remaining;
  const amountPaid = advance - remaining;
  const impliedFactorRate = advance > 0 ? totalPayback / advance : 0;
  const daysRemaining = remaining > 0 ? remaining / dailyEquivalent : 0;

  const fees = totalPayback - advance;
  const costRate = advance > 0 ? fees / advance : 0;
  const impliedApr =
    daysRemaining > 0 ? (costRate / daysRemaining) * BUSINESS_DAYS_PER_YEAR * 100 : 0;

  return {
    dailyDebit: dailyEquivalent,
    originalAdvance: advance,
    remainingBalance: remaining,
    totalPaybackAmount: totalPayback,
    amountAlreadyPaid: amountPaid,
    amountStillOwed: remaining,
    impliedFactor: impliedFactorRate,
    impliedApr,
    daysToPayoff: daysRemaining,
  };
}

// -------- Stress status --------
function getStressStatus(pct: number): "manageable" | "stressed" | "critical" | "unsustainable" {
  if (pct < 15) return "manageable";
  if (pct < 20) return "stressed";
  if (pct <= 30) return "critical";
  return "unsustainable";
}

export default function APRCalculatorPage() {
  const [activeTab, setActiveTab] = useState<1 | 2>(2);

  // Tab 1 state
  const [tab1MonthlyRevenue, setTab1MonthlyRevenue] = useState("");
  const [tab1Positions, setTab1Positions] = useState<Tab1Position[]>([
    {
      advance: "",
      useFactorRate: true,
      factorRate: "1.35",
      totalPayback: "",
      termIndex: 7,
      frequencyDaily: true,
      originationFee: "0",
    },
  ]);

  // Tab 2 state
  const [tab2MonthlyRevenue, setTab2MonthlyRevenue] = useState("");
  const [tab2Positions, setTab2Positions] = useState<Tab2Position[]>([
    { debitAmount: "", frequency: "daily", originalAdvance: "", remainingBalance: "", totalPaybackAmount: "" },
  ]);

  const addTab1Position = () => {
    if (tab1Positions.length >= 5) return;
    setTab1Positions((prev) => [
      ...prev,
      {
        advance: "",
        useFactorRate: true,
        factorRate: "1.35",
        totalPayback: "",
        termIndex: 7,
        frequencyDaily: true,
        originationFee: "0",
      },
    ]);
  };
  const addTab2Position = () => {
    if (tab2Positions.length >= 5) return;
    setTab2Positions((prev) => [...prev, { debitAmount: "", frequency: "daily", originalAdvance: "", remainingBalance: "", totalPaybackAmount: "" }]);
  };
  const updateTab1 = (index: number, updates: Partial<Tab1Position>) => {
    setTab1Positions((prev) => prev.map((p, i) => (i === index ? { ...p, ...updates } : p)));
  };
  const updateTab2 = (index: number, updates: Partial<Tab2Position>) => {
    setTab2Positions((prev) => prev.map((p, i) => (i === index ? { ...p, ...updates } : p)));
  };
  const removeTab1 = (index: number) => {
    setTab1Positions((prev) => prev.filter((_, i) => i !== index));
  };
  const removeTab2 = (index: number) => {
    setTab2Positions((prev) => prev.filter((_, i) => i !== index));
  };

  const revenueNumTab1 = useMemo(() => parseFloat(tab1MonthlyRevenue) || 0, [tab1MonthlyRevenue]);
  const revenueNumTab2 = useMemo(() => parseFloat(tab2MonthlyRevenue) || 0, [tab2MonthlyRevenue]);
  const dailyRevenueTab1 = revenueNumTab1 / BUSINESS_DAYS_PER_MONTH;
  const dailyRevenueTab2 = revenueNumTab2 / BUSINESS_DAYS_PER_MONTH;

  // Tab 1 first position results
  const tab1First = tab1Positions[0];
  const tab1FirstAdvance = parseFloat(tab1First?.advance || "0") || 0;
  const tab1FirstFactor = parseFloat(tab1First?.factorRate || "1") || 1;
  const tab1FirstPayback = parseFloat(tab1First?.totalPayback || "0") || 0;
  const tab1FirstOrig = parseFloat(tab1First?.originationFee || "0") || 0;
  const tab1TermOpt = TERM_OPTIONS_TAB1[tab1First?.termIndex ?? 7];
  const tab1BusinessDays = tab1TermOpt?.businessDays ?? 180;
  const tab1Valid =
    tab1FirstAdvance > 0 &&
    (tab1First.useFactorRate ? tab1FirstFactor >= 1.01 : tab1FirstPayback >= tab1FirstAdvance);
  const tab1Result =
    tab1Valid && tab1TermOpt
      ? calcTab1(
          tab1FirstAdvance,
          tab1First?.useFactorRate ?? true,
          tab1FirstFactor,
          tab1FirstPayback,
          tab1BusinessDays,
          tab1FirstOrig
        )
      : null;

  // Tab 1 stacking
  const tab1StackResults = useMemo(() => {
    let totalDaily = 0;
    let totalRepayment = 0;
    let totalFees = 0;
    tab1Positions.forEach((p) => {
      const adv = parseFloat(p.advance) || 0;
      const factor = parseFloat(p.factorRate) || 1;
      const payback = parseFloat(p.totalPayback) || 0;
      const orig = parseFloat(p.originationFee) || 0;
      const opt = TERM_OPTIONS_TAB1[p.termIndex];
      if (!opt || adv <= 0) return;
      const res = calcTab1(adv, p.useFactorRate, factor, payback, opt.businessDays, orig);
      if (p.useFactorRate && factor < 1.01) return;
      if (!p.useFactorRate && payback < adv) return;
      totalDaily += res.dailyPayment;
      totalRepayment += res.totalRepayment;
      totalFees += res.totalFees;
    });
    return { totalDaily, totalRepayment, totalFees };
  }, [tab1Positions]);

  // Tab 2 single and stacking
  const tab2Results = useMemo(() => tab2Positions.map((p) => calcTab2Position(p)), [tab2Positions]);
  const tab2Combined = useMemo(() => {
    let totalDaily = 0;
    let totalOwed = 0;
    tab2Results.forEach((r) => {
      if (r) {
        totalDaily += r.dailyDebit;
        totalOwed += r.remainingBalance;
      }
    });
    const monthlyOut = totalDaily * BUSINESS_DAYS_PER_MONTH;
    const pctRevenue =
      dailyRevenueTab2 > 0 && totalDaily > 0 ? (totalDaily / dailyRevenueTab2) * 100 : 0;
    return { totalDaily, totalOwed, monthlyOut, pctRevenue };
  }, [tab2Results, dailyRevenueTab2]);

  const stressTab1 =
    tab1Result && dailyRevenueTab1 > 0
      ? getStressStatus((tab1Result.dailyPayment / dailyRevenueTab1) * 100)
      : null;
  const stressTab2 =
    tab2Combined.pctRevenue > 0 ? getStressStatus(tab2Combined.pctRevenue) : null;
  const displayApr = activeTab === 1 && tab1Result ? tab1Result.aprWithFees : activeTab === 2 && tab2Results[0] ? tab2Results[0]!.impliedApr : 0;

  const inputCls =
    "mt-1.5 w-full min-w-0 border border-[var(--line)] bg-white px-4 py-3 text-base outline-none focus:ring-2 min-h-[48px]";
  const labelCls = "block text-sm font-medium min-h-[48px] flex items-center";
  const textSecondary = { color: "var(--muted)" };
  const textPrimary = { color: "var(--body)" };
  const textTertiary = { color: "var(--faint)" };

  return (
    <>
      <section className="border-b border-[var(--line)] bg-white">
        <InnerPageHeader
          eyebrow="Tools"
          title="MCA Calculator"
          description="True APR, daily payment, and cash flow impact. Add multiple positions to see stacked MCA cost."
        />
      </section>

      <section className="mx-auto max-w-[840px] px-6 md:px-8 py-8 pb-24 text-[14px]" style={{ background: "var(--bg)" }}>
        <h2 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          Calculate true cost
        </h2>
        {/* Tabs */}
        <div className="mb-6 flex w-full min-h-[48px] border border-[var(--line)] overflow-hidden" style={{ background: "var(--white)" }}>
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className="flex-1 min-h-[48px] py-3 px-4 text-sm font-semibold transition md:text-base border-0"
            style={{
              background: activeTab === 1 ? "var(--blue)" : "var(--bg)",
              color: activeTab === 1 ? "#fff" : "var(--muted)",
            }}
          >
            Evaluating an Offer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className="flex-1 min-h-[48px] py-3 px-4 text-sm font-semibold transition md:text-base border-0"
            style={{
              background: activeTab === 2 ? "var(--blue)" : "var(--bg)",
              color: activeTab === 2 ? "#fff" : "var(--muted)",
            }}
          >
            I Already Have an MCA
          </button>
        </div>

        <div className="border border-[var(--line)] p-4 sm:p-6 md:p-8" style={{ background: "var(--white)" }}>
          {activeTab === 1 && (
            <>
              <div className="space-y-6">
                <div className="w-full min-w-0">
                  <label htmlFor="t1-advance" className={labelCls} style={textSecondary}>
                    Advance amount ($)
                  </label>
                  <input
                    id="t1-advance"
                    type="number"
                    min={1000}
                    step={1000}
                    value={tab1First?.advance ?? ""}
                    onChange={(e) => updateTab1(0, { advance: e.target.value })}
                    className={inputCls}
                    style={textPrimary}
                  />
                </div>
                <div className="w-full min-w-0">
                  <p className="text-sm font-medium mb-2" style={textSecondary}>
                    I know my...
                  </p>
                  <div className="flex gap-2 mb-2 min-h-[48px] items-center">
                    <button
                      type="button"
                      onClick={() => updateTab1(0, { useFactorRate: true })}
                      className="flex-1 min-h-[48px] border border-[var(--line)] px-4 py-2 text-sm font-medium"
                      style={{
                        borderColor: "var(--line)",
                        background: tab1First?.useFactorRate ? "var(--blue)" : "transparent",
                        color: tab1First?.useFactorRate ? "#fff" : "var(--body)",
                      }}
                    >
                      Factor Rate
                    </button>
                    <button
                      type="button"
                      onClick={() => updateTab1(0, { useFactorRate: false })}
                      className="flex-1 min-h-[48px] border border-[var(--line)] px-4 py-2 text-sm font-medium"
                      style={{
                        borderColor: "var(--line)",
                        background: !tab1First?.useFactorRate ? "var(--blue)" : "transparent",
                        color: !tab1First?.useFactorRate ? "#fff" : "var(--body)",
                      }}
                    >
                      Total Payback Amount
                    </button>
                  </div>
                  {tab1First?.useFactorRate ? (
                    <>
                      <input
                        type="number"
                        min={1.01}
                        max={2}
                        step={0.01}
                        value={tab1First.factorRate}
                        onChange={(e) => updateTab1(0, { factorRate: e.target.value })}
                        className={inputCls}
                        style={textPrimary}
                      />
                      <p className="mt-1 text-xs" style={textTertiary}>
                        e.g. 1.35 means you repay 35% more than you borrowed
                      </p>
                    </>
                  ) : (
                    <input
                      type="number"
                      min={0}
                      step={100}
                      value={tab1First?.totalPayback ?? ""}
                      onChange={(e) => updateTab1(0, { totalPayback: e.target.value })}
                      className={inputCls}
                      style={textPrimary}
                      placeholder="Total payback amount"
                    />
                  )}
                </div>
                <div className="w-full min-w-0">
                  <label className={labelCls} style={textSecondary}>
                    Repayment term
                  </label>
                  <select
                    value={tab1First?.termIndex ?? 7}
                    onChange={(e) => updateTab1(0, { termIndex: Number(e.target.value) })}
                    className={inputCls}
                    style={textPrimary}
                  >
                    {TERM_OPTIONS_TAB1.map((opt, i) => (
                      <option key={opt.label} value={i}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full min-w-0">
                  <p className="text-sm font-medium mb-2" style={textSecondary}>
                    Payment frequency
                  </p>
                  <div className="flex gap-2 min-h-[48px] items-center">
                    <button
                      type="button"
                      onClick={() => updateTab1(0, { frequencyDaily: true })}
                      className="flex-1 min-h-[48px] border border-[var(--line)] px-4 py-2 text-sm font-medium"
                      style={{
                        borderColor: "var(--line)",
                        background: tab1First?.frequencyDaily ? "var(--blue)" : "transparent",
                        color: tab1First?.frequencyDaily ? "#fff" : "var(--body)",
                      }}
                    >
                      Daily
                    </button>
                    <button
                      type="button"
                      onClick={() => updateTab1(0, { frequencyDaily: false })}
                      className="flex-1 min-h-[48px] border border-[var(--line)] px-4 py-2 text-sm font-medium"
                      style={{
                        borderColor: "var(--line)",
                        background: !tab1First?.frequencyDaily ? "var(--blue)" : "transparent",
                        color: !tab1First?.frequencyDaily ? "#fff" : "var(--body)",
                      }}
                    >
                      Weekly
                    </button>
                  </div>
                </div>
                <div className="w-full min-w-0">
                  <label className={labelCls} style={textSecondary}>
                    Origination fee ($) <span className="font-normal text-[var(--color-text-tertiary)]">optional</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={tab1First?.originationFee ?? "0"}
                    onChange={(e) => updateTab1(0, { originationFee: e.target.value })}
                    placeholder="0"
                    className={inputCls}
                    style={textPrimary}
                  />
                  <p className="mt-1 text-xs" style={textTertiary}>
                    Add any upfront fees from your contract to see the true APR
                  </p>
                </div>
                <div className="w-full min-w-0">
                  <label className={labelCls} style={textSecondary}>
                    Monthly revenue ($) <span className="font-normal text-[var(--color-text-tertiary)]">optional</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={tab1MonthlyRevenue}
                    onChange={(e) => setTab1MonthlyRevenue(e.target.value)}
                    placeholder="e.g. 50000"
                    className={inputCls}
                    style={textPrimary}
                  />
                  <p className="mt-1 text-xs" style={textTertiary}>
                    Used to calculate cash flow impact
                  </p>
                </div>
              </div>

              {tab1Result && (
                <>
                  <div className="mt-8 border border-[var(--line)] p-6" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={textTertiary}>
                      Results
                    </p>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <div>
                        <p className="text-sm" style={textSecondary}>APR (factor rate only)</p>
                        <p className="font-mono text-2xl font-bold md:text-3xl" style={textPrimary}>{formatApr(tab1Result.aprFactorOnly)}</p>
                      </div>
                      <div>
                        <p className="text-sm" style={textSecondary}>APR (including fees)</p>
                        <p
                          className="font-mono text-2xl font-bold md:text-3xl"
                          style={{
                            color:
                              tab1Result.aprWithFees > 100
                                ? "var(--color-danger)"
                                : "var(--body)",
                          }}
                        >
                          {formatApr(tab1Result.aprWithFees)}
                        </p>
                      </div>
                    </div>
                    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="flex justify-between gap-2 sm:block">
                        <dt className="text-sm" style={textSecondary}>Total repayment</dt>
                        <dd className="font-mono text-lg font-bold" style={textPrimary}>
                          ${tab1Result.totalRepayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2 sm:block">
                        <dt className="text-sm" style={textSecondary}>Total fees</dt>
                        <dd className="font-mono text-lg font-bold" style={textPrimary}>
                          ${tab1Result.totalFees.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2 sm:col-span-2 sm:block">
                        <dt className="text-sm" style={textSecondary}>Est. daily payment (business days)</dt>
                        <dd className="font-mono text-lg font-bold" style={textPrimary}>
                          ${tab1Result.dailyPayment.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {revenueNumTab1 > 0 && (
                    <div className="mt-6 border border-[var(--line)] p-6" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={textTertiary}>
                        Cash Flow Impact
                      </p>
                      <dl className="mt-4 space-y-2">
                        <div className="flex justify-between gap-2">
                          <dt className="text-sm" style={textSecondary}>Daily revenue (est.)</dt>
                          <dd className="font-mono font-bold" style={textPrimary}>
                            ${dailyRevenueTab1.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-sm" style={textSecondary}>MCA payments as % of daily revenue</dt>
                          <dd className="font-mono font-bold" style={textPrimary}>
                            {((tab1Result.dailyPayment / dailyRevenueTab1) * 100).toFixed(1)}%
                          </dd>
                        </div>
                      </dl>
                      <StressBar status={stressTab1!} pct={(tab1Result.dailyPayment / dailyRevenueTab1) * 100} />
                    </div>
                  )}

                  <div className="mt-8">
                    <ComparisonBars apr={tab1Result.aprWithFees} />
                  </div>
                </>
              )}

            </>
          )}

          {activeTab === 2 && (
            <>
              <div className="mb-6 w-full min-w-0">
                <label className={labelCls} style={textSecondary}>
                  Your average monthly revenue (optional)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={tab2MonthlyRevenue}
                  onChange={(e) => setTab2MonthlyRevenue(e.target.value)}
                  placeholder="e.g. 50000"
                  className={inputCls}
                  style={textPrimary}
                />
                <p className="mt-1 text-xs" style={textTertiary}>
                  Used to show how much of your revenue MCA payments are consuming
                </p>
              </div>

              {tab2Positions.map((pos, idx) => (
                <div key={idx} className="mb-6 border border-[var(--line)] p-4 flex flex-col gap-4" style={{ borderColor: "var(--line)" }}>
                  <span className="text-sm font-medium" style={textTertiary}>
                    MCA position {idx + 1}
                  </span>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="w-full min-w-0 sm:col-span-3">
                      <label className="block text-xs font-medium" style={textSecondary}>
                        {pos.frequency === "daily"
                          ? "Daily ACH debit from bank statement ($)"
                          : pos.frequency === "weekly"
                            ? "Weekly ACH debit from bank statement ($)"
                            : "Monthly ACH debit from bank statement ($)"}
                      </label>
                      <p className="text-[11px] mt-0.5" style={textTertiary}>Check your bank statement</p>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={pos.debitAmount}
                        onChange={(e) => updateTab2(idx, { debitAmount: e.target.value })}
                        className={inputCls}
                        style={textPrimary}
                      />
                      <div className="flex gap-2 mt-2">
                        {(["daily", "weekly", "monthly"] as const).map((freq) => (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => updateTab2(idx, { frequency: freq })}
                            className="px-4 py-2 text-sm font-medium capitalize"
                            style={{
                              borderRadius: "9999px",
                              ...(pos.frequency === freq
                                ? { backgroundColor: "#2563EB", color: "white", border: "none" }
                                : { backgroundColor: "white", color: "#374151", border: "1px solid #D1D5DB" }),
                            }}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="w-full min-w-0">
                      <label className="block text-xs font-medium" style={textSecondary}>
                        Original advance amount ($)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={pos.originalAdvance}
                        onChange={(e) => updateTab2(idx, { originalAdvance: e.target.value })}
                        className={inputCls}
                        style={textPrimary}
                      />
                    </div>
                    <div className="w-full min-w-0">
                      <label className="block text-xs font-medium" style={textSecondary}>
                        Remaining balance owed ($)
                      </label>
                      <p className="text-[11px] mt-0.5" style={textTertiary}>Total payback amount still owed</p>
                      <input
                        type="number"
                        min={0}
                        value={pos.remainingBalance}
                        onChange={(e) => updateTab2(idx, { remainingBalance: e.target.value })}
                        className={inputCls}
                        style={textPrimary}
                      />
                    </div>
                  </div>
                  <div className="w-full min-w-0">
                    <label className="block text-xs font-medium" style={textSecondary}>
                      Total payback amount from contract ($) — optional
                    </label>
                    <p className="text-[11px] mt-0.5" style={textTertiary}>For &quot;amount already paid&quot; and implied APR</p>
                    <input
                      type="number"
                      min={0}
                      value={pos.totalPaybackAmount}
                      onChange={(e) => updateTab2(idx, { totalPaybackAmount: e.target.value })}
                      placeholder="From contract"
                      className={inputCls}
                      style={textPrimary}
                    />
                  </div>
                  {tab2Positions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTab2(idx)}
                      className="text-sm font-medium underline min-h-[48px] flex items-center"
                      style={textTertiary}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              {tab2Positions.length < 5 && (
                <button
                  type="button"
                  onClick={addTab2Position}
                  className="mb-6 w-full min-h-[48px] border border-dashed border-[var(--line)] py-3 text-sm font-medium sm:w-auto sm:px-6"
                  style={{ borderColor: "var(--line)", ...textSecondary }}
                >
                  + Add Another MCA
                </button>
              )}

              {/* Tab 2 prominent summary when multiple positions */}
              {tab2Combined.totalDaily > 0 && tab2Positions.length >= 1 && (
                <div className="border border-[var(--line)] p-6 mb-6" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
                  <p className="text-base sm:text-lg md:text-xl font-bold leading-snug" style={textPrimary}>
                    You are paying ${tab2Combined.totalDaily.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per day
                    {tab2Positions.length > 1 ? ` across ${tab2Positions.length} MCA positions` : ""}.
                    That is ${tab2Combined.monthlyOut.toLocaleString("en-US", { maximumFractionDigits: 0 })} per month leaving your account before a single operating expense is paid.
                  </p>
                </div>
              )}

              {/* Tab 2 single-position results */}
              {tab2Results[0] && tab2Results[0].dailyDebit > 0 && tab2Results[0].originalAdvance > 0 && (
                <div className="border border-[var(--line)] p-6 mb-6" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={textTertiary}>
                    Position 1 results
                  </p>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {tab2Results[0].totalPaybackAmount > 0 && (
                      <div>
                        <dt className="text-sm" style={textSecondary}>Amount already paid</dt>
                        <dd className="font-mono text-lg font-bold" style={textPrimary}>
                          ${tab2Results[0].amountAlreadyPaid.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm" style={textSecondary}>Amount still owed</dt>
                      <dd className="font-mono text-lg font-bold" style={textPrimary}>
                        ${tab2Results[0].amountStillOwed.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </dd>
                    </div>
                    {tab2Results[0].impliedFactor > 0 && (
                      <div>
                        <dt className="text-sm" style={textSecondary}>Implied factor rate</dt>
                        <dd className="font-mono text-lg font-bold" style={textPrimary}>
                          {tab2Results[0].impliedFactor.toFixed(2)}
                        </dd>
                      </div>
                    )}
                    {tab2Results[0].impliedApr > 0 && (
                      <div>
                        <dt className="text-sm" style={textSecondary}>Implied APR</dt>
                        <dd
                          className="font-mono text-lg font-bold"
                          style={{
                            color:
                              tab2Results[0].impliedApr > 100
                                ? "#8B0000"
                                : tab2Results[0].impliedApr > 50
                                  ? "var(--color-danger)"
                                  : "var(--body)",
                          }}
                        >
                          {formatApr(tab2Results[0].impliedApr)}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm" style={textSecondary}>Days until paid off at current pace</dt>
                      <dd className="font-mono text-lg font-bold" style={textPrimary}>
                        ~{Math.ceil(tab2Results[0].daysToPayoff)} days
                      </dd>
                    </div>
                  </dl>
                  {revenueNumTab2 > 0 && (
                    <>
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                        <dt className="text-sm" style={textSecondary}>Daily revenue (est.)</dt>
                        <dd className="font-mono font-bold" style={textPrimary}>
                          ${dailyRevenueTab2.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                        </dd>
                        <dt className="text-sm mt-2" style={textSecondary}>Daily debit as % of daily revenue</dt>
                        <dd className="font-mono font-bold" style={textPrimary}>
                          {((tab2Results[0].dailyDebit / dailyRevenueTab2) * 100).toFixed(1)}%
                        </dd>
                      </div>
                      <StressBar
                        status={getStressStatus((tab2Results[0].dailyDebit / dailyRevenueTab2) * 100)}
                        pct={(tab2Results[0].dailyDebit / dailyRevenueTab2) * 100}
                      />
                    </>
                  )}
                </div>
              )}

              {/* Tab 2 combined stacking */}
              {tab2Positions.length > 1 && tab2Combined.totalDaily > 0 && (
                <div className="border border-[var(--line)] p-6 mb-6" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={textTertiary}>
                    Combined results
                  </p>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm" style={textSecondary}>Total leaving your account daily</dt>
                      <dd className="font-mono text-xl font-bold" style={textPrimary}>
                        ${tab2Combined.totalDaily.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm" style={textSecondary}>Total still owed across all positions</dt>
                      <dd className="font-mono text-lg font-bold" style={textPrimary}>
                        ${tab2Combined.totalOwed.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-sm font-semibold mt-4" style={textSecondary}>
                    Position payoff timeline
                  </p>
                  <ul className="mt-2 space-y-1">
                    {tab2Results.map((r, i) =>
                      r && r.daysToPayoff > 0 ? (
                        <li key={i} className="text-sm font-mono" style={textPrimary}>
                          Position {i + 1}: paid off in ~{Math.ceil(r.daysToPayoff)} days
                        </li>
                      ) : null
                    )}
                  </ul>
                  {revenueNumTab2 > 0 && tab2Combined.pctRevenue > 0 && (
                    <>
                      <div className="mt-4 flex justify-between">
                        <dt className="text-sm" style={textSecondary}>Combined daily debits as % of daily revenue</dt>
                        <dd className="font-mono font-bold" style={textPrimary}>
                          {tab2Combined.pctRevenue.toFixed(1)}%
                        </dd>
                      </div>
                      <StressBar status={stressTab2!} pct={tab2Combined.pctRevenue} />
                      {stressTab2 === "unsustainable" && (
                        <p className="mt-3 text-sm" style={textSecondary}>
                          Your combined MCA payments are consuming {tab2Combined.pctRevenue.toFixed(0)}% of daily revenue. At this level most businesses cannot sustain operations.{" "}
                          <Link href="/blog/mca-debt-relief-guide" className="font-medium underline" style={{ color: "var(--blue)" }}>
                            See your options →
                          </Link>
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {tab2Results[0] && tab2Results[0].impliedApr > 0 && (
                <div className="mt-6">
                  <ComparisonBars apr={tab2Results[0].impliedApr} />
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <p className="mt-10 text-center">
            <Link
              href="/analyze"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              style={{ background: "var(--blue)" }}
            >
              Seeing numbers that concern you? Upload your contract for a full clause-by-clause analysis →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function StressBar({
  status,
  pct,
}: {
  status: "manageable" | "stressed" | "critical" | "unsustainable";
  pct: number;
}) {
  const colors =
    status === "manageable"
      ? "var(--accent-green)"
      : status === "stressed"
        ? "#F9A825"
        : status === "critical"
          ? "var(--warning)"
          : "var(--color-danger)";
  const labels =
    status === "manageable"
      ? "Manageable"
      : status === "stressed"
        ? "Stressed"
        : status === "critical"
          ? "Critically stressed"
          : "Unsustainable";
  return (
    <div className="mt-4">
      <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, (pct / 40) * 100)}%`, background: colors }}
        />
      </div>
      <p className="mt-2 text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
        {labels}
      </p>
      {status === "unsustainable" && (
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          At this payment level most businesses cannot cover operating expenses.{" "}
          <Link href="/blog/mca-debt-relief-guide" className="font-medium underline" style={{ color: "var(--blue)" }}>
            Review your options
          </Link>
          .
        </p>
      )}
    </div>
  );
}

function ComparisonBars({ apr }: { apr: number }) {
  const scale = Math.min(apr, COMPARISON_MAX_APR);
  const overflow = apr > COMPARISON_MAX_APR;
  const bars = [
    { label: "Your MCA", value: apr, color: "var(--color-danger)" },
    { label: "Credit card average", value: 24, color: "var(--accent-blue)" },
    { label: "Business line of credit", value: 18, color: "var(--accent-teal)" },
    { label: "SBA 7(a) loan", value: 12, color: "var(--accent-green)" },
  ];
  return (
    <div className="w-full overflow-x-auto">
      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--color-text-tertiary)" }}>
        How Your Rate Compares
      </p>
      <div className="flex min-w-[300px] flex-col gap-4 sm:min-w-0">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center">
            <span className="w-full text-sm sm:w-48 shrink-0" style={{ color: "var(--color-text-secondary)" }}>
              {bar.label}
              {i === 0 && overflow ? " " + COMPARISON_MAX_APR + "%+" : ""}
            </span>
            <div className="relative h-8 min-w-[80px] flex-1 overflow-hidden rounded-md bg-[var(--line)]">
              <div
                className="absolute left-0 top-0 h-full rounded-md"
                style={{
                  width: i === 0 && overflow ? "100%" : `${(Math.min(bar.value, COMPARISON_MAX_APR) / COMPARISON_MAX_APR) * 100}%`,
                  background: bar.color,
                }}
              />
              {i === 0 && overflow && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow-md">
                  +
                </span>
              )}
            </div>
            <span className="w-16 shrink-0 text-right font-mono text-sm font-bold" style={{ color: "var(--body)" }}>
              {i === 0 && overflow ? `${COMPARISON_MAX_APR}%+` : `${bar.value}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
