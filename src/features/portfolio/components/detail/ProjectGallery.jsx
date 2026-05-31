import { useState } from 'react';

/**
 * GalleryItem — a single lazy, aspect-locked figure with a blur-up fade-in
 * and a graceful "image unavailable" fallback on error (spec §2.4).
 */
function GalleryItem({ src, alt = '', caption }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <figure className="st:flex st:flex-col st:gap-3">
      <div className="st:aspect-[16/10] st:w-full st:overflow-hidden st:rounded-xl st:bg-ink/5">
        {src && !errored ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`st:size-full st:object-cover st:transition-opacity st:duration-500 st:motion-reduce:transition-none ${loaded ? 'st:opacity-100' : 'st:opacity-0'}`}
          />
        ) : (
          <div className="st:flex st:size-full st:items-center st:justify-center">
            <span className="st:font-mono st:text-xs st:text-subtle">image unavailable</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="st:text-xs st:text-subtle">{caption}</figcaption>}
    </figure>
  );
}

/** Accepts a gallery item as a URL string or { url|src, alt, caption }. */
function normalize(item) {
  if (!item) return null;
  if (typeof item === 'string') return { src: item };
  return { src: item.url ?? item.src, alt: item.alt, caption: item.caption };
}

/**
 * ProjectGallery — sequence of case-study figures (spec §2.1/§2.3).
 * Stacked single column. Returns null when there are no images.
 *
 * @param {(string | {url?: string, src?: string, alt?: string, caption?: string})[]} items
 */
function ProjectGallery({ items }) {
  const figures = (items ?? []).map(normalize).filter(Boolean);
  if (figures.length === 0) return null;

  return (
    <section className="st:flex st:flex-col st:gap-8">
      {figures.map((fig, i) => (
        <GalleryItem key={fig.src ?? i} src={fig.src} alt={fig.alt} caption={fig.caption} />
      ))}
    </section>
  );
}

export default ProjectGallery;
