export type Work = {
  slug: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  thumbnailClassName: string;
};

export const works: Work[] = [
  {
    slug: "luna-and-wulfric-by-the-fire",
    title: "Luna & Wulfric by the Fire",
    category: "Digital illustration",
    image: "/luna-wulfric-by-the-fire-hero.png",
    alt: "Luna reading beside Wulfric in a dark room lit by firelight",
    width: 4000,
    height: 3000,
    thumbnailClassName: "object-cover object-center",
  },
  {
    slug: "wulfric",
    title: "Wulfric",
    category: "Visual identity",
    image: "/Wulfrivfav.png",
    alt: "Black wolf emblem on a silver circular background",
    width: 1254,
    height: 1254,
    thumbnailClassName: "object-contain p-10",
  },
  {
    slug: "the-magician",
    title: "The Magician",
    category: "Tarot illustration",
    image: "/cards/the-magician.svg",
    alt: "The Magician tarot card illustrated by Katrine Rosa Beck",
    width: 1410,
    height: 2250,
    thumbnailClassName: "object-cover",
  },
  {
    slug: "the-star",
    title: "The Star",
    category: "Tarot illustration",
    image: "/cards/the-star.svg",
    alt: "The Star tarot card illustrated by Katrine Rosa Beck",
    width: 1410,
    height: 2250,
    thumbnailClassName: "object-cover",
  },
  {
    slug: "the-world",
    title: "The World",
    category: "Tarot illustration",
    image: "/cards/the-world.svg",
    alt: "The World tarot card illustrated by Katrine Rosa Beck",
    width: 1410,
    height: 2250,
    thumbnailClassName: "object-cover",
  },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}
