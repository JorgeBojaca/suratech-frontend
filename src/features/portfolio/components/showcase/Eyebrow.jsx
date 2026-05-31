/**
 * Eyebrow — small mono kicker above the hero headline (spec §1.2),
 * e.g. "Developer & Designer". Accent-colored, uppercase, tracked out.
 */
function Eyebrow({ children }) {
  return (
    <p className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-accent">
      {children}
    </p>
  );
}

export default Eyebrow;
