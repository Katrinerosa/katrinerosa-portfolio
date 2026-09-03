"use client";

import { useEffect, useRef } from "react";

const contactLinks = [
  { label: "Get in touch", className: "bg-navy text-cream" },
  { label: "Have a world in mind?", className: "bg-coral text-navy" },
  { label: "Let’s make it real", className: "bg-turquoise text-navy" },
  { label: "Start a project", className: "bg-peach text-navy" },
  { label: "Say hello", className: "bg-[#d8eee8] text-navy" },
  { label: "Write to me", className: "bg-[#a54f60] text-cream" },
  { label: "I have cake", className: "bg-cream text-navy" },
  { label: "Coffee?", className: "bg-turquoise text-navy" },
  { label: "Lots of coffee", className: "bg-coral text-navy" },
];

const desktopAnchors = [
  [0.2, 0.2], [0.5, 0.17], [0.78, 0.21],
  [0.16, 0.5], [0.47, 0.47], [0.78, 0.5],
  [0.23, 0.78], [0.52, 0.76], [0.8, 0.79],
];

const mobileAnchors = [
  [0.25, 0.1], [0.7, 0.1], [0.23, 0.3],
  [0.69, 0.29], [0.28, 0.49], [0.72, 0.48],
  [0.23, 0.68], [0.69, 0.68], [0.48, 0.88],
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
};

export default function Contact() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const field = fieldRef.current;
    const elements = bubbleRefs.current.filter(
      (element): element is HTMLAnchorElement => element !== null,
    );
    if (!field || elements.length !== contactLinks.length) return;

    let frameId = 0;
    let pointer: { x: number; y: number } | null = null;
    let bubbles: Bubble[] = [];

    const layout = () => {
      const bounds = field.getBoundingClientRect();
      const anchors = bounds.width < 600 ? mobileAnchors : desktopAnchors;
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
        bubble.vx += (bubble.anchorX - bubble.x) * 0.012;
        bubble.vy += (bubble.anchorY - bubble.y) * 0.012;
        if (pointer) {
          const dx = bubble.x - pointer.x;
          const dy = bubble.y - pointer.y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const reach = bubble.radius + 85;
          if (distance < reach) {
            const force = (reach - distance) * 0.018;
            bubble.vx += (dx / distance) * force;
            bubble.vy += (dy / distance) * force;
          }
        }
      }

      for (let i = 0; i < bubbles.length; i += 1) {
        for (let j = i + 1; j < bubbles.length; j += 1) {
          const first = bubbles[i];
          const second = bubbles[j];
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const minimum = first.radius + second.radius;
          if (distance < minimum) {
            const push = (minimum - distance) * 0.028;
            const nx = dx / distance;
            const ny = dy / distance;
            first.vx -= nx * push;
            first.vy -= ny * push;
            second.vx += nx * push;
            second.vy += ny * push;
          }
        }
      }

      for (const bubble of bubbles) {
        bubble.vx *= 0.88;
        bubble.vy *= 0.88;
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        const halfWidth = bubble.element.offsetWidth / 2;
        const halfHeight = bubble.element.offsetHeight / 2;
        bubble.x = Math.min(Math.max(bubble.x, halfWidth), bounds.width - halfWidth);
        bubble.y = Math.min(Math.max(bubble.y, halfHeight), bounds.height - halfHeight);
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
  }, []);

  return (
    <section id="contact" className="overflow-hidden px-6 py-24 text-center sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-semibold tracking-[-0.045em] text-navy sm:text-6xl">
          Have a world in mind?
        </h2>
        <p className="mt-5 text-lg text-navy/65">
          Move through the ideas — or click one to say hello.
        </p>
        <div
          ref={fieldRef}
          className="relative mx-auto mt-8 h-[34rem] max-w-3xl touch-none sm:h-80"
          aria-label="Contact links"
        >
          {contactLinks.map((link, index) => (
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
