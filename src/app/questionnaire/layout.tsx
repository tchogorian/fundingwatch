import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick MCA Assessment — Debtura",
  description:
    "No contract needed. Answer a few questions about your MCA lenders and situation. Get a personalized snapshot and option for a free professional review.",
  alternates: { canonical: "https://www.debtura.com/questionnaire" },
};

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
