"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Upload, FileText, ArrowRight } from "lucide-react";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function ContractAnalyzerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      setSelectedFile(file);
    },
    [validateFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;
      const err = validateFile(file);
      if (err) { setError(err); return; }
      setSelectedFile(file);
    },
    [validateFile]
  );

  const handleAnalyze = () => {
    if (!selectedFile) return;
    window.location.href = "/#check-contract";
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="lri-hero relative overflow-hidden border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1160px] px-6 md:px-8 py-16 md:py-20">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Tools</span>
          </div>
          <h1 className="lri-hero-title mb-4" style={{ fontFamily: "var(--font-serif)", color: "white" }}>
            Contract Intelligence Tool
          </h1>
          <p className="lri-hero-sub max-w-[640px]" style={{ fontFamily: "var(--font-sans)" }}>
            Upload any MCA contract. Our AI extracts the real APR, flags hidden terms, and scores your lender in seconds — free.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Upload</span>
          </div>
          <h2 className="mb-5 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Analyze Your Contract
          </h2>

          <div className="mt-5 grid border border-[var(--line)] md:grid-cols-[1fr_1fr]">
            {/* Left: Info cards */}
            <div className="border-r border-[var(--line)]">
              <div className="border-b border-[var(--line)] py-5 pl-6 pr-6" style={{ borderLeft: "3px solid var(--blue)" }}>
                <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--navy)" }}>Got an Offer?</h3>
                <p className="mb-2 text-[12.5px] font-light leading-[1.65]" style={{ color: "var(--muted)" }}>Before you sign, see the true cost. Upload your offer and we&apos;ll surface the real APR and flag hidden terms.</p>
              </div>
              <div className="py-5 pl-6 pr-6" style={{ borderLeft: "3px solid var(--navy)" }}>
                <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--navy)" }}>Already Funded?</h3>
                <p className="mb-2 text-[12.5px] font-light leading-[1.65]" style={{ color: "var(--muted)" }}>Find out if you&apos;re overpaying. See how your lender ranks and discover refinancing options.</p>
              </div>
            </div>

            {/* Right: Upload zone */}
            <div className="bg-[var(--bg)] p-8 flex flex-col items-center justify-center">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                className={`w-full border-2 border-dashed rounded p-8 text-center transition-colors ${
                  dragActive ? "border-[var(--blue)] bg-white" : "border-[var(--line)] bg-white"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="hidden"
                />
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-3">
                    <FileText className="h-12 w-12" style={{ color: "var(--blue)" }} />
                    <p className="text-[13px] font-medium" style={{ color: "var(--body)" }}>{selectedFile.name}</p>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-[11px] font-medium underline"
                      style={{ color: "var(--muted)" }}
                    >
                      Remove
                    </button>
                    <button
                      onClick={handleAnalyze}
                      className="mt-2 px-6 py-2 text-[10.5px] font-bold uppercase tracking-wider rounded"
                      style={{ background: "var(--blue)", color: "var(--white)" }}
                    >
                      Analyze Contract
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--mid)" }} />
                    <p className="text-[14px] font-medium mb-1" style={{ color: "var(--body)" }}>Drag and drop your contract here</p>
                    <p className="text-[11px] mb-4" style={{ color: "var(--muted)" }}>PDF, JPG, PNG · Max {MAX_SIZE_MB} MB</p>
                    <button
                      onClick={() => inputRef.current?.click()}
                      className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border rounded"
                      style={{ borderColor: "var(--blue)", color: "var(--blue)", background: "transparent" }}
                    >
                      Browse Files
                    </button>
                  </>
                )}
              </div>
              {error && (
                <p className="mt-3 text-[11px]" style={{ color: "var(--red)" }}>{error}</p>
              )}
              <p className="mt-4 text-[11px]" style={{ color: "var(--muted)" }}>Free · Private · No signup required</p>
              <Link href="/questionnaire" className="mt-4 text-[11px] font-medium underline" style={{ color: "var(--blue)" }}>
                No contract? Take the quick assessment →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)] py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <h2 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            What You Get
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Real APR Calculation", desc: "We convert factor rates to annual percentage rates so you can compare apples to apples." },
              { title: "Hidden Terms Detection", desc: "Our AI flags problematic clauses like personal guarantees, confessions of judgment, and stacking restrictions." },
              { title: "Lender Score", desc: "See how your lender ranks against our database of rated MCA providers." },
            ].map((item) => (
              <div key={item.title} className="border border-[var(--line)] p-5" style={{ background: "var(--white)" }}>
                <h3 className="mb-2 text-[15px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>{item.title}</h3>
                <p className="text-[12px] font-light leading-[1.65]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
