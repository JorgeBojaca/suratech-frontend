/**
 * SocialLinks — external profile links, dot-separated (spec §1.2).
 * Open in a new tab with safe rel; muted, brightening to ink on hover.
 */
function SocialLinks({links}) {
  return (
    <ul className="st:flex st:items-center st:gap-3 st:text-sm">
      {links.map(({ label, href }, i) => (
        <li key={label} className="st:flex st:items-center st:gap-3">
          {i > 0 && <span aria-hidden="true" className="st:text-subtle">·</span>}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="st:rounded-sm st:text-muted st:transition-colors st:hover:text-ink st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
