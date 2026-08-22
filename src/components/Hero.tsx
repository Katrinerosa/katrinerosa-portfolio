import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero-navy-reveal bg-background text-foreground">
            <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                    <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-coral">
                        Creative developer · Designer · Illustrator
                    </p>

                    <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                        I build digital worlds where{" "}
                        <span className="text-coral">code</span> meets{" "}
                        <span className="italic text-turquoise">storytelling.</span>
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                        I&apos;m Katrine Rosa Beck. I create playful, accessible digital
                        experiences through development, design and illustration.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            href="#work"
                            className="rounded-full bg-coral px-6 py-3 font-semibold text-navy transition hover:-translate-y-1 hover:bg-peach"
                        >
                            Explore my work
                        </Link>

                        <Link
                            href="#contact"
                            className="rounded-full border-2 border-foreground px-6 py-3 font-semibold transition hover:border-turquoise hover:text-turquoise"
                        >
                            Let&apos;s talk
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] bg-navy shadow-2xl">
                    <Image
                        src="/luna-wulfric-by-the-fire-hero.png"
                        alt="Luna and Wulfric resting by the fire beneath a dragon"
                        width={4000}
                        height={3000}
                        priority
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="h-auto w-full"
                    />
                </div>
            </div>
        </section>
    );
}
