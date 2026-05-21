# CLAUDE.md

Read this file in full at the start of every session. It defines what we're building, how, and what not to do.

---

## Project

Personal portfolio site for **Saad Aamir** — software engineer at Dark Matter Studio, moving toward AI safety research.

**Live reference prototype:** `prototype/portfolio_v6.html` (single-file HTML/CSS/JS, ~48kb). This file is the source of truth for visual design, layout, color, typography, motion, and content structure. The Next.js build is a faithful port of this prototype with the additions listed in §Roadmap below.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide icons · Vercel deploy.

**Domain:** saadaamir.dev (target — confirm availability before building deploy config).

---

## Audience and intent

The site must work for four overlapping audiences without picking sides:

1. **AI lab reviewers** (Anthropic Fellows, DeepMind, OpenAI) — looking for technical depth and research direction.
2. **AI lab recruiters / senior eng recruiters** — looking for engineering rigor and shipped systems.
3. **Dark Matter Studio clients** — looking for polish, taste, and reliability.
4. **General full-stack roles** — looking for breadth and capability.

The middle-ground tone — calm, polished, technically dense without being terminal-aesthetic-only — is intentional. Don't lean it toward any single audience. If you find yourself adding language like "Hire me" or "Book a call now," stop. If you find yourself adding "I'm passionate about cutting-edge AI," stop. Both directions over-commit.

---

## Visual system (do not deviate without explicit instruction)

Defined in the prototype's `:root` and used throughout. Codify these as Tailwind tokens in `app/globals.css` via `@theme` and never hardcode in components.

### Colors
```
--bg:        #0E0F11     (page background, warm dark)
--bg-1:      #15171A     (card / elevated surface)
--bg-2:      #1B1E22     (deeper card)
--bg-card:   #14161A     (project & pillar cards)
--border:    #23272D     (default border)
--border-2:  #2E343B     (hover / emphasized border)
--text:      #ECEDEF     (primary text)
--text-dim:  #9CA3AC     (secondary / body)
--text-mute: #5C6470     (tertiary / metadata)
--accent:    #A78BFA     (violet — primary brand)
--accent-2:  #C4B5FD     (violet — lighter, used in gradients)
--accent-dim:#5C4A99     (violet — borders, dim states)
--warm:      #F5C16C     (status: in-progress / WIP)
--green:     #6DDC9C     (status: shipped / online / OK)
--pink:      #F47DA0     (secondary accent in gradients only — never solo)
```

### Typography
- **Sans:** Inter (next/font, variable, weights 400/500/600/700) — body, headings, UI
- **Mono:** JetBrains Mono (next/font, variable, weights 400/500) — labels, timestamps, code, tag pills, "eyebrow" captions, brand mark
- Base body: 16px / line-height 1.6
- Headings use `letter-spacing: -0.02em` (h2) to `-0.035em` (hero h1)
- Hero h1 uses a gradient on the name (`linear-gradient(120deg, accent → accent-2 → pink)`) via `background-clip: text`. Only the name. Do not apply this gradient anywhere else.

### Spacing & layout
- Container: `max-width: 1180px` with `padding: 0 6vw`
- Section vertical padding: `110px` desktop, `72px` mobile
- Card radius: `14px` (pillars), `16px` (project cards), `24px` (contact wrapper)
- Inputs/buttons: `999px` (pills only — no half-rounded buttons)
- Borders: `1px solid var(--border)` default; `1px solid var(--border-2)` on hover; never `2px`

### Motion (apply consistently — one principle, not several)
- **One reveal pattern:** `.reveal` class fades in with `translateY(20px → 0)` over `0.7s` with `cubic-bezier(0.2, 0.9, 0.3, 1)`. Staggered children use `.d1/.d2/.d3/.d4` delay variants.
- Triggered by IntersectionObserver, `threshold: 0.12`, `rootMargin: '0px 0px -60px 0px'`, fires once.
- Hover transitions on cards: 250ms ease, `translateY(-3px)` lift + border color shift.
- Respect `prefers-reduced-motion` — disable transforms, keep opacity fades only.

### Ambient grid background
- Subtle violet grid+nodes canvas behind only **two** sections: hero, contact.
- Implementation in prototype is canvas 2D with breathing nodes and mouse proximity brightening. Do not extend it site-wide — it competes with body text.
- In Next.js, build as a client component `<AmbientGrid />` and mount in those two sections only.

### What "tech-y" means here (read this if tempted to add things)
The tech-y feel comes from: monospace accents, the eyebrow labels, the timestamp in the footer, the gradient name, the SVG project diagrams, the subtle ambient grid. It does **not** come from terminal command lines, dashboard panels, telemetry graphs, log streams, scanlines, or boot sequences. Those were prior iterations; we deliberately moved past them. Do not add them back without explicit instruction.

---

## Information architecture

