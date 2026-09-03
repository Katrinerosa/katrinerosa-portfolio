import Image from "next/image";
import wulfricNight from "@/images/wulfric-dark-knight.png";

export default function Hero() {
  return (
    <section className="relative h-[clamp(30rem,62svh,44rem)] overflow-hidden bg-[#191d2b] lg:h-[clamp(34rem,62svh,52rem)]">
      <Image
        src={wulfricNight}
        alt=""
        fill
        priority
        aria-hidden="true"
        className="object-cover object-[72%_center] lg:object-center"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-7xl items-center px-6 sm:min-h-[58svh] lg:min-h-[62svh] lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/60">
            Katrine Rosa Beck
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Frontend developer, illustrator, and founder.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
            I create digital worlds where code, illustration, and storytelling
            meet.
          </p>
        </div>
      </div>
    </section>
  );
}