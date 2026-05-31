import ErrorBoundary from '../../../../components/ErrorBoundary';
import Button from '../../../../components/Button';

/**
 * Fallback shown when a child of the showcase throws during render
 * (e.g. a malformed project). Card-sized so the layout doesn't collapse;
 * "Try again" clears the boundary so React re-renders the children.
 */
function ShowcaseFallback({ reset }) {
  return (
    <div
      role="alert"
      className="st:flex st:flex-col st:items-start st:gap-4 st:rounded-2xl st:border st:border-line st:p-6 st:py-12"
    >
      <div className="st:flex st:flex-col st:gap-1">
        <p className="st:text-base st:font-medium st:text-ink">
          Something went wrong displaying the work.
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
 * PortfolioErrorBoundary — wraps the showcase data region only, so a render
 * crash here never takes down the header, contact CTA, or footer.
 *
 * @param {() => void} [onReset]  e.g. the hook's refetch, to pair with reset
 */
function PortfolioErrorBoundary({ children, onReset }) {
  return (
    <ErrorBoundary onReset={onReset} fallback={({ reset }) => <ShowcaseFallback reset={reset} />}>
      {children}
    </ErrorBoundary>
  );
}

export default PortfolioErrorBoundary;
