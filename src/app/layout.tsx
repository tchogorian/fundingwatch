import type { Metadata } from "next";
import {
  DM_Serif_Display,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Condensed,
} from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const ibmPlexCondensed = IBM_Plex_Sans_Condensed({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FundingWatch — Free MCA Contract Intelligence",
  description:
    "Upload your merchant cash advance contract. Our AI reveals your true APR, hidden terms, and red flags — free, in under 30 seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${ibmPlexCondensed.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--color-accent-primary)] focus:px-4 focus:py-2 focus:text-[var(--color-text-inverse)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-base)]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
