"use client";

import { useState, useCallback, useRef } from "react";
import type { AnalysisResult } from "@/types/analysis";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import OurIntelligence from "@/components/OurIntelligence";
import FeaturedInsight from "@/components/FeaturedInsight";
import CheckYourContract from "@/components/CheckYourContract";
import LoadingState from "@/components/LoadingState";
import ApplicationForm from "@/components/ApplicationForm";
import FAQ from "@/components/FAQ";
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
        <TrustBar />
        <OurIntelligence />
        <FeaturedInsight />
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
        <section id="about" className="py-12 px-4 bg-white">
          <div className="mx-auto max-w-[640px] text-center">
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b", fontSize: 15 }}>
              Debtura is a licensed commercial financing broker. We match businesses with vetted MCA lenders and help you understand your contract terms.
            </p>
          </div>
        </section>
        <SecondaryCTA />
        <Footer />
      </>
    </RevealOnScrollProvider>
  );
}
