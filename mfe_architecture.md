# Front-End Architecture Using Microfrontends

## Chosen Microfrontend Strategy

**Module Federation (Webpack 5) with a Shell/Host Application**

The recommended strategy is a **runtime integration** model using Webpack 5 Module Federation. Each team owns an independently deployable React application (a "remote") that exposes components or routes. A central shell application (the "host") orchestrates layout, routing, authentication, and dynamic loading of remotes at runtime — without rebuilding itself when a remote changes.

**Why this over alternatives:**

- *Iframe-based integration* is simple but introduces severe UX and communication limitations at scale.
- *Build-time integration* (npm packages) creates tight coupling — a single team's release blocks the whole deployment train, defeating the purpose of team autonomy.
- *Server-side composition* (e.g., ESI) shifts complexity to infrastructure and complicates frontend-only iteration.

Module Federation hits the right balance: true runtime independence, shared dependency negotiation (React, React-DOM are singletons across remotes), and no iframe isolation penalties. Teams deploy on their own cadence, and the shell resolves the latest remote URL at load time from a **manifest service** (a lightweight JSON registry updated per deployment).

**Team Boundaries:** Each team owns one or more bounded domains — e.g., `team-checkout` owns `/checkout/*`, `team-catalog` owns `/products/*`. Boundaries are enforced by route ownership, not just convention. Cross-team communication happens through a shared **Event Bus** (a thin pub/sub wrapper over native `CustomEvent`) or a **shared state atom** (e.g., Zustand slice) exposed via the shell — never through direct remote-to-remote imports, which would create invisible coupling.

A **shared design system package** (`@platform/ui`) is published independently and versioned. Remotes consume it as a singleton, keeping visual consistency without forcing a monolithic dependency graph.

---

## CI/CD Pipeline Design

Each microfrontend lives in its own repository (or a well-isolated Nx/Turborepo monorepo workspace). The pipeline is **per-remote**, fully independent, and triggered on merge to `main`.

**Step 1 — Code Quality Gate**
Static analysis (ESLint, TypeScript strict mode) and unit tests (Vitest/Jest) run in parallel. A coverage threshold is enforced. This gate is mandatory; no pipeline proceeds on failure.

**Step 2 — Build & Bundle Analysis**
Webpack/Vite builds the remote and emits the Module Federation manifest. Bundle size is analyzed (via `bundlesize` or `size-limit`); a size regression above a defined threshold fails the build. Source maps are uploaded to a private error-tracking service (e.g., Sentry).

**Step 3 — Contract Testing**
Consumer-driven contract tests (Pact) verify that the remote's exposed API (props, event signatures) still satisfies what other remotes or the shell expect. This prevents silent breaking changes without requiring end-to-end coordination.

**Step 4 — Preview / Staging Deployment**
Assets are deployed to a CDN (e.g., CloudFront + S3). A preview URL is generated per branch. The shell can be pointed at any remote's preview URL via query-param override — enabling isolated QA without touching production.

**Step 5 — Integration Smoke Tests**
A headless Playwright suite runs against the preview environment, loading the shell with the candidate remote. Covers critical user flows owned by that team. This is the only cross-team gate in the pipeline.

**Step 6 — Production Deployment (Blue/Green)**
Assets deploy to the production CDN path. The manifest service atomically updates the remote URL entry. Because assets are content-hashed and immutable, rollback is a manifest pointer update — instantaneous, no redeploy needed. Feature flags (via LaunchDarkly or Unleash) decouple release from deployment.

**Step 7 — Observability Check**
Post-deploy, a synthetic monitor validates the remote loads correctly in production. Real User Monitoring (RUM) dashboards alert on Core Web Vitals regressions within the first 15 minutes.

---

## Scalability Considerations

