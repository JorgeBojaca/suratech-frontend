import { createContext } from 'react';

/**
 * FeedbackContext — value: { toasts, notify, dismiss }.
 * Provided by CatalogFeedbackProvider; consumed by useNotify (to raise) and
 * ToastViewport (to render). Null outside a provider so consumers can no-op.
 */
export const FeedbackContext = createContext(null);
