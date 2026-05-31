import Skeleton from '../../../../components/Skeleton';

/**
 * ProjectCardSkeleton — loading placeholder that mirrors ProjectCard's
 * geometry exactly (same layout, aspect ratio, line heights and gaps) so the
 * list doesn't shift when real data arrives (CLS ~ 0).
 *
 * Layout matches ProjectCard: stacked on mobile, horizontal at sm+ with the
 * thumb taking ~45% on the left.
 */
function ProjectCardSkeleton() {
  return (
    <li aria-hidden="true">
      <div className="st:flex st:flex-col st:gap-4 st:p-4 st:sm:flex-row st:sm:gap-6">
        {/* Thumb — aspect-locked, matches ProjectThumb */}
        <div className="st:shrink-0 st:sm:w-[45%]">
          <Skeleton className="st:aspect-[16/10] st:w-full st:rounded-xl" />
        </div>

        {/* Meta column */}
        <div className="st:flex st:flex-1 st:flex-col st:gap-2">
          {/* Chrome: index "01" + arrow */}
          <div className="st:flex st:items-start st:justify-between st:gap-3">
            <Skeleton className="st:h-3 st:w-6" />
            <Skeleton className="st:size-5" />
          </div>

          {/* Title */}
          <Skeleton className="st:h-8 st:w-3/5" />

          {/* Summary — two bars (100% / 70%) */}
          <Skeleton className="st:h-4 st:w-full" />
          <Skeleton className="st:h-4 st:w-[70%]" />

          {/* Tag ghosts */}
          <div className="st:mt-2 st:flex st:gap-2">
            <Skeleton className="st:h-6 st:w-12 st:rounded-md" />
            <Skeleton className="st:h-6 st:w-14 st:rounded-md" />
            <Skeleton className="st:h-6 st:w-20 st:rounded-md" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProjectCardSkeleton;
