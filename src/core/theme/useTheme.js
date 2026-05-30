import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

/**
 * Reads the current theme. The inline script in index.html has already
 * resolved it onto <html data-theme> before paint, so we trust that first;
 * the rest are fallbacks for when the script didn't run (e.g. tests/SSR).
 */
function getInitialTheme() {
  if (typeof document === 'undefined') return 'dark';

  const attr = document.documentElement.dataset.theme;
  if (attr === 'light' || attr === 'dark') return attr;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * useTheme — current theme plus setters that persist the user's choice.
 * Applying the theme sets <html data-theme>, which drives the token swap
 * in core/theme/index.css.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = (next) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, setTheme, toggleTheme };
}
