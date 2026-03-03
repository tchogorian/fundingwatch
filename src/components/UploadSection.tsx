"use client";

import { useCallback, useState } from "react";
import { UploadCloud, FileText, Check } from "lucide-react";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
  onStartAnalysis: () => void;
  selectedFile: File | null;
  isAnalyzing: boolean;
}

export default function UploadSection({
  onFileSelect,
  onStartAnalysis,
  selectedFile,
  isAnalyzing,
}: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Unsupported format. Please use PDF, JPG, or PNG.";
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    }
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
      if (err) {
        setError(err);
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect, validateFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect, validateFile]
  );

  if (isAnalyzing) return null;

  return (
    <section id="upload" className="bg-primary py-section-y-mobile sm:py-section-y">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center text-eyebrow font-semibold uppercase tracking-widest text-accent">
          ANALYZE YOUR CONTRACT
        </p>
        <h2 className="mt-3 text-center text-section-mobile font-semibold text-dark-text sm:text-section-desktop">
          See What&apos;s Really in Your Agreement
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-center text-body text-muted">
          Upload your MCA contract and get an instant AI-powered analysis. PDF, images, even phone photos.
        </p>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mx-auto mt-12 min-h-[240px] max-w-[640px] rounded-dropzone border-2 transition-all duration-200 ${
            selectedFile
              ? "border-border bg-primary"
              : dragActive
                ? "border-accent bg-focus-ring"
                : error
                  ? "border-danger/50 bg-danger/5"
                  : "border-dashed border-border-light bg-input-bg hover:border-accent hover:bg-[#F0F7FF]"
          }`}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-card bg-success/10 text-success">
                <FileText className="h-7 w-7" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-success" />
                <span className="text-body font-medium text-dark-text">
                  {selectedFile.name}
                </span>
              </div>
              <p className="mt-1 text-small text-muted">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
              <button
                type="button"
                onClick={onStartAnalysis}
                className="animate-pulse-glow mt-8 w-full max-w-[400px] cursor-pointer rounded-button bg-accent py-4 text-body font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                }}
              >
                Analyze My Contract
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center p-12">
              <UploadCloud
                className={`h-14 w-14 transition-colors duration-200 ${
                  dragActive ? "text-accent" : "text-slate-400"
                }`}
              />
              <span className="mt-5 text-body font-medium text-dark-text">
                Drag and drop your contract here
              </span>
              <span className="mt-2 text-small text-muted">or</span>
              <span className="mt-3 inline-flex cursor-pointer items-center rounded-button border border-border-light bg-primary px-6 py-2.5 text-[16px] font-medium text-dark-text transition-all duration-200 hover:border-accent hover:bg-focus-ring">
                Browse Files
              </span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          )}
        </div>
        {error && (
          <p className="mt-4 text-center text-small font-medium text-danger">
            {error}
          </p>
        )}
        <p className="mt-5 text-center text-small text-muted">
          Accepted: PDF, JPG, PNG. Max {MAX_SIZE_MB}MB.
        </p>
      </div>
    </section>
  );
}
