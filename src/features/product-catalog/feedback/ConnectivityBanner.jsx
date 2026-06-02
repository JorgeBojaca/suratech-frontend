import { useEffect, useState } from 'react';

const getOnline = () => (typeof navigator === 'undefined' ? true : navigator.onLine);

/**
 * ConnectivityBanner — a global, app-wide bar shown while the browser reports
 * it's offline (driven by the window `online`/`offline` events). Catches the
 * "no connection" case regardless of which request failed. Renders nothing when
 * online.
 *
 * Caveat: navigator.onLine only knows about a network interface, not whether
 * the API is reachable — server-down-while-online is surfaced via toasts, not
 * this banner.
 */
function ConnectivityBanner() {
  const [online, setOnline] = useState(getOnline);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div
      role="status"
      className="st:flex st:items-center st:justify-center st:gap-2 st:border-b st:border-line st:bg-surface st:px-4 st:py-2 st:text-sm st:text-muted"
    >
      <span className="st:size-1.5 st:rounded-full st:bg-amber-500" aria-hidden="true" />
      You’re offline — some content may be unavailable.
    </div>
  );
}

export default ConnectivityBanner;
