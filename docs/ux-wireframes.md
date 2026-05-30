# UX Wireframes — Personal Creative Portfolio

> **Author:** UI/UX Architecture
> **Status:** Living spec
> **Stack alignment:** React 19 · Tailwind CSS v4 · Vite · Feature-driven architecture
> **Design language:** High-end, minimalist developer portfolio — generous whitespace, restrained type scale, monochrome base with a single accent, motion as punctuation (never decoration).

---

## 0. Design Foundations (shared by all views)

These tokens and conventions are referenced throughout the wireframes. They live in `src/core/theme/` and are exposed as Tailwind v4 `@theme` tokens (single source of truth — components never hardcode hex values).

### 0.1 Layout grid
| Breakpoint | Tailwind | Content width | Side gutter | Columns |
|---|---|---|---|---|
| Mobile (base) | `<640px` | fluid 100% | `px-5` (20px) | 1 |
| Tablet | `sm:` / `md:` | `max-w-2xl` centered | `px-8` | 1–2 |
| Desktop | `lg:` | `max-w-5xl` centered | `px-0` (gutter absorbed by margin) | 2–3 |
| Wide | `xl:` | `max-w-6xl` centered | — | 3 |

> ⚠️ **Project prefix note:** this codebase uses a **custom Tailwind variant/prefix `st:`** — short for **SuraTech**, the project/brand namespace (seen in `App.jsx` → `st:flex`). Prefixing utilities with `st:` keeps the portfolio's classes scoped and unambiguous, avoiding collisions with any third-party styles. All utility classes in this spec are written *without* the prefix for readability; when implementing, apply the project's established `st:` convention consistently.

### 0.2 Type scale (minimalist, two families)
- **Display / headings:** a geometric or grotesk sans (e.g. `Inter`, `Geist`, `Satoshi`) — `tracking-tight`, weights 500/600 only.
- **Body / meta:** same family at 400, or a mono (`Geist Mono`) reserved for tech tags, timestamps, and the project index numbers (`01 / 02 / 03`) to signal the "developer" identity.
- Scale: `text-sm` (meta) · `text-base` (body) · `text-2xl`→`text-4xl` (section titles) · `text-5xl`→`text-7xl` (hero).

### 0.3 Color & elevation
- Monochrome neutral ramp (`--color-ink`, `--color-paper`, plus 3 grays) + **one accent** (`--color-accent`) used only for interactive affordances and focus rings.
- Dark mode is the default canvas for a dev portfolio (`paper` = near-black). Light mode is a token swap, not a separate stylesheet.
- Elevation is communicated by **hairline borders (`border-white/10`) and spacing**, not heavy shadows.

### 0.4 Motion principles
- Durations: `150ms` (state feedback) · `300ms` (enter/exit) · `500ms` (hero/page reveal).
- Easing: `ease-out` for entrances, `ease-in-out` for hovers.
- **Respect `prefers-reduced-motion`** — all transform/opacity transitions collapse to instant, only color transitions remain.

### 0.5 Feature-driven file map (target)
```
src/
├─ core/
│  ├─ config/                      # env, API base URL
│  └─ theme/
│     └─ index.css                 # @theme tokens, @import "tailwindcss"
├─ components/                     # cross-feature primitives (Button, Tag, Skeleton, Spinner)
└─ features/
   ├─ routes/                      # route table → maps paths to feature pages
   └─ portfolio/
      ├─ PortfolioPage.jsx         # Showcase View (Home) — container
      ├─ ProjectDetailPage.jsx     # Project Detail View — container
      ├─ components/
      │  ├─ showcase/              # Home-specific presentational components
      │  └─ detail/                # Detail-specific presentational components
      ├─ hooks/
      │  ├─ useProjects.js         # list query + loading/error state
      │  └─ useProject.js          # single project by slug/id
      └─ services/
         └─ portfolioService.js    # fetch layer (Strapi: /api/projects → .data)
```

