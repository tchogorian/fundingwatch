"use client";

export default function FollowBar() {
  return (
    <div className="flex items-center justify-center gap-5 px-6 py-4" style={{ background: "#1a1a1a", fontFamily: "var(--font-sans)" }} aria-label="Follow us">
      <span className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>Follow Us</span>
      <a href="https://twitter.com/debtura" target="_blank" rel="noopener noreferrer" className="flex items-center transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }} title="X / Twitter">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
      </a>
      <a href="https://linkedin.com/company/debtura" target="_blank" rel="noopener noreferrer" className="flex items-center transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }} title="LinkedIn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a href="https://youtube.com/@debtura" target="_blank" rel="noopener noreferrer" className="flex items-center transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }} title="YouTube">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1a1a"/></svg>
      </a>
    </div>
  );
}
