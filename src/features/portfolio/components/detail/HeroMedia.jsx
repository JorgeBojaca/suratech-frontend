import { useState } from 'react';

/**
 * HeroMedia — the detail view's cover image (spec §2.1/§2.4).
 * Priority/eager-loaded (it's the LCP element) inside an aspect-locked frame
 * so it never causes layout shift. On load failure it swaps to a neutral
 * frame with a mono "image unavailable" caption — never a broken-image icon.
 *
 * @param {string} src
 * @param {string} alt
 */
function HeroMedia({ src, alt = '' }) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <figure className="st:aspect-[16/10] st:w-full st:overflow-hidden st:rounded-2xl st:bg-ink/5 st:sm:aspect-[16/9]">
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={() => setErrored(true)}
          className="st:size-full st:object-cover"
        />
      ) : (
        <div className="st:flex st:size-full st:items-center st:justify-center">
          <span className="st:font-mono st:text-xs st:text-subtle">image unavailable</span>
        </div>
      )}
    </figure>
  );
}

export default HeroMedia;
