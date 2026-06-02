import ErrorBoundary from '../../../components/ErrorBoundary';
import Button from '../../../components/Button';

/**
 * Fallback shown when a child of the catalog throws during render
 * (e.g. a malformed product). Card-sized so the layout doesn't collapse;
 * "Try again" clears the boundary so React re-renders the children.
 */
function CatalogFallback({ reset }) {
  return (
    <div
      role="alert"
      className="st:flex st:flex-col st:items-start st:gap-4 st:rounded-2xl st:border st:border-line st:p-6 st:py-12"
    >
      <div className="st:flex st:flex-col st:gap-1">
        <p className="st:text-base st:font-medium st:text-ink">
          Something went wrong displaying the catalog.
        </p>
        <p className="st:text-sm st:text-muted">
          An unexpected error occurred while rendering this section.
        </p>
      </div>
      <Button variant="secondary" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}

/**
 * CatalogErrorBoundary — wraps the catalog data region only, so a render crash
 * here never takes down the page header or footer (spec §5.4).
 *
 * @param {() => void} [onReset]  e.g. the hook's refetch, to pair with reset
 */
function CatalogErrorBoundary({ children, onReset }) {
  return (
    <ErrorBoundary onReset={onReset} fallback={({ reset }) => <CatalogFallback reset={reset} />}>
      {children}
    </ErrorBoundary>
  );
}

export default CatalogErrorBoundary;
