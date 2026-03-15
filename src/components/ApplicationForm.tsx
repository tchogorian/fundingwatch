"use client";

import { useState } from "react";

const REVENUE_OPTIONS = ["Under $10K", "$10K–$25K", "$25K–$50K", "$50K+"];
const AMOUNT_OPTIONS = ["$5K–$15K", "$15K–$50K", "$50K–$100K", "$100K+"];

const inputClass = "w-full border px-2.5 py-2 text-[12.5px] outline-none bg-white font-[inherit]";
const labelClass = "block text-[9px] font-bold uppercase tracking-[0.12em] mb-0.5";
const labelStyle = { color: "var(--mid)", fontFamily: "var(--font-sans)" };
const inputStyle = { color: "var(--body)", borderColor: "var(--line)", fontFamily: "var(--font-sans)" };

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [revenue, setRevenue] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="application" className="border-b border-[var(--line)] py-11 px-6 md:px-8" style={{ background: "var(--bg)", fontFamily: "var(--font-sans)" }} aria-label="Application">
        <div className="mx-auto max-w-[1160px] text-center">
          <p className="text-[17px] leading-[1.7]" style={{ color: "var(--body)" }}>
            We received your application. A Debtura funding specialist will call you within 1 business day to discuss your options.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="application" className="border-b border-[var(--line)] py-11 px-6 md:px-8" style={{ background: "var(--bg)", fontFamily: "var(--font-sans)" }} aria-label="Apply now">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Apply Now</span>
        </div>
        <h2 className="mb-5 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          Tell us about your business
        </h2>
        <div className="mt-5 grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div>
            <h3 className="mb-2.5 text-[17px] font-semibold leading-snug" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>No obligation. No hard credit check. Takes 2 minutes.</h3>
            <p className="mb-4 text-[12.5px] font-light leading-[1.72]" style={{ color: "var(--muted)" }}>We match you with vetted, rated lenders based on your business profile.</p>
            <ul className="list-none">
              {["Approvals in as little as 2 hours", "Zero fees charged to borrowers", "Only certified lenders in our network", "Free contract analysis included"].map((item) => (
                <li key={item} className="flex gap-2 border-b border-[var(--line)] py-2 text-[12px] font-light" style={{ color: "var(--body)" }}>
                  <span style={{ color: "var(--blue)", fontWeight: 700, flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div className="mb-2">
              <label htmlFor="app-business" className={labelClass} style={labelStyle}>Business Name</label>
              <input id="app-business" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Legal business name" className={inputClass} style={inputStyle} />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="app-revenue" className={labelClass} style={labelStyle}>Monthly Revenue</label>
                <select id="app-revenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} className={inputClass} style={inputStyle}>
                  <option value="">Select</option>
                  {REVENUE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="app-amount" className={labelClass} style={labelStyle}>Amount Needed</label>
                <select id="app-amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} style={inputStyle}>
                  <option value="">Select</option>
                  {AMOUNT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="app-name" className={labelClass} style={labelStyle}>Full Name</label>
                <input id="app-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="app-phone" className={labelClass} style={labelStyle}>Phone</label>
                <input id="app-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div>
              <label htmlFor="app-email" className={labelClass} style={labelStyle}>Email</label>
              <input id="app-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} style={inputStyle} />
            </div>
            <button type="submit" className="mt-1 w-full py-2.5 text-[10.5px] font-bold uppercase tracking-wider text-white" style={{ background: "var(--blue)", letterSpacing: "0.1em", fontFamily: "var(--font-sans)", border: "none", cursor: "pointer" }}>
              Get My Options →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
