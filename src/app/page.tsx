"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult } from "@/types/analysis";
import Hero from "@/components/Hero";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import HowItWorks from "@/components/HowItWorks";
import WhatYourReportIncludes from "@/components/WhatYourReportIncludes";
import UploadSection from "@/components/UploadSection";
import LoadingState from "@/components/LoadingState";
import ReportSection from "@/components/ReportSection";
import OptInForm from "@/components/OptInForm";
import UnderstandingYourMCA from "@/components/UnderstandingYourMCA";
import MCAIndustrySpotlight from "@/components/MCAIndustrySpotlight";
import FAQ from "@/components/FAQ";
import AboutFundingWatch from "@/components/AboutFundingWatch";
import SecondaryCTA from "@/components/SecondaryCTA";
import Footer from "@/components/Footer";
import RevealOnScrollProvider from "@/components/RevealOnScroll";

const MIN_LOADING_MS = 16000;

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const handleStartAnalysis = useCallback(async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const [data] = await Promise.all([
        fetch("/api/analyze", { method: "POST", body: formData }).then(
          async (res) => {
            if (!res.ok) throw new Error("Analysis failed");
            return res.json();
          }
        ),
        new Promise((r) => setTimeout(r, MIN_LOADING_MS)),
      ]);
      setAnalysisResult(data as AnalysisResult);
    } catch {
      setAnalysisResult(null);
    } finally {
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
      {analysisResult && (
        <>
          <ReportSection data={analysisResult} />
          <OptInForm analysisData={analysisResult} />
        </>
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
