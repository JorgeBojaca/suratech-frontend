import { Link } from 'react-router-dom';

/**
 * PagerLink — a prev/next link to an adjacent project. Hovering brightens the
 * title; the label nudges in the arrow's direction. Renders an empty spacer
 * when there's no neighbor, to keep the prev/next ends aligned.
 *
 * @param {'prev' | 'next'} dir
 * @param {{ name: string, slug: string } | null | undefined} project
 */
function PagerLink({ dir, project }) {
  const isPrev = dir === 'prev';
  if (!project) return <span aria-hidden="true" />;

  return (
    <Link
      to={`/work/${project.slug}`}
      className={`st:group st:flex st:flex-col st:gap-1 st:rounded-md st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent ${isPrev ? 'st:items-start' : 'st:items-end st:text-right'}`}
    >
      <span
        className={`st:font-mono st:text-xs st:uppercase st:tracking-widest st:text-subtle st:transition-transform st:duration-300 st:ease-in-out st:motion-reduce:transform-none ${isPrev ? 'st:group-hover:-translate-x-0.5' : 'st:group-hover:translate-x-0.5'}`}
      >
        {isPrev ? '← Prev' : 'Next →'}
      </span>
      <span className="st:text-lg st:font-medium st:text-muted st:transition-colors st:group-hover:text-ink">
        {project.name}
      </span>
    </Link>
  );
}

/**
 * ProjectPager — prev/next project navigation at the foot of a case study
 * (spec §2.1/§2.2). Hairline top border; side-by-side. Null when neither
 * neighbor exists.
 *
 * @param {{name, slug}} [prev]
 * @param {{name, slug}} [next]
 */
function ProjectPager({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Project navigation"
      className="st:flex st:items-start st:justify-between st:gap-6 st:border-t st:border-line st:pt-8"
    >
      <PagerLink dir="prev" project={prev} />
      <PagerLink dir="next" project={next} />
    </nav>
  );
}

export default ProjectPager;
