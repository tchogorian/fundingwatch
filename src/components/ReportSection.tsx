"use client";

import type { AnalysisResult } from "@/types/analysis";
import RiskScoreRing from "./RiskScoreRing";
import SummaryCard from "./SummaryCard";
import RedFlagsSection from "./RedFlagsSection";
import ContractDetailsTable from "./ContractDetailsTable";
import ConfidenceNotice from "./ConfidenceNotice";
import Disclaimer from "./Disclaimer";
import ExploreYourOptions from "./ExploreYourOptions";
import FadeIn from "./FadeIn";

export default function ReportSection({ data }: { data: AnalysisResult }) {
  const showConfidenceNotice =
    data.confidence === "medium" || data.confidence === "low";

  return (
    <section className="section-light" aria-label="Your analysis report">
      <div className="section-inner mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <h2 className="text-2xl font-semibold md:text-3xl" style={{ color: "var(--color-text-primary)" }}>
            Your Analysis Report
          </h2>
          <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            Key terms and red flags from your contract.
          </p>
        </FadeIn>

        <div className="mt-12 space-y-10">
          <FadeIn delay={50}>
            <RiskScoreRing data={data} />
          </FadeIn>
          <FadeIn delay={100}>
            <SummaryCard data={data} />
          </FadeIn>
          <FadeIn delay={150}>
            <RedFlagsSection flags={data.red_flags} />
          </FadeIn>
          <FadeIn delay={200}>
            <div>
              <h3 className="mb-4 text-[var(--text-xl)] font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Contract Terms
              </h3>
              <ContractDetailsTable data={data} />
            </div>
          </FadeIn>
          {showConfidenceNotice && (
            <FadeIn delay={250}>
              <ConfidenceNotice />
            </FadeIn>
          )}
          <FadeIn delay={280}>
            <ExploreYourOptions data={data} />
          </FadeIn>
          <FadeIn delay={300}>
            <Disclaimer />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
