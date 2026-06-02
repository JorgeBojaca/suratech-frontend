# Product Catalog — Mobile-First Wireframe & Layout Spec

> **Scope:** A simple, fast page that lists product **titles**. The page draws from **two independent data sources** (see §0.5): the **product list** comes from the Fake Store **API**, while the page's **editorial content** (hero copy) comes from **Strapi** — three fields: `title`, `heroTitle`, `heroDescription`.
> **Stack:** React 19 · React Router 7 · Tailwind CSS **v4** (CSS-first, `st:` prefix) · Vite · Feature-driven architecture.
> **Design language:** Inherits the existing monochrome + single-accent system (dark default, light token swap) defined in `src/core/theme/index.css`. Components consume **semantic tokens only** — never hardcoded hex.
> **Author:** Senior UI/UX Architect · **Status:** Ready for build · **Date:** 2026-06-01

---

## 0. Design principles (non-negotiable)

1. **Mobile-first.** Author base styles for the smallest viewport (320–375px). Layer enhancements **up** with `st:sm:` → `st:md:` → `st:lg:`. Never write desktop-first and walk back.
2. **Token-only styling.** Use `st:bg-paper`, `st:text-ink`, `st:text-muted`, `st:text-subtle`, `st:border-line`, `st:text-accent`, `st:bg-surface`. No raw colors. This is what keeps the light/dark swap free.
3. **Content-first.** The hero copy is editor-owned (Strapi); the list is text-heavy (titles, price, category). The list shows **titles** — image is secondary and may be deferred at this altitude.
4. **Every async surface has 4 states:** `loading` (skeleton) · `success` · `empty` · `error`. Mirror the portfolio feature's `*Skeleton` / `EmptyState` / `*ErrorState` / `*ErrorBoundary` pattern. **Each data source owns its own four states** (§0.5).
5. **Accessible by construction.** Semantic landmarks, a real list (`<ul>`/`<li>`), `aria-busy` during load, focus-visible rings on the accent token, `motion-reduce` honored.

---

## 0.5 Data sources (two, independent)

The page composes **two regions backed by two different origins**. They load **in parallel and degrade independently** — a Strapi outage must not blank the product list, and an API outage must not blank the hero.

| Region        | Origin                         | Hook              | Service                  | Shape |
|---------------|--------------------------------|-------------------|--------------------------|-------|
| **Hero + title**| **Strapi** (single type)     | `useCatalogPage`  | `catalogPageService.js`  | one content object |
| **Product list** | **Fake Store API**          | `useProducts`     | `catalogService.js`      | array of products |

**Strapi content object** (single type, e.g. `GET {API_URL}/api/product-catalog-page`) — **three fields**:

| Field            | Type   | Destination                                              |
|------------------|--------|---------------------------------------------------------|
| `title`          | string | **Eyebrow** label above the hero (mono, uppercase). Also drives the document `<title>` (browser tab). |
| `heroTitle`      | string | **H1** — the hero headline.                             |
| `heroDescription`| text   | **Lede** paragraph under the H1 (`max-w-prose`, muted).  |

> **Document title via React 19.** `title` is rendered as a plain `<title>` element inside a component; React 19 **hoists it into `<head>`** automatically — no `react-helmet` dependency needed. There are no dedicated SEO fields (no `<meta name="description">` from the CMS at this altitude). See §6.3.

**Product object** (array, `GET https://fakestoreapi.com/products`): `{ id, title, price, category, image, rating, description }` — only `title` / `price` / `category` are rendered at this altitude (full mapping in §3).

---

## 1. Breakpoints & layout grid

Tailwind v4 defaults (used with the `st:` prefix). Catalog targets three layouts:

| Token       | Min width | Catalog layout         | Container padding | Columns |
|-------------|-----------|------------------------|-------------------|---------|
| *(base)*    | 0px       | Single column, stacked | `st:px-4`         | 1       |
| `st:sm:`    | 640px     | Single column, wider   | `st:px-6`         | 1       |
| `st:md:`    | 768px     | 2-up grid              | `st:px-6`         | 2       |
| `st:lg:`    | 1024px    | 3-up grid + sidebar gap| `st:px-8`         | 3       |

**Page container** (the shared `Container` component): `st:mx-auto st:w-full st:px-5 st:sm:max-w-2xl st:sm:px-8 st:lg:max-w-5xl`. Hero copy is further capped at `max-w-prose` for readable line lengths; the grid uses the full `max-w-5xl`.

---

## 2. Page anatomy (mobile, 375px)

