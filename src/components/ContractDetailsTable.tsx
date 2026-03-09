"use client";

import type { AnalysisResult } from "@/types/analysis";

const rows: {
  key: keyof AnalysisResult;
  label: string;
  format: (v: unknown) => string;
  getValue?: (d: AnalysisResult) => unknown;
  concerningIfYes?: boolean;
  goodIfYes?: boolean;
}[] = [
  { key: "factor_rate", label: "Factor rate", format: (v) => (v != null ? String(v) + "x" : "—") },
  { key: "daily_payment", label: "Daily payment", format: (v) => (v != null ? "$" + Number(v).toLocaleString() : "—") },
  {
    key: "personal_guarantee",
    label: "Personal guarantee",
    getValue: (d) => d.personal_guarantee?.present,
    format: (v) => (v ? "Yes" : "No"),
    concerningIfYes: true,
  },
  {
    key: "reconciliation_clause",
    label: "Reconciliation clause",
    getValue: (d) => d.reconciliation_clause?.present,
    format: (v) => (v ? "Yes" : "No"),
    goodIfYes: true,
  },
  {
    key: "confession_of_judgment",
    label: "Confession of judgment",
    getValue: (d) => d.confession_of_judgment?.present,
    format: (v) => (v ? "Yes" : "No"),
    concerningIfYes: true,
  },
  {
    key: "stacking_prohibition",
    label: "Stacking prohibition",
    getValue: (d) => d.stacking_prohibition?.present,
    format: (v) => (v ? "Yes" : "No"),
  },
];

function Badge({
  value,
  concerningIfYes,
  goodIfYes,
}: {
  value: boolean;
  concerningIfYes?: boolean;
  goodIfYes?: boolean;
}) {
  if (value) {
    if (goodIfYes)
      return (
        <span className="rounded-button bg-success px-2.5 py-1 text-small font-medium text-white">
          Yes
        </span>
      );
    const isConcerning = concerningIfYes === true;
    return (
      <span
        className={
          isConcerning
            ? "rounded-button bg-danger px-2.5 py-1 text-small font-medium text-white"
            : "rounded-button bg-success px-2.5 py-1 text-small font-medium text-white"
        }
      >
        Yes
      </span>
    );
  }
  if (goodIfYes)
    return (
      <span className="rounded-button bg-danger px-2.5 py-1 text-small font-medium text-white">
        No
      </span>
    );
  return (
    <span className="rounded-button bg-muted/20 px-2.5 py-1 text-small font-medium text-muted">
      No
    </span>
  );
}

export default function ContractDetailsTable({ data }: { data: AnalysisResult }) {
  const boolKeys = new Set([
    "personal_guarantee",
    "reconciliation_clause",
    "confession_of_judgment",
    "stacking_prohibition",
  ]);

  return (
    <div className="overflow-hidden rounded-card border border-border shadow-card">
      <div className="divide-y divide-border">
        {rows.map(({ key, label, format, getValue, concerningIfYes }, i) => {
          const value = getValue ? getValue(data) : data[key];
          const isEven = i % 2 === 0;
          const isBool = boolKeys.has(key);
          return (
            <div
              key={key}
              className={`flex items-center justify-between px-5 py-4 sm:px-6 ${
                isEven ? "bg-primary" : "bg-secondary-bg"
              }`}
            >
              <span className="text-[16px] font-medium text-dark-text">
                {label}
              </span>
              <span className="text-[16px] font-medium text-dark-text">
                {isBool && (value === true || value === false) ? (
                  <Badge
                    value={value as boolean}
                    concerningIfYes={rows.find((r) => r.key === key)
                      ?.concerningIfYes}
                    goodIfYes={rows.find((r) => r.key === key)?.goodIfYes}
                  />
                ) : (
                  format(value)
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
