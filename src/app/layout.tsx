import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FundingWatch.org — Free MCA Contract Analysis",
  description:
    "Upload your merchant cash advance contract. Our AI analyzes it in seconds and shows you the real APR, hidden fees, and red flags — free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
