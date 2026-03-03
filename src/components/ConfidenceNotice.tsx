"use client";

export default function ConfidenceNotice() {
  return (
    <div className="rounded-card border border-warning/30 bg-[#FFFBEB] px-5 py-4">
      <p className="text-small font-semibold text-warning">
        Some terms could not be clearly extracted. Results may be incomplete.
      </p>
    </div>
  );
}
