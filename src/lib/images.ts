import type { StaticImageData } from "next/image";
import halloweenInSchool from "@/images/halloween-in-school-luna-amira.png";
import houseOfDreamers from "@/images/house-of-dreamers.png";
import katrineWithGlasses from "@/images/katrine-with-glasses.png";
import lunaAmira from "@/images/luna-amira.png";
import lunaWulfricByTheFire from "@/images/luna-wulfric-by-the-fire-hero.png";
import theElephantXmasTale from "@/images/the-elephant-x-mas-tale.png";
import witch from "@/images/the-witch-17.png";
import wulfricDarkKnight from "@/images/wulfric-dark-knight.png";

const images: Record<string, StaticImageData> = {
  "halloween-in-school": halloweenInSchool,
  "house-of-dreamers": houseOfDreamers,
  "katrine-with-glasses": katrineWithGlasses,
  "luna-amira": lunaAmira,
  "luna-wulfric-by-the-fire": lunaWulfricByTheFire,
  "the-elephant-xmas-tale": theElephantXmasTale,
  witch,
  "wulfric-dark-knight": wulfricDarkKnight,
};

export function getPhotoImage(seed: string): StaticImageData {
  return images[seed];
}
