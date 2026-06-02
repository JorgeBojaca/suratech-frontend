import CategoryPill from './CategoryPill';
import PriceTag from './PriceTag';

/**
 * ProductRow — one product in the catalog index (spec §4.2).
 * The title is the visual anchor (largest text, highest-contrast ink token);
 * the category pill and price share a meta line above it. Clamped to two lines
 * so long titles don't blow out row height.
 *
 * Renders identical markup in both layouts — the parent ProductList switches
 * between a divided list (mobile) and a grid of cards (md+); the row only adds
 * a hairline border + radius + surface fill from md up.
 *
 * @param {object} product  shape: { title, price, category }
 */
function ProductRow({ product }) {
  const { title, price, category } = product;

  return (
    <li className="st:group st:flex st:flex-col st:gap-1.5 st:py-4 st:transition-colors st:hover:bg-surface st:md:rounded-lg st:md:border st:md:border-line st:md:bg-surface st:md:p-4">
      <div className="st:flex st:items-center st:justify-between st:gap-3">
        <CategoryPill category={category} />
        <PriceTag value={price} />
      </div>

      <h2 className="st:line-clamp-2 st:text-base st:font-medium st:text-ink st:sm:text-lg">
        {title}
      </h2>
    </li>
  );
}

export default ProductRow;
