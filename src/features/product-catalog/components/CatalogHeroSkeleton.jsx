import Skeleton from '../../../components/Skeleton';

/**
 * CatalogHeroSkeleton — placeholder for the hero block while the Strapi
 * content loads (spec §5.1). Matches the hero's geometry (eyebrow, H1, two
 * lede lines) so there's no layout shift on resolve. Decorative: aria-hidden.
 */
function CatalogHeroSkeleton() {
  return (
    <div aria-hidden="true" className="st:pt-8 st:sm:pt-12">
      <Skeleton className="st:h-3 st:w-20" />
      <Skeleton className="st:mt-3 st:h-8 st:w-2/3" />
      <Skeleton className="st:mt-4 st:h-4 st:w-full st:max-w-prose" />
      <Skeleton className="st:mt-2 st:h-4 st:w-1/2" />
    </div>
  );
}

export default CatalogHeroSkeleton;