> **Data contract reminder:** `portfolioService.getProjects()` returns the Strapi `data` array. Each item shape assumed below: `{ id, name, slug, summary, role, year, stack[], coverUrl, gallery[], liveUrl, repoUrl, body }`.

---

# VIEW 1 — Core Project Showcase View (Home)

**Route:** `/`
**Container:** `features/portfolio/PortfolioPage.jsx`
**Purpose:** A curated, scannable index of work. First paint must communicate identity and craft in under one viewport. No carousels, no auto-play — the work earns the scroll.

## 1.1 Semantic UI Component Tree

```
<PortfolioPage>                         ← container: owns data via useProjects()
│
├─ <PortfolioErrorBoundary>             ← class boundary wrapping the data region
│
├─ <SiteHeader>                         ← position: sticky, blur-on-scroll
│  ├─ <Brand />                         ← logomark / name (links to top)
│  └─ <PrimaryNav>                      ← Work · About · Contact
│     └─ <NavLink />…
│
├─ <main>
│  │
│  ├─ <HeroIntro>                       ← above the fold, no image dependency
│  │  ├─ <Eyebrow />                    ← e.g. "Developer & Designer"
│  │  ├─ <DisplayHeadline />            ← short value statement
│  │  └─ <AvailabilityPill />           ← "Available for work" status dot
│  │
│  ├─ <ProjectShowcase>                 ← the index, driven by useProjects()
│  │  ├─ <SectionLabel />               ← "Selected Work — 2024 →"
│  │  │
│  │  ├─ {isLoading} → <ProjectListSkeleton />   ← N skeleton rows
│  │  ├─ {isError}   → <ShowcaseErrorState />     ← inline retry (see §1.4)
│  │  ├─ {isEmpty}   → <EmptyState />             ← "Work coming soon"
│  │  │
│  │  └─ <ProjectList>                  ← <ul>, semantic list
│  │     └─ <ProjectCard>…              ← <li><a>, one per project
│  │        ├─ <ProjectIndex />         ← mono "01"
│  │        ├─ <ProjectThumb />         ← lazy <img>, aspect-locked
│  │        ├─ <ProjectMeta>
│  │        │  ├─ <ProjectTitle />
│  │        │  ├─ <ProjectSummary />
│  │        │  └─ <TagList><Tag/>…</TagList>
│  │        └─ <ArrowAffordance />      ← "↗" view detail
│  │
│  └─ <ContactCTA>                      ← closing call-to-action band
│     ├─ <CTAHeadline />
│     └─ <MailtoButton />
│
└─ <SiteFooter>
   ├─ <SocialLinks />                   ← GitHub · LinkedIn · X
   └─ <Colophon />                      ← "Built with React + Tailwind"
```

## 1.2 Vertical Mobile Layout Wireframe (375px)

```
┌─────────────────────────────────────┐
│  ●jb                          ☰ Menu │  ← SiteHeader (sticky, h-14, blur)
├─────────────────────────────────────┤
│                                       │
│  DEVELOPER & DESIGNER                 │  ← Eyebrow (mono, text-xs, accent)
│                                       │
│  I build calm,                        │  ← DisplayHeadline
│  fast interfaces                      │     text-5xl, leading-[0.95]
│  for the web.                         │     tracking-tight
│                                       │
│  ● Available for work                 │  ← AvailabilityPill (pulse dot)
│                                       │
│                                       │  ← generous space (mt-16)
│  SELECTED WORK — 2024 →               │  ← SectionLabel (mono, border-t)
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 01                           ↗  │ │  ← ProjectCard (full-bleed tap area)
│  │ ┌─────────────────────────────┐ │ │
│  │ │                             │ │ │  ← ProjectThumb (aspect-[16/10])
│  │ │        [ cover img ]        │ │ │     rounded-xl, lazy-loaded
│  │ │                             │ │ │
│  │ └─────────────────────────────┘ │ │
│  │ Aurora Dashboard                │ │  ← ProjectTitle (text-2xl)
│  │ Realtime analytics, rebuilt for │ │  ← ProjectSummary (text-sm, muted)
│  │ speed.                          │ │
│  │ ┌────┐ ┌──────┐ ┌─────────────┐ │ │
│  │ │React│ │ TS  │ │ WebSockets  │ │ │  ← TagList (mono chips)
│  │ └────┘ └──────┘ └─────────────┘ │ │
│  └─────────────────────────────────┘ │
│                                       │  ← gap-12 between cards
│  ┌─────────────────────────────────┐ │
│  │ 02                           ↗  │ │
│  │            ...                  │ │
│  └─────────────────────────────────┘ │
│                                       │
│           ⋮ (more cards)              │
│                                       │
├─────────────────────────────────────┤
│                                       │
│  Have a project in mind?              │  ← ContactCTA band
│  Let's talk.                          │     (text-4xl, border-t)
│  ┌─────────────────────────────────┐ │
│  │   hello@jorge.dev  →            │ │  ← MailtoButton (full-width)
│  └─────────────────────────────────┘ │
│                                       │
├─────────────────────────────────────┤
│  GitHub · LinkedIn · X                │  ← SiteFooter
│  Built with React + Tailwind   © 26   │
└─────────────────────────────────────┘
```

