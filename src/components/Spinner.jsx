/**
 * Spinner — indeterminate loading indicator.
 * Color follows the accent token (via currentColor); size via `className`
 * (defaults to size-5). Announced to assistive tech through role="status".
 */
function Spinner({ className = '', label = 'Loading' }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`st:inline-block st:size-5 st:text-accent ${className}`}
    >
      <svg
        className="st:size-full st:animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="st:opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default Spinner;
