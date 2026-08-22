import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { works } from "@/lib/works";

export default function WorkGallery() {
  return (
    <section id="work" className="bg-navy px-6 py-24 text-cream">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6 border-t border-cream/15 pt-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
              Selected work
            </p>
            <h2 className="mt-3 text-4xl font-semibold sm:text-6xl">
              Visual worlds
            </h2>
          </div>
          <p className="shrink-0 font-mono text-sm text-cream/55">
            {works.length} works
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <ViewTransition key={work.slug}>
              <li>
                <Link
                  href={`/gallery/${work.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-cream/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
                >
                  <ViewTransition
                    name={`work-image-${work.slug}`}
                    share="auto"
                    default="none"
                  >
                    <Image
                      src={work.image}
                      alt={work.alt}
                      fill
                      priority={index < 3}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={`${work.thumbnailClassName} block rounded-2xl motion-safe:transition motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.025]`}
                    />
                  </ViewTransition>
                  <div className="absolute inset-0 flex items-end bg-navy/0 transition-colors duration-300 group-hover:bg-navy/55 group-focus-visible:bg-navy/55">
                    <div className="translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <h3 className="font-semibold">{work.title}</h3>
                      <p className="mt-1 text-sm text-cream/75">{work.category}</p>
                    </div>
                  </div>
                </Link>
              </li>
            </ViewTransition>
          ))}
        </ul>
      </div>
    </section>
  );
}
