"use client";

import Link from "next/link";
import { useCallback, useState, useRef } from "react";

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
    <section id="check-contract" className="border-b border-[var(--line)] py-11 px-6 md:px-8" style={{ background: "var(--white)", fontFamily: "var(--font-sans)" }} aria-label="Contract analysis">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Contract Analysis</span>
        </div>
        <h2 className="mb-5 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          Before you sign — or after
        </h2>
        <div className="mt-5 grid border border-[var(--line)] md:grid-cols-[1fr_1fr]">
          <div className="border-r border-[var(--line)]">
            <div className="border-b border-[var(--line)] py-5 pl-6 pr-6" style={{ borderLeft: "3px solid var(--blue)" }}>
              <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--navy)" }}>Got an Offer?</h3>
              <p className="mb-2 text-[12.5px] font-light leading-[1.65]" style={{ color: "var(--muted)" }}>Before you sign, see the true cost. Upload your offer and we&apos;ll surface the real APR and flag hidden terms.</p>
              <a href="#check-contract-upload" className="text-[11.5px] font-semibold no-underline" style={{ color: "var(--blue)" }}>Check My Offer →</a>
            </div>
            <div className="py-5 pl-6 pr-6" style={{ borderLeft: "3px solid var(--navy)" }}>
              <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--navy)" }}>Already Funded?</h3>
              <p className="mb-2 text-[12.5px] font-light leading-[1.65]" style={{ color: "var(--muted)" }}>Find out if you&apos;re overpaying. See how your lender ranks and discover refinancing options.</p>
              <a href="#check-contract-upload" className="text-[11.5px] font-semibold no-underline" style={{ color: "var(--navy)" }}>Check My Contract →</a>
            </div>
          </div>
          <div id="check-contract-upload" className="flex flex-col items-center justify-center gap-3 bg-[var(--bg)] p-8">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              className="flex w-full flex-col items-center justify-center rounded border-2 border-dashed bg-white px-5 py-6 text-center"
              style={{ borderColor: "#a0b0be", fontFamily: "var(--font-sans)" }}
            >
              {selectedFile ? (
                <>
                  <p className="text-[13px] font-medium" style={{ color: "var(--body)" }}>{selectedFile.name}</p>
                  <p className="mt-0.5 text-[11px] font-light" style={{ color: "var(--faint)" }}>{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  <button
                    type="button"
                    onClick={onStartAnalysis}
                    className="mt-2.5 border border-[var(--blue)] bg-transparent px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--blue)", letterSpacing: "0.08em" }}
                  >
                    Analyze
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-0.5 text-[13px] font-medium" style={{ color: "var(--body)" }}>Drag and drop your contract here</p>
                  <p className="text-[11px] font-light" style={{ color: "var(--faint)" }}>PDF, JPG, PNG · Max {MAX_SIZE_MB} MB</p>
                  <label className="mt-2.5 cursor-pointer">
                    <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleChange} aria-label="Choose contract file" />
                    <span className="inline-block border border-[var(--blue)] bg-transparent px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-wider" style={{ color: "var(--blue)", letterSpacing: "0.08em" }}>Browse Files</span>
                  </label>
                </>
              )}
            </div>
            {(error || analysisError) && <p className="text-sm font-medium text-[var(--red)]" role="alert">{error || analysisError}</p>}
            <p className="text-center text-[11px] font-light leading-[1.6]" style={{ color: "var(--faint)" }}>Free · Private · No signup required</p>
            <p className="text-center text-[11px] font-light" style={{ color: "var(--faint)" }}>
              <Link href="/questionnaire" className="font-medium no-underline" style={{ color: "var(--blue)" }}>No contract? Take the quick assessment →</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
