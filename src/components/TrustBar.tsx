import { Shield, Lock, UserX, Scale } from "lucide-react";

const signals = [
  { text: "Free. Always.", Icon: Shield },
  { text: "Private. We don't store your contract.", Icon: Lock },
  { text: "No account needed.", Icon: UserX },
  { text: "Facts only. No legal advice.", Icon: Scale },
];

export default function TrustBar() {
  return (
    <section className="border-y border-gray-200/80 bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-5 text-sm font-medium text-gray-600">
        {signals.map(({ text, Icon }) => (
          <div key={text} className="flex items-center gap-2.5">
            <Icon className="h-4 w-4 shrink-0 text-gray-500" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
