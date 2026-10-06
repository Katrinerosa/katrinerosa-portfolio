"use client";

import Image from "next/image";
import { useState } from "react";
import { tarotDeck, type TarotCard } from "@/data/tarot";
import type { Locale } from "@/lib/locale";

type ReadingMode = "single" | "spread";

const copy = {
  da: {
    spreadLabels: ["Fortid", "Nutid", "Fremtid"],
    turnAgain: (name: string) => `Vend ${name} om igen`,
    turnPosition: (label: string) => `Vend kortet for ${label.toLowerCase()}`,
    drawCard: "Træk og vend et tarotkort",
    illustrated: (name: string) =>
      `${name}, illustreret tarotkort af Katrine Rosa Beck`,
    eyebrow: "Træk et kort",
    intro: "Klik på kortet og se, hvad der venter dig.",
    more: "Ønsker du mere?",
    single: "Ét kort reading",
    newSpread: "Læg tre nye kort",
    shuffle: "Bland alle kort igen",
    remaining: (amount: number) => `${amount} af 78 kort tilbage`,
  },
  en: {
    spreadLabels: ["Past", "Present", "Future"],
    turnAgain: (name: string) => `Turn ${name} over again`,
    turnPosition: (label: string) => `Reveal the card for ${label.toLowerCase()}`,
    drawCard: "Draw and reveal a tarot card",
    illustrated: (name: string) =>
      `${name}, tarot card illustrated by Katrine Rosa Beck`,
    eyebrow: "Draw a card",
    intro: "Click the card and see what is waiting for you.",
    more: "Would you like more?",
    single: "One-card reading",
    newSpread: "Draw three new cards",
    shuffle: "Shuffle the full deck",
    remaining: (amount: number) => `${amount} of 78 cards remaining`,
  },
};

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function FlipCard({
  card,
  flipped,
  label,
  onClick,
  priority = false,
  locale,
}: {
  card: TarotCard | null;
  flipped: boolean;
  label?: string;
  onClick: () => void;
  priority?: boolean;
  locale: Locale;
}) {
  const text = copy[locale];
  return (
    <article className="tarot-flip-card-wrap">
      {label && <p className="tarot-position-label">{label}</p>}
      <button
        type="button"
        className={`tarot-flip-card ${flipped ? "is-flipped" : ""}`}
        onClick={onClick}
        aria-label={
          flipped && card
            ? text.turnAgain(card.name)
            : label
              ? text.turnPosition(label)
              : text.drawCard
        }
      >
        <span className="tarot-flip-card__inner">
          <span className="tarot-flip-card__side tarot-flip-card__back">
            <Image
              src="/cards/tarot_front.svg"
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 640px) 280px, 300px"
              className="tarot-flip-card__image"
            />
          </span>

          <span className="tarot-flip-card__side tarot-flip-card__front">
            {card?.image ? (
              <Image
                src={card.image}
                alt={text.illustrated(card.name)}
                fill
                sizes="(max-width: 640px) 280px, 300px"
                className="tarot-flip-card__image"
              />
            ) : (
              <span className="tarot-fallback-art" aria-hidden="true">
                <span>· ✦ ·</span>
                <span className="tarot-fallback-art__symbol">
                  {card?.symbol ?? "☾"}
                </span>
                <span>✧ · ✧</span>
              </span>
            )}

            {card && (
              <span className="tarot-card-copy">
                <span className="tarot-card-copy__family">{card.family}</span>
                <strong>{card.name}</strong>
                <span>{locale === "en" ? card.meaningEn : card.meaning}</span>
              </span>
            )}
          </span>
        </span>
      </button>
    </article>
  );
}

export default function TarotFeature({ locale = "da" }: { locale?: Locale }) {
  const text = copy[locale];
  const [mode, setMode] = useState<ReadingMode>("single");
  const [deck, setDeck] = useState(() => shuffle(tarotDeck));
  const [singleCard, setSingleCard] = useState<TarotCard | null>(null);
  const [singleFlipped, setSingleFlipped] = useState(false);
  const [spread, setSpread] = useState<TarotCard[]>([]);
  const [spreadFlipped, setSpreadFlipped] = useState([false, false, false]);

  function takeCards(amount: number) {
    const availableCards = deck.length < amount ? shuffle(tarotDeck) : deck;
    const drawnCards = availableCards.slice(0, amount);
    setDeck(availableCards.slice(amount));
    return drawnCards;
  }

  function handleSingleCard() {
    if (singleFlipped) {
      setSingleFlipped(false);
      return;
    }

    const [drawnCard] = takeCards(1);
    setSingleCard(drawnCard);
    setSingleFlipped(true);
  }

  function openSpread() {
    setMode("spread");
    setSpread(takeCards(3));
    setSpreadFlipped([false, false, false]);
  }

  function openSingleReading() {
    setMode("single");
    setSingleCard(null);
    setSingleFlipped(false);
  }

  function refreshSpread() {
    setSpread(takeCards(3));
    setSpreadFlipped([false, false, false]);
  }

  function toggleSpreadCard(index: number) {
    setSpreadFlipped((current) =>
      current.map((isFlipped, cardIndex) =>
        cardIndex === index ? !isFlipped : isFlipped,
      ),
    );
  }

  function resetDeck() {
    setDeck(shuffle(tarotDeck));
    setSingleCard(null);
    setSingleFlipped(false);
    setSpread([]);
    setSpreadFlipped([false, false, false]);
  }

  return (
    <section className="tarot-experience tarot-classic">
      <div className="tarot-stars" aria-hidden="true" />

      <div className="tarot-classic__shell">
        <header className="tarot-classic__intro">
          <p>{text.eyebrow}</p>
          <h1>Tarot</h1>
          <span>{text.intro}</span>
        </header>

        <div className="tarot-classic__actions">
          {mode === "single" ? (
            <button type="button" onClick={openSpread}>
              {text.more}
            </button>
          ) : (
            <button type="button" onClick={openSingleReading}>
              {text.single}
            </button>
          )}
        </div>

        {mode === "single" ? (
          <div className="tarot-single-reading" aria-live="polite">
            <FlipCard
              card={singleCard}
              flipped={singleFlipped}
              onClick={handleSingleCard}
              priority
              locale={locale}
            />
          </div>
        ) : (
          <div className="tarot-spread-reading" aria-live="polite">
            {spread.map((card, index) => (
              <FlipCard
                key={`${card.name}-${index}`}
                card={card}
                flipped={spreadFlipped[index]}
                label={text.spreadLabels[index]}
                onClick={() => toggleSpreadCard(index)}
                priority={index === 0}
                locale={locale}
              />
            ))}
          </div>
        )}

        <div className="tarot-classic__footer-actions">
          {mode === "spread" && (
            <button type="button" onClick={refreshSpread}>
              {text.newSpread}
            </button>
          )}
          <button type="button" onClick={resetDeck}>
            {text.shuffle}
          </button>
          <p>{text.remaining(deck.length)}</p>
        </div>
      </div>
    </section>
  );
}
