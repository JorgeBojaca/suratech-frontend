import ErrorBoundary from '../../../../components/ErrorBoundary';
import Button from '../../../../components/Button';

/**
 * Fallback for a render crash inside the case study (e.g. a malformed
 * rich-text body). Offers a retry plus a guaranteed way back to the index.
 */
function DetailFallback({ reset }) {
  return (
    <div role="alert" className="st:flex st:flex-col st:items-start st:gap-4 st:py-16">
      <div className="st:flex st:flex-col st:gap-1">
        <p className="st:text-2xl st:font-medium st:tracking-tight st:text-ink">
          Something went wrong showing this project.
        </p>
        <p className="st:text-sm st:text-muted">
          An unexpected error occurred while rendering the case study.
        </p>
      </div>
      <div className="st:flex st:items-center st:gap-4">
        <Button variant="secondary" onClick={reset}>
          Try again
        </Button>
        <a
          href="/"
          className="st:inline-flex st:items-center st:gap-1 st:rounded-sm st:text-sm st:text-muted st:transition-colors st:hover:text-ink st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent"
        >
          <span aria-hidden="true">←</span> Back to all work
        </a>
      </div>
    </div>
  );
}

/**
 * DetailErrorBoundary — wraps the <article> only, so a render crash in the
 * case study never takes down the header or footer (spec §2.4).
 *
 * @param {() => void} [onReset]  e.g. the hook's refetch, paired with reset
 */
function DetailErrorBoundary({ children, onReset }) {
  return (
    <ErrorBoundary onReset={onReset} fallback={({ reset }) => <DetailFallback reset={reset} />}>
      {children}
    </ErrorBoundary>
  );
}

export default DetailErrorBoundary;
