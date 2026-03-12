import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample Report — FundingWatch",
  description:
    "See an example MCA contract analysis report. Upload your own contract for a free personalized analysis.",
  alternates: {
    canonical: "https://www.fundingwatch.org/sample-report",
  },
};

export default function SampleReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
