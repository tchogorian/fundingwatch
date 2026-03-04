import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCA APR Calculator — FundingWatch",
  description:
    "See what your merchant cash advance really costs. Enter advance amount, factor rate, and term to get your effective APR, total repayment, and daily payment.",
};

export default function APRCalculatorLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
