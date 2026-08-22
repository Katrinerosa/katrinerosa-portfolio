import type { Metadata } from "next";
import TarotFeature from "@/components/TarotFeature";

export const metadata: Metadata = {
  title: "Draw a card | Katrine Rosa",
  description: "Draw an illustrated tarot card and receive a creative prompt.",
};

export default function TarotPage() {
  return (
    <main>
      <TarotFeature />
    </main>
  );
}
