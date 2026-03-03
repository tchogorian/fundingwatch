"use client";

import { Shield } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="flex gap-3 rounded-card border border-border bg-secondary-bg p-5">
      <Shield className="h-5 w-5 shrink-0 text-muted" />
      <p className="text-small leading-[1.6] text-muted">
        This analysis presents factual information extracted from your uploaded
        document. It does not constitute legal, financial, or professional advice.
      </p>
    </div>
  );
}
