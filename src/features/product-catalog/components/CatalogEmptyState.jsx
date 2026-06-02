/**
 * CatalogEmptyState — shown when useProducts() succeeds but returns nothing
 * (isEmpty). Reassuring, not an error: no Retry (spec §5.2). Keeps vertical
 * rhythm so the page doesn't collapse.
 */
function CatalogEmptyState() {
  return (
    <div role="status" className="st:flex st:flex-col st:items-start st:gap-1 st:py-16">
      <p className="st:text-base st:font-medium st:text-ink">No products yet</p>
      <p className="st:text-sm st:text-muted">Check back soon.</p>
    </div>
  );
}

export default CatalogEmptyState;
