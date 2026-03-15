import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms and Conditions — Debtura",
  description:
    "Terms and conditions for the Debtura free MCA contract review tool. Informational use only. Message and data rates may apply for SMS.",
  alternates: {
    canonical: "https://www.debtura.com/terms",
  },
};

export default function TermsPage() {
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
            Terms and Conditions
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
                Program and service
              </h2>
              <p className="mt-2 leading-relaxed">
                Debtura provides a free MCA contract review tool. By using
                debtura.com, you agree to these terms. The service is
                provided for informational purposes only and does not
                constitute legal, financial, or professional advice. You should
                consult a licensed attorney or other qualified professional for
                advice specific to your situation.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                SMS and communications
              </h2>
              <p className="mt-2 leading-relaxed">
                If you provide your phone number, you may receive text
                messages from Debtura. Message and data rates may apply.
                Message frequency varies. To opt out of SMS, reply{" "}
                <strong>STOP</strong>. For help, reply <strong>HELP</strong>.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Support and contact
              </h2>
              <p className="mt-2 leading-relaxed">
                For support or questions, contact us at{" "}
                <a
                  href="mailto:hello@fundingwatch.org"
                  className="font-medium transition hover:underline"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  hello@debtura.com
                </a>{" "}
                or visit debtura.com and use the contact options provided.
              </p>
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Changes to the service
              </h2>
              <p className="mt-2 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the
                Debtura service or any part of it at any time, with or
                without notice. Continued use of the site after changes
                constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
