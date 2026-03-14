import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lender Risk Index — FundingWatch",
  description:
    "See how MCA lenders compare: our ratings for transparency, fair terms, and responsible lending practices.",
  alternates: {
    canonical: "https://www.fundingwatch.org/lender-risk-index",
  },
};

export default function LenderRiskIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
