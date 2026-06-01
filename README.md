# SuraTech — Frontend

A high-end, minimalist personal creative portfolio. A curated showcase of work
(Home) plus focused per-project case studies, served by a Strapi backend.

**Stack:** React 19 · Tailwind CSS v4 · Vite · React Router · Vitest · feature-driven architecture.

The full UX spec lives in [`docs/ux-portfolio-wireframes.md`](docs/ux-portfolio-wireframes.md).

## Related Projects

### Backend API

This frontend consumes data from a separate Strapi backend:

- Backend repository: https://github.com/JorgeBojaca/suratech-backend

Refer to the backend README for setup instructions and content management details.

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
| `npm test`        | Run the unit tests once (Vitest)         |
| `npm run test:watch` | Run Vitest in watch mode              |

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

## Testing

Unit tests run on **Vitest** with **React Testing Library** in a **jsdom**
environment. Vitest reuses the Vite pipeline, so there's no separate test
build config.

```bash
npm test            # run once (CI-style)
npm run test:watch  # re-run on change
```

**Configuration** lives in the `test` block of [`vite.config.js`](vite.config.js):

| Option | Value | Why |
| ------ | ----- | --- |
| `environment` | `jsdom` | DOM APIs for `renderHook` / component tests |
| `clearMocks`  | `true` | reset mock call data between tests for isolation |

The config import is `defineConfig` from `vitest/config` (a superset of
Vite's), and ESLint applies Node globals to `*.config.js`.

**Conventions**

- **Co-location:** a unit's test is its `*.test.jsx` sibling in the same folder
  (e.g. [`hooks/useProject.test.jsx`](src/features/portfolio/hooks/useProject.test.jsx)).
  Vitest auto-discovers `**/*.{test,spec}.{js,jsx}` under `src/`.
- **Mock the boundary, not the unit:** mock the data layer with `vi.mock`
  (e.g. `portfolioService`) and assert the hook/component logic in isolation —
  no network calls. Each test supplies its own minimal return shapes rather
  than relying on a shared data fixture.
- **Async hooks:** drive them with `renderHook` + `waitFor`; wrap imperative
  calls (e.g. `refetch`) in `act`.

## Conventions

- **Tailwind prefix `st-`** (SuraTech namespace, configured in
  [`vite.config.js`](vite.config.js)) scopes utility classes and avoids
  collisions with third-party styles.
- **Theme tokens** in `src/core/theme/` are the single source of truth —
  components never hardcode color values.

## AI Contribution
AI was used as a collaborative development assistant throughout this project.

The process began with Claude Code generating a detailed [`UX specification document`](docs/ux-portfolio-wireframes.md), including mobile-first wireframes, component hierarchy, responsive behavior, and interaction states. This provided a clear blueprint for the implementation.

I then developed the application incrementally, creating the routing structure, custom hooks, and core application logic. Throughout the implementation, I used AI as a coworker to review ideas, suggest improvements, refine React components, and enhance the Tailwind CSS implementation. The most valuable contribution was accelerating the creation of responsive layouts and helping improve the overall UI quality.

Development followed an iterative workflow where changes were implemented in small, testable steps. AI-generated suggestions were evaluated through testing and adjusted when necessary. While AI contributed significantly to design refinement and implementation speed, the project’s architecture, custom hooks, business logic, and final technical decisions were driven by me.
