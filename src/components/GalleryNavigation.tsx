"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type GalleryWorkLink = { slug: string; title: string };

type GalleryNavigationProps = {
  previous: GalleryWorkLink | null;
  next: GalleryWorkLink | null;
};

export default function GalleryNavigation({ previous, next }: GalleryNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.push("/#work", { transitionTypes: ["nav-back"] });
      }
      if (event.key === "ArrowLeft" && previous) {
        router.push(`/gallery/${previous.slug}`, { transitionTypes: ["nav-back"] });
      }
      if (event.key === "ArrowRight" && next) {
        router.push(`/gallery/${next.slug}`, { transitionTypes: ["nav-forward"] });
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [next, previous, router]);

  const controlClass = "z-20 grid size-11 place-items-center rounded-full border border-cream/20 bg-navy/80 text-cream shadow-lg backdrop-blur-sm transition-colors hover:border-cream/50 hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise";
  const disabledClass = "absolute z-20 grid size-11 place-items-center rounded-full border border-cream/10 bg-navy/60 text-cream/25";

  return (
    <>
      <Link
        href="/#work"
        transitionTypes={["nav-back"]}
        aria-label="Luk værket og gå tilbage til galleriet"
        className={`${controlClass} fixed top-24 right-6 text-2xl`}
      >
        <span aria-hidden="true">×</span>
      </Link>

      {previous ? (
        <Link
          href={`/gallery/${previous.slug}`}
          transitionTypes={["nav-back"]}
          aria-label={`Forrige illustration: ${previous.title}`}
          className={`${controlClass} absolute top-1/2 left-4 -translate-y-1/2 text-xl`}
        >
          <span aria-hidden="true">←</span>
        </Link>
      ) : (
        <span aria-hidden="true" className={`${disabledClass} top-1/2 left-4 -translate-y-1/2 text-xl`}>←</span>
      )}

      {next ? (
        <Link
          href={`/gallery/${next.slug}`}
          transitionTypes={["nav-forward"]}
          aria-label={`Næste illustration: ${next.title}`}
          className={`${controlClass} absolute top-1/2 right-4 -translate-y-1/2 text-xl`}
        >
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span aria-hidden="true" className={`${disabledClass} top-1/2 right-4 -translate-y-1/2 text-xl`}>→</span>
      )}
    </>
  );
}
