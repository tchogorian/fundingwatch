"use client";

export default function SecondaryCTA() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-navy px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Most MCA borrowers don&apos;t know their real APR.
        </h2>
        <p className="mt-6 text-lg font-normal text-gray-400 leading-relaxed">
          The factor rate in your contract hides the true annual cost. A 1.35 factor rate
          on a 6-month advance is over 100% APR. Our tool does the math so you don&apos;t
          have to.
        </p>
        <button
          onClick={scrollToUpload}
          className="mt-10 inline-flex rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent/20 transition hover:scale-[1.02] hover:bg-accent/90 hover:shadow-accent/30"
        >
          Check Your Contract
        </button>
      </div>
    </section>
  );
}
