import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import TarotPreview from "@/components/TarotPreview";
import IllustrationPreview from "@/components/IllustrationPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { ViewTransition } from "react";

export default function Home() {
  return (
    <>
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
          <Hero />
          <SelectedWork />
          <TarotPreview />
          <IllustrationPreview />
          <About />
          <Contact />
        </main>
      </ViewTransition>
    </>
  );
}
