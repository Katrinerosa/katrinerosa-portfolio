import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPhotoImage } from "@/lib/images";
import { getCollection } from "@/data/queries/images";

export async function CollectionGrid({ slug }: { slug: string }) {
  const collectionIllustrations = await getCollection(slug);

  return (
    <>
      <p className="font-mono text-xs text-white/40 -mt-6 mb-6">
        {collectionIllustrations.length} illustration
        {collectionIllustrations.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {collectionIllustrations.map((illustration, i) => (
          <ViewTransition key={illustration.id}>
            <Link
              href={`/gallery/${illustration.id}`}
              transitionTypes={["nav-forward"]}
              className="group relative block overflow-hidden rounded-lg aspect-[4/3]"
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
                  priority={i < 3}
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
    </>
  );
}
