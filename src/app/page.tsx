"use client";

import { useState, useCallback, useRef } from "react";
import type { AnalysisResult } from "@/types/analysis";
import Hero from "@/components/Hero";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import HowItWorks from "@/components/HowItWorks";
import UploadSection from "@/components/UploadSection";
import LoadingState from "@/components/LoadingState";
import UnderstandingYourMCA from "@/components/UnderstandingYourMCA";
import MCAIndustrySpotlight from "@/components/MCAIndustrySpotlight";
import FAQ from "@/components/FAQ";
import AboutFundingWatch from "@/components/AboutFundingWatch";
import SecondaryCTA from "@/components/SecondaryCTA";
import Footer from "@/components/Footer";
import RevealOnScrollProvider from "@/components/RevealOnScroll";

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
    <RevealOnScrollProvider>
    <>
      <Hero />
      <div className="page-base">
      <WhoThisIsFor />
      <HowItWorks />
      {isAnalyzing ? (
        <LoadingState
          apiComplete={analysisSuccess}
          onAnimationComplete={handleAnimationComplete}
        />
      ) : (
        <UploadSection
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onStartAnalysis={handleStartAnalysis}
          isAnalyzing={isAnalyzing}
          analysisError={analysisError}
        />
      )}
      <UnderstandingYourMCA />
      <MCAIndustrySpotlight />
      <FAQ />
      <AboutFundingWatch />
      <SecondaryCTA />
      <Footer />
      </div>
    </>
    </RevealOnScrollProvider>
  );
}
