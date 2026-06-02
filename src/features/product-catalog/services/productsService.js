import { CATALOG_API_URL } from '../../../core/config';
import { requestJSON } from '../../../core/http/http';

/**
 * productsService — product data from the Fake Store API. Transport and the
 * error taxonomy live in requestJSON, so this stays a thin endpoint map.
 *
 * getProducts resolves to the shared result shape:
 *   { ok, aborted, errorKind, status, data }  (data is the products array)
 */
const productsService = {
  getProducts: ({ signal } = {}) => requestJSON(`${CATALOG_API_URL}/products`, { signal }),
};

export default productsService;
