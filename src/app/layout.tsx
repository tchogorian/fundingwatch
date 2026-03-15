import type { Metadata } from "next";
import { Sora, JetBrains_Mono, DM_Serif_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import ScrollToHash from "@/components/ScrollToHash";
import AIChatBubble from "@/components/AIChatBubble";
import "./globals.css";

const sora = Sora({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.debtura.com"),
  title: "Debtura — MCA Intelligence & Brokerage",
  description:
    "Debtura analyzes lender risk, uncovers hidden terms, and connects businesses with better funding partners.",
  verification: {
    google: "6XMUkiJGV7qsaORZx0us0VRKXjam4XL5pTjjRuWqD2Y",
  },
  alternates: {
    canonical: "https://www.debtura.com/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrainsMono.variable} ${dmSerifDisplay.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#1e5a8a] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <Navbar />
        <ScrollToHash />
        <main id="main">{children}</main>
        <AIChatBubble />
      </body>
    </html>
  );
}
