"use client";

import { useEffect, useState } from "react";
import { FileText, Search, Calculator, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

const steps = [
  { id: "extract", label: "Extracting text from document...", Icon: FileText },
  { id: "terms", label: "Identifying contract terms...", Icon: Search },
  { id: "apr", label: "Calculating effective APR...", Icon: Calculator },
  { id: "flags", label: "Checking for red flags...", Icon: AlertTriangle },
];

const STEP_DURATION_MS = 4000;

export default function LoadingState() {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const totalMs = steps.length * STEP_DURATION_MS;

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMs((prev) => Math.min(prev + 100, totalMs));
    }, 100);
    return () => clearInterval(interval);
  }, [totalMs]);

  useEffect(() => {
    if (activeStep >= steps.length) return;
    const t = setTimeout(() => {
      setCompletedSteps(activeStep + 1);
      setActiveStep((s) => s + 1);
    }, STEP_DURATION_MS);
    return () => clearTimeout(t);
  }, [activeStep]);

  const progress = (elapsedMs / totalMs) * 100;

  return (
    <section id="upload" className="py-16 md:py-24" style={{ background: "var(--color-bg-base)" }}>
      <div className="mx-auto max-w-[480px] px-4 sm:px-6">
        <div className="space-y-4">
          {steps.map((step, i) => {
            const isComplete = i < completedSteps;
            const isActive = i === activeStep && !isComplete;
            const Icon = step.Icon;
            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 rounded-[var(--radius-lg)] border px-5 py-4 transition-all ${
                  isComplete ? "border-[var(--color-accent-border)]" : isActive ? "border-[var(--color-accent-border)]" : "opacity-60"
                }`}
                style={{
                  background: isComplete ? "var(--color-accent-muted)" : isActive ? "var(--color-accent-muted)" : "var(--color-bg-surface)",
                  borderColor: isComplete ? "var(--color-accent-border)" : isActive ? "var(--color-accent-border)" : "var(--color-border-default)",
                }}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isComplete ? "bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]" : isActive ? "bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]" : ""
                  }`}
                  style={!isComplete && !isActive ? { background: "var(--color-bg-subtle)", color: "var(--color-text-tertiary)" } : {}}
                >
                  {isComplete ? (
                    <CheckCircle className="h-5 w-5" aria-hidden />
                  ) : isActive ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  ) : (
                    <Icon className="h-5 w-5" aria-hidden />
                  )}
                </div>
                <span
                  className={`text-[16px] ${isComplete ? "font-medium" : isActive ? "font-semibold" : "font-normal"}`}
                  style={{ color: isComplete || isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-8 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--color-bg-subtle)" }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-[var(--ease-out)]"
            style={{ width: `${Math.min(progress, 100)}%`, background: "var(--color-accent-primary)" }}
          />
        </div>
      </div>
    </section>
  );
}
