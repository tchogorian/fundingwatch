"use client";

import type { RedFlag } from "@/types/analysis";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import FadeIn from "./FadeIn";

const severityConfig = {
  high: {
    border: "border-l-danger",
    bg: "bg-[#FEF2F2]",
    badge: "bg-danger/10 text-danger",
    icon: AlertCircle,
    iconClass: "text-danger",
  },
  medium: {
    border: "border-l-warning",
    bg: "bg-[#FFFBEB]",
    badge: "bg-warning/10 text-warning",
    icon: AlertTriangle,
    iconClass: "text-warning",
  },
  low: {
    border: "border-l-accent",
    bg: "bg-focus-ring",
    badge: "bg-accent/10 text-accent",
    icon: Info,
    iconClass: "text-accent",
  },
};

export default function RedFlagsSection({ flags }: { flags: RedFlag[] }) {
  const sorted = [...flags].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  if (sorted.length === 0) {
    return (
      <div className="rounded-card border border-success/30 bg-success/5 p-6">
        <p className="font-semibold text-success">
          No critical issues detected in the terms we reviewed.
        </p>
      </div>
    );
  }

  const badgeLabel = (s: RedFlag["severity"]) =>
    s === "high" ? "High" : s === "medium" ? "Medium" : "Low";

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-3 text-subhead-desktop font-semibold text-dark-text">
        Red Flags Detected
        <span className="rounded-button bg-danger/10 px-2.5 py-1 text-small font-medium text-danger">
          {sorted.length} {sorted.length === 1 ? "issue" : "issues"} found
        </span>
      </h3>
      {sorted.map((flag, i) => {
        const config = severityConfig[flag.severity];
        const Icon = config.icon;
        return (
          <FadeIn key={i} delay={i * 100}>
            <div
              className={`rounded-card border-l-4 ${config.border} ${config.bg} p-5 shadow-card sm:px-6`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-button px-2 py-0.5 text-small font-medium ${config.badge}`}
                >
                  {badgeLabel(flag.severity)}
                </span>
                <span className="text-body font-semibold text-dark-text">
                  {flag.flag}
                </span>
              </div>
              <p className="mt-3 text-[16px] leading-[1.6] text-muted">
                {flag.description}
              </p>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
