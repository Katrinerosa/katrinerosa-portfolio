import Image from "next/image";
import Link from "next/link";
import witch from "@/images/the-witch-17.png";
import wulfric from "@/images/wulfric-dark-knight.png";

const previewImages = [
  { src: witch, alt: "Luna and the Witch", className: "md:col-span-2 md:row-span-2" },
  { src: wulfric, alt: "Wulfric at night", className: "" },
  { src: "/cards/the-star.svg", alt: "The Star tarot card", className: "" },
  { src: "/projects/advent-calendar/doors/day-21.webp", alt: "Advent Calendar illustration", className: "" },
  { src: "/luna-wulfric-by-the-fire-hero.png", alt: "Luna and Wulfric by the fire", className: "" },
];

export default function IllustrationPreview() {
  return (
    <section id="illustration" className="bg-[#fff8ed] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-navy sm:text-5xl">
              Illustrated worlds
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-navy/70">
              Characters, mysterious places, and stories drawn from imagination.
            </p>
          </div>
          <Link href="/gallery" className="group text-sm font-semibold text-navy">
            Explore all illustrations <span className="inline-block transition group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid auto-rows-[12rem] grid-cols-2 gap-3 md:grid-cols-4">
          {previewImages.map((image) => (
            <figure key={image.alt} className={`group relative overflow-hidden bg-navy ${image.className}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
