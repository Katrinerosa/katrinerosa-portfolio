"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new Event("themechange"));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("themechange", onChange);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener("themechange", onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    () => document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    () => "light",
  );

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  const nextThemeLabel = theme === "dark" ? "lyst" : "mørkt";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Skift til ${nextThemeLabel} tema`}
      title={`Skift til ${nextThemeLabel} tema`}
    >
      <svg className="theme-toggle__sun" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="theme-toggle__moon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
      </svg>
    </button>
  );
}
