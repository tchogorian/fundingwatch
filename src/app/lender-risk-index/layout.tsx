import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lender Risk Index — Debtura",
  description:
    "Independent risk ratings for MCA lenders. Scored on complaints, litigation, contract terms, regulatory exposure, transparency, and stacking behavior.",
  alternates: {
    canonical: "https://www.debtura.com/lender-risk-index",
  },
};

export default function LenderRiskIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