Stacking order top→bottom: **single column**, vertical rhythm driven by a consistent `space-y` scale (`space-y-16` between major bands, `gap-12` between cards). Cards are the full tap target — the entire `<li><a>` is clickable (min 44px tap height honored by the thumb + meta block).

## 1.3 Responsive Adaptation Notes

| Region | Mobile (base) | Tablet (`sm`/`md`) | Desktop (`lg`+) |
|---|---|---|---|
| `SiteHeader` | Brand + hamburger (`☰`) opening a full-screen overlay nav | Inline nav appears, hamburger drops | Inline nav, sticky with `backdrop-blur` on scroll |
| `HeroIntro` | Headline `text-5xl`, full width | `text-6xl`, `max-w-2xl` | `text-7xl`, headline left-aligned, availability pill floats right |
| `ProjectList` | 1 column, stacked cards | 1 column but card goes **horizontal** (thumb left, meta right) | **2-column asymmetric grid** OR an editorial *alternating* layout (odd cards thumb-left, even cards thumb-right) for rhythm |
| `ProjectThumb` | `aspect-[16/10]` | `aspect-[16/10]`, ~45% card width | hover-reveal interaction enabled (see §1.4) |
| `ProjectIndex` | inline above title | inline | absolutely positioned in the margin gutter (`lg:absolute -left-16`) — editorial touch |
| `ContactCTA` | stacked, full-width button | centered, `max-w-xl` | oversized headline (`text-6xl`), button inline-right |

> **Key adaptation philosophy:** the mobile layout is the *honest* layout. Desktop does not add density for its own sake — it adds **breathing room and an asymmetric grid** to feel gallery-like, not dashboard-like.

## 1.4 UX Micro-interactions & States

**Loading — `<ProjectListSkeleton />`**
- Rendered while `useProjects()` `isLoading === true`. Render **3 skeleton cards** matching real card geometry exactly (same aspect ratio, same meta line heights) to avoid layout shift (CLS = 0).
- Each skeleton: a `bg-white/5` block with a subtle `animate-pulse` shimmer. Title line = 60% width bar, summary = two bars (100% / 70%), tags = 3 pill ghosts.
- Hero and header render immediately (static, no data dependency) — only the showcase region shows skeletons.

```
┌─────────────────────────────────┐
│ ░░                              │   ← index ghost
│ ┌─────────────────────────────┐ │
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │   ← thumb shimmer
│ └─────────────────────────────┘ │
│ ░░░░░░░░░░░░░░░░░░              │   ← title bar (60%)
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   ← summary bar
│ ░░░░░░░░░░░░░░                  │
│ ▢▢▢  ▢▢▢▢  ▢▢▢▢▢▢              │   ← tag ghosts
└─────────────────────────────────┘
```

