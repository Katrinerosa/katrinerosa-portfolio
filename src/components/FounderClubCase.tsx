import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locale";

const copy = {
  da: {
    back: "Tilbage til projekter",
    eyebrow: "Case · Digitalt medlemsunivers",
    title: "Kreativ Founder Klub",
    intro:
      "Et konceptuelt medlemsunivers for kreative selvstændige — udviklet fra visuel identitet og UX til autentificering, database og realtidsfunktioner.",
    source: "Se koden på GitHub",
    projectLabel: "Projektet",
    projectTitle: "Fra fællesskabstanke til fungerende produktflow.",
    projectText:
      "Målet var at skabe en portfolio-case, der både har en tydelig visuel personlighed og demonstrerer praktisk softwareudvikling. Løsningen samler en offentlig fortælling om klubben med kontooprettelse, login, et beskyttet medlemsområde og en åben chatdemo.",
    roleLabel: "Min rolle",
    role:
      "End-to-end produktdesign og frontendudvikling — fra behovsafdækning og UX/UI til implementering, integration og færdigt brugerflow.",
    techLabel: "Teknisk ansvar",
    tech:
      "Next.js, React, TypeScript, Supabase/PostgreSQL, API-integration, autentificering, Row Level Security, realtidsfunktioner og Zod-validering.",
    methodLabel: "Udviklingsmetode",
    method:
      "Agentisk og AI-assisteret softwareudvikling. Jeg omsætter behov til konkrete opgaver, styrer AI-agenter gennem udviklingsprocessen og kvalitetssikrer resultatet gennem kritisk kodegennemgang, test, debugging og dokumentation.",
    builtLabel: "Det byggede jeg",
    builtTitle: "Et sammenhængende flow — ikke kun en flot forside.",
    features: [
      ["01", "Identitet og interface", "Responsivt design, tydelig klubidentitet og genbrugelige UI-komponenter."],
      ["02", "Sikker adgang", "Supabase Auth, e-mailbekræftelse, sessions og et beskyttet dashboard."],
      ["03", "Validerede formularer", "Zod-schemaer med konkrete fejlbeskeder før data sendes videre."],
      ["04", "Realtidsdemo", "En offentlig chat med PostgreSQL, RLS-politikker og Supabase Realtime."],
    ],
    processLabel: "Arbejdsproces",
    processTitle: "AI som udviklingsværktøj — med menneskelig kvalitetskontrol.",
    processText:
      "Jeg brugte AI-agenter til research, opdeling af opgaver, implementering og fejlsøgning. De tekniske og visuelle valg blev løbende vurderet, testet og justeret af mig, så løsningen hænger sammen som både produkt og kodebase.",
  },
  en: {
    back: "Back to selected work",
    eyebrow: "Case · Digital membership experience",
    title: "Kreativ Founder Klub",
    intro:
      "A conceptual membership experience for creative founders — developed from visual identity and UX through authentication, database, and realtime features.",
    source: "View code on GitHub",
    projectLabel: "The project",
    projectTitle: "From a community idea to a working product flow.",
    projectText:
      "The goal was to create a portfolio case with a distinct visual identity and meaningful software functionality. The result combines a public club narrative with account creation, login, a protected member area, and an open chat demo.",
    roleLabel: "My role",
    role:
      "End-to-end product design and frontend development — from discovery and UX/UI to implementation, integration, and a complete user flow.",
    techLabel: "Technical scope",
    tech:
      "Next.js, React, TypeScript, Supabase/PostgreSQL, API integration, authentication, Row Level Security, realtime features, and Zod validation.",
    methodLabel: "Development approach",
    method:
      "Agentic and AI-assisted software development. I translate needs into concrete tasks, direct AI agents throughout development, and assure quality through critical code review, testing, debugging, and documentation.",
    builtLabel: "What I built",
    builtTitle: "A connected product flow — not just a polished homepage.",
    features: [
      ["01", "Identity and interface", "Responsive design, a distinct club identity, and reusable UI components."],
      ["02", "Secure access", "Supabase Auth, email confirmation, sessions, and a protected dashboard."],
      ["03", "Validated forms", "Zod schemas with actionable errors before data is submitted."],
      ["04", "Realtime demo", "A public chat backed by PostgreSQL, RLS policies, and Supabase Realtime."],
    ],
    processLabel: "Process",
    processTitle: "AI as a development tool — with human quality control.",
    processText:
      "I used AI agents for research, task breakdown, implementation, and debugging. I continuously reviewed, tested, and refined the technical and visual decisions so the result works as both a product and a coherent codebase.",
  },
} as const;

export default function FounderClubCase({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const homePath = locale === "en" ? "/en" : "/";

  return (
    <main className="bg-[#f4f0e7] text-[#151f3d]">
      <section className="px-6 pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`${homePath}#work`}
            transitionTypes={["nav-back"]}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#244fd2] transition hover:-translate-x-1"
          >
            <span aria-hidden="true">←</span> {text.back}
          </Link>

          <div className="mt-14 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#244fd2]">
                {text.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
                {text.title}
              </h1>
            </div>

            <div className="pb-2">
              <p className="max-w-xl text-lg leading-8 text-[#151f3d]/70 sm:text-xl">
                {text.intro}
              </p>
              <a
                href="https://github.com/Katrinerosa/kreativ_founder-klub"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex rounded-full border-2 border-[#151f3d] bg-[#b9ff45] px-6 py-3 text-sm font-bold transition hover:-translate-y-1 hover:shadow-[5px_5px_0_#151f3d]"
              >
                {text.source} ↗
              </a>
            </div>
          </div>

          <div className="relative mt-14 overflow-hidden rounded-[2rem] border-2 border-[#151f3d] bg-[#f8f4eb] shadow-[10px_10px_0_#244fd2] sm:mt-20">
            <Image
              src="/projects/kreativ-founder-klub/preview-current.png"
              alt="Kreativ Founder Klub homepage"
              width={1440}
              height={900}
              priority
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#151f3d]/15 bg-[#fbf8f1] px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#244fd2]">
              {text.projectLabel}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              {text.projectTitle}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-[#151f3d]/70">{text.projectText}</p>
            <dl className="mt-10 grid gap-5">
              {[
                [text.roleLabel, text.role],
                [text.techLabel, text.tech],
                [text.methodLabel, text.method],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-[#151f3d]/20 pt-5 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-7">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#151f3d]/55">
                    {label}
                  </dt>
                  <dd className="mt-2 leading-7 text-[#151f3d]/80 sm:mt-0">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#244fd2]">
            {text.builtLabel}
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
            {text.builtTitle}
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border-2 border-[#151f3d] bg-[#151f3d] md:grid-cols-2">
            {text.features.map(([number, title, description]) => (
              <article key={number} className="bg-[#fbf8f1] p-7 sm:p-9">
                <span className="font-mono text-xs font-bold text-[#244fd2]">{number}</span>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-[#151f3d]/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#151f3d] px-6 py-20 text-[#f4f0e7] sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b9ff45]">
            {text.processLabel}
          </p>
          <div>
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              {text.processTitle}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#f4f0e7]/68">
              {text.processText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
