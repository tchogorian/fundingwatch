import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCA Calculator — Debtura | True APR, Daily Payment & Stacking Analysis",
  description:
    "Calculate your merchant cash advance's true APR, daily payment, and cash flow impact. Add multiple positions to see the full cost of stacked MCA debt.",
  alternates: {
    canonical: "https://www.debtura.com/apr-calculator",
  },
};

export default function APRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
