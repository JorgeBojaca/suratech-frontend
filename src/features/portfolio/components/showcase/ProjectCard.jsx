import TagList from '../../../../components/TagList';
import ProjectThumb from './ProjectThumb';
import ProjectTitle from './ProjectTitle';
import ProjectSummary from './ProjectSummary';

/**
 * ProjectCard — one project in the showcase index.
 * The whole <li><a> is the tap target. Mobile-first: stacked (thumb on top,
 * meta below); at sm+ it goes horizontal (thumb left ~45%, meta right).
 * `group` drives the hover affordances on the thumb, summary, and arrow.
 *
 * @param {object} project  shape: { name, slug, summary, stack[], coverUrl }
 * @param {number} index    1-based position, rendered as a mono "01"
 */
function ProjectCard({ project, index }) {
  const { name, slug, summary, stack, coverUrl } = project;
  const label = String(index ?? '').padStart(2, '0');

  return (
    <li>
      <a
        href={`/work/${slug}`}
        className="st:group st:flex st:flex-col st:gap-4 st:rounded-2xl st:p-4 st:transition-colors st:hover:bg-surface st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent st:sm:flex-row st:sm:gap-6"
      >
        <div className="st:shrink-0 st:sm:w-[45%]">
          <ProjectThumb src={coverUrl} alt={name} />
        </div>

        <div className="st:flex st:flex-1 st:flex-col st:gap-2">
          <div className="st:flex st:items-start st:justify-between st:gap-3">
            <div className="st:flex st:flex-col st:gap-1">
              {label && (
                <span className="st:font-mono st:text-xs st:text-subtle">{label}</span>
              )}
              <ProjectTitle>{name}</ProjectTitle>
            </div>
            <span
              aria-hidden="true"
              className="st:text-lg st:text-muted st:transition-transform st:duration-300 st:ease-in-out st:group-hover:-translate-y-0.5 st:group-hover:translate-x-0.5 st:group-hover:text-ink st:motion-reduce:transform-none"
            >
              ↗
            </span>
          </div>

          <ProjectSummary>{summary}</ProjectSummary>

          {stack?.length > 0 && (
            <div className="st:mt-2">
              <TagList tags={stack} />
            </div>
          )}
        </div>
      </a>
    </li>
  );
}

export default ProjectCard;
