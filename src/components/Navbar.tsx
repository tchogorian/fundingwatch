"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          FundingWatch.org
        </Link>
      </div>
    </nav>
  );
}
