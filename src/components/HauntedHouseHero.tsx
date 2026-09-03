"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HauntedHouseHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const darknessRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrolled = Math.max(0, -section.getBoundingClientRect().top);
      const fadeDistance = Math.max(window.innerHeight * 0.55, 320);
      setScrollProgress(Math.min(1, scrolled / fadeDistance));
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  function moveLight(event: React.PointerEvent<HTMLElement>) {
    const darkness = darknessRef.current;
    if (!darkness) return;

    const bounds = darkness.getBoundingClientRect();
    darkness.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
    darkness.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={moveLight}
      className="relative h-[180vh] bg-black"
    >
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/projects/haunted-house/fb-hauntedhouse.jpg"
          aria-label="Animated scene from the Haunted House experience"
        >
          <source
            src="/projects/haunted-house/background.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,13,0.18),rgba(7,9,13,0.9))]" />

        <div
          className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-10 will-change-[opacity,transform] sm:py-14"
          style={{
            opacity: 1 - scrollProgress,
            transform: `translateY(${-scrollProgress * 28}px)`,
            pointerEvents: scrollProgress > 0.85 ? "none" : "auto",
          }}
        >
          <Link
            href="/#work"
            transitionTypes={["nav-back"]}
            className="w-fit border-b border-[#f6e4d1]/40 pb-1 text-sm font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[#f6e4d1]"
          >
            ← Back to selected work
          </Link>

          <div className="max-w-4xl pb-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8b75] sm:text-sm">
              Interactive experience · Illustration · Animation · Sound
            </p>
            <h1 className="text-6xl font-semibold tracking-[-0.06em] sm:text-8xl lg:text-[9rem] lg:leading-[0.86]">
              Haunted House
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#f6e4d1]/78 sm:text-xl">
              A dark and playful digital world where illustration, motion,
              sound, and code come together to turn exploration into a story.
            </p>
          </div>
        </div>

        <div
          ref={darknessRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0 will-change-[opacity]"
          style={{
            opacity: scrollProgress,
            WebkitMaskImage:
              "radial-gradient(circle 170px at var(--light-x, 50%) var(--light-y, 50%), transparent 0%, transparent 42%, rgba(0,0,0,0.45) 68%, black 100%)",
            maskImage:
              "radial-gradient(circle 170px at var(--light-x, 50%) var(--light-y, 50%), transparent 0%, transparent 42%, rgba(0,0,0,0.45) 68%, black 100%)",
          }}
        />
      </div>
    </section>
  );
}
