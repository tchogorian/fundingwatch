"use client";

import type { AnalysisResult } from "@/types/analysis";

const rows: {
  key: keyof AnalysisResult;
  label: string;
  format: (v: unknown) => string;
  concerningIfYes?: boolean;
  goodIfYes?: boolean;
}[] = [
  { key: "factor_rate", label: "Factor rate", format: (v) => String(v) },
  {
    key: "payment_frequency",
    label: "Payment frequency",
    format: (v) => String(v),
  },
  {
    key: "has_personal_guarantee",
    label: "Personal guarantee",
    format: (v) => (v ? "Yes" : "No"),
    concerningIfYes: true,
  },
  {
    key: "has_reconciliation_clause",
    label: "Reconciliation clause",
    format: (v) => (v ? "Yes" : "No"),
    goodIfYes: true,
  },
  {
    key: "has_confession_of_judgment",
    label: "Confession of judgment",
    format: (v) => (v ? "Yes" : "No"),
    concerningIfYes: true,
  },
  {
    key: "has_ucc_filing",
    label: "UCC filing provision",
    format: (v) => (v ? "Yes" : "No"),
    concerningIfYes: true,
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
    "has_personal_guarantee",
    "has_reconciliation_clause",
    "has_confession_of_judgment",
    "has_ucc_filing",
  ]);

  return (
    <div className="overflow-hidden rounded-card border border-border shadow-card">
      <div className="divide-y divide-border">
        {rows.map(({ key, label, format, concerningIfYes }, i) => {
          const value = data[key];
          const isEven = i % 2 === 0;
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
                {boolKeys.has(key) ? (
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
