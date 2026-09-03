import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

const projects = [
  {
    number: "01",
    title: "ReadFlow",
    description:
      "An adaptive reading universe where children discover stories and read at their own pace.",
    tags: "Frontend · Product · Illustration",
    image: "/luna-wulfric-by-the-fire-hero.png",
    imageAlt: "Luna and Wulfric reading together by the fire",
    imagePosition: "object-[62%_center]",
    cta: "View project",
  },
  {
    number: "02",
    title: "Haunted House",
    description:
      "An atmospheric web experience combining illustration, animation, sound, and code.",
    tags: "Interactive · Animation · Sound",
    image: "/projects/haunted-house/fb-hauntedhouse.jpg",
    video: "/projects/haunted-house/preeview-haunted.mp4",
    imageAlt: "Animated preview of the Haunted House experience",
    cta: "Enter the house",
    href: "/haunted-house",
  },
  {
    number: "03",
    title: "Advent Calendar",
    description:
      "A playful digital calendar with 25 illustrated and animated surprises.",
    tags: "Frontend · Illustration · Animation",
    image: "/projects/advent-calendar/doors/day-21.webp",
    video: "/projects/advent-calendar/advent-calendar-preview.mp4",
    imageAlt: "Animated preview of the illustrated Advent Calendar",
    cta: "Open the calendar",
    href: "/advent-calendar",
  },
  {
    number: "04",
    title: "Library Writingclub",
    description:
      "A fantasy writing club held in the local library for aspiring fantasy authors.",
    tags: "Frontend · Illustration · Animation",
    image: "/projects/girl-writing.png",
    video: "/projects/library-workshop/library-workshop-preview.mp4",
    imageAlt: " A fantasy writing club held in the library",
    cta: "View the workshop",
    href: "https://bibliotek.kk.dk/vesterbro-bibliotek-og-kulturhus/aktiviteter/faellesskaber/kreative-faellesskaber/skriveklubben",
  },
    
  {
    number: "05",
    title: "Pensel og Pixel",
    description:
      "A creative studio specializing in illustration and interactive experiences.",
    tags: "Frontend · Illustration · Animation",
    image: "/projects/pensel-og-pixel/pensel-og-pixel.jpg",
    video: "/projects/pensel-og-pixel/pensel-og-pixel-preview.mp4",
    imageAlt: "Animated preview of Pensel og Pixel projects",
    cta: "View the studio",
    href: "https://penselogpixel.dk/",
  },
    {
    number: "06",
    title: "Deltager på websummit 26",
    description:
      "A creative studio specializing in illustration and interactive experiences.",
    tags: "Frontend · Illustration · Animation",
    image: "/projects/pensel-og-pixel/pensel-og-pixel.jpg",
    video: "/projects/pensel-og-pixel/pensel-og-pixel-preview.mp4",
    imageAlt: "Animated preview of Pensel og Pixel projects",
    cta: "View the studio",
    href: "https://penselogpixel.dk/",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Selected work">
          Digital experiences shaped by storytelling, illustration, and
          thoughtful frontend development.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
