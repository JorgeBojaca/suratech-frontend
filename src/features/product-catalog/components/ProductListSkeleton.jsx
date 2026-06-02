import Skeleton from '../../../components/Skeleton';

const SKELETON_COUNT = 8;

/**
 * ProductListSkeleton — placeholder rows matching ProductRow geometry so the
 * list doesn't shift when data resolves (spec §5.1). Decorative: the wrapper
 * is aria-hidden and the parent marks the region aria-busy. Mirrors the same
 * list↔grid responsive switch as ProductList.
 */
function ProductListSkeleton() {
  return (
    <ul
      aria-hidden="true"
      className="st:divide-y st:divide-line st:md:grid st:md:grid-cols-2 st:md:gap-4 st:md:divide-y-0 st:lg:grid-cols-3"
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
        <li
          key={idx}
          className="st:flex st:flex-col st:gap-2 st:py-4 st:md:rounded-lg st:md:border st:md:border-line st:md:p-4"
        >
          <div className="st:flex st:items-center st:justify-between st:gap-3">
            <Skeleton className="st:h-3 st:w-24" />
            <Skeleton className="st:h-3 st:w-12" />
          </div>
          <Skeleton className="st:h-4 st:w-full" />
          <Skeleton className="st:h-4 st:w-2/3" />
        </li>
      ))}
    </ul>
  );
}

export default ProductListSkeleton;
