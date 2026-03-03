"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -24px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${visible ? "animate-fade-in" : "opacity-0 translate-y-5"} ${className}`}
      style={
        visible && delay
          ? { animationDelay: `${delay}ms`, animationFillMode: "forwards" }
          : undefined
      }
    >
      {children}
    </div>
  );
}
