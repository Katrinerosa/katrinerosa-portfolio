import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Katrine Rosa Beck | Frontend developer and illustrator",
  description:
    "Digital worlds where frontend development, illustration, and storytelling meet.",
  alternates: {
    canonical: "/en",
    languages: { da: "/", en: "/en" },
  },
};

export default function EnglishHomePage() {
  return <HomePageContent locale="en" />;
}
