import type { Illustration } from "@/lib/photos";

type IllustrationDetailsToggleProps = {
  illustration: Illustration;
};

const DETAIL_LABELS: Record<string, string> = {
  project: "Project",
  illustrator: "Illustrator",
  year: "Year",
  dimensions: "Dimensions",
  medium: "Medium",
  software: "Software",
};

export function IllustrationDetailsToggle({
  illustration,
}: IllustrationDetailsToggleProps) {
  const details: Record<string, string> = {
    project: illustration.project,
    illustrator: illustration.illustrator,
    year: String(illustration.year),
    dimensions: `${illustration.w} × ${illustration.h} px`,
    medium: "Digital illustration",
    software: "Procreate",
  };

  return (
    <details className="group mt-6 border-t border-white/10 pt-6">
      <summary className="flex cursor-pointer list-none items-center gap-2 font-mono text-xs text-white/40 transition-colors hover:text-white">
        <span className="inline-block transition-transform duration-200 group-open:rotate-90">
          ▶
        </span>
        Illustration details
      </summary>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(details).map(([key, value]) => (
          <div key={key}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
              {DETAIL_LABELS[key]}
            </p>

            <p className="mt-0.5 font-mono text-xs text-white/70">
              {value}
            </p>
          </div>
        ))}
      </div>
    </details>
  );
}