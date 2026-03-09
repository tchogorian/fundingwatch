"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult } from "@/types/analysis";
import Hero from "@/components/Hero";
import WhatYourReportIncludes from "@/components/WhatYourReportIncludes";
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

  const handleFileSelect = useCallback((file: File) => {
    setAnalysisError(null);
    setSelectedFile(file);
  }, []);

  const handleStartAnalysis = useCallback(async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      let message = "Analysis failed. Please try again.";
      try {
        const data = await res.json();
        if (res.ok) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("analysisResult", JSON.stringify(data as AnalysisResult));
            window.location.href = "/results";
          }
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
      setIsAnalyzing(false);
    }
  }, [selectedFile]);

  return (
    <RevealOnScrollProvider>
    <>
      <Hero />
      <div className="page-base">
      <WhatYourReportIncludes />
      <WhoThisIsFor />
      <HowItWorks />
      {isAnalyzing ? (
        <LoadingState />
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
