"use client";

import { useCallback, useState } from "react";
import { Upload as UploadIcon, FileText } from "lucide-react";

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
    <section id="upload" className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Check Your Contract Now
        </h2>
        <p className="mt-5 text-center text-lg font-normal text-gray-600">
          PDF, JPG, or PNG. Max {MAX_SIZE_MB}MB. Analysis is free and private.
        </p>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mt-10 rounded-2xl border-2 border-dashed transition-all duration-200 ${
            dragActive
              ? "border-accent bg-accent/5 shadow-glow-strong shadow-inner"
              : error
                ? "border-critical bg-critical/5 shadow-inner"
                : "animate-pulse-soft border-gray-300 bg-surface shadow-glow hover:border-accent/50 hover:shadow-glow-strong"
          }`}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center justify-center p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 shadow-card">
                <FileText className="h-8 w-8 text-accent" />
              </div>
              <p className="mt-4 text-lg font-semibold text-gray-900">
                {selectedFile.name}
              </p>
              <p className="mt-1 text-sm font-normal text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
              <button
                onClick={onStartAnalysis}
                className="mt-8 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition hover:scale-[1.02] hover:bg-accent/90 hover:shadow-accent/30"
              >
                Start Analysis
              </button>
            </div>
          ) : (
            <label className="group flex cursor-pointer flex-col items-center justify-center p-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent transition duration-200 group-hover:scale-110 group-hover:bg-accent/20">
                <UploadIcon className="h-10 w-10" strokeWidth={1.75} />
              </div>
              <span className="mt-6 text-center text-base font-semibold text-gray-800">
                Drag and drop your contract here, or
              </span>
              <span className="mt-4 inline-flex rounded-xl border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-card transition group-hover:scale-[1.02] group-hover:border-accent group-hover:bg-accent/5 group-hover:text-accent">
                Browse files
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
          <p className="mt-4 text-center text-sm font-medium text-critical">
            {error}
          </p>
        )}
        <p className="mt-5 text-center text-sm font-normal text-gray-500">
          Accepted: PDF, JPG, PNG. Max {MAX_SIZE_MB}MB.
        </p>
      </div>
    </section>
  );
}
