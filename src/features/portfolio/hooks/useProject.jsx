import { useCallback, useEffect, useState } from "react";
import portfolioService from "../services/portfolioService";

/**
 * useProject(slug) — slug-driven single-project fetch for the detail view.
 * Self-fetches whenever `slug` changes and aborts the previous request, so
 * rapid project switching never leaves a slow earlier response to overwrite
 * the current one. Distinguishes not-found (empty result) from error.
 *
 * @param {string} slug  from the /portfolio/work/:slug route param
 */
function useProject(slug) {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0); // bump to retry

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();

    // Reset status before fetching the new slug (legitimate data-fetch effect).
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsLoading(true);
    setIsError(false);
    setIsNotFound(false);
    /* eslint-enable react-hooks/set-state-in-effect */

    portfolioService.getProject({ slug, signal: controller.signal }).then((res) => {
      if (res.aborted) return; // slug changed / unmounted → ignore stale
      if (res.error) setIsError(true);
      else if (!res.data) setIsNotFound(true);
      else setProject(res.data);
      setIsLoading(false);
    });

    return () => controller.abort(); // abort on slug change / unmount
  }, [slug, reloadKey]);

  return { project, isLoading, isError, isNotFound, refetch };
}

export default useProject;
