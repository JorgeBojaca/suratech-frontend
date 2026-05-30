/**
 * ProjectSummary — one-line project blurb under the title.
 * Muted by default; shifts to ink on card hover (the parent card is the
 * `group`). Both colors are theme tokens, so they adapt per mode.
 */
function ProjectSummary({ children }) {
  return (
    <p className="st:text-sm st:leading-relaxed st:text-muted st:transition-colors st:group-hover:text-ink">
      {children}
    </p>
  );
}

export default ProjectSummary;
