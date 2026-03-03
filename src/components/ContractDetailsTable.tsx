"use client";

import type { AnalysisResult } from "@/types/analysis";

const rows: {
  key: keyof AnalysisResult;
  label: string;
  format: (v: unknown) => string;
  concerningIfYes?: boolean;
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
    concerningIfYes: true,
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
}: {
  value: boolean;
  concerningIfYes?: boolean;
}) {
  const isConcerning = value && concerningIfYes;
  return value ? (
    <span
      className={
        isConcerning
          ? "rounded-lg bg-critical px-3 py-1.5 text-sm font-semibold text-white"
          : "rounded-lg bg-positive px-3 py-1.5 text-sm font-semibold text-white"
      }
    >
      Yes
    </span>
  ) : (
    <span className="rounded-lg bg-positive px-3 py-1.5 text-sm font-semibold text-white">
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
    <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-card">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-900">
              Term
            </th>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-900">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map(({ key, label, format, concerningIfYes }, i) => {
            const value = data[key];
            const isEven = i % 2 === 0;
            return (
              <tr
                key={key}
                className={isEven ? "bg-white" : "bg-surface"}
              >
                <td className="px-5 py-4 text-sm font-medium text-gray-700">
                  {label}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                  {boolKeys.has(key) ? (
                    <Badge
                      value={value as boolean}
                      concerningIfYes={rows.find((r) => r.key === key)
                        ?.concerningIfYes}
                    />
                  ) : (
                    format(value)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
