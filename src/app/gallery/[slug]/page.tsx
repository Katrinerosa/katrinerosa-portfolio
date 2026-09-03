import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { getIllustration } from "@/data/queries/images";
import { getPhotoImage } from "@/lib/images";
import { illustrations } from "@/lib/photos";

export function generateStaticParams() {
  return illustrations.map((illustration) => ({
    slug: illustration.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const illustration = await getIllustration(slug);

  return {
    title: `${illustration.title} | Katrine Rosa`,
    description: `${illustration.project} — illustrated by ${illustration.illustrator}.`,
  };
}

export default async function GalleryIllustrationPage({
  params,
}: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const illustration = await getIllustration(slug);

  const currentIndex = illustrations.findIndex(
    (item) => item.id === illustration.id,
  );

  const previous =
    currentIndex > 0 ? illustrations[currentIndex - 1] : null;

  const next =
    currentIndex < illustrations.length - 1
      ? illustrations[currentIndex + 1]
      : null;

  return (
    <ViewTransition default="none">
      <main className="min-h-[calc(100svh-5rem)] bg-black px-6 py-10 text-cream sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href="/gallery"
              transitionTypes={["nav-back"]}
              className="text-sm text-cream/70 hover:text-cream"
            >
              ← Gallery
            </Link>

            <Link
              href="/gallery"
              transitionTypes={["nav-back"]}
              aria-label="Luk illustrationen"
              className="grid size-11 place-items-center rounded-full border border-cream/20 text-2xl"
            >
              <span aria-hidden="true">×</span>
            </Link>
          </div>

          <div className="relative">
            <ViewTransition
              name={`illustration-${illustration.id}`}
              share="morph"
              default="none"
            >
              <div
                className="relative mx-auto max-h-[45vh] max-w-full overflow-hidden rounded-lg md:max-h-[55vh] lg:max-h-[60vh]"
                style={{
                  aspectRatio: `${illustration.w}/${illustration.h}`,
                }}
              >
                <Image
                  src={getPhotoImage(illustration.seed)}
                  alt={`${illustration.title} — ${illustration.project}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="object-contain"
                />
              </div>
            </ViewTransition>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-cream/15 pt-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-turquoise">
                {illustration.project}
              </p>

              <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
                {illustration.title}
              </h1>

              <p className="mt-3 text-cream/70">
                {illustration.illustrator} · {illustration.year}
              </p>
            </div>

            <nav
              aria-label="Illustrationsnavigation"
              className="flex gap-3"
            >
              {previous && (
                <Link
                  href={`/gallery/${previous.id}`}
                  transitionTypes={["nav-back"]}
                  aria-label={`Forrige illustration: ${previous.title}`}
                  className="grid size-11 place-items-center rounded-full border border-cream/20"
                >
                  ←
                </Link>
              )}

              {next && (
                <Link
                  href={`/gallery/${next.id}`}
                  transitionTypes={["nav-forward"]}
                  aria-label={`Næste illustration: ${next.title}`}
                  className="grid size-11 place-items-center rounded-full border border-cream/20"
                >
                  →
                </Link>
              )}
            </nav>
          </div>
        </div>
      </main>
    </ViewTransition>
  );
}
