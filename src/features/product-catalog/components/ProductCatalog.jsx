import ProductList from './ProductList';
import ProductListSkeleton from './ProductListSkeleton';
import CatalogEmptyState from './CatalogEmptyState';
import CatalogErrorState from './CatalogErrorState';

/**
 * ProductCatalog — the catalog LIST region (spec §5.0). Presentational: it
 * renders the state matching the product query (loading → skeleton,
 * error → retry, empty → message, success → ProductList). The product query
 * lives in CatalogPage so the item count can also reach the hero; this
 * component just receives the result.
 *
 * The <section> is labelled by the hero's H1 (#catalog-heading) and marked
 * aria-busy while loading.
 *
 * @param {Array<object>} products
 * @param {boolean} isLoading
 * @param {boolean} isError
 * @param {boolean} isEmpty
 * @param {string} [errorKind]  ErrorKind.* — selects the customer message
 * @param {() => void} onRetry
 */
function ProductCatalog({ products, isLoading, isError, isEmpty, errorKind, onRetry }) {
  return (
    <section aria-labelledby="catalog-heading" aria-busy={isLoading} className="st:mt-8">
      {isLoading ? (
        <ProductListSkeleton />
      ) : isError ? (
        <CatalogErrorState errorKind={errorKind} onRetry={onRetry} />
      ) : isEmpty ? (
        <CatalogEmptyState />
      ) : (
        <ProductList products={products} />
      )}
    </section>
  );
}

export default ProductCatalog;
