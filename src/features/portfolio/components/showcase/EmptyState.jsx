/**
 * EmptyState — shown when useProjects() succeeds but returns no projects
 * (isEmpty). Reassuring, not an error: no Retry. Keeps a card-sized vertical
 * rhythm so the page doesn't collapse.
 */
function EmptyState() {
  return (
    <div role="status" className="st:flex st:flex-col st:items-start st:gap-1 st:py-12">
      <p className="st:text-base st:font-medium st:text-ink">No work to show yet</p>
      <p className="st:text-sm st:text-muted">
        It&apos;s being curated — check back soon.
      </p>
    </div>
  );
}

export default EmptyState;
