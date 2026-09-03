import Image from "next/image";
import Link from "next/link";

const cards = [
  { src: "/cards/the-magician.svg", alt: "The Magician tarot card" },
  { src: "/cards/the-star.svg", alt: "The Star tarot card" },
  { src: "/cards/the-world.svg", alt: "The World tarot card" },
];

export default function TarotPreview() {
  return (
    <section id="tarot-preview" className="overflow-hidden bg-[#171b29] px-6 py-24 text-cream sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise">
            Interactive storytelling
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            Before you go,
            <br />
            draw a card.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-cream/65">
            Choose a hand-illustrated tarot card and receive a small creative
            prompt.
          </p>
          <Link
            href="/tarot"
            className="mt-8 inline-flex rounded-full bg-coral px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-1 hover:bg-peach"
          >
            Draw a card
          </Link>
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-xl" aria-label="Three illustrated tarot cards">
          {cards.map((card, index) => (
            <div
              key={card.src}
              className={`absolute left-1/2 top-12 aspect-[5/8] w-44 overflow-hidden rounded-xl border border-white/15 shadow-2xl sm:w-52 ${
                index === 0
                  ? "-translate-x-[125%] -rotate-[10deg]"
                  : index === 1
                    ? "z-10 -translate-x-1/2 -translate-y-5"
                    : "translate-x-[25%] rotate-[10deg]"
              }`}
            >
              <Image src={card.src} alt={card.alt} fill className="object-cover" sizes="208px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