**Error — two layers:**
1. **Data-fetch error (expected):** `useProjects()` exposes `isError`. Render `<ShowcaseErrorState />` *in place of the list* — a quiet, non-alarming message: `"Couldn't load the work right now."` + a secondary **Retry** button that re-invokes the query. Header/hero/footer remain intact. This is the common case (API at `localhost:1337` down).
2. **Render error (unexpected):** `<PortfolioErrorBoundary>` (a class component with `getDerivedStateFromError`) wraps the data region. If a child throws during render, it shows a minimal fallback card with a "Reload" action — preventing a white screen of death. The boundary wraps **only the showcase**, so a thrown card error never takes down the header or contact CTA.

**Empty:** `isSuccess && projects.length === 0` → `<EmptyState />`: centered, `"Work is being curated — check back soon."` with the same vertical rhythm as a single card so the page never collapses.

**Hover / focus (per `ProjectCard`):**
- Default → hover: thumb scales `1.02` (`ease-in-out 300ms`), summary text shifts `text-muted → text-ink`, the `↗` arrow translates `+2px / -2px`.
- **Focus-visible:** `ring-2 ring-accent ring-offset-2` on the card `<a>` — keyboard users get the same affordance. Tab order follows DOM (top→bottom).
- Reduced-motion: drop scale/translate; keep only the color transition.

**Scroll:**
- Cards fade-and-rise in on first intersection (`IntersectionObserver`, opacity 0→1 + `translate-y-4→0`, staggered ~60ms). One-shot — never re-animates on scroll back.
- Header gains `backdrop-blur` + hairline bottom border once `scrollY > hero height`.

---

# VIEW 2 — Project Detail View

**Route:** `/work/:slug`
**Container:** `features/portfolio/ProjectDetailPage.jsx`
**Purpose:** A focused case study. One project, told as a vertical narrative: hero → context → visuals → outcome → next. The minimalist constraint forces hierarchy: title, the work, the takeaway.

## 2.1 Semantic UI Component Tree

```
<ProjectDetailPage>                     ← container: useProject(slug)
│
├─ <DetailErrorBoundary>
│
├─ <SiteHeader />                        ← shared, but in "detail" mode:
│  └─ <BackLink />                       ← "← Work" replaces nav on mobile
│
├─ <article>                             ← semantic: this IS the document
│  │
│  ├─ {isLoading} → <ProjectDetailSkeleton />
│  ├─ {isError}   → <DetailErrorState />          ← incl. 404 / not-found
│  │
│  ├─ <ProjectHeader>
│  │  ├─ <Breadcrumb />                  ← Work / Aurora Dashboard
│  │  ├─ <ProjectTitle />                ← <h1>, text-5xl
│  │  ├─ <ProjectTagline />              ← one-line premise
│  │  └─ <ProjectMetaBar>                ← role · year · stack · links
│  │     ├─ <MetaItem label="Role" />
│  │     ├─ <MetaItem label="Year" />
│  │     ├─ <StackTags />
│  │     └─ <ExternalLinks>              ← Live ↗ · Code ↗
│  │
│  ├─ <HeroMedia />                      ← full-bleed cover, priority-loaded
│  │
│  ├─ <ProjectOverview>                  ← "The brief" — prose, max-w-prose
│  │  └─ <RichText />                    ← rendered body (sanitized)
│  │
│  ├─ <ProjectGallery>                   ← <figure> sequence
│  │  └─ <GalleryItem>…                  ← lazy <img> + <figcaption>
│  │
│  ├─ <OutcomeBlock />                   ← results / metrics, pull-quote style
│  │
│  └─ <ProjectPager>                     ← prev / next project nav
│     ├─ <PagerLink dir="prev" />
│     └─ <PagerLink dir="next" />
│
└─ <SiteFooter />
```

## 2.2 Vertical Mobile Layout Wireframe (375px)

