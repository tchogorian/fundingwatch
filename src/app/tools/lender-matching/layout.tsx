import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lender Matching AI — Debtura",
  description: "Get matched with vetted, rated lenders based on your business profile.",
  alternates: {
    canonical: "https://www.debtura.com/tools/lender-matching",
  },
  openGraph: {
    title: "Lender Matching AI — Debtura",
    description: "Get matched with vetted, rated lenders based on your business profile.",
    type: "website",
    url: "https://www.debtura.com/tools/lender-matching",
  },
};

export default function LenderMatchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
