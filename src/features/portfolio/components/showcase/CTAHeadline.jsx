/**
 * CTAHeadline — oversized closing headline for the contact band (spec §1.2).
 * text-4xl on mobile, scaling up to text-6xl on desktop.
 */
function CTAHeadline({ children }) {
  return (
    <h2 className="st:text-4xl st:font-medium st:tracking-tight st:text-balance st:text-ink st:lg:text-6xl">
      {children}
    </h2>
  );
}

export default CTAHeadline;
