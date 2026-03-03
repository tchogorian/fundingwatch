"use client";

import { ShieldCheck, Lock, EyeOff, Scale } from "lucide-react";

const items = [
  { icon: ShieldCheck, text: "Bank-Grade Privacy" },
  { icon: Lock, text: "Contracts Never Stored" },
  { icon: EyeOff, text: "No Account Required" },
  { icon: Scale, text: "Facts Only, Never Legal Advice" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-primary py-section-trust">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {items.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex cursor-default items-center gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-trust-bg text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[16px] font-medium text-dark-text">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
