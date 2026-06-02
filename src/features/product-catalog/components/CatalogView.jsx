import useProducts from '../hooks/useProducts';
import useCatalogPage from '../hooks/useCatalogPage';
import CatalogTitle from './CatalogTitle';
import CatalogHero from './CatalogHero';
import ProductCatalog from './ProductCatalog';
import CatalogErrorBoundary from './CatalogErrorBoundary';

/**
 * CatalogView — owns the catalog's data and composes the two regions: the
 * Strapi-driven hero and the API-driven list, each in its own error boundary so
 * they fail independently (spec §5.0). The item count is sourced from the
 * product query and handed to the hero.
 *
 * Rendered inside CatalogFeedbackProvider (by CatalogPage) so useCatalogPage's
 * soft-fail can raise a global toast via useNotify().
 */
function CatalogView() {
  const { products, isLoading, isError, isEmpty, errorKind, refetch } = useProducts();
  const { content } = useCatalogPage();
  const isCountVisible = !isLoading && !isError;

  return (
    <>
      <CatalogTitle content={content} />

      <CatalogErrorBoundary>
        <CatalogHero content={content} count={products.length} isCountVisible={isCountVisible} />
      </CatalogErrorBoundary>

      <CatalogErrorBoundary onReset={refetch}>
        <ProductCatalog
          products={products}
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          errorKind={errorKind}
          onRetry={refetch}
        />
      </CatalogErrorBoundary>
    </>
  );
}

export default CatalogView;
