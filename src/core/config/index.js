// Central runtime config. Reads Vite env vars (must be prefixed `VITE_`)
// and provides sane fallbacks for local development.

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:1337';

// Public product catalog API (Fake Store API). Override with VITE_CATALOG_API_URL.
export const CATALOG_API_URL =
  import.meta.env.VITE_CATALOG_API_URL ?? 'https://fakestoreapi.com';
