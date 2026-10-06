import type { Metadata } from "next";
import TarotFeature from "@/components/TarotFeature";

export const metadata: Metadata = {
  title: "Tarot | Katrine Rosa",
  description:
    "Draw a tarot card or reveal a three-card reading for past, present, and future.",
  alternates: {
    canonical: "/en/tarot",
    languages: { da: "/tarot", en: "/en/tarot" },
  },
  openGraph: {
    title: "Tarot | Katrine Rosa",
    description:
      "Draw a tarot card or reveal a three-card reading for past, present, and future.",
    type: "website",
  },
};

export default function EnglishTarotPage() {
  return (
    <main>
      <TarotFeature locale="en" />
    </main>
  );
}
