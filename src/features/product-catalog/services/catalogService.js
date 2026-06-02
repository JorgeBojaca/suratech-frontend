import { API_URL } from '../../../core/config';
import { requestJSON } from '../../../core/http/http';

/**
 * catalogService — Strapi page content for the catalog (single type:
 * title / heroTitle / heroDescription). Thin endpoint map; transport and the
 * error taxonomy live in requestJSON.
 *
 * getContent resolves to the shared result shape:
 *   { ok, aborted, errorKind, status, data }  (data is the Strapi payload)
 */
const catalogService = {
  getContent: ({ signal } = {}) => requestJSON(`${API_URL}/api/product-catalog-page`, { signal }),
};

export default catalogService;
