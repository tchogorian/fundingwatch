import Link from "next/link";

export const metadata = {
  alternates: {
    canonical: "https://www.fundingwatch.org/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-accent hover:underline">
          ← Back to FundingWatch.org
        </Link>
        <h1 className="mt-8 text-2xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-gray-600">
          Privacy policy content will be added here. FundingWatch respects your
          privacy and does not store your uploaded contracts.
        </p>
      </div>
    </div>
  );
}
