import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.debtura.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-layout min-h-screen w-full overflow-x-hidden">
      {children}
    </div>
  );
}
