"use client";

import { useState, useCallback, useRef } from "react";
import type { AnalysisResult } from "@/types/analysis";
import Hero from "@/components/Hero";
import InsightsSection from "@/components/InsightsSection";
import OurIntelligence from "@/components/OurIntelligence";
import CheckYourContract from "@/components/CheckYourContract";
import LoadingState from "@/components/LoadingState";
import ApplicationForm from "@/components/ApplicationForm";
import FAQ from "@/components/FAQ";
import FollowBar from "@/components/FollowBar";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisSuccess, setAnalysisSuccess] = useState(false);
  const analysisResultRef = useRef<AnalysisResult | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setAnalysisError(null);
    setSelectedFile(file);
  }, []);

  const handleStartAnalysis = useCallback(async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisSuccess(false);
    analysisResultRef.current = null;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      let message = "Analysis failed. Please try again.";
      try {
        const data = await res.json();
        if (res.ok) {
          analysisResultRef.current = data as AnalysisResult;
          setAnalysisSuccess(true);
          return;
        }
        if (data?.error && typeof data.error === "string") message = data.error;
      } catch {
        if (!res.ok) message = res.status === 500 ? "Analysis failed. Please try again." : `Request failed (${res.status}).`;
      }
      setAnalysisError(message);
    } catch (e) {
      setAnalysisError(e instanceof Error ? e.message : "Analysis failed. Please try again.");
    } finally {
      if (!analysisResultRef.current) setIsAnalyzing(false);
    }
  }, [selectedFile]);

  const handleAnimationComplete = useCallback(() => {
    const result = analysisResultRef.current;
    if (result && typeof window !== "undefined") {
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      window.location.href = "/results";
    }
  }, []);

  return (
    <>
      <Hero />
      <InsightsSection />
      <OurIntelligence />
      <CheckYourContract
        selectedFile={selectedFile}
        onFileSelect={handleFileSelect}
        onStartAnalysis={handleStartAnalysis}
        isAnalyzing={isAnalyzing}
        analysisError={analysisError}
      />
      {isAnalyzing && (
        <LoadingState
          apiComplete={analysisSuccess}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
      <ApplicationForm />
      <FAQ />
      <FollowBar />
      <Footer />
    </>
  );
}
