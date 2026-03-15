import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchant Cash Advance — Debtura",
  description: "Get matched with vetted MCA lenders. Fast approvals, transparent terms, zero fees to borrowers.",
  alternates: {
    canonical: "https://www.debtura.com/products/merchant-cash-advance",
  },
  openGraph: {
    title: "Merchant Cash Advance — Debtura",
    description: "Get matched with vetted MCA lenders. Fast approvals, transparent terms, zero fees to borrowers.",
    type: "website",
    url: "https://www.debtura.com/products/merchant-cash-advance",
  },
};

export default function MCAProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
