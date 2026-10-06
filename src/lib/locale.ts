export type Locale = "da" | "en";

export function isEnglishPath(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function languageSwitchPath(pathname: string) {
  if (pathname === "/tarot") return "/en/tarot";
  if (pathname === "/en/tarot") return "/tarot";
  if (isEnglishPath(pathname)) return "/";
  return "/en";
}
