import ProductRow from './ProductRow';

/**
 * ProductList — the semantic <ul> index of products (spec §4.5).
 * Mobile: a divided list (divide-y) that keeps the eye scanning titles
 * vertically. md+: drops the dividers and promotes to a 2-up (lg: 3-up) grid
 * of cards. Each ProductRow renders the same markup in both layouts.
 *
 * @param {Array<object>} products
 */
function ProductList({ products }) {
  return (
    <ul
      role="list"
      className="st:divide-y st:divide-line st:md:grid st:md:grid-cols-2 st:md:gap-4 st:md:divide-y-0 st:lg:grid-cols-3"
    >
      {products.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;
