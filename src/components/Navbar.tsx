"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 h-16 transition-all duration-200 ${
        scrolled
          ? "border-b border-border bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2 text-[20px] font-bold tracking-tight text-dark-text"
        >
          <ShieldCheck className="h-6 w-6 shrink-0 text-accent" />
          FundingWatch
        </Link>
        <button
          type="button"
          onClick={scrollToUpload}
          className="flex cursor-pointer items-center rounded-button bg-accent px-5 py-2.5 text-small font-semibold text-white shadow-button-accent transition-all duration-200 hover:scale-[1.02] hover:shadow-button-accent-hover sm:bg-transparent sm:text-accent sm:shadow-none sm:hover:bg-accent/5"
        >
          Analyze Contract
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
