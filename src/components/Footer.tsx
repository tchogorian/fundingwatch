import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-hero-from py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <Link
          href="/"
          className="cursor-pointer text-[18px] font-semibold text-white transition hover:opacity-90"
        >
          FundingWatch
        </Link>
        <div className="flex items-center gap-2 text-small text-slate-400">
          <Link
            href="/privacy"
            className="cursor-pointer transition hover:text-white"
          >
            Privacy
          </Link>
          <span>·</span>
          <Link
            href="/terms"
            className="cursor-pointer transition hover:text-white"
          >
            Terms
          </Link>
        </div>
        <p className="text-small text-slate-400">© 2026 FundingWatch</p>
      </div>
    </footer>
  );
}
