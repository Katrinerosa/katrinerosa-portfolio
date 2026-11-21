# Katrine Rosa — Portfolio

A personal portfolio combining frontend development, product thinking, illustration, and visual storytelling.

The portfolio presents selected digital projects, interactive experiments, and case studies created by Katrine Rosa Beck.

## Explore the portfolio

- [Visit the portfolio](https://katrinerosa.com) or [open the English version](https://katrinerosa.com/en).
- For a quick code review, start with the examples below.

| Area | Code to explore | What to look for |
| --- | --- | --- |
| Page composition | [HomePageContent.tsx](src/components/HomePageContent.tsx) | A shared page assembled from focused components and a typed locale prop. |
| Danish and English content | [Locale utilities](src/lib/locale.ts), [Danish route](src/app/page.tsx), [English route](src/app/en/page.tsx) | How the two language routes share components. |
| Interactive UI | [Contact.tsx](src/components/Contact.tsx) | Pointer interaction, collision handling, animation cleanup, and a reduced-motion alternative. |
| Image gallery | [Gallery routes](src/app/gallery), [Image utilities](src/lib/images.ts) | How gallery pages and image handling are organized. |

The portfolio combines frontend engineering with original illustration and visual storytelling. The examples above provide a starting point for discussing implementation choices in an interview or project conversation.

## Selected work

- **Kreativ Founder Klub** — A membership concept with Supabase authentication, Zod validation, realtime chat, and a protected dashboard.
- **ReadFlow** — An adaptive reading universe for children.
- **Haunted House** — An interactive experience combining illustration, animation, sound, and code.
- **Advent Calendar** — A playful digital calendar with illustrated and animated surprises.
- **Illustration Gallery** — A dynamic gallery for characters, stories, and visual collections.

## Features

- Danish and English versions
- Responsive portfolio layout
- Project case studies and interactive experiences
- Dynamic image gallery with Cloudinary
- Native page transitions with React View Transitions
- Animated contact section with custom collision physics
- Cookie consent and analytics integration

## Technologies

- [Next.js 16](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- TypeScript
- Tailwind CSS 4
- Cloudinary
- React View Transitions

## My role

End-to-end product design and frontend development — from concept, UX/UI, and visual identity to implementation, integration, and final user experience.

I use an AI-assisted and agentic development workflow to turn ideas into concrete tasks, guide implementation, review code, test functionality, and debug the final result.

## Local development

Clone the repository:

```bash
git clone https://github.com/Katrinerosa/katrinerosa-portfolio.git
cd katrinerosa-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # Start the development server
npm run build   # Create a production build
npm run start   # Start the production server
npm run lint    # Run ESLint
```

## Project structure

```text
src/
├── app/             # Routes, pages, and project experiences
├── components/      # Shared UI and interactive components
├── data/            # Gallery and project content
└── lib/             # Locale and utility functions

public/
└── projects/        # Images, videos, and project assets
```

## Working method

This project uses repository-level agent instructions and reusable development skills. These files support the development workflow and are not included in the user-facing website.

## License

This is a personal portfolio project. The source code and visual material may not be reused without permission.

## Tarot image delivery

The Tarot experience and homepage preview use generated 640px WebP copies in `public/cards/optimized/`. The original SVG artwork remains in `public/cards/`.

Regenerate the web copies with Node.js 22 or newer:

```bash
npm run images:tarot
npm run test:tarot
```

The current 76 illustrated cards plus the card back total 3.98 MB, down from 59.10 MB in the referenced SVG originals (93.27% smaller). The card back is 22.9 KB instead of 4.15 MB. These are file-size comparisons, not measured production loading times. The page prepares only upcoming cards rather than fetching the whole deck.

Card faces are downloaded and decoded before turning. Failed downloads use the existing symbol-and-meaning fallback, and repeated clicks are blocked until the turn finishes. The tests check the complete deck, asset existence and size budgets, decoding readiness, and download failure/retry behavior.

The illustrations for The Sun and 10 of Coins are not present in this repository. Those cards display their symbols and meanings until the original artwork is added. After adding an original, update its entry in `src/data/tarot.ts` and regenerate the WebP copies. Five and Nine of Wands both use their correctly named original illustrations.

A short synthesized paper rustle plays on card interactions and can be switched off. It is a new sound, not a recovered recording from the old portfolio. The audio file loads only after interaction.
