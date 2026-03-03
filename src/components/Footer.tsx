import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700/50 bg-navy px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <Link href="/" className="text-lg font-semibold text-white">
          FundingWatch.org
        </Link>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-sm font-medium text-gray-400 transition hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm font-medium text-gray-400 transition hover:text-white">
            Terms
          </Link>
        </div>
        <p className="text-sm font-normal text-gray-500">
          © 2026 FundingWatch.org. All rights reserved.
        </p>
        <p className="text-sm font-normal text-gray-600">
          FundingWatch is a product of 250 Sunny Isles LLC.
        </p>
      </div>
    </footer>
  );
}
