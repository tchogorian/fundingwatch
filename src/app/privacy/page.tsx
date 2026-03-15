import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Debtura",
  description:
    "Privacy policy for Debtura (debtura.com). How we collect, use, and protect your information. 250 Sunny Isles LLC.",
  alternates: {
    canonical: "https://www.debtura.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section
        className="px-4 py-12 sm:px-6 sm:py-16"
        style={{ background: "var(--color-bg-base)" }}
      >
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/"
            className="text-sm font-medium transition hover:underline"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ← Back to Debtura
          </Link>
          <h1
            className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Privacy Policy
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Last updated: March 2026
          </p>

          <div
            className="article-prose mt-10 space-y-8 text-[var(--text-base)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Who we are
              </h2>
              <p className="mt-2 leading-relaxed">
                250 Sunny Isles LLC operates FundingWatch (fundingwatch.org), a
                free MCA contract review tool for small business owners.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Information we collect
              </h2>
              <p className="mt-2 leading-relaxed">
                We collect the information you provide when you use our
                opt-in form: name, business name, email address, phone number,
                and any contract documents you upload. This information is
                submitted voluntarily when you request contract analysis or
                follow-up contact.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                How we use your information
              </h2>
              <p className="mt-2 leading-relaxed">
                We use your information to provide contract analysis results
                and to connect you with licensed professionals who may assist
                you with your MCA situation. We do not sell or share your
                personal information with third parties for marketing
                purposes.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                SMS and text messages
              </h2>
              <p className="mt-2 leading-relaxed">
                If you provide your phone number, you consent to receive text
                messages from Debtura. Message and data rates may apply.
                You may opt out at any time by replying <strong>STOP</strong>.
                For help, reply <strong>HELP</strong>.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Data retention
              </h2>
              <p className="mt-2 leading-relaxed">
                We retain submitted data for up to 12 months. After that
                period, we may delete or anonymize your information in
                accordance with our internal policies.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Contact
              </h2>
              <p className="mt-2 leading-relaxed">
                For privacy-related questions or requests, contact us at{" "}
                <a
                  href="mailto:hello@debtura.com"
                  className="font-medium transition hover:underline"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  hello@debtura.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