```
┌─────────────────────────────────────┐
│  ← Work                          ●jb │  ← SiteHeader (detail mode, sticky)
├─────────────────────────────────────┤
│                                       │
│  Work / Aurora Dashboard              │  ← Breadcrumb (mono, text-xs)
│                                       │
│  Aurora                               │  ← ProjectTitle <h1>
│  Dashboard                            │     text-5xl, tracking-tight
│                                       │
│  Realtime analytics, rebuilt for the  │  ← Tagline (text-lg, muted)
│  speed traders actually need.         │
│                                       │
│  ───────────────────────────────────  │  ← MetaBar (border-y, py-4)
│  ROLE   Lead Front-end                │     stacked key/value rows
│  YEAR   2024                          │
│  STACK  React · TS · WebSockets       │
│  ┌──────────┐  ┌──────────┐           │
│  │ Live  ↗  │  │ Code  ↗  │           │  ← ExternalLinks (buttons)
│  └──────────┘  └──────────┘           │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │                                 │ │  ← HeroMedia (full-bleed)
│  │        [ cover image ]          │ │     aspect-[16/10], rounded-2xl
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                       │
│  THE BRIEF                            │  ← Overview section label
│  The previous dashboard took 4s to    │  ← RichText prose
│  paint a single chart. We rebuilt the │     max-w-prose, leading-relaxed
│  data layer around a streaming model… │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │      [ gallery image 1 ]        │ │  ← ProjectGallery (figure)
│  └─────────────────────────────────┘ │
│  Fig 1 — The streaming pipeline       │  ← figcaption (text-xs, muted)
│                                       │
│  ┌─────────────────────────────────┐ │
│  │      [ gallery image 2 ]        │ │
│  └─────────────────────────────────┘ │
│  Fig 2 — Latency before / after       │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  "Time-to-chart dropped from    │ │  ← OutcomeBlock (pull-quote)
│  │   4s to 180ms."                 │ │     text-3xl, border-l accent
│  └─────────────────────────────────┘ │
│                                       │
│  ───────────────────────────────────  │  ← ProjectPager (border-t)
│  ← PREV          NEXT →               │
│  Nimbus API      Helio Store          │
│                                       │
├─────────────────────────────────────┤
│  GitHub · LinkedIn · X        © 26    │  ← SiteFooter
└─────────────────────────────────────┘
```

The narrative reads as **one continuous column** — a vertical case study. `<article>` is the semantic root; sections are separated by hairline borders and `space-y-20`, never boxes.

## 2.3 Responsive Adaptation Notes

| Region | Mobile (base) | Tablet (`sm`/`md`) | Desktop (`lg`+) |
|---|---|---|---|
| `SiteHeader` | `← Work` back link only | back link + brand | full nav returns; back link folds into breadcrumb |
| `ProjectHeader` | title + tagline stacked, meta as rows | meta as 2-col grid | **split header:** title/tagline left (60%), `MetaBar` as a sticky right rail (`lg:sticky lg:top-24`, 40%) |
| `ProjectMetaBar` | stacked key/value rows | inline pairs | vertical sidebar list, sticky while body scrolls |
| `HeroMedia` | `aspect-[16/10]`, edge-to-edge w/ gutter | `aspect-[16/9]` | **breaks the content max-width** to go full-bleed (`w-screen`, centered) — the one intentional bleed for drama |
| `ProjectOverview` | full-width prose | `max-w-prose` centered | `max-w-prose` aligned to the left content column |
| `ProjectGallery` | 1-col stacked | 1-col, larger | optional **2-up grid** for paired before/after shots; tall shots stay 1-col |
| `ProjectPager` | prev/next stacked or side-by-side compact | side-by-side | side-by-side with hover preview thumbnails |

> **Desktop signature move:** the **sticky meta rail**. As the reader scrolls the case study, role/year/stack/links stay pinned — so context never scrolls away. This is what separates a "blog post" from a "case study."

## 2.4 UX Micro-interactions & States

**Loading — `<ProjectDetailSkeleton />`**
- Shown while `useProject(slug)` resolves. Mirrors the real article geometry: a title bar, a tagline bar, a meta-row block, and a **hero-media placeholder at the exact `aspect-[16/10]`** so the large image never causes a jump.
- Prose area: 4–5 staggered text bars at varying widths (`100% / 95% / 88% / 70%`). Gallery: 2 aspect-locked shimmer blocks.

