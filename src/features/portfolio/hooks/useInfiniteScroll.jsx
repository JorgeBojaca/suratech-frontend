import { useEffect, useRef } from "react";

/**
 * useInfiniteScroll — returns a ref for a sentinel element. When the sentinel
 * scrolls into view (with `rootMargin` lead so the next page prefetches before
 * the user reaches the bottom), `onLoadMore` is called. Observing stops when
 * `hasMore` is false. The callback is held in a ref so changing it doesn't
 * tear down and rebuild the observer.
 *
 * @param {() => void} onLoadMore
 * @param {boolean} hasMore
 * @param {string} [rootMargin]  prefetch lead distance (default "200px")
 */
function useInfiniteScroll({ onLoadMore, hasMore, rootMargin = "200px" }) {
  const sentinelRef = useRef(null);
  const callbackRef = useRef(onLoadMore);

  // Keep the latest callback without re-subscribing the observer.
  useEffect(() => {
    callbackRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) callbackRef.current?.();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, rootMargin]);

  return sentinelRef;
}

export default useInfiniteScroll;
