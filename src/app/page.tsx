import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Katrine Rosa Beck | Frontendudvikler og illustrator",
  description:
    "Digitale verdener, hvor frontendudvikling, illustration og fortælling mødes.",
  alternates: {
    canonical: "/",
    languages: { da: "/", en: "/en" },
  },
};

export default function Home() {
  return <HomePageContent locale="da" />;
}
