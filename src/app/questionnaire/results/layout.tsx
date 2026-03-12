import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assessment Results — FundingWatch",
  description:
    "Your quick MCA assessment results. Option to request a free professional review.",
  alternates: {
    canonical: "https://www.fundingwatch.org/questionnaire/results",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuestionnaireResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
