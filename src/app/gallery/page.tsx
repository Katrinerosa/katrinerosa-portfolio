import { Suspense, ViewTransition } from "react";
import {
  GalleryContent,
  GalleryContentSkeleton,
} from "@/components/Gallery-content";
import {
  GalleryControls,
  GalleryControlsSkeleton,
} from "@/components/Gallery-controls";

export default function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  return (
    <ViewTransition default="none">
      <main className="min-h-[calc(100svh-5rem)] bg-navy px-6 py-12 text-cream">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 border-t border-cream/15 pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
              Selected work
            </p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">
              Visual worlds
            </h1>
          </div>

          <Suspense fallback={<GalleryControlsSkeleton />}>
            <GalleryControls />
          </Suspense>

          <Suspense
            fallback={
              <ViewTransition exit="slide-down" default="none">
                <GalleryContentSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition enter="slide-up" default="none">
              <GalleryContent searchParams={searchParams} />
            </ViewTransition>
          </Suspense>
        </div>
      </main>
    </ViewTransition>
  );
}
