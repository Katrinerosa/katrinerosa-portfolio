export type Illustration = {
  id: string;
  seed: string;
  title: string;
  project: string;
  illustrator: string;
  year: number;
  w: number;
  h: number;
  collection: string;
};

export type SortKey = "title" | "year" | "illustrator";

export const illustrations: Illustration[] = [
  {
    id: "luna-and-the-witch",
    seed: "witch",
    title: "Luna and the Witch",
    project: "House of Dreamers",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 1269,
    h: 897,
    collection: "house-of-dreamers",
  },
  {
    id: "halloween-in-school",
    seed: "halloween-in-school",
    title: "Halloween in School",
    project: "House of Dreamers",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 4000,
    h: 3000,
    collection: "house-of-dreamers",
  },
  {
    id: "house-of-dreamers",
    seed: "house-of-dreamers",
    title: "House of Dreamers",
    project: "House of Dreamers",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 1797,
    h: 2245,
    collection: "house-of-dreamers",
  },
  {
    id: "katrine-with-glasses",
    seed: "katrine-with-glasses",
    title: "Katrine with Glasses",
    project: "Portraits",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 3000,
    h: 4000,
    collection: "portraits",
  },
  {
    id: "luna-and-amira",
    seed: "luna-amira",
    title: "Luna and Amira",
    project: "House of Dreamers",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 1647,
    h: 2574,
    collection: "house-of-dreamers",
  },
  {
    id: "luna-and-wulfric-by-the-fire",
    seed: "luna-wulfric-by-the-fire",
    title: "Luna and Wulfric by the Fire",
    project: "House of Dreamers",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 4000,
    h: 3000,
    collection: "house-of-dreamers",
  },
  {
    id: "the-elephants-christmas-tale",
    seed: "the-elephant-xmas-tale",
    title: "The Elephant’s Christmas Tale",
    project: "The Elephant’s Christmas Tale",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 2550,
    h: 3300,
    collection: "christmas-tales",
  },
  {
    id: "wulfric-dark-knight",
    seed: "wulfric-dark-knight",
    title: "Wulfric — Dark Knight",
    project: "House of Dreamers",
    illustrator: "Katrine Rosa Beck",
    year: 2024,
    w: 2987,
    h: 1283,
    collection: "house-of-dreamers",
  },
];

const SORT_COMPARATORS: Record<
  SortKey,
  (a: Illustration, b: Illustration) => number
> = {
  title: (a, b) => a.title.localeCompare(b.title),
  year: (a, b) => b.year - a.year,
  illustrator: (a, b) => a.illustrator.localeCompare(b.illustrator),
};

export function sortIllustrations(
  list: Illustration[],
  key: SortKey,
): Illustration[] {
  return [...list].sort(SORT_COMPARATORS[key]);
}
