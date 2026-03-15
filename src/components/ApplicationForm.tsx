"use client";

import { useState } from "react";

const INDUSTRIES = ["Trucking", "Restaurant", "Construction", "Retail", "Services", "Healthcare", "Other"];
const REVENUE_OPTIONS = ["Under $10K", "$10K–$25K", "$25K–$50K", "$50K–$100K", "$100K+"];
const AMOUNT_OPTIONS = ["$5K–$15K", "$15K–$50K", "$50K–$100K", "$100K–$250K", "$250K+"];

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [revenue, setRevenue] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="application" className="py-20 px-4 sm:px-6 bg-[#f8fafb]" aria-label="Application">
        <div className="mx-auto max-w-[560px] text-center">
          <p
            className="text-[17px] leading-[1.7]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
          >
            We received your application. A Debtura funding specialist will call you within 1 business day to discuss your options.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="application" className="py-20 px-4 sm:px-6 bg-[#f8fafb]" aria-label="Application">
      <div className="mx-auto max-w-[560px]">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-center"
          style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          GET FUNDED
        </p>
        <h2
          className="text-3xl md:text-4xl text-center mt-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
        >
          Tell us about your business
        </h2>
        <p
          className="mt-3 text-center text-[15px]"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
        >
          No obligation. No credit check. We&apos;ll call you with options.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
          <div>
            <label htmlFor="app-business" className="block text-sm font-medium mb-1.5" style={{ color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Business Name
            </label>
            <input
              id="app-business"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#1e5a8a]/30 focus:border-[#1e5a8a]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
              placeholder="Your business name"
            />
          </div>
          <div>
            <label htmlFor="app-industry" className="block text-sm font-medium mb-1.5" style={{ color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Industry
            </label>
            <select
              id="app-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#1e5a8a]/30 focus:border-[#1e5a8a] bg-white"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="app-revenue" className="block text-sm font-medium mb-1.5" style={{ color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Monthly Revenue
            </label>
            <select
              id="app-revenue"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#1e5a8a]/30 focus:border-[#1e5a8a] bg-white"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
            >
              <option value="">Select range</option>
              {REVENUE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="app-amount" className="block text-sm font-medium mb-1.5" style={{ color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              How Much Do You Need?
            </label>
            <select
              id="app-amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#1e5a8a]/30 focus:border-[#1e5a8a] bg-white"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
            >
              <option value="">Select range</option>
              {AMOUNT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="app-name" className="block text-sm font-medium mb-1.5" style={{ color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Your Name
            </label>
            <input
              id="app-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#1e5a8a]/30 focus:border-[#1e5a8a]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
              placeholder="Full name"
            />
          </div>
          <div>
            <label htmlFor="app-phone" className="block text-sm font-medium mb-1.5" style={{ color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Phone Number
            </label>
            <input
              id="app-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#1e5a8a]/30 focus:border-[#1e5a8a]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
              placeholder="(555) 000-0000"
            />
          </div>
          <div>
            <label htmlFor="app-email" className="block text-sm font-medium mb-1.5" style={{ color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Email
            </label>
            <input
              id="app-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#1e5a8a]/30 focus:border-[#1e5a8a]"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
              placeholder="you@company.com"
            />
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[12px] text-white font-semibold text-[15px] py-4 px-6 transition hover:opacity-95 w-full"
            style={{ background: "#1e5a8a", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Submit Application →
          </button>
          <p
            className="text-[11px] text-center mt-4"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#94a3b8" }}
          >
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </section>
  );
}
