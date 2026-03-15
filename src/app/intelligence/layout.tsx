import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debtura Intelligence — Research & Analysis",
  description: "Independent research on MCA lending — lender behavior, borrower outcomes, contract trends, and regulatory shifts.",
  alternates: {
    canonical: "https://www.debtura.com/intelligence",
  },
  openGraph: {
    title: "Debtura Intelligence — Research & Analysis",
    description: "Independent research on MCA lending — lender behavior, borrower outcomes, contract trends, and regulatory shifts.",
    type: "website",
    url: "https://www.debtura.com/intelligence",
  },
};

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
