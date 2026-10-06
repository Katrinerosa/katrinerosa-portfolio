import type { Metadata } from "next";
import TarotFeature from "@/components/TarotFeature";

export const metadata: Metadata = {
  title: "Tarot | Katrine Rosa",
  description:
    "Træk et tarotkort eller læg tre kort for fortid, nutid og fremtid.",
  alternates: {
    canonical: "/tarot",
    languages: { da: "/tarot", en: "/en/tarot" },
  },
  openGraph: {
    title: "Tarot | Katrine Rosa",
    description:
      "Træk et tarotkort eller læg tre kort for fortid, nutid og fremtid.",
    type: "website",
  },
};

export default function TarotPage() {
  return (
    <main>
      <TarotFeature />
    </main>
  );
}
