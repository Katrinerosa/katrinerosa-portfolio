import type { TarotCard } from "@/data/tarot";

const readyImages = new Map<string, Promise<boolean>>();

/** Download and decode the exact static file before exposing a card face. */
export function loadTarotImage(src: string): Promise<boolean> {
  const existing = readyImages.get(src);
  if (existing) return existing;

  const image = new window.Image();
  image.decoding = "async";
  image.src = src;
  const promise = new Promise<boolean>((resolve) => {
    // A failed or stalled download must never leave the controls locked.
    const timeout = setTimeout(() => resolve(false), 8000);
    image.decode().then(
      () => { clearTimeout(timeout); resolve(true); },
      () => { clearTimeout(timeout); resolve(false); },
    );
  });
  readyImages.set(src, promise);
  void promise.then((ready) => { if (!ready) readyImages.delete(src); });
  return promise;
}

export async function prepareTarotCard(card: TarotCard): Promise<TarotCard> {
  if (!card.image || await loadTarotImage(card.image)) return card;
  // Use the existing illustrated-symbol fallback rather than a broken image.
  return { ...card, image: undefined };
}
