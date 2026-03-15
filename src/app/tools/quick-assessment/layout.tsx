import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Assessment — Debtura",
  description: "Answer a few questions about your MCA situation. No contract needed.",
  alternates: {
    canonical: "https://www.debtura.com/tools/quick-assessment",
  },
  openGraph: {
    title: "Quick Assessment — Debtura",
    description: "Answer a few questions about your MCA situation. No contract needed.",
    type: "website",
    url: "https://www.debtura.com/tools/quick-assessment",
  },
};

export default function QuickAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
