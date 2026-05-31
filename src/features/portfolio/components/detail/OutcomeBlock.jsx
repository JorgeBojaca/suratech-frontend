/**
 * OutcomeBlock — the result/takeaway as a pull-quote (spec §2.2),
 * e.g. "Time-to-chart dropped from 4s to 180ms." Accent left border,
 * oversized type. Returns null when there's no outcome.
 */
function OutcomeBlock({ children }) {
  if (!children) return null;

  return (
    <blockquote className="st:border-l-2 st:border-accent st:pl-6 st:text-3xl st:font-medium st:leading-snug st:tracking-tight st:text-balance st:text-ink st:lg:text-4xl">
      {children}
    </blockquote>
  );
}

export default OutcomeBlock;
