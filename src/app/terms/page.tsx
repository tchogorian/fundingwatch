import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-accent hover:underline">
          ← Back to FundingWatch.org
        </Link>
        <h1 className="mt-8 text-2xl font-bold text-gray-900">Terms of Use</h1>
        <p className="mt-4 text-gray-600">
          Terms of use content will be added here. This tool is for
          informational purposes only and does not constitute legal or
          financial advice.
        </p>
      </div>
    </div>
  );
}
