import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import ThemeToggle from '../../components/ThemeToggle';

/**
 * The micro-frontends this shell links out to. Each is an independent app
 * mounted under its own route; the launcher only routes into them.
 */
const APPS = [
  {
    to: '/portfolio',
    label: 'Portfolio',
    description: 'Selected work, case studies, and contact — the personal showcase.',
  },
  {
    to: '/catalog',
    label: 'Product Catalog',
    description: 'A simple, fast index of products sourced from a live API.',
  },
];

/**
 * AppCard — one selectable micro-frontend. The whole card is the tap target;
 * `group` drives the arrow + surface hover affordances. The index is chrome.
 *
 * @param {{ to: string, label: string, description: string }} app
 * @param {number} index  1-based, rendered as a mono "01"
 */
function AppCard({ app, index }) {
  const label = String(index).padStart(2, '0');

  return (
    <Link
      to={app.to}
      className="st:group st:flex st:h-full st:flex-col st:gap-3 st:rounded-2xl st:border st:border-line st:p-6 st:transition-colors st:hover:bg-surface st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent"
    >
      <div className="st:flex st:items-start st:justify-between st:gap-3">
        <span className="st:font-mono st:text-xs st:text-subtle">{label}</span>
        <span
          aria-hidden="true"
          className="st:text-lg st:text-muted st:transition-transform st:duration-300 st:ease-in-out st:group-hover:-translate-y-0.5 st:group-hover:translate-x-0.5 st:group-hover:text-ink st:motion-reduce:transform-none"
        >
          ↗
        </span>
      </div>

      <h2 className="st:text-2xl st:font-medium st:tracking-tight st:text-ink">{app.label}</h2>
      <p className="st:text-sm st:text-muted">{app.description}</p>
    </Link>
  );
}

/**
 * LauncherPage — the shell entry at "/". Portfolio and Product Catalog are
 * independent micro-frontends; this standalone, full-screen chooser routes into
 * one or the other. Intentionally minimal: its own light chrome (just a theme
 * toggle), no portfolio SiteHeader/Footer.
 */
function LauncherPage() {
  return (
    <div className="st:flex st:min-h-screen st:flex-col st:bg-paper st:text-ink">
      <div className="st:flex st:justify-end st:p-4">
        <ThemeToggle />
      </div>

      <main className="st:flex st:flex-1 st:items-center">
        <Container className="st:w-full st:py-16">
          <p className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle">
            Launcher
          </p>
          <h1 className="st:mt-2 st:text-3xl st:font-semibold st:text-ink st:sm:text-4xl">
            Choose an app
          </h1>
          <p className="st:mt-3 st:max-w-prose st:text-base st:text-muted">
            Two independent front-ends behind one shell. Pick where you want to go.
          </p>

          <ul role="list" className="st:mt-10 st:grid st:grid-cols-1 st:gap-4 st:sm:grid-cols-2">
            {APPS.map((app, idx) => (
              <li key={app.to}>
                <AppCard app={app} index={idx + 1} />
              </li>
            ))}
          </ul>
        </Container>
      </main>
    </div>
  );
}

export default LauncherPage;
