const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * PriceTag — formats a numeric price as USD currency (spec §4.4).
 * tabular-nums keeps prices vertically aligned down the mobile list.
 *
 * @param {number} value
 */
function PriceTag({ value }) {
  return (
    <span className="st:text-sm st:font-medium st:text-muted st:tabular-nums">
      {priceFormatter.format(value)}
    </span>
  );
}

export default PriceTag;
