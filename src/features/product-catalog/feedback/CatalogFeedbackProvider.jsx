import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FeedbackContext } from './feedbackContext';

let idSeq = 0;

/**
 * CatalogFeedbackProvider — owns the toast queue for the catalog feature and
 * exposes { toasts, notify, dismiss } via context. `notify(toast)` enqueues a
 * `{ title, body? }` message and auto-dismisses it after `autoDismissMs`;
 * `dismiss(id)` removes it early. This is the global channel that soft-failing
 * hooks (e.g. useCatalogPage) report into instead of failing silently.
 *
 * @param {number} [autoDismissMs]  0 disables auto-dismiss
 */
function CatalogFeedbackProvider({ children, autoDismissMs = 6000 }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    (toast) => {
      const id = (idSeq += 1);
      setToasts((list) => [...list, { id, ...toast }]);
      if (autoDismissMs > 0) {
        timersRef.current.set(id, setTimeout(() => dismiss(id), autoDismissMs));
      }
      return id;
    },
    [autoDismissMs, dismiss],
  );

  // Clear any pending timers on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

export default CatalogFeedbackProvider;
