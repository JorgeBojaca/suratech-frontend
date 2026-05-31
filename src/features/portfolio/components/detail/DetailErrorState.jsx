import Button from '../../../../components/Button';
import LinkButton from '../../../../components/LinkButton';

const COPY = {
  notFound: {
    title: "This project doesn't exist (or moved).",
    body: 'The link may be broken, or the work has been taken down.',
  },
  error: {
    title: "Couldn't load this project.",
    body: 'Something went wrong reaching the server.',
  },
};

/**
 * DetailErrorState — the detail view's error/not-found state (spec §2.4).
 *
 * - variant="notFound": a *content* state for a bad/stale slug. Reassuring,
 *   with a primary "← Back to all work" link out (never a dead end).
 * - variant="error": a fetch failure, with a Retry that re-runs the query.
 *
 * @param {'notFound' | 'error'} variant
 * @param {() => void} [onRetry]  re-runs the query (error variant)
 */
function DetailErrorState({ variant = 'error', onRetry }) {
  const copy = COPY[variant] ?? COPY.error;
  const isNotFound = variant === 'notFound';

  return (
    <div
      role={isNotFound ? 'status' : 'alert'}
      className="st:flex st:flex-col st:items-start st:gap-6 st:py-16"
    >
      <div className="st:flex st:flex-col st:gap-2">
        <p className="st:text-2xl st:font-medium st:tracking-tight st:text-balance st:text-ink">
          {copy.title}
        </p>
        <p className="st:text-sm st:text-muted">{copy.body}</p>
      </div>

      {isNotFound ? (
        <LinkButton href="/" variant="primary" arrow="left">
          Back to all work
        </LinkButton>
      ) : (
        onRetry && (
          <Button variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        )
      )}
    </div>
  );
}

export default DetailErrorState;
