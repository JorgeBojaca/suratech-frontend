import { useState } from 'react';
import Container from './Container';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const linkClass =
  'st:rounded-sm st:text-muted st:transition-colors st:hover:text-ink st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent';

/**
 * Brand — logomark + name, links to top of page.
 */
function Brand() {
  return (
    <a href="#top" className="st:flex st:items-center st:gap-2 st:font-mono st:text-sm st:font-medium st:text-ink">
      <span className="st:size-2 st:rounded-full st:bg-accent" aria-hidden="true" />
      JB
    </a>
  );
}

/**
 * SiteHeader — shared sticky header (spec §1.1/§1.3).
 * Brand on the left; inline nav from sm+; on mobile a hamburger opens a
 * full-screen overlay. Sticky with a translucent blurred background and a
 * hairline bottom border. The theme toggle lives in the header on all sizes.
 */
function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="st:sticky st:top-0 st:z-40 st:border-b st:border-line st:bg-paper/80 st:backdrop-blur">
        <Container className="st:flex st:h-14 st:items-center st:justify-between">
          <Brand />

          <div className="st:flex st:items-center st:gap-4">
            {/* Inline nav — sm+ */}
            <nav aria-label="Primary" className="st:hidden st:sm:block">
              <ul className="st:flex st:items-center st:gap-6 st:text-sm">
                {NAV.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className={linkClass}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <ThemeToggle />

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="st:inline-flex st:size-9 st:items-center st:justify-center st:rounded-md st:border st:border-line st:text-ink st:transition-colors st:hover:bg-surface st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent st:sm:hidden"
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Full-screen overlay nav — mobile.
          Rendered as a sibling of <header> (not a child): the header's
          backdrop-filter would otherwise become the containing block for
          this fixed element and trap it inside the h-14 bar. */}
      {open && (
        <div id="mobile-nav" className="st:fixed st:inset-0 st:z-50 st:bg-paper st:sm:hidden">
          <Container className="st:flex st:h-14 st:items-center st:justify-between">
            <Brand />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="st:inline-flex st:size-9 st:items-center st:justify-center st:rounded-md st:border st:border-line st:text-ink st:transition-colors st:hover:bg-surface st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </Container>

          <nav aria-label="Mobile">
            <ul className="st:flex st:flex-col st:gap-6 st:px-5 st:py-10 st:text-3xl st:font-medium st:tracking-tight">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="st:text-ink st:transition-colors st:hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default SiteHeader;
