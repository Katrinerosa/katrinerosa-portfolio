import type { Metadata } from "next";
import { ViewTransition } from "react";
import HauntedHouseHero from "@/components/HauntedHouseHero";

export const metadata: Metadata = {
  title: "Haunted House | Katrine Rosa Beck",
  description:
    "An atmospheric interactive experience combining illustration, animation, sound, and frontend development.",
};

export default function HauntedHousePage() {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <main className="bg-[#07090d] text-[#f6e4d1]">
        <HauntedHouseHero />

        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8b75]">
                About the project
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                An illustrated house brought to life
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-[#f6e4d1]/72">
              <p>
                Haunted House explores how a website can feel like a place.
                Layered visuals, looping animation, and atmospheric sound turn
                the screen into an environment the visitor can step into.
              </p>
              <p>
                The project combines visual storytelling with frontend
                development. Every detail supports the same mood—from the
                illustrated setting and restrained colour palette to movement,
                pacing, and interaction.
              </p>

              <dl className="grid gap-6 border-t border-[#f6e4d1]/15 pt-8 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[#f6e4d1]/45">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm text-[#f6e4d1]">
                    Design & development
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[#f6e4d1]/45">
                    Focus
                  </dt>
                  <dd className="mt-2 text-sm text-[#f6e4d1]">
                    Storytelling & motion
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[#f6e4d1]/45">
                    Medium
                  </dt>
                  <dd className="mt-2 text-sm text-[#f6e4d1]">
                    Interactive web
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl overflow-hidden border border-[#f6e4d1]/15 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <video
              className="block aspect-video w-full object-cover"
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="metadata"
              poster="/projects/haunted-house/fb-hauntedhouse.jpg"
              aria-label="Preview of the Haunted House project"
            >
              <source
                src="/projects/haunted-house/preview.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
