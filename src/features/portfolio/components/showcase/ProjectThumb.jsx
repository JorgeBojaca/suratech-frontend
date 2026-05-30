/**
 * ProjectThumb — aspect-locked, lazy-loaded cover image.
 * The wrapper holds a faint token-based placeholder (visible while the image
 * loads or when `src` is missing). On card hover the image scales subtly;
 * the transform collapses under reduced-motion.
 */
function ProjectThumb({ src, alt = '' }) {
  return (
    <div className="st:aspect-[16/10] st:w-full st:overflow-hidden st:rounded-xl st:bg-ink/5">
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="st:size-full st:object-cover st:transition-transform st:duration-300 st:ease-in-out st:group-hover:scale-[1.02] st:motion-reduce:transform-none"
        />
      )}
    </div>
  );
}

export default ProjectThumb;
