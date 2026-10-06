import type { Locale } from "@/lib/locale";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Katrinerosa",
    icon: (
      <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.24c-3.24.7-3.92-1.37-3.92-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.58-.29-5.3-1.29-5.3-5.69 0-1.26.45-2.29 1.2-3.09-.12-.29-.52-1.47.11-3.05 0 0 .98-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.08c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.64 1.58.24 2.76.12 3.05.75.8 1.2 1.83 1.2 3.09 0 4.42-2.73 5.39-5.32 5.68.42.36.79 1.07.79 2.16v3.27c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/katrinerosan/",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.6" cy="6.5" r="1.15" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/katrine-rosa-beck-90b5769/",
    icon: (
      <path d="M5.34 7.5H1.78V22h3.56V7.5ZM3.56 1A2.07 2.07 0 1 0 3.56 5.14 2.07 2.07 0 0 0 3.56 1ZM22 13.68c0-4.37-2.33-6.4-5.45-6.4a4.7 4.7 0 0 0-4.26 2.34V7.5H8.73V22h3.56v-7.18c0-1.89.36-3.73 2.71-3.73 2.32 0 2.35 2.17 2.35 3.85V22H22v-8.32Z" />
    ),
  },
];

export default function SocialLinks({
  locale,
  variant = "page",
}: {
  locale: Locale;
  variant?: "page" | "footer";
}) {
  const isFooter = variant === "footer";

  return (
    <nav
      aria-label={locale === "da" ? "Sociale profiler" : "Social profiles"}
      className={`flex gap-3 ${isFooter ? "mt-5" : "mt-7 justify-center"}`}
    >
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={`grid size-11 place-items-center rounded-full border transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 ${
            isFooter
              ? "border-cream/25 text-cream/75 hover:border-coral hover:bg-coral hover:text-navy focus-visible:outline-coral"
              : "border-border bg-surface text-foreground hover:border-coral hover:bg-coral hover:text-navy focus-visible:outline-coral"
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-[1.15rem]"
            fill="currentColor"
          >
            {link.icon}
          </svg>
        </a>
      ))}
    </nav>
  );
}
