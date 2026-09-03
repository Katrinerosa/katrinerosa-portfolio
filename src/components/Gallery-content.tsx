import { getIllustrations } from "@/data/queries/images";
import { IllustrationGrid } from "@/components/image-grid";
import {
  type SortKey,
  sortIllustrations,
} from "@/lib/photos";

export async function GalleryContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort = "title" } = await searchParams;
  const illustrations = await getIllustrations();

  const filtered = illustrations.filter((illustration) => {
    const query = q.toLowerCase();

    return (
      illustration.title.toLowerCase().includes(query) ||
      illustration.project.toLowerCase().includes(query) ||
      illustration.illustrator.toLowerCase().includes(query)
    );
  });

  const sorted = sortIllustrations(
    filtered,
    sort as SortKey,
  );

  return <IllustrationGrid illustrations={sorted} q={q} />;
}

export function GalleryContentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}
