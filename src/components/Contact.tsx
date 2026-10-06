"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/locale";

const contactLinks = {
  en: [
  { label: "Get in touch", className: "bg-navy text-cream" },
  { label: "Have a world in mind?", className: "bg-coral text-navy" },
  { label: "Let’s make it real", className: "bg-turquoise text-navy" },
  { label: "Start a project", className: "bg-peach text-navy" },
  { label: "Say hello", className: "bg-[#d8eee8] text-navy" },
  { label: "Write to me", className: "bg-[#a54f60] text-cream" },
  { label: "I have cake", className: "bg-cream text-navy" },
  { label: "Coffee?", className: "bg-turquoise text-navy" },
  { label: "Lots of coffee", className: "bg-coral text-navy" },
  { label: "Build something strange", className: "bg-[#fbdc4d] text-navy" },
  { label: "Tell me your idea", className: "bg-[#d8eee8] text-navy" },
  { label: "Make it magical", className: "bg-[#a54f60] text-cream" },
  ],
  da: [
    { label: "Tag kontakt", className: "bg-navy text-cream" },
    { label: "Har du en verden i tankerne?", className: "bg-coral text-navy" },
    { label: "Lad os gøre den virkelig", className: "bg-turquoise text-navy" },
    { label: "Start et projekt", className: "bg-peach text-navy" },
    { label: "Sig hej", className: "bg-[#d8eee8] text-navy" },
    { label: "Skriv til mig", className: "bg-[#a54f60] text-cream" },
    { label: "Jeg har kage", className: "bg-cream text-navy" },
    { label: "Kaffe?", className: "bg-turquoise text-navy" },
    { label: "Masser af kaffe", className: "bg-coral text-navy" },
    { label: "Byg noget mærkeligt", className: "bg-[#fbdc4d] text-navy" },
    { label: "Fortæl mig din idé", className: "bg-[#d8eee8] text-navy" },
    { label: "Gør det magisk", className: "bg-[#a54f60] text-cream" },
  ],
};

const desktopAnchors = [
  [0.16, 0.18], [0.39, 0.14], [0.62, 0.18], [0.84, 0.15],
  [0.15, 0.5], [0.39, 0.46], [0.62, 0.51], [0.85, 0.47],
  [0.17, 0.81], [0.4, 0.77], [0.63, 0.82], [0.83, 0.78],
];

const mobileAnchors = [
  [0.26, 0.08], [0.74, 0.08],
  [0.26, 0.25], [0.74, 0.25],
  [0.26, 0.42], [0.74, 0.42],
  [0.26, 0.59], [0.74, 0.59],
  [0.26, 0.76], [0.74, 0.76],
  [0.26, 0.93], [0.74, 0.93],
];

type Bubble = {
  element: HTMLAnchorElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  anchorX: number;
  anchorY: number;
  radius: number;
  halfWidth: number;
  halfHeight: number;
};

