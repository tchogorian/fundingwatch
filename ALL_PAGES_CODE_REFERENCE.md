# All Pages — Full Code Reference

Every route and its `page.tsx` (and root `layout.tsx`). Use your repo paths to open and edit.

---

## Routes overview

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` |
| `/analyze` | `src/app/analyze/page.tsx` |
| `/lender-risk-index` | `src/app/lender-risk-index/page.tsx` |
| `/lender-risk-index/[slug]` | `src/app/lender-risk-index/[slug]/page.tsx` |
| `/lenders` | `src/app/lenders/page.tsx` |
| `/lenders/[slug]` | `src/app/lenders/[slug]/page.tsx` |
| `/apr-calculator` | `src/app/apr-calculator/page.tsx` |
| `/blog` | `src/app/blog/page.tsx` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` |
| `/results` | `src/app/results/page.tsx` |
| `/questionnaire` | `src/app/questionnaire/page.tsx` |
| `/questionnaire/results` | `src/app/questionnaire/results/page.tsx` |
| `/sample-report` | `src/app/sample-report/page.tsx` |
| `/glossary` | `src/app/glossary/page.tsx` |
| `/terms` | `src/app/terms/page.tsx` |
| `/privacy` | `src/app/privacy/page.tsx` |

---

## `src/app/layout.tsx`

```tsx
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
  metadataBase: new URL("https://www.fundingwatch.org"),
  title: "FundingWatch — Free MCA Contract Intelligence",
  description:
    "Upload your merchant cash advance contract. Our system reveals your true APR, hidden terms, and red flags — free, in under 30 seconds.",
  verification: { google: "6XMUkiJGV7qsaORZx0us0VRKXjam4XL5pTjjRuWqD2Y" },
  alternates: { canonical: "https://www.fundingwatch.org/" },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable} ${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--accent-teal)] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:ring-offset-2 focus:ring-offset-[var(--bg-light)]">
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
```

---

## `src/app/analyze/page.tsx`

```tsx
import { redirect } from "next/navigation";

export default function AnalyzePage() {
  redirect("/#check-contract");
}
```

---

## `src/app/glossary/page.tsx`

```tsx
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "MCA Glossary — FundingWatch",
  description:
    "Definitions of common merchant cash advance (MCA) terms: factor rate, holdback, effective APR, confession of judgment, and more.",
  alternates: { canonical: "https://www.fundingwatch.org/glossary" },
};

const TERMS: { term: string; definition: string }[] = [
  { term: "Merchant Cash Advance (MCA)", definition: "A financing product where a business receives an upfront sum in exchange for a percentage of future daily or weekly credit card sales (or sometimes bank deposits). Repayment is typically expressed as a factor rate rather than an interest rate." },
  { term: "Factor Rate", definition: "A multiplier applied to the advance amount to determine total payback. For example, a 1.25 factor on $10,000 means you repay $12,500. Factor rates do not directly indicate an annual percentage rate (APR); converting to APR often yields very high equivalent rates." },
  { term: "Effective APR", definition: "The annualized cost of financing expressed as a percentage. For MCAs with short terms and high factor rates, the effective APR can be well over 100% when calculated like a traditional loan." },
  { term: "Holdback", definition: "The percentage of daily or weekly receivables withheld by the MCA provider until the agreed payback amount is satisfied. A 10% daily holdback means 10% of each day's eligible sales go to the funder." },
  { term: "Confession of Judgment (COJ)", definition: "A clause that can allow the funder to obtain a judgment against the borrower without notice or a court hearing. In some states these are restricted or unenforceable; they are considered a high-risk term for borrowers." },
  { term: "Personal Guarantee", definition: "An agreement that makes the business owner personally liable for the debt if the business cannot pay. Assets such as a home or personal bank accounts may be at risk." },
  { term: "Stacking", definition: "Taking multiple MCAs (or other financing) at the same time. Many MCA contracts prohibit stacking; violating this can trigger default and acceleration." },
  { term: "Reconciliation Clause", definition: "Language that can allow the funder to adjust the amount owed or the holdback if the borrower's sales differ from what was represented, sometimes leading to larger or faster payback obligations." },
  { term: "Payback Amount", definition: "The total amount the business must repay (advance amount × factor rate, before any fees). This is the principal figure used to determine how much will be withheld from sales." },
  { term: "Estimated Term", definition: "The expected length of time to complete repayment based on the holdback percentage and projected sales. Actual term can be shorter or longer if sales vary." },
];

export default function GlossaryPage() {
  return (
    <>
      <section className="px-4 py-12 sm:px-6 sm:py-16" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[720px]">
          <Link href="/" className="text-sm font-medium transition hover:underline" style={{ color: "var(--color-accent-primary)" }}>
            ← Back to FundingWatch
          </Link>
          <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
            MCA Glossary
          </h1>
          <p className="mt-2 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            Common terms you may see in a merchant cash advance contract.
          </p>
          <dl className="mt-10 space-y-8">
            {TERMS.map(({ term, definition }) => (
              <div key={term}>
                <dt className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{term}</dt>
                <dd className="mt-2 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{definition}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            <Link href="/" className="font-medium transition hover:underline" style={{ color: "var(--color-accent-primary)" }}>Upload your contract</Link>
            {" "}for a free analysis of your specific terms and risk flags.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
```

