"use client";

export default function Hero() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-navy px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:pb-40">
      {/* Gradient mesh + geometric background */}
      <div
        className="absolute inset-0 opacity-100"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(46, 117, 182, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 90% 60%, rgba(46, 117, 182, 0.12) 0%, transparent 45%),
            radial-gradient(ellipse 50% 30% at 10% 80%, rgba(46, 117, 182, 0.08) 0%, transparent 40%),
            linear-gradient(180deg, #1A1A2E 0%, #16162a 50%, #1A1A2E 100%)
          `,
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            What&apos;s Your MCA Really Costing You?
          </h1>
          <p className="mt-8 text-lg font-normal text-gray-400 sm:text-xl md:text-xl">
            Upload your merchant cash advance contract. Our AI analyzes it in
            seconds and shows you the real APR, hidden fees, and red flags — free.
          </p>
          <button
            onClick={scrollToUpload}
            className="mt-12 inline-flex items-center rounded-xl bg-accent px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy"
          >
            Analyze My Contract Free
          </button>
        </div>

        {/* Report mockup in browser frame */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-sm">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 flex flex-1 items-center rounded-lg bg-navy/60 px-3 py-1.5">
                <span className="text-xs text-gray-500">
                  fundingwatch.org/analysis
                </span>
              </div>
            </div>
            {/* Mock report content */}
            <div className="border-t border-white/5 bg-white p-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sample Report
                </p>
                <div className="mt-3 flex flex-wrap items-baseline gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Effective APR</p>
                    <p className="text-2xl font-bold text-critical">127.4%</p>
                  </div>
                  <div className="h-8 w-px bg-gray-200" />
                  <div>
                    <p className="text-xs text-gray-500">Advance → Repayment</p>
                    <p className="text-lg font-semibold text-gray-900">
                      $50,000 → $72,500
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-critical/10 px-2 py-0.5 text-xs font-medium text-critical">
                    Confession of judgment
                  </span>
                  <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                    Personal guarantee
                  </span>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-gray-500">
                Your full report includes APR, red flags, and contract details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
