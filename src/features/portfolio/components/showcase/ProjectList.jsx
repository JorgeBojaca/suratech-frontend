import ProjectCard from './ProjectCard';

/**
 * ProjectList — the semantic <ul> index of work.
 * Owns the vertical rhythm between cards (gap-12). Each project becomes a
 * ProjectCard <li>, numbered with a 1-based index for the mono "01" label.
 *
 * @param {Array<object>} projects  list from useProjects()
 */
function ProjectList({ projects }) {
  return (
    <ul className="st:flex st:flex-col st:gap-12">
      {projects.map((project, idx) => (
        <ProjectCard key={project.id} project={project} index={idx + 1} />
      ))}
    </ul>
  );
}

export default ProjectList;
