import Image from "next/image";
import Link from "next/link";
import witch from "@/images/the-witch-17.png";
import wulfric from "@/images/wulfric-dark-knight.png";
import lunaAmira from "@/images/luna-amira.png";
import halloweenSchool from "@/images/halloween-in-school-luna-amira.png";
import type { Locale } from "@/lib/locale";

const previewImages = [
  {
    src: witch,
    alt: "Luna and the Witch",
    className: "md:col-span-2 md:row-span-2",
    sizes: "(max-width: 767px) 50vw, (max-width: 1280px) 50vw, 624px",
  },
  { src: wulfric, alt: "Wulfric at night", className: "", sizes: "(max-width: 768px) 50vw, 25vw" },
  { src: lunaAmira, alt: "Luna and Amira", className: "", sizes: "(max-width: 768px) 50vw, 25vw" },
  { src: halloweenSchool, alt: "Luna and Amira at Halloween in school", className: "", sizes: "(max-width: 768px) 50vw, 25vw" },
  { src: "/luna-wulfric-by-the-fire-hero.png", alt: "Luna and Wulfric by the fire", className: "", sizes: "(max-width: 768px) 50vw, 25vw" },
];

export default function IllustrationPreview({ locale }: { locale: Locale }) {
  const isDanish = locale === "da";
  return (
    <section id="illustration" className="bg-surface px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-5xl">
              {isDanish ? "Illustrerede verdener" : "Illustrated worlds"}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted">
              {isDanish
                ? "Karakterer, mystiske steder og historier tegnet fra fantasien."
                : "Characters, mysterious places, and stories drawn from imagination."}
            </p>
          </div>
          <Link href="/gallery" className="group text-sm font-semibold text-foreground">
            {isDanish ? "Se alle illustrationer" : "Explore all illustrations"}{" "}
            <span className="inline-block transition group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid auto-rows-[12rem] grid-cols-2 gap-3 md:grid-cols-4">
          {previewImages.map((image) => (
            <figure key={image.alt} className={`group relative overflow-hidden bg-navy ${image.className}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={90}
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
                sizes={image.sizes}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
