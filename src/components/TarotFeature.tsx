"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { loadTarotImage, prepareTarotCard } from "@/lib/tarot-images";
import { tarotDeck, type TarotCard } from "@/data/tarot";
import type { Locale } from "@/lib/locale";

type ReadingMode = "single" | "spread";
type CardTurn = { timer?: ReturnType<typeof setTimeout> };

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
    loading: "Henter kortets illustration…",
    soundOn: "Papirlyd: til",
    soundOff: "Papirlyd: fra",
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
    loading: "Preparing the card illustration…",
    soundOn: "Paper sound: on",
    soundOff: "Paper sound: off",
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
  busy = false,
  loading = false,
  locale,
}: {
  card: TarotCard | null;
  flipped: boolean;
  label?: string;
  onClick: () => void;
  priority?: boolean;
  busy?: boolean;
  loading?: boolean;
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
        disabled={busy}
        aria-busy={loading}
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
              src="/cards/optimized/tarot_front.webp"
              alt=""
              fill
              preload={priority}
              unoptimized
              sizes="(max-width: 640px) 280px, 300px"
              className="tarot-flip-card__image"
            />
          </span>

          <span className="tarot-flip-card__side tarot-flip-card__front">
            {card?.image ? (
              <Image
                src={card.image}
                unoptimized
                loading="eager"
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
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const activeTurn = useRef<CardTurn | null>(null);
  const paperSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only prepare the next draw, never download the entire deck on arrival.
    deck.slice(0, mode === "single" ? 1 : 3).forEach((card) => {
      if (card.image) void loadTarotImage(card.image);
    });
  }, [deck, mode]);

  useEffect(() => {
    const audio = paperSound.current;
    return () => {
      clearTimeout(activeTurn.current?.timer);
      activeTurn.current = null;
      audio?.pause();
    };
  }, []);

  function playPaperSound() {
    if (!soundEnabled) return;
    const audio = paperSound.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.currentTime = 0;
    // Called directly by a user gesture. A browser's audio policy is respected.
    void audio.play().catch(() => {});
  }

  function startTurn() {
    if (activeTurn.current) return null;
    const turn: CardTurn = {};
    activeTurn.current = turn;
    setBusy(true);
    playPaperSound();
    return turn;
  }

  function finishTurn(turn: CardTurn) {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 850;
    turn.timer = setTimeout(() => {
      if (activeTurn.current !== turn) return;
      activeTurn.current = null;
      setBusy(false);
    }, duration);
  }

  function takeCards(amount: number) {
    const availableCards = deck.length < amount ? shuffle(tarotDeck) : deck;
    const drawnCards = availableCards.slice(0, amount);
    setDeck(availableCards.slice(amount));
    return drawnCards;
  }

  async function handleSingleCard() {
    const turn = startTurn();
    if (!turn) return;
    if (singleFlipped) {
      setSingleFlipped(false);
      finishTurn(turn);
      return;
    }

    setLoading(true);
    const [drawnCard] = takeCards(1);
    const prepared = await prepareTarotCard(drawnCard);
    if (activeTurn.current !== turn) return;
    setSingleCard(prepared);
    setLoading(false);
    setSingleFlipped(true);
    finishTurn(turn);
  }

  function openSpread() {
    if (activeTurn.current) return;
    playPaperSound();
    setMode("spread");
    setSpread(takeCards(3));
    setSpreadFlipped([false, false, false]);
  }

  function openSingleReading() {
    // A late image decode must not update a spread that the reader has left.
    clearTimeout(activeTurn.current?.timer);
    activeTurn.current = null;
    setBusy(false);
    setLoading(false);
    playPaperSound();
    setMode("single");
    setSingleCard(null);
    setSingleFlipped(false);
  }

  function refreshSpread() {
    if (activeTurn.current) return;
    playPaperSound();
    setSpread(takeCards(3));
    setSpreadFlipped([false, false, false]);
  }

  async function toggleSpreadCard(index: number) {
    const turn = startTurn();
    if (!turn) return;
    if (!spreadFlipped[index]) {
      setLoading(true);
      const prepared = await prepareTarotCard(spread[index]);
      if (activeTurn.current !== turn) return;
      setSpread((current) => current.map((card, cardIndex) => cardIndex === index ? prepared : card));
      setLoading(false);
    }
    setSpreadFlipped((current) => current.map((isFlipped, cardIndex) => cardIndex === index ? !isFlipped : isFlipped));
    finishTurn(turn);
  }

  function resetDeck() {
    if (activeTurn.current) return;
    playPaperSound();
    const shuffled = shuffle(tarotDeck);
    setDeck(mode === "spread" ? shuffled.slice(3) : shuffled);
    setSingleCard(null);
    setSingleFlipped(false);
    setSpread(mode === "spread" ? shuffled.slice(0, 3) : []);
    setSpreadFlipped([false, false, false]);
  }

  return (
    <section className="tarot-experience tarot-classic">
      <div className="tarot-stars" aria-hidden="true" />
      <audio ref={paperSound} src="/sounds/paper-turn.wav" preload="none" aria-hidden="true" />

      <div className="tarot-classic__shell">
        <header className="tarot-classic__intro">
          <p>{text.eyebrow}</p>
          <h1>Tarot</h1>
          <span>{text.intro}</span>
        </header>

        <div className="tarot-classic__actions">
          {mode === "single" ? (
            <button type="button" onClick={openSpread} disabled={busy}>
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
              busy={busy}
              loading={loading}
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
                busy={busy}
                loading={loading}
              />
            ))}
          </div>
        )}

        <p className="tarot-loading-status" role="status">{loading ? text.loading : ""}</p>

        <div className="tarot-classic__footer-actions">
          {mode === "spread" && (
            <button type="button" onClick={refreshSpread} disabled={busy}>
              {text.newSpread}
            </button>
          )}
          <button type="button" onClick={resetDeck} disabled={busy}>
            {text.shuffle}
          </button>
          <button type="button" aria-pressed={soundEnabled} onClick={() => {
            if (soundEnabled) paperSound.current?.pause();
            setSoundEnabled((enabled) => !enabled);
          }}>{soundEnabled ? text.soundOn : text.soundOff}</button>
          <p>{text.remaining(deck.length)}</p>
        </div>
      </div>
    </section>
  );
}
