/**
 * CatalogTitle — sets the document <title> from the Strapi `title` field
 * (spec §4.2). React 19 hoists the <title> element into <head>, so no
 * react-helmet is needed. Renders no visible DOM and is safe with
 * content = null (emits the static fallback until Strapi resolves).
 *
 * @param {{ title?: string } | null} [content]
 */
function CatalogTitle({ content }) {
  const titleText = content?.title || 'Product Catalog';
  return <title>{titleText}</title>;
}

export default CatalogTitle;
