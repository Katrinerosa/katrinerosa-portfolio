import Image from "next/image";
import wulfricNight from "@/images/wulfric-dark-knight.png";
import type { Locale } from "@/lib/locale";

const copy = {
  da: {
    title: "Webdesigner, frontendudvikler og illustrator.",
    description:
      "Jeg skaber digitale verdener, hvor kode, illustration og fortælling mødes.",
  },
  en: {
    title: "Web designer, frontend developer, and illustrator.",
    description:
      "I create digital worlds where code, illustration, and storytelling meet.",
  },
};

export default function Hero({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <section className="relative isolate h-[clamp(30rem,62svh,44rem)] overflow-hidden bg-[#101522] lg:h-[clamp(34rem,62svh,52rem)]">
      <Image
        src={wulfricNight}
        alt=""
        fill
        priority
        quality={100}
        aria-hidden="true"
        className="object-cover object-[67%_center] brightness-[1.02] contrast-[1.22] saturate-[1.18] sm:object-[72%_center] sm:brightness-100 sm:contrast-[1.12] sm:saturate-[1.08] lg:scale-[1.015] lg:object-center"
        sizes="100vw"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,23,0.94)_0%,rgba(7,11,23,0.68)_42%,rgba(7,11,23,0.12)_100%),linear-gradient(180deg,rgba(11,16,31,0.04)_38%,rgba(5,8,17,0.78)_100%)] sm:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(7,11,23,0.96)_0%,rgba(7,11,23,0.78)_32%,rgba(7,11,23,0.28)_62%,rgba(7,11,23,0.08)_100%),linear-gradient(180deg,rgba(11,16,31,0.08)_48%,rgba(5,8,17,0.82)_100%)] sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_68%_35%,rgba(122,142,211,0.16)_0%,rgba(70,89,153,0.08)_25%,transparent_47%)] mix-blend-screen sm:bg-[radial-gradient(circle_at_70%_39%,rgba(142,162,222,0.2)_0%,rgba(81,101,167,0.1)_24%,transparent_48%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070b15]/80 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-7xl items-center px-6 sm:min-h-[58svh] lg:min-h-[62svh] lg:px-8">
        <div className="relative max-w-2xl text-white before:absolute before:-left-5 before:top-1 before:h-24 before:w-px before:bg-gradient-to-b before:from-white/55 before:to-transparent before:shadow-[0_0_18px_rgba(255,255,255,0.25)] sm:before:-left-7">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/70 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            Katrine Rosa Beck
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.72)] sm:text-5xl lg:text-6xl">
            {text.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/82 drop-shadow-[0_2px_14px_rgba(0,0,0,0.72)] sm:text-xl">
            {text.description}
          </p>
        </div>
      </div>
    </section>
  );
}
