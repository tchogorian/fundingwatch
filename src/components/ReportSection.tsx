"use client";

import type { AnalysisResult } from "@/types/analysis";
import RiskScoreRing from "./RiskScoreRing";
import SummaryCard from "./SummaryCard";
import RedFlagsSection from "./RedFlagsSection";
import ContractDetailsTable from "./ContractDetailsTable";
import ConfidenceNotice from "./ConfidenceNotice";
import Disclaimer from "./Disclaimer";
import FadeIn from "./FadeIn";

export default function ReportSection({ data }: { data: AnalysisResult }) {
  const showConfidenceNotice =
    data.confidence === "medium" || data.confidence === "low";

  return (
    <section className="bg-surface px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your Analysis Report
          </h2>
          <p className="mb-10 text-lg font-normal text-gray-600">
            Key terms and red flags from your contract.
          </p>
        </FadeIn>
        <div className="space-y-10">
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
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Contract Details
              </h3>
              <ContractDetailsTable data={data} />
            </div>
          </FadeIn>
          {showConfidenceNotice && (
            <FadeIn delay={250}>
              <ConfidenceNotice />
            </FadeIn>
          )}
          <FadeIn delay={300}>
            <Disclaimer />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
