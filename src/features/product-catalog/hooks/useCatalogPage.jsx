import { useCallback, useEffect, useRef, useState } from 'react';
import catalogService from '../services/catalogService';
import { ErrorKind } from '../../../core/http/http';
import { useNotify } from '../feedback/useNotify';
import { contentErrorToast } from '../productErrorCopy';

/**
 * Normalize the Strapi single-type payload to a flat content object. Strapi v4
 * nests fields under data.attributes; v5 flattens them onto data. Tolerates a
 * plain object too, so the hook doesn't care which shape it gets.
 */
function toContent(payload) {
  const attrs = payload?.data?.attributes ?? payload?.data ?? payload ?? {};
  const { title, heroTitle, heroDescription } = attrs;
  return { title, heroTitle, heroDescription };
}

/**
 * useCatalogPage — Strapi-driven page content (title / heroTitle /
 * heroDescription). `content` stays null until it resolves, and on failure it
 * stays null on purpose so the hero falls back to static copy (spec §4.1, §5.5).
 *
 * Because that soft-fail is otherwise invisible, the failure is ALSO surfaced
 * globally via useNotify() — a relevant, non-blocking toast — so the customer
 * knows they're seeing defaults. Outside the feedback provider, notify is a
 * no-op and the hook still degrades gracefully. Same race/leak guards as
 * useProducts.
 */
function useCatalogPage() {
  const [content, setContent] = useState(null);
  const notify = useNotify();

  const controllerRef = useRef(null);

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const { ok, aborted, errorKind, data } = await catalogService.getContent({
      signal: controller.signal,
    });

    // Superseded/unmounted → drop silently (not an error).
    if (aborted || controllerRef.current !== controller) return;

    // Soft-fail: keep content null (hero uses fallback) but tell the customer.
    if (!ok || !data) {
      notify(contentErrorToast(errorKind ?? ErrorKind.UNKNOWN));
      return;
    }

    setContent(toContent(data));
  }, [notify]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  return { content };
}

export default useCatalogPage;
