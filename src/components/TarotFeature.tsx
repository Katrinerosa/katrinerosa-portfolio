"use client";

import { useState, useTransition, ViewTransition } from "react";

const cards = [
  {
    name: "The Magician",
    image: "/cards/the-magician.svg",
    message: "You already have the tools. Begin.",
  },
  {
    name: "The Star",
    image: "/cards/the-star.svg",
    message: "Follow the idea that gives you hope.",
  },
  {
    name: "The World",
    image: "/cards/the-world.svg",
    message: "Something is ready to become whole.",
  },
];

export default function TarotFeature() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  function drawCard() {
    let nextCard = Math.floor(Math.random() * cards.length);

    if (cards.length > 1 && nextCard === selectedCard) {
      nextCard = (nextCard + 1) % cards.length;
    }

    startTransition(() => {
      setSelectedCard(nextCard);
    });
  }

  const card = selectedCard === null ? null : cards[selectedCard];

  return (
    <section id="tarot" className="bg-navy px-6 py-24 text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
            Interactive storytelling
          </p>

          <h2 className="mt-4 text-4xl font-semibold sm:text-6xl">
            Draw a card
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
            Discover one of my hand-illustrated tarot cards and receive a small
            creative prompt.
          </p>

          <button
            type="button"
            onClick={drawCard}
            aria-controls="tarot-card-reveal"
            className="mt-8 rounded-full bg-coral px-6 py-3 font-semibold text-navy transition hover:-translate-y-1 hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
          >
            {card ? "Draw another card" : "Draw a card"}
          </button>
        </div>

        <div
          id="tarot-card-reveal"
          className="mx-auto flex min-h-[34rem] w-full max-w-sm items-center justify-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {card ? (
            <ViewTransition
              key={card.name}
              enter="scale-in"
              exit="scale-out"
              default="none"
            >
              <figure className="w-full">
                <img
                  src={card.image}
                  alt={`${card.name} tarot card illustrated by Katrine Rosa Beck`}
                  className="aspect-[5/8] w-full rounded-2xl object-cover shadow-2xl"
                />

                <figcaption className="mt-6 text-center">
                  <h3 className="text-2xl font-semibold">{card.name}</h3>
                  <p className="mt-2 text-cream/75">{card.message}</p>
                </figcaption>
              </figure>
            </ViewTransition>
          ) : (
            <ViewTransition exit="scale-out" default="none">
              <div className="grid aspect-[5/8] w-full place-items-center rounded-2xl border-2 border-dashed border-cream/30 bg-cream/5 p-8 text-center">
                <p className="text-cream/60">
                  Your card is waiting to be revealed.
                </p>
              </div>
            </ViewTransition>
          )}
        </div>
      </div>
    </section>
  );
}
