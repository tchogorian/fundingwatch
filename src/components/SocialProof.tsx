"use client";

export default function SocialProof() {
  return (
    <section className="border-y border-gray-200 bg-gray-50/80 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="flex flex-col items-center text-center sm:block sm:text-left">
            <p className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              2,400+
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              Contracts analyzed
            </p>
            <p className="mt-1 text-base font-normal text-gray-600">
              Trusted by small business owners to understand their MCA terms.
            </p>
          </div>
          <div className="flex flex-col items-center text-center sm:block sm:text-left">
            <p className="text-4xl font-bold tracking-tight text-accent sm:text-5xl">
              $4.2M+
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              In hidden fees exposed
            </p>
            <p className="mt-1 text-base font-normal text-gray-600">
              Our analysis has helped borrowers see the true cost of their advances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