Single-page scroll with section anchors, plus separate routes for each project case study.

### Routes
- `/` — landing with all sections (Hero → What I do → About → Experience → Work → Stats → Toolkit → Contact → Footer)
- `/work/[slug]` — case study pages, one per featured project

### Sections on `/`
1. **Hero** — name, role line, positioning paragraph, two CTAs, "Available for" badge, portrait card
2. **What I do** — three pillars: Full-Stack Engineering / AI & LLM Tooling / Research Direction
3. **About** — second portrait + 3 paragraphs + quick-link pills
4. **Experience** — vertical timeline, 4 entries (Dark Matter Studio current, MobileLIVE, ZSystems, NUST)
5. **Selected Work** — 4 project cards (Dark Matter Co-Pilot featured full-width, then Resume Matcher, Studio, Sentiment)
6. **Stats** — 3 honest numbers
7. **Toolkit** — 5 categorized rows of stack pills, primaries highlighted
8. **Contact** — big CTA + email button + studio + social + CV
9. **Footer** — © year + Rawalpindi clock

### Case study page structure (each `/work/[slug]`)
- Back to all work
- Project title, tagline, status pill, year, role
- Stack pills
- Long-form sections with monospace eyebrows: `01 / Problem`, `02 / Approach`, `03 / Trade-offs`, `04 / Status`
- One large product image or SVG diagram near the top
- Inline mini-terminals or code blocks where they earn their place (e.g., the MCP tool invocation example for Co-Pilot)
- Links section at bottom (GitHub, live, related case studies)

---

## Folder structure

```
saad-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # landing
│   ├── globals.css               # tokens + base styles
│   └── work/
│       └── [slug]/page.tsx       # case study
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── pillars.tsx
│   │   ├── about.tsx
│   │   ├── experience.tsx
│   │   ├── work.tsx
│   │   ├── stats.tsx
│   │   ├── toolkit.tsx
│   │   └── contact.tsx
│   ├── ui/
│   │   ├── nav.tsx
│   │   ├── footer.tsx
│   │   ├── container.tsx
│   │   ├── button.tsx
│   │   ├── eyebrow.tsx
│   │   └── reveal.tsx            # wrapper that adds the in-view animation
│   ├── visuals/
│   │   ├── ambient-grid.tsx      # canvas grid for hero + contact
│   │   ├── project-copilot.tsx   # SVG diagrams per project
│   │   ├── project-matcher.tsx
│   │   ├── project-studio.tsx
│   │   └── project-sentiment.tsx
│   └── portrait.tsx              # the portrait card with frame-tag + coords
├── lib/
│   ├── projects.ts               # typed project data
│   ├── experience.ts             # typed timeline data
│   ├── toolkit.ts                # categorized stack data
│   └── content.ts                # longform copy (about paragraphs, case studies)
├── public/
│   ├── portraits/
│   │   ├── hero.jpg              # primary portrait
│   │   └── about.jpg             # second portrait
│   └── work/                     # product screenshots when available
├── prototype/
│   └── portfolio_v6.html         # reference, do not delete
└── CLAUDE.md
```

---

## Coding conventions

- **TypeScript strict.** No `any` without a comment justifying it.
- **Functional React + hooks.** No class components.
- **File naming:** `kebab-case.tsx`, default export uses PascalCase.
- **Tailwind class order:** layout → spacing → typography → color → state. Use `clsx` for conditionals.
- **No inline styles** except for dynamic values that can't be tokenized (canvas dimensions, etc.).
- **Co-locate** small components in the same file as their parent if used only once.
- **Commit per logical change** — one section, one route, one bug fix. Imperative mood ("Add hero section").

### Component patterns

**`<Reveal>` wrapper.** All scroll-revealed elements use this:
```tsx
<Reveal delay={0}>...</Reveal>      // d0
<Reveal delay={1}>...</Reveal>      // d1 → 0.08s
<Reveal delay={2}>...</Reveal>      // d2 → 0.16s
```

**Section eyebrow:** Always paired with an h2 below it.
```tsx
<Eyebrow>Selected work</Eyebrow>
<h2>Projects shipped <span className="text-text-mute">and currently building.</span></h2>
```

**Project card:** Featured uses `className="col-span-2"`, non-featured uses single column. Visual is a typed component, not an `<img>` placeholder unless a real screenshot exists.

---

## Content rules

- **Saad writes the copy first.** Claude polishes only. Do not invent biographical details, project metrics, dates, or quotes. If copy is missing from `lib/content.ts`, leave a `// TODO: copy from Saad` comment and ask.
- **Specificity over confidence.** "Reduced query latency ~40% via restructuring and caching" beats "Significantly improved performance."
- **No buzzword soup.** Forbidden: synergy, leverage, robust, scalable, cutting-edge, seamless, innovative, passionate, transformative.
- **Honest about in-progress work.** Dark Matter Co-Pilot is in progress — use `status: 'in-progress'` and the warm color, not the green.
- **MCP project framing:** When mentioning MCP in body copy, write it as "Model Context Protocol (MCP)" on first mention per section, then "MCP" thereafter.
- **No fake metrics.** If we don't have a real number, don't make one up. The Stats section uses real numbers + an `∞` honestly framed.

