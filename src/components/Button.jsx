const base =
  'st:inline-flex st:items-center st:justify-center st:gap-2 st:rounded-md ' +
  'st:px-4 st:py-2 st:text-sm st:font-medium st:transition-colors ' +
  'st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent ' +
  'st:disabled:pointer-events-none st:disabled:opacity-50';

const variants = {
  primary:
    'st:bg-indigo-600 st:text-white st:hover:bg-indigo-500 ' +
    'st:dark:bg-indigo-400 st:dark:text-neutral-950 st:dark:hover:bg-indigo-300',
  secondary:
    'st:border st:border-black/10 st:text-neutral-900 st:hover:bg-neutral-100 ' +
    'st:dark:border-white/10 st:dark:text-neutral-100 st:dark:hover:bg-neutral-900',
  ghost:
    'st:text-neutral-600 st:hover:bg-neutral-100 st:hover:text-neutral-900 ' +
    'st:dark:text-neutral-400 st:dark:hover:bg-neutral-900 st:dark:hover:text-neutral-100',
};

/**
 * Button — primary / secondary / ghost.
 * `fullWidth` makes it span the row on mobile and shrink to content at sm+
 * (the spec's "full-width on mobile"). Extra props (type, onClick, disabled…)
 * pass through to the underlying <button>.
 */
function Button({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const width = fullWidth ? 'st:w-full st:sm:w-auto' : '';

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${width} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
