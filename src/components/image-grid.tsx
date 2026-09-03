import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import { getPhotoImage } from "@/lib/images";
import type { Illustration } from "@/lib/photos";

export function IllustrationGrid({
  illustrations,
  q,
}: {
  illustrations: Illustration[];
  q?: string;
}) {
  return (
    <>
      <p className="font-mono text-xs text-white/40 mb-4">
        {illustrations.length} illustration
        {illustrations.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {illustrations.map((illustration, index) => (
          <ViewTransition key={illustration.id}>
            <Link
              href={`/gallery/${illustration.id}`}
              transitionTypes={["nav-forward"]}
              className="group relative block overflow-hidden rounded-lg aspect-square"
            >
              <ViewTransition
                name={`illustration-${illustration.id}`}
                share="morph"
                default="none"
              >
                <Image
                  data-illustration-id={illustration.id}
                  src={getPhotoImage(illustration.seed)}
                  alt={`${illustration.title} — ${illustration.project}`}
                  className="w-full h-full object-cover block rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  placeholder="blur"
                />
              </ViewTransition>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <div className="p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-sm font-medium text-white leading-tight">
                    {illustration.title}
                  </p>
                  <p className="font-mono text-xs text-white/60 mt-0.5">
                    {illustration.project}
                  </p>
                </div>
              </div>
            </Link>
          </ViewTransition>
        ))}
      </div>

      {illustrations.length === 0 && q && (
        <p className="text-center font-mono text-sm text-white/30 py-20">
          No photos match &ldquo;{q}&rdquo;
        </p>
      )}
    </>
  );
}
