import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import ScrollToHash from "@/components/ScrollToHash";
import AIChatBubble from "@/components/AIChatBubble";
import "./globals.css";

const playfair = Playfair_Display({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.debtura.com"),
  title: "Debtura — Funding, with confidence.",
  description:
    "Our analyst-driven lender ratings, contract analysis, and AI-powered matching provide critical intelligence — translating complexity into clarity so businesses can fund with conviction.",
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
      className={`${playfair.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased" style={{ fontFamily: "var(--font-ibm), -apple-system, sans-serif" }}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#c8102e] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
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
