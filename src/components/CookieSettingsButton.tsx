"use client";

import { openCookieSettings } from "@/components/GoogleAnalytics";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="transition-colors hover:text-cream"
    >
      Cookieindstillinger
    </button>
  );
}
