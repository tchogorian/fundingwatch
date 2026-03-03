"use client";

export default function ConfidenceNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
      <p className="text-sm font-semibold text-amber-900">
        Some terms could not be clearly extracted. Results may be incomplete.
      </p>
    </div>
  );
}