```
┌─────────────────────────────────────┐  ← viewport 375px
│  [ SiteHeader — sticky, shared ]     │
│                                      │
│  st:px-5   st:pt-8     ▸ HERO        │  ← from Strapi (useCatalogPage)
│  ┌───────────────────────────────┐  │
│  │ CATALOG            (eyebrow)  │  │  ← {title} · mono, uppercase, subtle
│  │ Find your everyday gear  (H1) │  │  ← {heroTitle} · text-ink, text-3xl/4xl
│  │ Curated essentials, priced    │  │  ← {heroDescription} · lede, muted,
│  │ to move. Browse the list.     │  │     max-w-prose
│  │ 20 items                      │  │  ← count · from products.length (API)
│  └───────────────────────────────┘  │
│                                      │
│  st:mt-8           ▸ LIST REGION     │  ← from Fake Store API (useProducts)
│  ┌───────────────────────────────┐  │
│  │ ● men's clothing      $109.95 │  │  ← ProductRow  (category pill · price)
│  │ Fjallraven - Foldsack No. 1   │  │  ← TITLE  (clamp 2 lines, text-ink)
│  │ Backpack, Fits 15 Laptops     │  │
│  ├───────────────────────────────┤  │  ← st:border-line divider
│  │ ● men's clothing       $22.30 │  │
│  │ Mens Casual Premium Slim Fit  │  │
│  │ T-Shirts                      │  │
│  ├───────────────────────────────┤  │
│  │ ● jewelery            $695.00 │  │
│  │ John Hardy Women's ...        │  │
│  └───────────────────────────────┘  │
│                                      │
│  st:pb-16          [ SiteFooter ]    │
└─────────────────────────────────────┘
```

> **`<head>` (not visible):** `title` → document `<title>`, hoisted by React 19 (§6.3).

The mobile list is a **stacked, divided list** (not cards). Dividers (`st:divide-y st:divide-line`) are lighter weight than card borders and keep the eye scanning titles vertically — the right pattern for a "list of titles." The item **count** lives in the hero block but is sourced from the **product** region, so it only appears once products resolve.

### 2.1 Tablet/desktop (`st:md:` → grid of cards)

At `md` the list promotes to a responsive grid of light cards so horizontal space is used:

```
md (768px) — 2 columns                    lg (1024px) — 3 columns
┌──────────────┐ ┌──────────────┐         ┌────────┐ ┌────────┐ ┌────────┐
│ ● category   │ │ ● category   │         │ ● cat  │ │ ● cat  │ │ ● cat  │
│ Title two    │ │ Title two    │         │ Title  │ │ Title  │ │ Title  │
│ lines max…   │ │ lines max…   │         │ …      │ │ …      │ │ …      │
│       $109.95│ │        $22.30│         │ $109.95│ │  $22.30│ │ $695.00│
└──────────────┘ └──────────────┘         └────────┘ └────────┘ └────────┘
```

Grid container: `st:divide-y st:divide-line st:md:grid st:md:grid-cols-2 st:md:gap-4 st:md:divide-y-0 st:lg:grid-cols-3`.

> **Single source, two looks.** `ProductRow` renders the same markup; the parent `ProductList` switches between *divided list* (mobile) and *grid of cards* (md+) via container utilities — the row only adds a hairline border + radius from `md` up (`st:md:rounded-lg st:md:border st:md:border-line`).

---

## 3. Component breakdown → feature architecture

Files live under the `src/features/product-catalog/` slice (the old `componets/` typo folder is removed; use `components/` to match the portfolio slice). **Bold** files are new in this revision (the Strapi/hero side).

```
src/features/product-catalog/
├── CatalogPage.jsx                   # route entry — composes hero + list, each in a boundary
├── services/
│   ├── catalogService.js             # products  → GET fakestoreapi.com/products
│   └── catalogPageService.js   ★     # page content → GET {API_URL}/api/product-catalog-page (Strapi)
├── hooks/
│   ├── useProducts.jsx               # { products, isLoading, isError, isEmpty, refetch }
│   └── useCatalogPage.jsx      ★     # { content, isLoading, isError, refetch }
└── components/
    ├── ProductCatalog.jsx            # data-owning section for the LIST (states + ProductList)
    ├── CatalogHero.jsx         ★     # eyebrow {title} + H1 {heroTitle} + lede {heroDescription} + count
    ├── CatalogHeroSkeleton.jsx ★     # shimmer for the hero block (aria-hidden)
    ├── CatalogTitle.jsx        ★     # renders <title> from {title} (React 19 hoist) — no DOM output
    ├── ProductList.jsx               # <ul> wrapper, list↔grid responsive switch
    ├── ProductRow.jsx                # <li> — category pill · title · price
    ├── CategoryPill.jsx              # ● {category}  (reuse AvailabilityPill idiom)
    ├── PriceTag.jsx                  # formatted currency
    ├── ProductListSkeleton.jsx       # N shimmer rows (aria-hidden)
    ├── CatalogEmptyState.jsx         # "No products yet"
    ├── CatalogErrorState.jsx         # message + Retry (list region)
    └── CatalogErrorBoundary.jsx      # wraps each data region (mirror PortfolioErrorBoundary)
```

