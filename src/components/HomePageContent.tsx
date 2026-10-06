import { ViewTransition } from "react";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import TarotPreview from "@/components/TarotPreview";
import IllustrationPreview from "@/components/IllustrationPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import type { Locale } from "@/lib/locale";

export default function HomePageContent({ locale }: { locale: Locale }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "fade-in",
        "nav-back": "fade-in",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <main>
        <Hero locale={locale} />
        <SelectedWork locale={locale} />
        <TarotPreview locale={locale} />
        <IllustrationPreview locale={locale} />
        <About locale={locale} />
        <Contact locale={locale} />
      </main>
    </ViewTransition>
  );
}
