import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";
import { tarotDeck } from "../src/data/tarot.ts";
import { loadTarotImage, prepareTarotCard } from "../src/lib/tarot-images.ts";

const root = fileURLToPath(new URL("../", import.meta.url));

test("the full deck has valid copy and every referenced illustration exists within the image budget", async () => {
  assert.equal(tarotDeck.length, 78);
  assert.equal(new Set(tarotDeck.map((card) => card.name)).size, 78);
  assert.ok(tarotDeck.every((card) => card.meaning && card.meaningEn));
  const images = new Set(["/cards/optimized/tarot_front.webp", ...tarotDeck.flatMap((card) => card.image ? [card.image] : [])]);
  let bytes = 0;
  for (const image of images) {
    const path = resolve(root, "public", image.slice(1));
    const info = await stat(path);
    const metadata = await sharp(path).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, 640);
    assert.ok(info.size < 128 * 1024, `${image} exceeds the per-card budget`);
    bytes += info.size;
  }
  assert.ok(bytes < 4.5 * 1024 * 1024, "The complete illustrated deck exceeds its total budget");
});

test("Five and Nine of Wands both reference their restored illustrations", async () => {
  for (const name of ["5 of Wands", "9 of Wands"]) {
    const card = tarotDeck.find((entry) => entry.name === name);
    assert.ok(card?.image, `${name} must have its illustration`);
    await stat(resolve(root, "public", card.image.slice(1)));
  }
  assert.equal(tarotDeck.find((card) => card.name === "5 of Wands").image, "/cards/optimized/wands/fiveofwands.webp");
});

test("a card remains pending until image decoding finishes and concurrent requests share the download", async () => {
  let finish;
  let downloads = 0;
  const originalWindow = globalThis.window;
  globalThis.window = { Image: class {
    constructor() { downloads++; }
    decode() { return new Promise((resolve) => { finish = resolve; }); }
  } };
  try {
    const first = loadTarotImage("/test/slow.webp");
    const second = loadTarotImage("/test/slow.webp");
    let settled = false;
    void first.then(() => { settled = true; });
    await Promise.resolve();
    assert.equal(settled, false);
    assert.equal(downloads, 1);
    finish();
    assert.deepEqual(await Promise.all([first, second]), [true, true]);
  } finally { globalThis.window = originalWindow; }
});

test("failed images fall back to card content and may be retried", async () => {
  let downloads = 0;
  const originalWindow = globalThis.window;
  globalThis.window = { Image: class {
    constructor() { downloads++; }
    decode() { return Promise.reject(new Error("Image unavailable")); }
  } };
  try {
    const card = { ...tarotDeck[0], image: "/test/missing.webp" };
    const prepared = await prepareTarotCard(card);
    assert.equal(prepared.name, card.name);
    assert.equal(prepared.meaning, card.meaning);
    assert.equal(prepared.image, undefined);
    assert.equal(card.image, "/test/missing.webp");
    assert.equal(await loadTarotImage(card.image), false);
    assert.equal(downloads, 2);
  } finally { globalThis.window = originalWindow; }
});
