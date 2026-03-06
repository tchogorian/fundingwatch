"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[var(--color-border-default)] p-4 md:hidden"
      style={{ background: "var(--color-bg-surface)", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
    >
      <Link
        href="/#upload"
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold text-white"
        style={{ background: "var(--accent-blue)" }}
      >
        Analyze Contract
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Link>
    </div>
  );
}
