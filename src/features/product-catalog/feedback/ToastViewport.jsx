import { useContext } from 'react';
import { FeedbackContext } from './feedbackContext';

/**
 * ToastViewport — renders the queued toasts from CatalogFeedbackProvider.
 * Fixed, bottom of the viewport (bottom-right on sm+), above page content.
 * aria-live="polite" so screen readers announce new messages without stealing
 * focus. Returns null when there's nothing to show.
 */
function ToastViewport() {
  const ctx = useContext(FeedbackContext);
  const toasts = ctx?.toasts ?? [];
  const dismiss = ctx?.dismiss;

  if (!toasts.length) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="st:pointer-events-none st:fixed st:inset-x-0 st:bottom-0 st:z-50 st:flex st:flex-col st:items-center st:gap-2 st:p-4 st:sm:items-end"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="st:pointer-events-auto st:flex st:w-full st:max-w-sm st:items-start st:gap-3 st:rounded-lg st:border st:border-line st:bg-surface st:p-4 st:shadow-lg"
        >
          <div className="st:flex st:flex-1 st:flex-col st:gap-0.5">
            <p className="st:text-sm st:font-medium st:text-ink">{toast.title}</p>
            {toast.body && <p className="st:text-xs st:text-muted">{toast.body}</p>}
          </div>
          {dismiss && (
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className="st:rounded-sm st:text-muted st:transition-colors st:hover:text-ink st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent"
            >
              <span aria-hidden="true">✕</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;