### 3.1 Strapi content → UI / `<head>` mapping

| Strapi field      | UI element / slot      | Treatment                                                       |
|-------------------|------------------------|----------------------------------------------------------------|
| `title`           | Hero eyebrow + `<title>` | `st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle`; also the document title (React 19 hoist, static fallback) |
| `heroTitle`       | Hero **H1**            | `st:text-3xl st:sm:text-4xl st:font-semibold st:text-ink`      |
| `heroDescription` | Hero lede paragraph    | `st:mt-3 st:max-w-prose st:text-base st:text-muted`            |

### 3.2 Product API → UI field mapping

| API field        | UI element        | Treatment                                                        |
|------------------|-------------------|------------------------------------------------------------------|
| `title`          | **Primary**       | `st:line-clamp-2`, `st:text-ink`, `st:font-medium`, `st:text-base st:sm:text-lg` |
| `category`       | CategoryPill      | Pill, `st:text-subtle st:text-xs`, leading dot                   |
| `price`          | PriceTag          | `Intl.NumberFormat('en-US', {style:'currency',currency:'USD'})`, `st:text-muted` tabular-nums |
| `image`          | *(deferred)*      | Not rendered at this altitude — keep page text-fast.             |
| `description`    | *(omitted)*       | Belongs to a future detail route, not the list.                  |
| `rating`         | *(omitted)*       | Out of scope for "list titles."                                  |
| `id`             | `key`             | `key={id}`; future link target `/catalog/:id`.                   |

---

## 4. Component specs

### 4.1 `CatalogHero` (Strapi-driven)

```
┌──────────────────────────────────────┐
│ CATALOG                    (eyebrow)  │  {title}  · mono, uppercase, subtle
│ Find your everyday gear         (H1)  │  {heroTitle} · text-3xl/4xl, ink
│ Curated essentials, priced to move.   │  {heroDescription} · lede, muted,
│ Browse the list below.                │     max-w-prose
│ 20 items                       (count)│  ← injected from the product region
└──────────────────────────────────────┘
```

- Wrap in `<header>` with `st:pt-8 st:sm:pt-12`.
- `<h1 id="catalog-heading">{heroTitle}` — the list region references it via `aria-labelledby`.
- **Count** is a prop (`count`, `isCountVisible`) fed from the product region — `null`/hidden until products resolve, so the hero never shows a number it doesn't have yet.
- **Resilience:** if Strapi fails, render static fallbacks (`title='Catalog'`, `heroTitle='Products'`, no lede) rather than an error — the page is still useful from the API alone. The hero's *error* state is therefore soft (fallback copy), while its *loading* state is `CatalogHeroSkeleton`.

### 4.2 `CatalogTitle` (no visual output)

Sets the document title from `title`; React 19 hoists it into `<head>`.

```jsx
function CatalogTitle({ content }) {
  const titleText = content?.title || 'Product Catalog';
  return <title>{titleText}</title>;
}
```

- Mount it once near the top of `CatalogPage`. Safe to render with `content = null` (it emits the static fallback title until Strapi resolves). No `<meta name="description">` — there's no CMS field for it.

### 4.3 `ProductRow` (the core unit)

```jsx
<li className="st:group st:flex st:flex-col st:gap-1.5 st:py-4 st:transition-colors st:hover:bg-surface
               st:md:rounded-lg st:md:border st:md:border-line st:md:bg-surface st:md:p-4">
  <div className="st:flex st:items-center st:justify-between st:gap-3">
    <CategoryPill category={category} />
    <PriceTag value={price} />
  </div>
  <h2 className="st:line-clamp-2 st:text-base st:sm:text-lg st:font-medium st:text-ink">{title}</h2>
</li>
```

