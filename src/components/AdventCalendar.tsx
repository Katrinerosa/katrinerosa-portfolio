"use client";

import Image from "next/image";
import { useState } from "react";

type DoorMedia = {
  day: number;
  src: string;
  type: "image" | "video";
};

const doorMedia: DoorMedia[] = [
  { day: 1, src: "/projects/advent-calendar/doors/day-01.mp4", type: "video" },
  { day: 2, src: "/projects/advent-calendar/doors/day-02.mp4", type: "video" },
  { day: 3, src: "/projects/advent-calendar/doors/day-03.mp4", type: "video" },
  { day: 4, src: "/projects/advent-calendar/doors/day-04.mp4", type: "video" },
  { day: 5, src: "/projects/advent-calendar/doors/day-05.mp4", type: "video" },
  { day: 6, src: "/projects/advent-calendar/doors/day-06.mp4", type: "video" },
  { day: 7, src: "/projects/advent-calendar/doors/day-07.mp4", type: "video" },
  { day: 8, src: "/projects/advent-calendar/doors/day-08.mp4", type: "video" },
  { day: 9, src: "/projects/advent-calendar/doors/day-09.webp", type: "image" },
  { day: 10, src: "/projects/advent-calendar/doors/day-10.mp4", type: "video" },
  { day: 11, src: "/projects/advent-calendar/doors/day-11.webp", type: "image" },
  { day: 12, src: "/projects/advent-calendar/doors/day-12.mp4", type: "video" },
  { day: 13, src: "/projects/advent-calendar/doors/day-13.webp", type: "image" },
  { day: 14, src: "/projects/advent-calendar/doors/day-14.mp4", type: "video" },
  { day: 15, src: "/projects/advent-calendar/doors/day-15.mp4", type: "video" },
  { day: 16, src: "/projects/advent-calendar/doors/day-16.mp4", type: "video" },
  { day: 17, src: "/projects/advent-calendar/doors/day-17.webp", type: "image" },
  { day: 18, src: "/projects/advent-calendar/doors/day-18.mp4", type: "video" },
  { day: 19, src: "/projects/advent-calendar/doors/day-19.mp4", type: "video" },
  { day: 20, src: "/projects/advent-calendar/doors/day-20.mp4", type: "video" },
  { day: 21, src: "/projects/advent-calendar/doors/day-21.webp", type: "image" },
  { day: 22, src: "/projects/advent-calendar/doors/day-22.webp", type: "image" },
  { day: 23, src: "/projects/advent-calendar/doors/day-23.mp4", type: "video" },
  { day: 24, src: "/projects/advent-calendar/doors/day-24.mp4", type: "video" },
];

const snowflakes = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${-((index * 1.7) % 12)}s`,
  duration: `${8 + (index % 7)}s`,
  size: `${10 + (index % 5) * 3}px`,
}));

export default function AdventCalendar() {
  const [openDoors, setOpenDoors] = useState<Set<number>>(() => new Set());

  const toggleDoor = (day: number) => {
    setOpenDoors((current) => {
      const next = new Set(current);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#0b0f14] px-4 py-16 text-white sm:px-6 sm:py-20">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src="/projects/advent-calendar/background-desktop.mp4"
          type="video/mp4"
        />
      </video>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {snowflakes.map((flake) => (
          <span
            key={flake.id}
            className="advent-snowflake"
            style={{
              left: flake.left,
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              fontSize: flake.size,
            }}
          >
            {flake.id % 5 === 0 ? "✦" : "❄"}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-10 max-w-2xl text-center drop-shadow-[0_3px_12px_rgb(0_0_0_/_0.8)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#92d5f6]">
            24 små verdener
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            Julekalender
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/75 sm:text-base">
            Åbn en låge og find illustrationer, animationer og små magiske øjeblikke.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
          {doorMedia.map((door) => {
            const isOpen = openDoors.has(door.day);
            return (
              <button
                key={door.day}
                type="button"
                onClick={() => toggleDoor(door.day)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Luk" : "Åbn"} låge ${door.day}`}
                className={`advent-door ${isOpen ? "is-open" : ""}`}
              >
                <span className="advent-door-content">
                  {door.type === "video" ? (
                    <video
                      src={door.src}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={door.src}
                      alt={`Illustration bag låge ${door.day}`}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover"
                    />
                  )}
                </span>
                <span className="advent-door-flap" aria-hidden="true">
                  <span>{door.day}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-white/55">
          Klik på en åben låge igen for at lukke den.
        </p>
      </div>
    </main>
  );
}
