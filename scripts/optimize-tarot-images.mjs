import { mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { tarotDeck } from "../src/data/tarot.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const images = [...new Set([
  "/cards/optimized/tarot_front.webp",
  ...tarotDeck.flatMap((card) => card.image ? [card.image] : []),
])];
const report = [];

// 640px retains at least 2x resolution for the largest (300px) card.
// Pre-generated files also avoid a cold image-optimizer request when drawing.
for (const image of images) {
  const source = resolve(root, "public", image.replace("/cards/optimized/", "cards/").replace(/\.webp$/, ".svg"));
  const target = resolve(root, "public", image.slice(1));
  await mkdir(dirname(target), { recursive: true });
  const original = await stat(source);
  const { size, width, height } = await sharp(source, { density: 72 })
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 88, effort: 5 })
    .toFile(target);
  report.push({ image, originalBytes: original.size, optimizedBytes: size, width, height });
}
const originalBytes = report.reduce((sum, image) => sum + image.originalBytes, 0);
const optimizedBytes = report.reduce((sum, image) => sum + image.optimizedBytes, 0);
console.log(JSON.stringify({ files: report.length, originalBytes, optimizedBytes, reductionPercent: +(100 * (1 - optimizedBytes / originalBytes)).toFixed(2), images: report }, null, 2));
