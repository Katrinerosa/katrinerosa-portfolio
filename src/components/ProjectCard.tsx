import Image from "next/image";
import Link from "next/link";

export type ProjectCardProps = {
  number: string;
  title: string;
  description: string;
  tags: string;
  image?: string;
  imageAlt: string;
  video?: string;
  cta: string;
  href?: string;
  imagePosition?: string;
};

export default function ProjectCard({
  number,
  title,
  description,
  tags,
  image,
  imageAlt,
  video,
  cta,
  href,
  imagePosition = "object-center",
}: ProjectCardProps) {
  const card = (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden border border-border bg-surface transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgb(26_59_93_/_0.15)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        {video ? (
          <video
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={image}
            aria-label={imageAlt}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover transition duration-500 group-hover:scale-[1.035] ${imagePosition}`}
          />
        ) : null}

        <span className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-surface/90 font-mono text-xs font-semibold text-foreground backdrop-blur">
          {number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#a54f60]">
          {tags}
        </p>
        <h3 className="text-2xl font-semibold tracking-[-0.035em] text-foreground">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-foreground">
            <span>{cta}</span>
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              ↗
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  if (!href) return card;

  const isExternal = href.startsWith("http");

  if (!isExternal) {
    return (
      <Link
        href={href}
        transitionTypes={["nav-forward"]}
        aria-label={`${title} — ${cta}`}
        className="block h-full min-w-0"
      >
        {card}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${title} — ${cta}`}
      className="block h-full min-w-0"
    >
      {card}
    </a>
  );
}
