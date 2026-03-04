"use client";

import { useEffect } from "react";

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -80px 0px",
  threshold: 0.1,
};

export function useRevealOnScroll(options?: Partial<IntersectionObserverInit>) {
  useEffect(() => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, opts);

    const selectors = [".reveal", ".reveal-stagger"];
    const elements = selectors.flatMap((sel) =>
      Array.from(document.querySelectorAll(sel))
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
}

export default function RevealOnScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useRevealOnScroll();
  return <>{children}</>;
}
