/**
 * CategoryPill — the product's category as a quiet meta chip with a leading
 * dot (spec §4.3). Simplified from AvailabilityPill: no animation, subtle tone.
 * The dot is decorative.
 *
 * @param {string} category
 */
function CategoryPill({ category }) {
  return (
    <span className="st:inline-flex st:items-center st:gap-1.5 st:text-xs st:text-subtle">
      <span className="st:size-1.5 st:rounded-full st:bg-subtle" aria-hidden="true" />
      {category}
    </span>
  );
}

export default CategoryPill;
