/**
 * CatalogHeader — eyebrow + H1 + item count (spec §4.1).
 * The H1 owns the id the list region references via aria-labelledby. The count
 * is driven by products.length and hidden while loading (no number yet).
 *
 * @param {number} count
 * @param {boolean} [isLoading]
 */
function CatalogHeader({ count = 0, isLoading = false }) {
  return (
    <header className="st:pt-8 st:sm:pt-12">
      <p className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle">
        Catalog
      </p>
      <h1
        id="catalog-heading"
        className="st:mt-2 st:text-3xl st:font-semibold st:text-ink st:sm:text-4xl"
      >
        Products
      </h1>
      {!isLoading && (
        <p className="st:mt-1 st:text-sm st:text-muted">
          {count} {count === 1 ? 'item' : 'items'}
        </p>
      )}
    </header>
  );
}

export default CatalogHeader;
