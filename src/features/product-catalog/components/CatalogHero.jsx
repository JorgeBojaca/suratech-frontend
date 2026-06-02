import CatalogHeroSkeleton from './CatalogHeroSkeleton';

// Static fallbacks so the page stays useful from the product API alone when
// Strapi content is missing or fails (spec §4.1, §5.5).
const FALLBACK_TITLE = 'Catalog';
const FALLBACK_HERO_TITLE = 'Products';

/**
 * CatalogHero — the editorial hero, driven by Strapi content (spec §4.1).
 * Presentational: CatalogPage owns the content + product queries and feeds:
 *   - content        { title, heroTitle, heroDescription } | null  (Strapi)
 *   - isLoading      hero content still loading → skeleton
 *   - count          item count, sourced from the product region
 *   - isCountVisible show the count only once products resolve
 *
 * Resilience: when content is missing (null / Strapi failure) the hero renders
 * static fallback copy rather than an error. The H1 owns #catalog-heading,
 * which the product list references via aria-labelledby.
 *
 * @param {{ title?: string, heroTitle?: string, heroDescription?: string } | null} [content]
 * @param {boolean} [isLoading]
 * @param {number}  [count]
 * @param {boolean} [isCountVisible]
 */
function CatalogHero({ content, isLoading = false, count = 0, isCountVisible = false }) {
  if (isLoading) return <CatalogHeroSkeleton />;

  const title = content?.title || FALLBACK_TITLE;
  const heroTitle = content?.heroTitle || FALLBACK_HERO_TITLE;
  const heroDescription = content?.heroDescription;

  return (
    <header className="st:pt-8 st:sm:pt-12">
      <p className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle">
        {title}
      </p>

      <h1
        id="catalog-heading"
        className="st:mt-2 st:text-3xl st:font-semibold st:text-ink st:sm:text-4xl"
      >
        {heroTitle}
      </h1>

      {heroDescription && (
        <p className="st:mt-3 st:max-w-prose st:text-base st:text-muted">
          {heroDescription}
        </p>
      )}

      {isCountVisible && (
        <p className="st:mt-3 st:text-sm st:text-muted">
          {count} {count === 1 ? 'item' : 'items'}
        </p>
      )}
    </header>
  );
}

export default CatalogHero;
