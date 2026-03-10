"use client";

import { useCallback, useState, useRef } from "react";
import { Upload, FileText, Check } from "lucide-react";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE_MB = 20;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
  onStartAnalysis: () => void;
  selectedFile: File | null;
  isAnalyzing: boolean;
  analysisError?: string | null;
}

export default function UploadSection({
  onFileSelect,
  onStartAnalysis,
  selectedFile,
  isAnalyzing,
  analysisError = null,
}: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleBrowseClick = () => inputRef.current?.click();

  if (isAnalyzing) return null;

  return (
    <section
      id="upload"
      className="section-card reveal"
      aria-label="Upload your contract"
    >
      <div className="mx-auto max-w-[640px] px-4 sm:px-6">
        <p className="eyebrow text-center">ANALYZE YOUR CONTRACT</p>
        <h2 className="section-heading text-center" style={{ color: "var(--color-text-primary)" }}>
          See What&apos;s Really in Your Agreement
        </h2>
        <p
          className="mx-auto mt-4 max-w-[600px] text-center text-[var(--text-base)]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Upload your MCA contract and get instant contract intelligence. PDF, images, even phone photos.
        </p>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`upload-zone mx-auto mt-12 min-h-[200px] max-w-[640px] md:min-h-[200px] ${
            selectedFile ? "" : dragActive ? "drag-over" : error ? "has-error" : ""
          }`}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)]"
                style={{ background: "var(--color-accent-muted)", color: "var(--color-accent-primary)" }}
              >
                <FileText className="h-7 w-7" aria-hidden />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Check className="h-5 w-5" style={{ color: "var(--color-accent-primary)" }} aria-hidden />
                <span className="upload-label font-medium">{selectedFile.name}</span>
              </div>
              <p className="upload-sublabel mt-1">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              <button
                type="button"
                onClick={onStartAnalysis}
                className="btn-primary mt-8 w-full max-w-[400px] py-4"
              >
                Analyze My Contract
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center p-8">
              <Upload
                className="upload-icon h-12 w-12"
                aria-hidden
              />
              <span className="upload-label">Drag and drop your contract here</span>
              <span className="upload-sublabel">or</span>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); handleBrowseClick(); }}
                className="upload-browse font-medium"
              >
                Browse Files
              </button>
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
        {error && (
          <p
            className="mt-4 text-center text-[var(--text-sm)] font-medium"
            style={{ color: "var(--color-danger)" }}
            role="alert"
          >
            {error}
          </p>
        )}
        {analysisError && (
          <p
            className="mt-4 text-center text-[var(--text-sm)] font-medium"
            style={{ color: "var(--color-danger)" }}
            role="alert"
          >
            {analysisError}
          </p>
        )}
        <p
          className="mt-4 text-center text-[var(--text-sm)]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Private. No signup required.
        </p>
        <p
          className="mt-5 text-center text-[var(--text-sm)]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Accepted: PDF, JPG, PNG. Max {MAX_SIZE_MB}MB.
        </p>
      </div>
    </section>
  );
}
