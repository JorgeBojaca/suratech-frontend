import { Link } from 'react-router-dom';
import TagList from '../../../../components/TagList';
import LinkButton from '../../../../components/LinkButton';

/**
 * Breadcrumb — "Work / {name}". Links back to the showcase.
 */
function Breadcrumb({ name }) {
  return (
    <nav aria-label="Breadcrumb" className="st:font-mono st:text-xs st:text-subtle">
      <Link to="/portfolio" className="st:rounded-sm st:transition-colors st:hover:text-ink st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent">
        Work
      </Link>
      <span aria-hidden="true" className="st:px-1.5">/</span>
      <span className="st:text-muted">{name}</span>
    </nav>
  );
}

/**
 * MetaItem — a labelled key/value row in the meta bar (rendered as dt/dd).
 */
function MetaItem({ label, children }) {
  return (
    <div className="st:flex st:flex-col st:gap-1">
      <dt className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle">
        {label}
      </dt>
      <dd className="st:text-sm st:text-ink">{children}</dd>
    </div>
  );
}

/**
 * ProjectHeader — the detail view's header (spec §2.1/§2.3).
 * Mobile-first stacked; at lg it splits into title/tagline (left) and a
 * sticky meta rail (right) that stays pinned while the body scrolls.
 *
 * @param {object} project  { name, summary, role, year, stack[], liveUrl, repoUrl }
 */
function ProjectHeader({ project }) {
  const { name, summary, role, year, stack, liveUrl, repoUrl } = project;
  const hasLinks = liveUrl || repoUrl;

  return (
    <header className="st:grid st:gap-8 st:lg:grid-cols-[1fr_18rem] st:lg:gap-12">
      {/* Title block */}
      <div className="st:flex st:flex-col st:gap-4">
        <Breadcrumb name={name} />
        <h1 className="st:text-5xl st:font-medium st:leading-tight st:tracking-tight st:text-balance st:text-ink st:lg:text-6xl">
          {name}
        </h1>
        {summary && (
          <p className="st:max-w-prose st:text-lg st:text-muted">{summary}</p>
        )}
      </div>

      {/* Meta rail — sticky at lg */}
      <aside className="st:self-start st:lg:sticky st:lg:top-24">
        <div className="st:flex st:flex-col st:gap-4 st:border-t st:border-line st:py-4 st:lg:border-t-0 st:lg:py-0">
          <dl className="st:flex st:flex-col st:gap-4">
            {role && <MetaItem label="Role">{role}</MetaItem>}
            {year && <MetaItem label="Year">{year}</MetaItem>}
            {stack?.length > 0 && (
              <div className="st:flex st:flex-col st:gap-2">
                <dt className="st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle">
                  Stack
                </dt>
                <dd>
                  <TagList tags={stack} />
                </dd>
              </div>
            )}
          </dl>

          {hasLinks && (
            <div className="st:flex st:flex-wrap st:gap-3">
              {liveUrl && (
                <LinkButton href={liveUrl} variant="secondary" size="sm" external arrow="upRight">
                  Live
                </LinkButton>
              )}
              {repoUrl && (
                <LinkButton href={repoUrl} variant="secondary" size="sm" external arrow="upRight">
                  Code
                </LinkButton>
              )}
            </div>
          )}
        </div>
      </aside>
    </header>
  );
}

export default ProjectHeader;
