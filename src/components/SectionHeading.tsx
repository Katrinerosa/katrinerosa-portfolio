export default function SectionHeading({
  title,
  children,
  light = false,
}: {
  title: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <h2
        className={`text-4xl font-semibold tracking-[-0.045em] sm:text-5xl ${
          light ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div
        className={`max-w-xl text-base leading-7 ${
          light ? "text-cream/65" : "text-navy/70"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
