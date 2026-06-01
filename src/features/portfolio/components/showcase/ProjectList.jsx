import Spinner from '../../../../components/Spinner';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import ProjectCard from './ProjectCard';

/**
 * ProjectList — the semantic <ul> index of work, with infinite scroll.
 * Owns the vertical rhythm between cards (gap-12). A sentinel below the list
 * triggers `onLoadMore` (prefetching before the user hits the bottom); an
 * inline spinner shows while the next page loads, so the list never collapses.
 *
 * @param {Array<object>} projects
 * @param {() => void} [onLoadMore]
 * @param {boolean} [hasMore]
 * @param {boolean} [isFetchingMore]
 */
function ProjectList({ projects, onLoadMore, hasMore = false, isFetchingMore = false }) {
  const sentinelRef = useInfiniteScroll({ onLoadMore, hasMore });

  return (
    <>
      <ul className="st:flex st:flex-col st:gap-12">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx + 1} />
        ))}
      </ul>

      {hasMore && (
        <div ref={sentinelRef} className="st:flex st:justify-center st:py-10">
          {isFetchingMore && <Spinner label="Loading more projects" />}
        </div>
      )}
    </>
  );
}

export default ProjectList;