---

## `src/app/terms/page.tsx`

```tsx
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms and Conditions — FundingWatch",
  description:
    "Terms and conditions for the FundingWatch free MCA contract review tool. Informational use only. Message and data rates may apply for SMS.",
  alternates: { canonical: "https://www.fundingwatch.org/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="px-4 py-12 sm:px-6 sm:py-16" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[720px]">
          <Link href="/" className="text-sm font-medium transition hover:underline" style={{ color: "var(--color-accent-primary)" }}>
            ← Back to FundingWatch
          </Link>
          <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-tertiary)" }}>Last updated: March 2026</p>
          <div className="article-prose mt-10 space-y-8 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Program and service</h2>
              <p className="mt-2 leading-relaxed">
                FundingWatch provides a free MCA contract review tool. By using fundingwatch.org, you agree to these terms. The service is provided for informational purposes only and does not constitute legal, financial, or professional advice. You should consult a licensed attorney or other qualified professional for advice specific to your situation.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>SMS and communications</h2>
              <p className="mt-2 leading-relaxed">
                If you provide your phone number, you may receive text messages from FundingWatch. Message and data rates may apply. Message frequency varies. To opt out of SMS, reply <strong>STOP</strong>. For help, reply <strong>HELP</strong>.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Support and contact</h2>
              <p className="mt-2 leading-relaxed">
                For support or questions, contact us at{" "}
                <a href="mailto:hello@fundingwatch.org" className="font-medium transition hover:underline" style={{ color: "var(--color-accent-primary)" }}>hello@fundingwatch.org</a>
                {" "}or visit fundingwatch.org and use the contact options provided.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Changes to the service</h2>
              <p className="mt-2 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the FundingWatch service or any part of it at any time, with or without notice. Continued use of the site after changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
```

---

## `src/app/privacy/page.tsx`

```tsx
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — FundingWatch",
  description:
    "Privacy policy for FundingWatch (fundingwatch.org). How we collect, use, and protect your information. 250 Sunny Isles LLC.",
  alternates: { canonical: "https://www.fundingwatch.org/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="px-4 py-12 sm:px-6 sm:py-16" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[720px]">
          <Link href="/" className="text-sm font-medium transition hover:underline" style={{ color: "var(--color-accent-primary)" }}>
            ← Back to FundingWatch
          </Link>
          <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-tertiary)" }}>Last updated: March 2026</p>
          <div className="article-prose mt-10 space-y-8 text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Who we are</h2>
              <p className="mt-2 leading-relaxed">
                250 Sunny Isles LLC operates FundingWatch (fundingwatch.org), a free MCA contract review tool for small business owners.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Information we collect</h2>
              <p className="mt-2 leading-relaxed">
                We collect the information you provide when you use our opt-in form: name, business name, email address, phone number, and any contract documents you upload. This information is submitted voluntarily when you request contract analysis or follow-up contact.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>How we use your information</h2>
              <p className="mt-2 leading-relaxed">
                We use your information to provide contract analysis results and to connect you with licensed professionals who may assist you with your MCA situation. We do not sell or share your personal information with third parties for marketing purposes.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>SMS and text messages</h2>
              <p className="mt-2 leading-relaxed">
                If you provide your phone number, you consent to receive text messages from FundingWatch. Message and data rates may apply. You may opt out at any time by replying <strong>STOP</strong>. For help, reply <strong>HELP</strong>.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Data retention</h2>
              <p className="mt-2 leading-relaxed">
                We retain submitted data for up to 12 months. After that period, we may delete or anonymize your information in accordance with our internal policies.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Contact</h2>
              <p className="mt-2 leading-relaxed">
                For privacy-related questions or requests, contact us at{" "}
                <a href="mailto:hello@fundingwatch.org" className="font-medium transition hover:underline" style={{ color: "var(--color-accent-primary)" }}>hello@fundingwatch.org</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
```