```
┌─────────────────────────────────┐
│ ░░░░░░░░░░░░░░                   │  ← title bar
│ ░░░░░░░░░░░░░░░░░░░░             │  ← tagline bar
│ ░░░  ░░░  ░░░░░░                 │  ← meta ghosts
│ ┌─────────────────────────────┐ │
│ │ ░░░░░ hero shimmer ░░░░░░░░░ │ │  ← aspect-locked
│ └─────────────────────────────┘ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← prose bars
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░     │
│ ░░░░░░░░░░░░░░░░░               │
└─────────────────────────────────┘
```

**Error — layered, with an explicit not-found path:**
1. **Not found (404):** if `useProject(slug)` resolves empty (bad/stale slug), render `<DetailErrorState variant="notFound" />` — `"This project doesn't exist (or moved)."` + a primary **"← Back to all work"** link. This is a *content* state, not a crash.
2. **Fetch failure:** API unreachable → `variant="error"` with a **Retry**. Header back-link stays usable so the user is never trapped.
3. **Render crash:** `<DetailErrorBoundary>` wraps `<article>` and catches thrown render errors (e.g. malformed rich-text body), showing a minimal recover card. Boundary excludes header/footer so navigation survives.

**Media behavior:**
- `HeroMedia` is **priority/eager-loaded** with width/height set (no CLS); gallery images are `loading="lazy"` with a blur-up placeholder (`bg-white/5` → fade-in on `onLoad`).
- If an image 404s, `onError` swaps to a neutral `bg-white/5` frame with a small `"image unavailable"` mono caption — never a broken-image icon.

**Reading affordances:**
- Optional thin **scroll-progress bar** under the header (accent, `scaleX` tied to scroll) — subtle, dev-portfolio appropriate.
- `ExternalLinks` open in a new tab (`target="_blank" rel="noopener noreferrer"`), with the `↗` icon translating on hover.
- `ProjectPager` links: hover reveals the next project's title with a `translate-x` nudge in the arrow direction. `focus-visible` ring matches showcase cards.

**Transitions / navigation:**
- Showcase → Detail: the page enters with a `300ms` fade + slight `translate-y`. If/when a router with View Transitions is added, the tapped `ProjectThumb` is the natural shared-element target (cover image morphs into `HeroMedia`).
- Back navigation restores scroll position on the showcase (scroll restoration), so returning to a long index doesn't dump the user at the top.
- All motion gated by `prefers-reduced-motion`.

---

## Appendix — Reusable primitives (`src/components/`)

These are shared by both views and should be built once:

| Component | Responsibility | Notes |
|---|---|---|
| `<Skeleton>` | shimmer block primitive | accepts `className` for geometry; respects reduced-motion (static when set) |
| `<Tag>` | mono tech chip | used in both showcase cards and detail meta |
| `<Button>` / `<LinkButton>` | primary/secondary/ghost | full-width on mobile via prop |
| `<ErrorBoundary>` | class boundary | generic; feature wrappers (`PortfolioErrorBoundary`, `DetailErrorBoundary`) pass tailored fallbacks |
| `<ErrorState>` | inline error/empty/not-found | `variant` prop drives copy + action |
| `<ArrowIcon>` | `↗` / `→` | single source, animated via parent hover |

### Hook contracts (`features/portfolio/hooks/`)
```js
// useProjects() — Showcase
{ projects, isLoading, isError, isEmpty, refetch }

// useProject(slug) — Detail
{ project, isLoading, isError, isNotFound, refetch }
```
Both wrap `portfolioService` and normalize the Strapi `data` envelope so components never touch the raw response shape.

---

*End of spec. Wireframes are intentionally low-fidelity — they fix hierarchy, semantics, and state coverage, not pixels. Visual polish is owned by the theme tokens in `src/core/theme/`.*
