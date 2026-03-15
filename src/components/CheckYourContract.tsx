"use client";

import Link from "next/link";
import { useCallback, useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface CheckYourContractProps {
  onFileSelect: (file: File) => void;
  onStartAnalysis: () => void;
  selectedFile: File | null;
  isAnalyzing: boolean;
  analysisError?: string | null;
}

export default function CheckYourContract({
  onFileSelect,
  onStartAnalysis,
  selectedFile,
  isAnalyzing,
  analysisError = null,
}: CheckYourContractProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) return "Unsupported format. Please use PDF, JPG, or PNG.";
    if (file.size > MAX_SIZE_BYTES) return `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    return null;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      setError(null);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      const err = validateFile(file);
      if (err) { setError(err); return; }
      onFileSelect(file);
    },
    [onFileSelect, validateFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;
      const err = validateFile(file);
      if (err) { setError(err); return; }
      onFileSelect(file);
    },
    [onFileSelect, validateFile]
  );

  if (isAnalyzing) return null;

  return (
    <section id="check-contract" className="py-20 px-4 sm:px-6 bg-white" aria-label="Check your contract">
      <div className="mx-auto max-w-[1100px]">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-center"
          style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          CHECK YOUR CONTRACT
        </p>
        <h2
          className="text-2xl md:text-3xl text-center mt-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
        >
          Before you sign — or after
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-10 md:gap-12 items-start">
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-xl border border-[#e2e8f0] bg-[#fafafa]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#0f172a" }}>Got an Offer?</h3>
              <p className="mt-2 text-[15px] leading-[1.65]" style={{ color: "#64748b" }}>
                Before you sign anything, see what the deal actually costs. Upload the offer and we&apos;ll calculate the real APR, check for confession of judgment clauses, verify reconciliation terms, and score the lender against our index.
              </p>
              <a href="#check-contract-upload" className="inline-block mt-4 text-[14px] font-semibold transition hover:opacity-80" style={{ color: "#1e5a8a" }}>
                Check My Offer →
              </a>
            </div>
            <div className="p-6 rounded-xl border border-[#e2e8f0] bg-[#fafafa]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#0f172a" }}>Already Funded?</h3>
              <p className="mt-2 text-[15px] leading-[1.65]" style={{ color: "#64748b" }}>
                If your daily payments feel too high, they might be. Upload your contract and we&apos;ll show you what you&apos;re really paying — and whether refinancing through a better lender makes sense.
              </p>
              <a href="#check-contract-upload" className="inline-block mt-4 text-[14px] font-semibold transition hover:opacity-80" style={{ color: "#1e5a8a" }}>
                Review My Contract →
              </a>
            </div>
            <p className="text-[13px]" style={{ color: "#94a3b8", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Free. Private. No signup required.
            </p>
          </div>

          <div id="check-contract-upload">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              className={`min-h-[220px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-8 transition ${
                selectedFile ? "" : dragActive ? "border-[#1e5a8a]" : "border-[#cbd5e1]"
              }`}
              style={{ background: "#f8fafb" }}
            >
              {selectedFile ? (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#1e5a8a]">
                    <FileText className="h-7 w-7" aria-hidden />
                  </div>
                  <p className="mt-4 font-medium" style={{ color: "#0f172a" }}>{selectedFile.name}</p>
                  <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  <button
                    type="button"
                    onClick={onStartAnalysis}
                    className="mt-6 rounded-[12px] text-white font-semibold text-[14px] px-8 py-3 transition hover:opacity-95"
                    style={{ background: "#1e5a8a", fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Analyze
                  </button>
                </>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center text-center">
                  <Upload className="h-12 w-12" style={{ color: "#94a3b8" }} aria-hidden />
                  <span className="mt-4 font-medium" style={{ color: "#0f172a" }}>Drag and drop your contract here</span>
                  <span className="mt-1 text-sm" style={{ color: "#64748b" }}>or Browse Files</span>
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleChange}
                    aria-label="Choose contract file"
                  />
                </label>
              )}
            </div>
            {(error || analysisError) && (
              <p className="mt-4 text-sm font-medium text-[#ef4444]" role="alert">{error || analysisError}</p>
            )}
            <p className="mt-4 text-[14px]" style={{ color: "#64748b", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              PDF, JPG, PNG. Max {MAX_SIZE_MB}MB.
            </p>
            <p className="mt-2 text-[14px]" style={{ color: "#64748b", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Don&apos;t have your contract?{" "}
              <Link href="/questionnaire" className="font-medium hover:underline" style={{ color: "#1e5a8a" }}>
                Take a quick assessment →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
