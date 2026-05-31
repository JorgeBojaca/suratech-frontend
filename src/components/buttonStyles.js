/**
 * Shared button/link styling — single source of truth for both <Button>
 * (renders <button>) and <LinkButton> (renders <a>). Keeps the variant and
 * size class maps in one place so the two primitives can never drift.
 */

export const base =
  'st:inline-flex st:items-center st:justify-center st:gap-2 st:rounded-md ' +
  'st:font-medium st:transition-colors st:focus-visible:outline-none ' +
  'st:focus-visible:ring-2 st:focus-visible:ring-accent ' +
  'st:disabled:pointer-events-none st:disabled:opacity-50';

export const sizes = {
  sm: 'st:px-3 st:py-1.5 st:text-sm',
  md: 'st:px-4 st:py-2 st:text-sm',
  lg: 'st:px-5 st:py-3 st:text-base',
};

export const variants = {
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

export const fullWidthClass = 'st:w-full st:sm:w-auto';
