import { useCallback, useEffect, useRef, useState } from "react";
import portfolioService from "../services/portfolioService";

const PAGE_SIZE = 6;

/**
 * useProjects — paginated project list for the showcase with infinite scroll.
 *
 * - `isLoading`  → first page only (drives the skeleton)
 * - `isFetchingMore` → subsequent pages (drives an inline spinner; the list stays)
 * - `loadMore()` → call from an IntersectionObserver; fully guarded
 * - `hasMore`    → derived from Strapi's meta.pagination.pageCount
 *
 * Race/leak protection: one in-flight request at a time (loadingRef), stale
 * results dropped via controller identity, and the in-flight request aborted
 * on unmount.
 */
function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const controllerRef = useRef(null); // current request, for supersede/unmount abort
  const loadingRef = useRef(false);   // idempotency gate for loadMore
  const pageRef = useRef(1);          // next page — avoids stale closures
  const seenIds = useRef(new Set());  // dedup safety net

  const load = useCallback(async (page) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    loadingRef.current = true;

    const initial = page === 1;
    if (initial) setIsLoading(true);
    else setIsFetchingMore(true);
    setIsError(false);

    const { error, aborted, data, pagination } = await portfolioService.getProjects({
      page,
      pageSize: PAGE_SIZE,
      signal: controller.signal,
    });

    // Superseded by a newer load (or unmounted) → drop result; the owner resets flags.
    if (aborted || controllerRef.current !== controller) return;

    if (error) {
      setIsError(true);
    } else {
      setProjects((prev) => {
        const fresh = data.filter((p) => !seenIds.current.has(p.id));
        fresh.forEach((p) => seenIds.current.add(p.id));
        return fresh.length ? [...prev, ...fresh] : prev; // idempotent append
      });
      const { page: current = page, pageCount = page } = pagination ?? {};
      pageRef.current = current + 1;
      setHasMore(current < pageCount);
    }

    if (initial) setIsLoading(false);
    else setIsFetchingMore(false);
    loadingRef.current = false;
  }, []);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return;
    load(pageRef.current);
  }, [hasMore, load]);

  const refetch = useCallback(() => {
    seenIds.current.clear();
    pageRef.current = 1;
    setProjects([]);
    setHasMore(true);
    load(1);
  }, [load]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial page fetch
    load(1);
    return () => controllerRef.current?.abort();
  }, [load]);

  const isEmpty = !isLoading && !isError && projects.length === 0;

  return { projects, isLoading, isFetchingMore, isError, isEmpty, hasMore, loadMore, refetch };
}

export default useProjects;
