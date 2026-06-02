import { ErrorKind } from '../../core/http/http';

/**
 * Customer-facing copy per error kind — the single source of truth for what
 * shoppers see when the catalog fails. Kept blameless and action-oriented
 * (a 4xx on a product list is usually a bad URL / token, not the shopper's
 * fault), and free of status codes / internal jargon.
 *
 * Localizing later = swapping this map; nothing else changes.
 */
export const PRODUCT_ERROR_COPY = {
  [ErrorKind.USER]: {
    title: 'We couldn’t load these products',
    body: 'Please refresh the page, or check back in a few minutes.',
  },
  [ErrorKind.SERVER]: {
    title: 'Our catalog is having a moment',
    body: 'This one’s on us — we’re already looking into it. Please try again shortly.',
  },
  [ErrorKind.NETWORK]: {
    title: 'You appear to be offline',
    body: 'Check your connection and try again.',
  },
  [ErrorKind.UNKNOWN]: {
    title: 'Something went wrong',
    body: 'Please try again. If it keeps happening, come back a little later.',
  },
};

/** Fallback when errorKind is missing or unrecognized. */
export const DEFAULT_PRODUCT_ERROR_COPY = PRODUCT_ERROR_COPY[ErrorKind.UNKNOWN];

/**
 * Toast copy for a soft-failed page-content load (useCatalogPage). The hero
 * still renders fallback copy, so these are reassuring "showing defaults"
 * messages, not blockers.
 */
export const CONTENT_ERROR_TOAST = {
  [ErrorKind.NETWORK]: { title: 'You appear to be offline', body: 'Showing default page content.' },
  [ErrorKind.SERVER]: { title: 'Couldn’t load the latest page content', body: 'Showing defaults for now.' },
  [ErrorKind.USER]: { title: 'Couldn’t load page content', body: 'Showing defaults for now.' },
  [ErrorKind.UNKNOWN]: { title: 'Couldn’t load page content', body: 'Showing defaults for now.' },
};

/** Resolve the content toast for an errorKind, with a safe fallback. */
export const contentErrorToast = (errorKind) =>
  CONTENT_ERROR_TOAST[errorKind] ?? CONTENT_ERROR_TOAST[ErrorKind.UNKNOWN];