- **Tap target:** the full row is the interactive surface (min height ≈ 64px, clears the 44×44px touch minimum). When a detail route exists, wrap the title in a `<Link>` with a stretched-link pseudo (`st:after:absolute st:after:inset-0`).
- **Title is the visual anchor:** largest text in the row, highest-contrast token (`text-ink`).
- `st:line-clamp-2` prevents long titles (e.g. the Fjallraven one) from blowing out row height.

### 4.4 `CategoryPill`

Reuse the `AvailabilityPill` idiom (dot + label), simplified — no animation:

```jsx
<span className="st:inline-flex st:items-center st:gap-1.5 st:text-xs st:text-subtle">
  <span className="st:size-1.5 st:rounded-full st:bg-subtle" aria-hidden="true" />
  {category}
</span>
```

### 4.5 `PriceTag`

```jsx
<span className="st:text-sm st:font-medium st:text-muted st:tabular-nums">
  {formatPrice(value)}   {/* "$109.95" */}
</span>
```

`tabular-nums` keeps prices vertically aligned in the mobile list.

### 4.6 `ProductList`

```jsx
<section aria-labelledby="catalog-heading" aria-busy={isLoading}>
  <ul role="list"
      className="st:divide-y st:divide-line st:md:grid st:md:grid-cols-2 st:md:gap-4 st:md:divide-y-0 st:lg:grid-cols-3">
    {products.map((p) => <ProductRow key={p.id} product={p} />)}
  </ul>
</section>
```

Mobile = divided list. `md+` drops dividers and switches to a grid (`md:divide-y-0`).

---

## 5. Async states — per region (each gets all four)

### 5.0 Composition on the page

```
CatalogPage
├── CatalogTitle          (content | null — always safe)
├── CatalogErrorBoundary  ──► CatalogHero        ◄── useCatalogPage  (loading→HeroSkeleton, error→fallback copy)
└── CatalogErrorBoundary  ──► ProductCatalog     ◄── useProducts     (loading→ListSkeleton, error→Retry, empty→msg)
```

Two boundaries, two hooks → the regions fail independently.

### 5.1 Hero loading — `CatalogHeroSkeleton`

```
┌──────────────────────────────┐
│ ▭▭▭▭▭                        │  ← eyebrow placeholder (h-3 w-20)
│ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭            │  ← H1 placeholder   (h-8 w-2/3)
│ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭        │  ← lede line 1      (h-4 w-full max-w-prose)
│ ▭▭▭▭▭▭▭▭▭▭                   │  ← lede line 2      (h-4 w-1/2)
└──────────────────────────────┘
```

Reuse the shared `Skeleton` primitive; wrapper `aria-hidden="true"`.

### 5.2 List loading — `ProductListSkeleton`

Render **6–8 shimmer rows** matching `ProductRow` geometry so there's no layout shift on resolve. Wrapper `aria-hidden="true"`; the parent `<section>` carries `aria-busy="true"`.

```
┌──────────────────────────────┐
│ ▭▭▭▭            ▭▭▭▭          │  ← pill + price placeholders
│ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭          │  ← title line 1
│ ▭▭▭▭▭▭▭▭                     │  ← title line 2 (shorter)
└──────────────────────────────┘
```

### 5.3 List empty — `CatalogEmptyState`

Shown when the product request succeeds but `products.length === 0`. Reassuring, no Retry.

```
        st:py-16
        ┌────────────────────┐
        │  No products yet   │  st:text-ink st:font-medium
        │  Check back soon.  │  st:text-muted st:text-sm
        └────────────────────┘
```

### 5.4 List error — `CatalogErrorState`

Shown on product fetch/network failure. Offers recovery via the hook's `refetch`.

```
        st:py-16
        ┌──────────────────────────┐
        │  Couldn't load products  │  st:text-ink st:font-medium
        │  Something went wrong…    │  st:text-muted st:text-sm
        │  ┌────────────┐          │
        │  │  Retry     │          │  ← secondary Button, refetches
        │  └────────────┘          │
        └──────────────────────────┘
```

### 5.5 Hero error → soft fallback (not a blocker)

A Strapi failure renders **static fallback copy** (`Catalog` / `Products`, no lede), so the product list stays usable. Only a *render crash* trips `CatalogErrorBoundary`.

---

## 6. Data layer

### 6.1 `services/catalogService.js` (products — Fake Store API)

Returns the consistent `{ error, aborted, data }` shape (mirrors `portfolioService`). An aborted request is **not** an error.

```js
import { CATALOG_API_URL } from '../../../core/config'; // 'https://fakestoreapi.com'

getProducts: async ({ signal } = {}) => { /* GET /products → { error, aborted, data: [] } */ }
```

