import { Upload, Search, FileText } from "lucide-react";
import FadeIn from "./FadeIn";

const steps = [
  {
    number: 1,
    title: "Upload",
    description: "Drop your MCA contract (PDF or photo). Takes 10 seconds.",
    Icon: Upload,
  },
  {
    number: 2,
    title: "AI Analyzes",
    description:
      "Our system extracts every term, calculates your real APR, and checks for red flags.",
    Icon: Search,
  },
  {
    number: 3,
    title: "See Your Report",
    description:
      "Plain English breakdown of what's in your contract. No jargon, no cost.",
    Icon: FileText,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-normal text-gray-600">
            Three steps to clarity on your merchant cash advance.
          </p>
        </FadeIn>
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {steps.map(({ number, title, description, Icon }, i) => (
            <FadeIn key={number} delay={i * 100}>
              <div className="flex flex-col items-center rounded-2xl border border-gray-200/80 bg-white p-8 shadow-card transition hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-xl font-bold text-white">
                  {number}
                </div>
                <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-3 text-base font-normal text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
