"use client";

import { useState } from "react";
import {
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Shield,
  FileCheck,
  Scale,
  Lock,
  ArrowRight,
} from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";

const REVENUE_OPTIONS = [
  "Under $15K",
  "$15K – $30K",
  "$30K – $50K",
  "$50K – $100K",
  "Over $100K",
];

function aprPillClass(apr: number | null) {
  if (apr == null) return "bg-muted/20 text-muted";
  if (apr > 100) return "bg-danger text-white";
  if (apr >= 50) return "bg-warning text-white";
  return "bg-success text-white";
}

const fairLendingCards = [
  {
    icon: Shield,
    title: "Reconciliation Clause",
    description:
      "Your payments should adjust based on actual sales. If your revenue drops, your payments should drop too. This is the foundation of a fair MCA.",
  },
  {
    icon: FileCheck,
    title: "Transparent Pricing",
    description:
      "You should know your exact APR, total repayment amount, and all fees before you sign. No surprises, no hidden costs, no confusing factor rates.",
  },
  {
    icon: Scale,
    title: "Fair Contract Terms",
    description:
      "No confession of judgment. No personal asset seizure. No hidden prepayment penalties. A fair lender doesn't need predatory contract clauses.",
  },
];

export default function ExploreYourOptions({ data }: { data: AnalysisResult }) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const apr = data.effective_apr ?? 0;
  const aprAbove30 = apr > 30;

  return (
    <div className="space-y-10">
      {/* Green-bordered card — only when APR > 30% */}
      {aprAbove30 && (
        <div className="rounded-card border-l-4 border-success bg-primary p-8 shadow-card">
          <h3 className="flex items-center gap-2 text-[28px] font-semibold text-dark-text">
            <TrendingDown className="h-7 w-7 text-success" />
            You May Have Better Options
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Your Current Terms */}
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-[16px] font-semibold text-dark-text">
                <AlertCircle className="h-4 w-4 text-danger" />
                Your Current Terms
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-small">
                  <span className="text-muted">Lender</span>
                  <span className="font-medium text-dark-text">{data.lender_name}</span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Effective APR</span>
                  <span
                    className={`rounded-button px-2 py-0.5 text-[16px] font-semibold ${aprPillClass(data.effective_apr)}`}
                  >
                    {data.effective_apr != null ? data.effective_apr.toFixed(1) + "%" : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Factor rate</span>
                  <span className="font-medium text-dark-text">{data.factor_rate != null ? data.factor_rate + "x" : "—"}</span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Payment</span>
                  <span className="font-medium text-dark-text">
                    {data.daily_payment != null ? "$" + data.daily_payment.toLocaleString() + "/day" : data.weekly_payment != null ? "$" + data.weekly_payment.toLocaleString() + "/wk" : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Reconciliation</span>
                  <span
                    className={
                      data.reconciliation_clause?.present
                        ? "rounded-button bg-success px-2 py-0.5 text-white"
                        : "rounded-button bg-danger px-2 py-0.5 text-white"
                    }
                  >
                    {data.reconciliation_clause?.present ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Confession of Judgment</span>
                  <span
                    className={
                      data.confession_of_judgment?.present
                        ? "rounded-button bg-danger px-2 py-0.5 text-white"
                        : "rounded-button bg-success px-2 py-0.5 text-white"
                    }
                  >
                    {data.confession_of_judgment?.present ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* What Fair Lending Looks Like */}
            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h4 className="mb-4 flex items-center gap-2 text-[16px] font-semibold text-dark-text">
                <CheckCircle className="h-4 w-4 text-success" />
                What Fair Lending Looks Like
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-small">
                  <span className="text-muted">APR range</span>
                  <span className="rounded-button bg-success px-2 py-0.5 font-medium text-white">
                    15% – 45%
                  </span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Factor rates</span>
                  <span className="font-medium text-success">1.10 – 1.25</span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Payment flexibility</span>
                  <span className="font-medium text-dark-text">
                    Daily, weekly, or percentage-of-sales
                  </span>
                </div>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Reconciliation</span>
                  <span className="rounded-button bg-success px-2 py-0.5 text-white">
                    Yes
                  </span>
                </div>
                <p className="text-small italic text-muted">
                  Payments adjust when your sales drop
                </p>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Confession of Judgment</span>
                  <span className="rounded-button bg-success px-2 py-0.5 text-white">
                    No
                  </span>
                </div>
                <p className="text-small italic text-muted">
                  Banned by responsible lenders
                </p>
                <div className="flex justify-between text-small">
                  <span className="text-muted">Transparent disclosures</span>
                  <span className="rounded-button bg-success px-2 py-0.5 text-white">
                    Yes
                  </span>
                </div>
                <p className="text-small italic text-muted">
                  Full cost breakdown before you sign
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Three educational info cards — always show */}
      <div>
        <h3 className="mb-6 text-[24px] font-semibold text-dark-text">
          What Fair Lending Looks Like
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {fairLendingCards.map((card) => (
            <div
              key={card.title}
              className="rounded-card border border-border bg-primary p-5 shadow-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-card bg-[#ECFDF5] text-success">
                <card.icon className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-[16px] font-semibold text-dark-text">
                {card.title}
              </h4>
              <p className="mt-2 text-small leading-[1.6] text-muted">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA + form — only when APR > 30% */}
      {aprAbove30 && !submitted && (
        <div className="text-center">
          <h3 className="text-[24px] font-semibold text-dark-text">
            Ready to Explore Better Terms?
          </h3>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] text-muted">
            FundingWatch partners with vetted lenders who meet our transparency standards. See if you qualify for better rates with no obligation and no cost.
          </p>
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-button bg-success px-8 py-4 text-body font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              See My Options
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <ExploreForm onSuccess={() => setSubmitted(true)} />
          )}
        </div>
      )}

      {aprAbove30 && submitted && (
        <div className="rounded-card border border-success/30 bg-success/5 p-8 text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-14 w-14 text-success" />
          </div>
          <h3 className="mt-4 text-[24px] font-semibold text-dark-text">
            We&apos;re On It
          </h3>
          <p className="mt-2 text-body text-muted">
            A lending specialist will review your situation and reach out within 24 hours with options tailored to your business.
          </p>
        </div>
      )}
    </div>
  );
}

function ExploreForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    state: "",
    revenue: "",
    consent: false,
  });
  const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-[560px] rounded-card border border-border bg-primary p-8 shadow-card"
    >
      <div className="space-y-5">
        <div>
          <label className="text-small font-medium text-dark-text">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1.5 h-12 w-full rounded-input border border-border px-4 py-3 text-[16px] focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-small font-medium text-dark-text">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1.5 h-12 w-full rounded-input border border-border px-4 py-3 text-[16px] focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-small font-medium text-dark-text">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1.5 h-12 w-full rounded-input border border-border px-4 py-3 text-[16px] focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        <div>
          <label className="text-small font-medium text-dark-text">Business Name</label>
          <input
            type="text"
            value={form.businessName}
            onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
            className="mt-1.5 h-12 w-full rounded-input border border-border px-4 py-3 text-[16px] focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="text-small font-medium text-dark-text">State</label>
          <select
            value={form.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            className="mt-1.5 h-12 w-full rounded-input border border-border px-4 py-3 text-[16px] focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-small font-medium text-dark-text">Current Monthly Revenue</label>
          <select
            value={form.revenue}
            onChange={(e) => setForm((f) => ({ ...f, revenue: e.target.value }))}
            className="mt-1.5 h-12 w-full rounded-input border border-border px-4 py-3 text-[16px] focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select range</option>
            {REVENUE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
              className="mt-1 h-4 w-4 rounded border-border text-success focus:ring-success"
            />
            <span className="flex items-start gap-2 text-small text-dark-text">
              <Lock className="h-3.5 w-3.5 shrink-0 text-muted" />
              I consent to being contacted by a FundingWatch lending partner about refinancing options for my MCA.
            </span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-button bg-success text-body font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
      >
        Get My Options
        <ArrowRight className="h-5 w-5" />
      </button>
      <p className="mt-6 flex items-center justify-center gap-2 text-center text-small text-muted">
        <Shield className="h-4 w-4" />
        Your information is encrypted and shared only with our vetted lending partners.
      </p>
    </form>
  );
}
