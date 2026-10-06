"use client";

import { openCookieSettings } from "@/components/GoogleAnalytics";
import type { Locale } from "@/lib/locale";

export default function CookieSettingsButton({ locale = "da" }: { locale?: Locale }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="transition-colors hover:text-cream"
    >
      {locale === "da" ? "Cookieindstillinger" : "Cookie settings"}
    </button>
  );
}
