"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import SocialLinks from "@/components/SocialLinks";
import { useLocale } from "@/lib/use-locale";

export default function Footer() {
  const pathname = usePathname();
  const locale = useLocale(pathname);
  const isEnglish = locale === "en";
  const homePath = isEnglish ? "/en" : "/";
  return (
    <footer className="overflow-hidden border-t border-cream/15 bg-[#0d2947] text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.35fr_0.8fr_0.8fr] lg:gap-16">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
          <div className="relative aspect-square w-52 shrink-0 overflow-hidden rounded-[46%_54%_48%_52%/54%_43%_57%_46%] bg-peach sm:w-60">
            <Image
              src="/cards/katrine-with-glasses.png"
              alt="Illustreret portræt af Katrine Rosa Beck"
              fill
              sizes="(min-width: 640px) 240px, 208px"
              className="translate-y-2 scale-[1.14] object-cover object-[center_62%] mix-blend-multiply"
            />
          </div>

          <div>
            <p className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Katrine Rosa
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-cream/65">
              {isEnglish
                ? "Frontend developer and illustrator creating digital worlds with code, character, and storytelling."
                : "Frontendudvikler og illustrator, der skaber digitale verdener med kode, karakter og fortælling."}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-coral">
            {isEnglish ? "Contact" : "Kontakt"}
          </h2>
          <p className="mt-5 text-lg font-medium">Katrine Rosa Beck</p>
          <p className="mt-1 text-sm text-cream/60">
            {isEnglish ? "Frontend developer · Illustrator" : "Frontendudvikler · Illustrator"}
          </p>
          <a
            href="mailto:hej@katrinerosa.com"
            className="mt-5 inline-block text-sm text-cream/80 transition-colors hover:text-coral"
          >
            hej@katrinerosa.com
          </a>
          <SocialLinks locale={locale} variant="footer" />
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-coral">
            {isEnglish ? "Explore" : "Udforsk"}
          </h2>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-cream/70">
            <Link href={`${homePath}#work`} className="transition-colors hover:text-coral">
              {isEnglish ? "Work" : "Projekter"}
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-coral">
              {isEnglish ? "Illustration" : "Illustrationer"}
            </Link>
            <Link href={isEnglish ? "/en/tarot" : "/tarot"} className="transition-colors hover:text-coral">Tarot</Link>
          </div>
        </nav>
      </div>

      <div className="border-t border-cream/15 bg-cream/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Katrine Rosa Beck</span>
          <div className="flex items-center gap-4">
            <CookieSettingsButton locale={locale} />
            <span>Frontend · Illustration · Storytelling</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