---

## Roadmap (in order — work top to bottom)

These are the gaps between the prototype and the final site. Each phase is one focused Claude Code session.

### Phase 1 — Scaffold (≈45 min)
- `create-next-app` with TS + Tailwind v4 + App Router
- Install `framer-motion`, `lucide-react`, `clsx`
- Wire fonts (Inter + JetBrains Mono via `next/font`)
- Define tokens in `globals.css` via Tailwind v4 `@theme`
- Build `<Container>`, `<Button>`, `<Eyebrow>`, `<Reveal>`, `<Nav>`, `<Footer>`
- Build `<AmbientGrid>` (port the prototype canvas logic into a typed client component, mount once per section that uses it, use IntersectionObserver to pause when off-screen)

### Phase 2 — Landing sections (≈90 min)
Port each section from the prototype into a typed component. Pull all data from `lib/`. Run `npm run build` and verify zero TS errors.

Section order: Hero → Pillars → About → Experience → Work → Stats → Toolkit → Contact.

### Phase 3 — Case study pages (≈60 min + content time)
- `app/work/[slug]/page.tsx` with `generateStaticParams` from `lib/projects.ts`
- Layout: max-w-720px for prose, full-width for header and visuals
- Case study sections with mono eyebrows ("01 / Problem", etc.)
- Two case studies first: Dark Matter Co-Pilot and AI Resume Matcher
- Studio and Sentiment can stay as cards that don't link out (mark `caseStudy: null` in data)

### Phase 4 — Real assets
- Drop portrait photos into `public/portraits/`
- Replace `<Portrait>` placeholder content with real `next/image` calls
- Replace SVG project visuals with real screenshots in `public/work/` where available (keep SVG as fallback for projects without screenshots, e.g. Co-Pilot which has no UI yet)
- Wire CV link to `/saad-aamir-cv.pdf` in `public/`

### Phase 5 — Polish & perf
- Lighthouse audit: target ≥ 90 mobile performance
- LCP < 2s on 4G
- Verify ambient grid pauses when off-screen
- Add OpenGraph + meta tags for share previews (1200x630 OG image)
- Add Vercel Analytics (privacy-respecting, no cookies)
- Add a `sitemap.xml` and `robots.txt`

### Phase 6 — Deploy
- Push to GitHub
- Connect to Vercel
- Set custom domain, configure DNS
- Verify on real devices: iPhone, desktop, slow connection

---

## Performance budget

- Lighthouse mobile performance ≥ 90 (hard requirement)
- LCP < 2s on simulated 4G
- Total JS bundle for landing < 180kb gzipped
- All portraits served as AVIF or WebP via `next/image`, with explicit width/height to prevent CLS
- Ambient grid canvas paused via IntersectionObserver when the host section is off-screen (animation budget is not unlimited)
- No client-side data fetching above the fold

---

## Accessibility

- Single `<h1>` per page (hero)
- All interactive elements keyboard-navigable with visible `:focus-visible` ring (use `outline: 2px solid var(--accent)` or Tailwind equivalent)
- Color contrast ≥ 4.5:1 for body text (verify the violet on dark — it passes, but check with a contrast tool)
- All animations respect `prefers-reduced-motion` via `useReducedMotion()` from Framer Motion
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>` with `aria-labelledby`, `<footer>`
- Alt text on every image (portrait, project screenshots)

---

## Do NOT

- Do not add 3D libraries (Three.js, R3F, drei) — not in scope
- Do not add a UI library (shadcn/MUI/Chakra/Mantine) — Tailwind + custom components only
- Do not add CMS/MDX in v1 — case studies live as TS modules in `lib/content.ts`
- Do not invent biographical details, project metrics, achievements, dates, or quotes
- Do not use buzzwords (see Content rules)
- Do not add the terminal aesthetic back (no command-line, no boot sequence, no log feed, no scanlines, no telemetry graphs) — we tried it; it narrows the audience
- Do not animate above the fold on initial paint — hero is instant
- Do not extend the ambient grid beyond the hero and contact sections
- Do not add a light theme in v1 — ship dark, add light later if requested
- Do not add inflated stats ("100+ clients") — keep numbers honest
- Do not add testimonials we don't have

---

## When in doubt

1. Open `prototype/portfolio_v6.html` in a browser and look at the equivalent section.
2. Re-read the relevant rule above.
3. Ask Saad in chat before adding anything that isn't covered.

The prototype is the source of truth for visual decisions. CLAUDE.md is the source of truth for *why* it looks the way it does. The two together define the project.
