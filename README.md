# SuraTech — Frontend

A high-end, minimalist personal creative portfolio. A curated showcase of work
(Home) plus focused per-project case studies, served by a Strapi backend.

**Stack:** React 19 · Tailwind CSS v4 · Vite · feature-driven architecture.

The full UX spec lives in [`docs/ux-wireframes.md`](docs/ux-wireframes.md).

## Getting started

```bash
npm install
cp .env.example .env   # then adjust VITE_API_URL if needed
npm run dev
```

The app expects a Strapi API. By default it points at `http://localhost:1337`
(see [Configuration](#configuration)).

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Production build to `dist/`              |
| `npm run preview` | Serve the production build locally       |
| `npm run lint`    | Run ESLint over the project              |

## Configuration

Environment variables are read by Vite and must be prefixed with `VITE_`.
Copy `.env.example` to `.env` (the real `.env` is git-ignored).

| Variable       | Default                 | Description                       |
| -------------- | ----------------------- | --------------------------------- |
| `VITE_API_URL` | `http://localhost:1337` | Base URL of the Strapi API        |

The value is centralized in [`src/core/config/index.js`](src/core/config/index.js)
and consumed by the service layer — components never read env vars directly.

## Project structure

Feature-driven: cross-cutting primitives live under `src/core` and
`src/components`; each feature owns its pages, components, hooks, and services.

```
src/
├─ core/
│  ├─ config/        # env / API base URL
│  └─ theme/         # Tailwind v4 @theme tokens (single source of truth)
├─ components/       # shared primitives (Button, Tag, Skeleton, …)
└─ features/
   ├─ routes/        # route table → maps paths to feature pages
   └─ portfolio/
      ├─ PortfolioPage.jsx       # Showcase (Home)
      ├─ ProjectDetailPage.jsx   # Project detail
      ├─ components/             # showcase/ and detail/ presentational components
      ├─ hooks/                  # useProjects, useProject
      └─ services/               # portfolioService — Strapi fetch layer
```

### Data contract

`portfolioService` returns the Strapi `data` array. Each project is shaped as:

```js
{ id, name, slug, summary, role, year, stack[], coverUrl, gallery[], liveUrl, repoUrl, body }
```

## Conventions

- **Tailwind prefix `st-`** (SuraTech namespace, configured in
  [`vite.config.js`](vite.config.js)) scopes utility classes and avoids
  collisions with third-party styles.
- **Theme tokens** in `src/core/theme/` are the single source of truth —
  components never hardcode color values.
