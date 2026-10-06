"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { languageSwitchPath } from "@/lib/locale";
import { setLocalePreference, useLocale } from "@/lib/use-locale";

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale(pathname);
  const isEnglish = locale === "en";
  const homePath = isEnglish ? "/en" : "/";
  const tarotPath = isEnglish ? "/en/tarot" : "/tarot";

  useEffect(() => {
    document.documentElement.lang = isEnglish ? "en" : "da";
  }, [isEnglish]);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href={homePath}
          className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] hover:text-coral sm:text-sm sm:tracking-[0.15em]"
        >
          Katrine Rosa
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-3 text-[0.7rem] font-medium sm:gap-5 sm:text-sm">
            <li className="hidden sm:block">
              <Link href={`${homePath}#work`} className="hover:text-coral">
                {isEnglish ? "Work" : "Projekter"}
              </Link>
            </li>

            <li>
              <Link
                href="/gallery"
                transitionTypes={["nav-forward"]}
                className="hover:text-coral"
              >
                {isEnglish ? "Illustration" : "Illustrationer"}
              </Link>
            </li>

            <li>
              <Link href={tarotPath} className="hover:text-coral">
                Tarot
              </Link>
            </li>

            <li className="hidden md:block">
              <Link href={`${homePath}#about`} className="hover:text-coral">
                {isEnglish ? "About" : "Om"}
              </Link>
            </li>

            <li className="hidden md:block">
              <Link href={`${homePath}#contact`} className="hover:text-coral">
                {isEnglish ? "Contact" : "Kontakt"}
              </Link>
            </li>
            </ul>
          </nav>
          <Link
            href={pathname === "/" || pathname === "/tarot" || pathname.startsWith("/en") ? languageSwitchPath(pathname) : pathname}
            hrefLang={isEnglish ? "da" : "en"}
            lang={isEnglish ? "da" : "en"}
            onClick={() => setLocalePreference(isEnglish ? "da" : "en")}
            className="text-[0.68rem] font-bold tracking-[0.12em] hover:text-coral sm:text-xs"
            aria-label={isEnglish ? "Skift til dansk" : "Switch to English"}
          >
            {isEnglish ? "DA" : "EN"}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
