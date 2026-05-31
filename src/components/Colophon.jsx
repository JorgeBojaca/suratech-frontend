/**
 * Colophon — build credit + current year (spec §1.2).
 * Year is computed at render so it never goes stale.
 */
function Colophon() {
  const year = new Date().getFullYear();

  return (
    <p className="st:text-sm st:text-subtle">
      Built with React + Tailwind <span aria-hidden="true" className="st:px-1">·</span> © {year}
    </p>
  );
}

export default Colophon;