export default function Contact({ locale }: { locale: Locale }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const links = contactLinks[locale];

  useEffect(() => {
    const field = fieldRef.current;
    const elements = bubbleRefs.current.filter(
      (element): element is HTMLAnchorElement => element !== null,
    );
    if (!field || elements.length !== links.length) return;

    let frameId = 0;
    let pointer: { x: number; y: number } | null = null;
    let bubbles: Bubble[] = [];

    const layout = () => {
      const bounds = field.getBoundingClientRect();
      const anchors = bounds.width < 760 ? mobileAnchors : desktopAnchors;
      bubbles = elements.map((element, index) => {
        const anchorX = bounds.width * anchors[index][0];
        const anchorY = bounds.height * anchors[index][1];
        const previous = bubbles[index];
        return {
          element,
          x: previous?.x ?? anchorX,
          y: previous?.y ?? anchorY,
          vx: previous?.vx ?? 0,
          vy: previous?.vy ?? 0,
          anchorX,
          anchorY,
          radius: Math.max(element.offsetWidth * 0.4, 50),
          halfWidth: element.offsetWidth / 2 + 5,
          halfHeight: element.offsetHeight / 2 + 5,
        };
      });
    };

    const movePointer = (event: PointerEvent) => {
      const bounds = field.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };
    const clearPointer = () => { pointer = null; };

    const positionBubble = (bubble: Bubble) => {
      const halfWidth = bubble.element.offsetWidth / 2;
      const halfHeight = bubble.element.offsetHeight / 2;
      bubble.element.style.transform = `translate3d(${bubble.x - halfWidth}px, ${bubble.y - halfHeight}px, 0)`;
    };

    const animate = () => {
      const bounds = field.getBoundingClientRect();

      for (const bubble of bubbles) {
        const isHovered = bubble.element.matches(":hover");

        if (isHovered) {
          bubble.vx *= 0.72;
          bubble.vy *= 0.72;
        } else {
          bubble.vx += (bubble.anchorX - bubble.x) * 0.0008;
          bubble.vy += (bubble.anchorY - bubble.y) * 0.0008;
        }

        if (pointer && !isHovered) {
          const dx = bubble.x - pointer.x;
          const dy = bubble.y - pointer.y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const reach = bubble.radius + 22;
          if (distance < reach) {
            const force = Math.min((reach - distance) * 0.0032, 0.22);
            bubble.vx += (dx / distance) * force;
            bubble.vy += (dy / distance) * force;
          }
        }
      }

      for (const bubble of bubbles) {
        bubble.vx *= 0.975;
        bubble.vy *= 0.975;
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
      }

      for (let pass = 0; pass < 3; pass += 1) {
        for (let i = 0; i < bubbles.length; i += 1) {
          for (let j = i + 1; j < bubbles.length; j += 1) {
            const first = bubbles[i];
            const second = bubbles[j];
            const dx = second.x - first.x;
            const dy = second.y - first.y;
            const overlapX = first.halfWidth + second.halfWidth - Math.abs(dx);
            const overlapY = first.halfHeight + second.halfHeight - Math.abs(dy);

            if (overlapX > 0 && overlapY > 0) {
              if (overlapX < overlapY) {
                const direction = dx >= 0 ? 1 : -1;
                const correction = overlapX / 2 + 0.5;
                first.x -= direction * correction;
                second.x += direction * correction;
                first.vx -= direction * 0.18;
                second.vx += direction * 0.18;
              } else {
                const direction = dy >= 0 ? 1 : -1;
                const correction = overlapY / 2 + 0.5;
                first.y -= direction * correction;
                second.y += direction * correction;
                first.vy -= direction * 0.18;
                second.vy += direction * 0.18;
              }
            }
          }
        }

        for (const bubble of bubbles) {
          bubble.x = Math.min(
            Math.max(bubble.x, bubble.halfWidth),
            bounds.width - bubble.halfWidth,
          );
          bubble.y = Math.min(
            Math.max(bubble.y, bubble.halfHeight),
            bounds.height - bubble.halfHeight,
          );
        }
      }

      for (const bubble of bubbles) {
        positionBubble(bubble);
      }
      frameId = requestAnimationFrame(animate);
    };

    layout();
    field.addEventListener("pointermove", movePointer);
    field.addEventListener("pointerleave", clearPointer);
    window.addEventListener("resize", layout);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bubbles.forEach(positionBubble);
    } else {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frameId);
      field.removeEventListener("pointermove", movePointer);
      field.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("resize", layout);
    };
  }, [links]);

  return (
    <section id="contact" className="overflow-hidden px-6 py-24 text-center sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl">
          {locale === "da" ? "Har du en verden i tankerne?" : "Have a world in mind?"}
        </h2>
        <p className="mt-5 text-lg text-muted">
          {locale === "da"
            ? "Bevæg dig gennem idéerne — eller klik på en for at sige hej."
            : "Move through the ideas — or click one to say hello."}
        </p>
        <div
          ref={fieldRef}
          className="relative mx-auto mt-6 h-[42rem] max-w-3xl touch-none md:h-96"
          aria-label="Contact links"
        >
          {links.map((link, index) => (
            <a
              key={link.label}
              ref={(element) => { bubbleRefs.current[index] = element; }}
              href="mailto:hej@katrinerosa.com"
              className={`absolute left-0 top-0 inline-flex min-h-14 select-none items-center justify-center whitespace-nowrap rounded-full border border-[#1a3b5d] px-7 py-3 text-sm font-semibold shadow-[4px_5px_0_rgb(26_59_93_/_0.22)] will-change-transform hover:ring-2 hover:ring-navy/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy ${link.className}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
