"use client";

import { useEffect, useSyncExternalStore } from "react";
import { isEnglishPath, type Locale } from "@/lib/locale";

const localeEvent = "localechange";

function explicitLocale(pathname: string): Locale | null {
  if (isEnglishPath(pathname)) return "en";
  if (pathname === "/" || pathname === "/tarot") return "da";
  return null;
}

export function setLocalePreference(locale: Locale) {
  localStorage.setItem("locale", locale);
  window.dispatchEvent(new Event(localeEvent));
}

export function useLocale(pathname: string): Locale {
  const routeLocale = explicitLocale(pathname);

  useEffect(() => {
    if (routeLocale) localStorage.setItem("locale", routeLocale);
  }, [routeLocale]);

  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener(localeEvent, onChange);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener(localeEvent, onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    () => routeLocale ?? (localStorage.getItem("locale") === "en" ? "en" : "da"),
    () => routeLocale ?? "da",
  );
}
