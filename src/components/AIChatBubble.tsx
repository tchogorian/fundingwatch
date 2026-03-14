"use client";

import { useState } from "react";

export default function AIChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* AI bubble — fixed bottom right */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-0"
        style={{
          background: "linear-gradient(135deg, #1e5a8a, #5eead4)",
          boxShadow: "0 8px 24px rgba(30,90,138,0.35)",
          animation: "hero-pulse 2s ease-in-out infinite",
        }}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3C7 3 3 6.5 3 11c0 2.5 1.5 4.7 3.7 6.2L5.5 21l4.3-2.2c.7.1 1.4.2 2.2.2 5 0 9-3.5 9-8s-4-8-9-8z" fill="#fff" />
          <circle cx="8.5" cy="11" r="1.2" fill="#1e5a8a" />
          <circle cx="12" cy="11" r="1.2" fill="#1e5a8a" />
          <circle cx="15.5" cy="11" r="1.2" fill="#1e5a8a" />
        </svg>
      </button>

      {/* Tooltip — hide when panel open */}
      {!open && (
        <div
          className="fixed bottom-8 right-[90px] z-[100] px-4 py-2 rounded-[10px] pointer-events-none hidden md:block"
          style={{
            background: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 13,
            color: "#0f172a",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#2a6a9e", fontWeight: 600 }}>AI</span> Ask about any lender
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-white"
            style={{ right: -6 }}
          />
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-[90px] right-6 z-[100] w-[320px] rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
          }}
        >
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #1e5a8a, #2a6a9e)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7 3 3 6.5 3 11c0 2.5 1.5 4.7 3.7 6.2L5.5 21l4.3-2.2c.7.1 1.4.2 2.2.2 5 0 9-3.5 9-8s-4-8-9-8z" fill="#fff" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Debtura AI</div>
                <div className="text-[11px] text-white/60" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Lender intelligence</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/60 text-lg leading-none cursor-pointer border-0 bg-transparent p-0"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="p-5">
            <div
              className="rounded-xl p-4 mb-3"
              style={{ background: "#f0f4f8" }}
            >
              <p
                className="text-[13px] text-[#0f172a] leading-[1.5]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Ask me about any MCA lender. I&apos;ll pull their rating, complaints, and red flags.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Is my lender safe?", "What's a fair rate?", "Compare lenders"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="text-[11px] font-medium px-3 py-1.5 rounded-lg border-0 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    color: "#2a6a9e",
                    background: "#eef3f8",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about any lender..."
                className="flex-1 rounded-[10px] px-3.5 py-2.5 text-[13px] border-[1.5px] border-[#e2e8f0] outline-none"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              />
              <button
                type="button"
                className="w-10 h-10 rounded-[10px] bg-[#1e5a8a] flex items-center justify-center flex-shrink-0 cursor-pointer border-0"
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 2L7 9M14 2l-5 12-2-5-5-2 12-5z" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
