import Button from '../../../components/Button';
import { PRODUCT_ERROR_COPY, DEFAULT_PRODUCT_ERROR_COPY } from '../productErrorCopy';

/**
 * CatalogErrorState — shown in place of the product list when useProducts()
 * fails. Maps the hook's `errorKind` to customer copy (single source of truth
 * in productErrorCopy) and offers a Retry that re-runs the query (spec §5.3).
 *
 * @param {string} [errorKind]  ErrorKind.* from useProducts
 * @param {() => void} [onRetry]
 */
function CatalogErrorState({ errorKind, onRetry }) {
  const copy = PRODUCT_ERROR_COPY[errorKind] ?? DEFAULT_PRODUCT_ERROR_COPY;

  return (
    <div role="alert" className="st:flex st:flex-col st:items-start st:gap-4 st:py-16">
      <div className="st:flex st:flex-col st:gap-1">
        <p className="st:text-base st:font-medium st:text-ink">{copy.title}</p>
        <p className="st:text-sm st:text-muted">{copy.body}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export default CatalogErrorState;
