import useProjects from '../../hooks/useProjects';
import SectionLabel from './SectionLabel';
import ProjectList from './ProjectList';
import ProjectListSkeleton from './ProjectListSkeleton';
import ShowcaseErrorState from './ShowcaseErrorState';
import EmptyState from './EmptyState';

/**
 * ProjectShowcase — the curated index of work (spec §1.1).
 * Owns its data via useProjects() and renders the SectionLabel plus the
 * matching state: loading → skeleton, error → retry, empty → message,
 * success → ProjectList. The label persists across every state so the
 * section stays identifiable.
 */
function ProjectShowcase() {
  const { projects, isLoading, isError, isEmpty, refetch } = useProjects();

  return (
    <section aria-labelledby="selected-work">
      <SectionLabel id="selected-work">Selected Work →</SectionLabel>

      <div className="st:mt-8">
        {isLoading ? (
          <ProjectListSkeleton />
        ) : isError ? (
          <ShowcaseErrorState onRetry={refetch} />
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
    </section>
  );
}

export default ProjectShowcase;
