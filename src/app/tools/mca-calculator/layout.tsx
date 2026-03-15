import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCA Calculator — Debtura",
  description: "Convert factor rates to annual percentage rates (APR) to understand the true cost of your merchant cash advance.",
  alternates: {
    canonical: "https://www.debtura.com/tools/mca-calculator",
  },
  openGraph: {
    title: "MCA Calculator — Debtura",
    description: "Convert factor rates to annual percentage rates (APR) to understand the true cost of your merchant cash advance.",
    type: "website",
    url: "https://www.debtura.com/tools/mca-calculator",
  },
};

export default function MCACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
