import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-[#d8eee8] px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[0.75fr_1.25fr]">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full bg-[#f8e2d7]">
          <Image
            src="/cards/girl-w-glasses.png"
            alt="Illustration af Katrine Rosa Beck med briller"
            fill
            sizes="(min-width: 768px) 384px, min(100vw - 48px, 384px)"
            className="object-cover mix-blend-multiply"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a54f60]">
            About
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-navy sm:text-6xl">
            Code meets illustration.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/70">
            I&apos;m Katrine Rosa Beck, a frontend developer and illustrator
            creating digital experiences with atmosphere, personality, and
            purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
