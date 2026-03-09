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

  const handleStartAnalysis = useCallback(async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }
      if (typeof window !== "undefined") {
        sessionStorage.setItem("analysisResult", JSON.stringify(data as AnalysisResult));
        window.location.href = "/results";
      }
    } catch {
      setIsAnalyzing(false);
      setSelectedFile(null);
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
          onFileSelect={setSelectedFile}
          onStartAnalysis={handleStartAnalysis}
          isAnalyzing={isAnalyzing}
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
