import TagList from '../../../../components/TagList';
import ProjectTitle from './ProjectTitle';
import ProjectSummary from './ProjectSummary';

/**
 * ProjectMeta — the content block of a project: title, summary, tags.
 * Purely presentational. Card chrome (index "01", ↗ arrow) lives in the
 * parent ProjectCard; the summary's group-hover still resolves against the
 * card's <a>, so it works wherever this is nested.
 *
 * @param {string} name
 * @param {string} summary
 * @param {string[]} stack
 */
function ProjectMeta({ name, summary, stack }) {
  return (
    <div className="st:flex st:flex-col st:gap-2">
      <ProjectTitle>{name}</ProjectTitle>
      {summary && <ProjectSummary>{summary}</ProjectSummary>}
      {stack?.length > 0 && (
        <div className="st:mt-2">
          <TagList tags={stack} />
        </div>
      )}
    </div>
  );
}

export default ProjectMeta;
