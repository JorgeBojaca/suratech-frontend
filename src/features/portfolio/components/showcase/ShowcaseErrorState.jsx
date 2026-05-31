import Button from '../../../../components/Button';

/**
 * ShowcaseErrorState — shown in place of the project list when useProjects()
 * fails (the common case: API unreachable). Intentionally quiet and
 * non-alarming, with a secondary Retry that re-invokes the query. Keeps a
 * card-sized vertical rhythm so the page doesn't collapse.
 *
 * @param {() => void} onRetry  re-runs the query (the hook's refetch)
 */
function ShowcaseErrorState({ onRetry }) {
  return (
    <div
      role="alert"
      className="st:flex st:flex-col st:items-start st:gap-4 st:py-12"
    >
      <p className="st:text-sm st:text-muted">
        Couldn&apos;t load the work right now.
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export default ShowcaseErrorState;
