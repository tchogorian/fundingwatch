type Props = {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional: max width for description (default 640px) */
  descriptionMaxWidth?: string;
};

export default function InnerPageHeader({
  eyebrow,
  title,
  description,
  descriptionMaxWidth = "640px",
}: Props) {
  return (
    <div className="mx-auto max-w-[1160px] px-6 md:px-8 pt-16 pb-8 md:pt-20 md:pb-10">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
        <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>
          {eyebrow}
        </span>
      </div>
      <h1
        className="text-[32px] md:text-[40px] font-semibold leading-tight"
        style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
      >
        {title}
      </h1>
      <p
        className="mt-3 text-[16px]"
        style={{ fontFamily: "var(--font-sans)", color: "var(--muted)", maxWidth: descriptionMaxWidth }}
      >
        {description}
      </p>
    </div>
  );
}
