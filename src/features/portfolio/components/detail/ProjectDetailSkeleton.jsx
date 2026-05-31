import Skeleton from '../../../../components/Skeleton';

/**
 * ProjectDetailSkeleton — loading placeholder for the detail view (spec §2.4).
 * Mirrors the article geometry so nothing jumps when data arrives: header
 * (breadcrumb, title, tagline, meta block), an aspect-locked hero placeholder
 * matching HeroMedia (16/10 → sm 16/9), staggered prose bars, and two
 * aspect-locked gallery blocks.
 */
function ProjectDetailSkeleton() {
  return (
    <div aria-hidden="true" className="st:flex st:flex-col st:gap-12">
      {/* Header */}
      <div className="st:flex st:flex-col st:gap-4">
        <Skeleton className="st:h-3 st:w-40" /> {/* breadcrumb */}
        <Skeleton className="st:h-12 st:w-3/4 st:lg:h-16" /> {/* title */}
        <Skeleton className="st:h-6 st:w-full st:max-w-prose" /> {/* tagline */}

        {/* Meta block — role / year / stack ghosts */}
        <div className="st:flex st:flex-wrap st:gap-6 st:pt-2">
          <Skeleton className="st:h-10 st:w-24" />
          <Skeleton className="st:h-10 st:w-24" />
          <Skeleton className="st:h-10 st:w-44" />
        </div>
      </div>

      {/* Hero media — exact aspect of HeroMedia */}
      <Skeleton className="st:aspect-[16/10] st:w-full st:rounded-2xl st:sm:aspect-[16/9]" />

      {/* Overview prose — staggered bars (100% / 95% / 88% / 70%) */}
      <div className="st:flex st:max-w-prose st:flex-col st:gap-3">
        <Skeleton className="st:h-4 st:w-full" />
        <Skeleton className="st:h-4 st:w-[95%]" />
        <Skeleton className="st:h-4 st:w-[88%]" />
        <Skeleton className="st:h-4 st:w-[70%]" />
      </div>

      {/* Gallery — two aspect-locked blocks */}
      <div className="st:flex st:flex-col st:gap-6">
        <Skeleton className="st:aspect-[16/10] st:w-full st:rounded-xl" />
        <Skeleton className="st:aspect-[16/10] st:w-full st:rounded-xl" />
      </div>
    </div>
  );
}

export default ProjectDetailSkeleton;
