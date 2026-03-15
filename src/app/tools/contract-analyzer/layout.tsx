import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contract Intelligence Tool — Debtura",
  description: "Upload any MCA contract. Our AI extracts the real APR, flags hidden terms, and scores your lender in seconds — free.",
  alternates: {
    canonical: "https://www.debtura.com/tools/contract-analyzer",
  },
  openGraph: {
    title: "Contract Intelligence Tool — Debtura",
    description: "Upload any MCA contract. Our AI extracts the real APR, flags hidden terms, and scores your lender in seconds — free.",
    type: "website",
    url: "https://www.debtura.com/tools/contract-analyzer",
  },
};

export default function ContractAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
