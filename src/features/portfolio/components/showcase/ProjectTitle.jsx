/**
 * ProjectTitle — the project name inside a showcase card.
 * Mobile-first scale (text-2xl → text-3xl at lg). Color via the ink token,
 * so it tracks the active theme.
 */
function ProjectTitle({ children }) {
  return (
    <h3 className="st:text-2xl st:font-medium st:tracking-tight st:text-ink st:lg:text-3xl">
      {children}
    </h3>
  );
}

export default ProjectTitle;