---

## Home page and homepage components

- **Home:** `src/app/page.tsx` — see **DEBTURA_HOMEPAGE_FULL_CODE.md** in this repo for full code.
- **Components used on home:** Navbar, Hero, TrustBar, OurIntelligence, FeaturedInsight, CheckYourContract, LoadingState, ApplicationForm, FAQ, SecondaryCTA, Footer — paths and code are in **DEBTURA_HOMEPAGE_FULL_CODE.md**.

---

## Longer pages (full code lives in repo; paths only here)

Open these in your editor to get the full code:

- **`src/app/page.tsx`** — Home (Debtura sections, file upload state, analyze flow).
- **`src/app/lender-risk-index/page.tsx`** — Lender Risk Index: hero + search, `/api/lenders` + `/api/lenders/search`, filter by rating, grid of lender cards, links to `/lender-risk-index/[slug]`. Uses `@/types/lenders`, Footer.
- **`src/app/lender-risk-index/[slug]/page.tsx`** — Lender detail: fetch `/api/lenders/[slug]`, rating badge, overview, primary concerns, red flags, risk score. Link "Analyze My Contract" to `/#upload`. Footer.
- **`src/app/apr-calculator/page.tsx`** — MCA Calculator: two tabs (Evaluating an Offer / I Already Have an MCA), factor rate vs total payback, term options, revenue for stress %, StressBar and ComparisonBars. Large file (~620 lines). Footer.
- **`src/app/blog/page.tsx`** — Blog index: hero, featured post, category pills, grid from `@/lib/blog` (BLOG_POSTS), pagination, sidebar (Popular, Categories, Newsletter). Uses `useSearchParams` for `?category=`. Footer.
- **`src/app/blog/[slug]/page.tsx`** — Blog article: `getPostBySlug(slug)`, generateStaticParams, generateMetadata, breadcrumb, ToC, `dangerouslySetInnerHTML` for body, mid-article CTA, related posts, author bio. Uses `@/lib/blog`, BlogCard, BlogStickyCTA. Footer.
- **`src/app/results/page.tsx`** — Analysis results: read from `sessionStorage` key `analysisResult`, redirect to `/` if missing. Renders risk score, key terms, contract clauses, red flags, recommended actions, lender compare (getLenderFromIndexByName, getCertifiedLenders). Broker intake modal (form to `/api/broker-leads`). Fork by risk (See Better Options / Compare Lenders / terms solid). Footer.
- **`src/app/questionnaire/page.tsx`** — Two-step questionnaire: section 1 (name, business, state, phone, email), section 2 (lender names, count, payment, total owed, payment status, etc.). Submit to `/api/questionnaire`, then redirect to `/questionnaire/results` with sessionStorage. Footer.
- **`src/app/questionnaire/results/page.tsx`** — Assessment result: read from sessionStorage `questionnaireAssessment`, show assessment text (lenderSection, stackingSection, stateSection, paymentStressSection). Opt-in form to `/api/opt-in`. Success state "You're All Set". Footer.
- **`src/app/sample-report/page.tsx`** — Sample report: hardcoded `SAMPLE_RESULT` (AnalysisResult), same layout as results (risk header, key terms, clauses, red flags, recommended actions). CTA to `/#upload`. Footer.
- **`src/app/lenders/page.tsx`** — Lenders index (alternate): hero "MCA Lender Risk Index", search, rating pills, grid of LenderCard, methodology note. Fetches `/api/lenders` and `/api/lenders/search?q=`. Links to `/lenders/[slug]`. Footer.
- **`src/app/lenders/[slug]/page.tsx`** — Server component: `getLender(slug)` via fetch to `/api/lenders/[slug]`, generateMetadata, notFound. Renders lender name, rating badge, key metrics (UCC, lawsuits, risk score), assessment, red flags, litigation/COJ, source citations. Sidebar CTA "Analyze My Contract" to `/`. Footer.

---

## Summary

- **Short pages** (layout, analyze, glossary, terms, privacy): code or description is above; edit in `src/app/` as needed.
- **Home and its sections:** use **DEBTURA_HOMEPAGE_FULL_CODE.md** in this repo.
- **All other pages:** open the path under `src/app/` in your IDE to see and edit the full code (no copy-paste needed; the repo is the source of truth).

To change branding (e.g. FundingWatch → Debtura), search for "FundingWatch" and "Funding Watch" across `src/app` and `src/components` and update metadata, back links, and button text.
