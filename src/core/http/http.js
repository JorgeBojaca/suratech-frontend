/**
 * Shared HTTP layer. One place owns the fetch transport, the error taxonomy,
 * and the result shape — so every service stays a thin endpoint map and the
 * UI can map a single `errorKind` to a customer message.
 */

/**
 * Error taxonomy surfaced to the UI. Exactly one kind per failure.
 * Keep these as the single source of truth — services and copy maps both
 * import them instead of re-typing the strings.
 */
export const ErrorKind = {
  USER: 'USER_ERROR', // 4xx — bad request / auth / not-found / rate-limit
  SERVER: 'SERVER_ERROR', // 5xx, or a 2xx whose body wasn't valid JSON
  NETWORK: 'NETWORK_ERROR', // fetch rejected: offline / DNS / CORS / connection refused
  UNKNOWN: 'UNKNOWN_ERROR', // anything else thrown (most likely a code bug)
};

const isAbort = (err) => err?.name === 'AbortError';

const classifyStatus = (status) => {
  if (status >= 500) return ErrorKind.SERVER;
  if (status >= 400) return ErrorKind.USER;
  return ErrorKind.UNKNOWN; // non-2xx that isn't 4xx/5xx (rare; e.g. odd redirect)
};

/**
 * requestJSON — fetch + parse with a uniform result shape. Never throws.
 *
 * @param {string} url
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{
 *   ok: boolean,            // true → `data` is the parsed body
 *   aborted: boolean,       // true → request superseded/unmounted; drop it (not an error)
 *   errorKind: string|null, // ErrorKind.* when ok=false (null on success/abort)
 *   status: number|null,    // HTTP status when we got a response; null if fetch rejected
 *   data: any               // parsed body on success, else null
 * }>}
 *
 * Note: HTTP 4xx/5xx do NOT reject fetch — they come back as a resolved
 * response with `ok=false` and a real status. The `catch` only fires when the
 * request never produced a readable HTTP response (network/CORS/setup) or our
 * own code threw — see ErrorKind.NETWORK vs ErrorKind.UNKNOWN.
 */
export async function requestJSON(url, { signal } = {}) {
  let res;
  try {
    res = await fetch(url, { signal });
  } catch (err) {
    if (isAbort(err)) return { ok: false, aborted: true, errorKind: null, status: null, data: null };
    // Genuine network/CORS failures throw TypeError; anything else is a bug we
    // don't want to mislabel as "offline".
    const errorKind = err instanceof TypeError ? ErrorKind.NETWORK : ErrorKind.UNKNOWN;
    return { ok: false, aborted: false, errorKind, status: null, data: null };
  }

  if (!res.ok) {
    return { ok: false, aborted: false, errorKind: classifyStatus(res.status), status: res.status, data: null };
  }

  try {
    const data = await res.json();
    return { ok: true, aborted: false, errorKind: null, status: res.status, data };
  } catch {
    // 2xx but the body wasn't valid JSON → the server's fault, not the network.
    return { ok: false, aborted: false, errorKind: ErrorKind.SERVER, status: res.status, data: null };
  }
}
