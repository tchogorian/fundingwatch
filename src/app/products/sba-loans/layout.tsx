import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SBA Loans — Debtura",
  description: "Coming soon: SBA loan solutions through Debtura.",
  alternates: {
    canonical: "https://www.debtura.com/products/sba-loans",
  },
};

export default function SBALoansProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
