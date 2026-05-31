import { API_URL } from '../../../core/config';

const isAbort = (err) => err?.name === 'AbortError';

async function getJSON(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status}): ${url}`);
  return res.json();
}

const portfolioService = {
  /**
   * List projects, paginated. Returns a consistent shape on every path:
   * { error, aborted, data, pagination }. An aborted request is NOT an
   * error — `aborted: true` lets the caller silently drop the stale result.
   */
  getProjects: async ({ page = 1, pageSize = 6, signal } = {}) => {
    const params = new URLSearchParams({
      'pagination[page]': String(page),
      'pagination[pageSize]': String(pageSize),
      sort: 'order:asc',
      populate: '*',
    });
    try {
      const json = await getJSON(`${API_URL}/api/projects?${params}`, signal);
      return {
        error: null,
        aborted: false,
        data: json.data ?? [],
        pagination: json.meta?.pagination ?? null,
      };
    } catch (error) {
      if (isAbort(error)) return { error: null, aborted: true, data: null, pagination: null };
      return { error, aborted: false, data: null, pagination: null };
    }
  },

  /**
   * Fetch a single project by slug. Returns { error, aborted, data } where
   * `data` is the project or null (not found).
   */
  getProject: async ({ slug, signal } = {}) => {
    const params = new URLSearchParams({
      'filters[slug][$eq]': slug ?? '',
      populate: '*',
    });
    try {
      const json = await getJSON(`${API_URL}/api/projects?${params}`, signal);
      return { error: null, aborted: false, data: json.data?.[0] ?? null };
    } catch (error) {
      if (isAbort(error)) return { error: null, aborted: true, data: null };
      return { error, aborted: false, data: null };
    }
  },
};

export default portfolioService;
