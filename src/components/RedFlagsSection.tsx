"use client";

import type { RedFlag } from "@/types/analysis";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

const severityConfig = {
  critical: {
    border: "border-l-4 border-critical",
    bg: "bg-red-50",
    icon: AlertCircle,
    iconClass: "text-critical",
  },
  warning: {
    border: "border-l-4 border-warning",
    bg: "bg-orange-50",
    icon: AlertTriangle,
    iconClass: "text-warning",
  },
  info: {
    border: "border-l-4 border-accent",
    bg: "bg-blue-50",
    icon: Info,
    iconClass: "text-accent",
  },
};

export default function RedFlagsSection({ flags }: { flags: RedFlag[] }) {
  const sorted = [...flags].sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 };
    return order[a.severity] - order[b.severity];
  });

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <p className="font-semibold text-positive">
          No critical issues detected in the terms we reviewed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Red Flags</h3>
      {sorted.map((flag, i) => {
        const config = severityConfig[flag.severity];
        const Icon = config.icon;
        return (
          <div
            key={i}
            className={`rounded-xl ${config.border} ${config.bg} p-5`}
          >
            <div className="flex gap-4">
              <Icon className={`h-6 w-6 shrink-0 ${config.iconClass}`} />
              <div>
                <p className="font-semibold text-gray-900">{flag.title}</p>
                <p className="mt-2 font-normal text-gray-600 leading-relaxed">
                  {flag.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
