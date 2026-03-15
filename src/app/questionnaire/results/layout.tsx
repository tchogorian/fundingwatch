import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assessment Results — Debtura",
  description:
    "Your quick MCA assessment results. Option to request a free professional review.",
  alternates: {
    canonical: "https://www.debtura.com/questionnaire/results",
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
