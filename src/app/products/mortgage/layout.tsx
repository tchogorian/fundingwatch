import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage — Debtura",
  description: "Coming soon: Mortgage lending solutions through Debtura.",
  alternates: {
    canonical: "https://www.debtura.com/products/mortgage",
  },
};

export default function MortgageProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
