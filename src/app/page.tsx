import Hero from "@/components/Hero";
import WorkGallery from "@/components/WorkGallery";
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
          <WorkGallery />
        </main>
      </ViewTransition>
    </>
  );
}
