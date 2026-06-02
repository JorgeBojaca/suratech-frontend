import { useCallback, useEffect, useRef, useState } from 'react';
import productsService from '../services/productsService';
import { ErrorKind } from '../../../core/http/http';

/**
 * useProducts — loads the product list as a single, mutually-exclusive status
 * plus an `errorKind` the UI maps to a customer message.
 *
 *   status:    'loading' | 'success' | 'empty' | 'error'
 *   errorKind: ErrorKind.* | null     (only meaningful when status === 'error')
 *
 * Race/leak safe: one in-flight request, stale results dropped via controller
 * identity, aborted on unmount. refetch() re-runs (e.g. a Retry button).
 */
function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorKind, setErrorKind] = useState(null);

  const controllerRef = useRef(null); // current request, for supersede/unmount abort

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus('loading');
    setErrorKind(null);

    const { ok, aborted, errorKind: kind, data } = await productsService.getProducts({
      signal: controller.signal,
    });

    // Superseded by a newer load (or unmounted) → drop the result.
    if (aborted || controllerRef.current !== controller) return;

    if (!ok) {
      setProducts([]);
      setErrorKind(kind ?? ErrorKind.UNKNOWN);
      setStatus('error');
      return;
    }

    const list = Array.isArray(data) ? data : [];
    setProducts(list);
    setStatus(list.length ? 'success' : 'empty');
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  return {
    products,
    status,
    errorKind,
    isLoading: status === 'loading',
    isError: status === 'error',
    isEmpty: status === 'empty',
    refetch: load,
  };
}

export default useProducts;
