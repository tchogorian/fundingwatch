"use client";

import { useEffect, useState } from "react";
import { FileSearch, Calculator, AlertTriangle, CheckCircle } from "lucide-react";

const steps = [
  { id: "extract", label: "Extracting text...", Icon: FileSearch },
  { id: "analyze", label: "Analyzing terms...", Icon: FileSearch },
  { id: "apr", label: "Calculating APR...", Icon: Calculator },
  { id: "flags", label: "Checking for red flags...", Icon: AlertTriangle },
];

const STEP_DURATION_MS = 4000;

export default function LoadingState() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= steps.length) return;
    const t = setTimeout(() => setActiveStep((s) => s + 1), STEP_DURATION_MS);
    return () => clearTimeout(t);
  }, [activeStep]);

  return (
    <section id="upload" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="h-24 w-24 animate-pulse rounded-full bg-accent/20" />
            <CheckCircle className="absolute h-10 w-10 text-accent" />
          </div>
          <p className="mt-6 text-lg font-medium text-gray-900">
            Analyzing your contract...
          </p>
          <div className="mt-10 w-full space-y-4">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              const isDone = i < activeStep;
              const Icon = step.Icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors ${
                    isActive
                      ? "border-accent bg-accent/5"
                      : isDone
                        ? "border-green-200 bg-green-50/50"
                        : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isDone
                        ? "bg-positive text-white"
                        : isActive
                          ? "bg-accent text-white"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={
                      isActive
                        ? "font-medium text-gray-900"
                        : isDone
                          ? "text-gray-600"
                          : "text-gray-400"
                    }
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