- **Horizontal team scaling:** New teams onboard by registering a new remote in the manifest; no changes to the shell codebase are required.
- **CDN-first asset delivery:** All remote bundles are static, immutable, and globally distributed — serving scales without backend involvement.
- **Manifest service as the single coordination point:** Lightweight and stateless, it can be replicated trivially and cached aggressively with short TTLs.
- **Lazy loading by route:** Remotes are only fetched when their route is activated, keeping initial payload constant regardless of how many remotes exist.
- **Independent scaling of CI:** Each remote's pipeline runs in isolation; adding remotes does not slow down existing pipelines.
- **Monorepo tooling:** If teams share a monorepo (Nx/Turborepo), affected-only builds ensure CI time scales with change surface, not codebase size.

---

## Maintainability Considerations

- **Strict ownership boundaries:** Route-to-team mapping is documented and enforced in the manifest, making ownership unambiguous and reducing coordination overhead.
- **Shared design system versioned independently:** UI components follow semantic versioning; remotes pin to a major version, preventing forced upgrades while allowing gradual migration.
- **Contract tests as living documentation:** Pact contracts serve as a machine-readable API contract between remotes, replacing informal agreements and reducing integration surprises.
- **Centralized observability:** All remotes emit to a shared logging and tracing platform with a `remote_name` dimension, enabling cross-team debugging without access to each other's repos.
- **Consistent toolchain via internal template:** A scaffolding CLI bootstraps new remotes with the standardized Webpack config, ESLint rules, testing setup, and pipeline definition — eliminating drift.
- **Deprecation policy for shared APIs:** The Event Bus and shared state contracts follow a two-release deprecation cycle, communicated through an internal RFC process.

---

## Performance Considerations

- **Singleton shared dependencies:** React, ReactDOM, and the design system are declared as `shared` singletons in Module Federation config, loaded once regardless of how many remotes are active.
- **Aggressive code splitting within remotes:** Each remote further splits by sub-route, so only the relevant slice of a team's code loads per page.
- **Immutable, long-lived CDN caching:** Content-hashed filenames allow `Cache-Control: max-age=31536000, immutable`, eliminating repeat download costs for returning users.
- **Critical path owned by the shell:** The shell is kept intentionally thin — routing, auth bootstrapping, and the app chrome only. No remote code is in the initial bundle.
- **Resource hints:** The shell emits `<link rel="prefetch">` for likely-next-route remotes after initial load, reducing perceived navigation latency without blocking first paint.
- **Core Web Vitals budgets enforced per remote:** LCP, CLS, and INP targets are defined per route and monitored via RUM; a regression in one remote does not mask another's healthy metrics.
- **Edge caching of the manifest:** The manifest JSON is served from the CDN edge with a short TTL (30–60 seconds), balancing propagation speed against origin load during high-traffic deploys.

---

## Exercise 03 AI Assistance

I created a prompt to generate a frontend architecture proposal and used Claude, Gemini, and ChatGPT to produce independent solutions.

Afterward, I compared the three generated architectures by evaluating them with the same AI models in separate sessions to reduce bias. Across these evaluations, Claude’s solution was consistently selected as the strongest answer.

The prompt used was:

```md
Act as a Principal Frontend Architect with experience designing large-scale frontend platforms.

Do not generate code.

Design a scalable front-end architecture using microfrontends and DevOps practices.

Requirements:
- Recommend a microfrontend strategy and explain why it was chosen.
- Explain how teams can work independently.
- Design a CI/CD pipeline for independent deployments.
- Include scalability considerations.
- Include maintainability considerations.
- Include performance considerations.

Assume a React application developed by multiple teams.

Format the answer using the following sections only:

# Front-End Architecture Using Microfrontends

## Chosen Microfrontend Strategy

(Explain the selected strategy, its benefits, and why it is appropriate.)

## CI/CD Pipeline Design

(Describe the deployment pipeline step-by-step.)

## Scalability Considerations

(Bullet points.)

## Maintainability Considerations

(Bullet points.)

## Performance Considerations

(Bullet points.)

Keep the answer concise, professional, and suitable for a technical assessment. Focus on architecture decisions and reasoning rather than implementation details.

```
