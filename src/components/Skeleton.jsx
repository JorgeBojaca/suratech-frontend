/**
 * Skeleton — shimmer block primitive for loading states.
 * Pass `className` for geometry (width / height / aspect / rounding).
 * Decorative only (aria-hidden); the pulse collapses under reduced-motion.
 */
function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`st:animate-pulse st:rounded-md st:bg-ink/10 st:motion-reduce:animate-none ${className}`}
    />
  );
}

export default Skeleton;
