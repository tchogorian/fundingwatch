"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult } from "@/types/analysis";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TrustBar from "@/components/TrustBar";
import SocialProof from "@/components/SocialProof";
import UploadSection from "@/components/UploadSection";
import LoadingState from "@/components/LoadingState";
import ReportSection from "@/components/ReportSection";
import OptInForm from "@/components/OptInForm";
import SecondaryCTA from "@/components/SecondaryCTA";
import Footer from "@/components/Footer";

const MIN_LOADING_MS = 16000; // ~16s for step animation

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
    <>
      <main>
        <Hero />
        <HowItWorks />
        <TrustBar />
        <SocialProof />
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
        <SecondaryCTA />
        <Footer />
      </main>
    </>
  );
}
