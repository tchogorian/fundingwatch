import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700/50 bg-navy px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex items-center justify-center gap-6">
          <Link
            href="/"
            className="text-base font-semibold text-white transition hover:opacity-90"
          >
            FundingWatch
          </Link>
          <span className="text-gray-500">·</span>
          <Link
            href="/privacy"
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium text-gray-400 transition hover:text-white"
          >
            Terms
          </Link>
        </div>
        <p className="text-sm font-normal text-gray-500">
          © 2026 FundingWatch
        </p>
      </div>
    </footer>
  );
}
