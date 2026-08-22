import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import GalleryNavigation from "@/components/GalleryNavigation";
import { getWork, works } from "@/lib/works";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);

  return work
    ? {
        title: `${work.title} | Katrine Rosa`,
        description: `${work.category} by Katrine Rosa Beck.`,
      }
    : {};
}

export default async function GalleryWorkPage({
  params,
}: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    notFound();
  }

  const currentIndex = works.findIndex((item) => item.slug === work.slug);
  const previous = currentIndex > 0 ? works[currentIndex - 1] : null;
  const next = currentIndex < works.length - 1 ? works[currentIndex + 1] : null;

  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <main className="min-h-[calc(100svh-5rem)] bg-navy px-6 py-10 text-cream sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative">
            <GalleryNavigation previous={previous} next={next} />
            <ViewTransition
              name={`work-image-${work.slug}`}
              share="auto"
              default="none"
            >
              <div
                className="relative mx-auto max-h-[70svh] max-w-full overflow-hidden rounded-2xl bg-cream/5"
                style={{ aspectRatio: `${work.width}/${work.height}` }}
              >
                <Image
                  src={work.image}
                  alt={work.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="object-contain"
                />
              </div>
            </ViewTransition>
          </div>

          <div className="mt-8 border-t border-cream/15 pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
              {work.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
              {work.title}
            </h1>
          </div>
        </div>
      </main>
    </ViewTransition>
  );
}