### 6.2 `services/catalogPageService.js` (page content — Strapi)

Single type. Reads `json.data` (the content object). Same shape contract.

```js
import { API_URL } from '../../../core/config'; // Strapi base, e.g. http://localhost:1337

const PAGE = '/api/product-catalog-page';        // single type; adjust to the real UID

getPageContent: async ({ signal } = {}) => {
  // GET `${API_URL}${PAGE}` → { error, aborted, data: { title, heroTitle, heroDescription } }
  // Strapi v4 nests under data.attributes; v5 flattens onto data. Normalize here so
  // the hook/component always sees a flat content object.
}
```

> Add `CATALOG_API_URL` to `src/core/config` for the product API; **reuse the existing `API_URL`** for the Strapi base (same origin as the portfolio content).

### 6.3 Hooks

- **`useProducts()`** → `{ products, isLoading, isError, isEmpty, refetch }`. AbortController; one in-flight request; abort on unmount; `refetch` for the Retry button.
- **`useCatalogPage()`** → `{ content, isLoading, isError, refetch }`. Same race/leak guards. `content` is `null` until resolved; consumers must tolerate `null` (hero fallbacks, `CatalogTitle`).

### 6.4 Document title with React 19

No `react-helmet`. Render `<title>` as an element (see §4.2); React 19 hoists it into `<head>` and dedupes. Keep `CatalogTitle` mounted regardless of state so the tab title is never empty. There's no CMS `<meta name="description">` at this altitude.

---

## 7. Spacing, type & token reference

| Role            | Token / utility                          |
|-----------------|------------------------------------------|
| Canvas          | `st:bg-paper st:text-ink`                |
| Raised card     | `st:bg-surface st:border-line`           |
| Hero H1 / Title | `st:text-ink st:font-semibold` / `st:font-medium` |
| Lede / price / count | `st:text-muted`                     |
| Eyebrow / category / meta | `st:text-subtle`               |
| Divider / border| `st:border-line` · `st:divide-line`      |
| Accent / focus  | `st:text-accent` · `st:ring-accent`      |
| Hero measure    | `st:max-w-prose` (lede only)             |
| Page rhythm     | hero `st:pt-8`, list `st:mt-8`, page `st:pb-16` |

**Vertical rhythm (mobile):** `pt-8` hero → `mt-3` lede → `mt-8` list → `py-4` per row → `pb-16` page.

---

## 8. Accessibility checklist

- [ ] Exactly one `<h1>` = `heroTitle` (`CatalogHero`); product rows use `<h2>`.
- [ ] Landmarks: `<header>` (hero), `<section aria-labelledby="catalog-heading">` (list), list as `<ul role="list">` / `<li>`.
- [ ] `aria-busy="true"` on the list section while loading; both skeletons `aria-hidden`.
- [ ] `<title>` is never empty (static fallback in `CatalogTitle`, then driven by `title`).
- [ ] All interactive elements show a focus-visible ring on the accent token.
- [ ] Touch targets ≥ 44×44px (rows clear this at `py-4`).
- [ ] Category dot / decorative glyphs are `aria-hidden="true"`.
- [ ] `st:motion-reduce:animate-none` on every pulse/shimmer.
- [ ] Color contrast meets WCAG AA in both themes (tuned in the theme tokens).

---

## 9. Build order (suggested)

1. Config: add `CATALOG_API_URL`; confirm `API_URL` (Strapi) is set.
2. Services: `catalogService.js` (products) + `catalogPageService.js` (Strapi single type).
3. Hooks: `useProducts.jsx` + `useCatalogPage.jsx` (data contracts first).
4. List unit: `ProductRow` + `CategoryPill` + `PriceTag` → `ProductList`.
5. Hero + title: `CatalogHero` + `CatalogHeroSkeleton` + `CatalogTitle`.
6. States: `ProductListSkeleton` / `CatalogEmptyState` / `CatalogErrorState` / `CatalogErrorBoundary`.
7. Compose `ProductCatalog` (list region) + `CatalogPage` (hero + list, two boundaries).
8. Wire the `/catalog` route in `src/features/routes`.

---

## 10. Out of scope (explicit)

Search/filter, sort, pagination/infinite scroll, product images, ratings, descriptions, add-to-cart, CMS-driven SEO meta (`<meta name="description">`, Open Graph), localization of the Strapi content, and the `/catalog/:id` detail route. This spec covers a **two-source landing page** (Strapi hero + API product titles); the architecture leaves clean seams for each of these later.
