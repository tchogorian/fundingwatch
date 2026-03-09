"use client";

import { useEffect, useState, useRef } from "react";
import { FileText, Search, Calculator, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

const STEPS = [
  { id: "extract", label: "Extracting text from document...", Icon: FileText },
  { id: "terms", label: "Identifying contract terms...", Icon: Search },
  { id: "apr", label: "Calculating effective APR...", Icon: Calculator },
  { id: "flags", label: "Checking for red flags...", Icon: AlertTriangle },
] as const;

const STEP_DELAYS_MS = [0, 30_000, 60_000, 90_000];
const PROGRESS_CAP_PERCENT = 90;
const PROGRESS_RAMP_MS = 120_000;
const LONG_WAIT_MS = 60_000;
const SUCCESS_PAUSE_MS = 500;

const FINALIZING_MESSAGES = [
  "Finalizing analysis...",
  "Reading every clause...",
  "Almost there — analysis usually takes 2–3 minutes",
] as const;
const ROTATE_MESSAGE_MS = 25_000;

export interface LoadingStateProps {
  apiComplete?: boolean;
  onAnimationComplete?: () => void;
}

export default function LoadingState({ apiComplete = false, onAnimationComplete }: LoadingStateProps) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [successPhase, setSuccessPhase] = useState(false);
  const onCompleteRef = useRef(onAnimationComplete);
  onCompleteRef.current = onAnimationComplete;

  const visibleCount = STEP_DELAYS_MS.filter((d) => elapsedMs >= d).length;
  const completedSteps = successPhase ? STEPS.length : Math.max(0, Math.min(visibleCount - 1, STEPS.length - 1));
  const activeStepIndex = successPhase ? -1 : (visibleCount >= 1 ? Math.min(visibleCount - 1, STEPS.length - 1) : -1);
  const isFinalizing = !successPhase && visibleCount >= STEPS.length;
  const showLongWaitMessage = !successPhase && elapsedMs >= LONG_WAIT_MS;
  const finalizingMessageIndex = isFinalizing && elapsedMs >= STEP_DELAYS_MS[STEP_DELAYS_MS.length - 1]
    ? Math.floor((elapsedMs - STEP_DELAYS_MS[STEP_DELAYS_MS.length - 1]) / ROTATE_MESSAGE_MS) % FINALIZING_MESSAGES.length
    : 0;
  const finalizingLabel = FINALIZING_MESSAGES[finalizingMessageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMs((prev) => prev + 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (successPhase) return;
    if (apiComplete) {
      setSuccessPhase(true);
      setProgressPercent(100);
      const t = setTimeout(() => {
        onCompleteRef.current?.();
      }, SUCCESS_PAUSE_MS);
      return () => clearTimeout(t);
    }
    const target = Math.min(
      PROGRESS_CAP_PERCENT,
      (elapsedMs / PROGRESS_RAMP_MS) * PROGRESS_CAP_PERCENT
    );
    setProgressPercent(target);
  }, [elapsedMs, apiComplete, successPhase]);

  const progressDisplay = successPhase ? 100 : Math.min(progressPercent, 100);
  const isPulsing = isFinalizing && !successPhase;

  return (
    <section id="upload" className="section-card" aria-label="Analysis in progress">
      <div className="mx-auto max-w-[480px] px-4 sm:px-6">
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            if (!successPhase && elapsedMs < STEP_DELAYS_MS[i]) return null;
            const isComplete = i < completedSteps;
            const isActive = i === activeStepIndex;
            const Icon = step.Icon;
            const label = isFinalizing && i === STEPS.length - 1 ? finalizingLabel : step.label;
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
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--color-bg-subtle)" }}>
            <div
              className={`h-full rounded-full transition-all duration-300 ${isPulsing ? "loading-bar-indeterminate" : ""}`}
              style={{
                width: `${Math.min(progressDisplay, 100)}%`,
                background: "var(--color-accent-primary)",
              }}
            />
          </div>
          {showLongWaitMessage && (
            <p
              className="mt-3 text-center text-[var(--text-sm)]"
              style={{ color: "var(--color-text-secondary)" }}
              role="status"
            >
              Almost there — analysis usually takes 2–3 minutes
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
