import { useTheme } from '../core/theme/useTheme';

/**
 * ThemeToggle — flips between dark and light canvases and persists the choice.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="st:inline-flex st:size-9 st:items-center st:justify-center st:rounded-md st:border st:border-line st:text-ink st:transition-colors st:hover:bg-surface st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent"
    >
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
    </button>
  );
}

export default ThemeToggle;
