import { useContext } from 'react';
import { FeedbackContext } from './feedbackContext';

const noop = () => undefined;

/**
 * useNotify — returns `notify(toast)` to raise a global message from anywhere
 * inside CatalogFeedbackProvider. Outside a provider it returns a no-op (so a
 * hook like useCatalogPage stays reusable and never hard-crashes for lack of a
 * provider).
 *
 * @returns {(toast: { title: string, body?: string }) => number | void}
 */
export function useNotify() {
  const ctx = useContext(FeedbackContext);
  return ctx?.notify ?? noop;
}
