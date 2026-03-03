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
    <section id="upload" className="bg-primary py-section-y-mobile sm:py-section-y">
      <div className="mx-auto max-w-[480px] px-4 sm:px-6">
        <div className="space-y-4">
          {steps.map((step, i) => {
            const isComplete = i < completedSteps;
            const isActive = i === activeStep && !isComplete;
            const Icon = step.Icon;
            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 rounded-card border border-border bg-primary px-5 py-4 shadow-card transition-all duration-200 ${
                  isComplete ? "border-success/30 bg-success/5" : isActive ? "border-accent/50 bg-focus-ring" : "opacity-60"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isComplete ? "bg-success text-white" : isActive ? "bg-accent text-white" : "bg-border text-muted"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : isActive ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={`text-[16px] ${
                    isComplete ? "font-medium text-dark-text" : isActive ? "font-semibold text-dark-text" : "font-normal text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
