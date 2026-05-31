/**
 * Container — the layout shell (spec §0.1).
 * Centers content and applies responsive gutters + max-width:
 *   mobile  → full width, px-5
 *   tablet  → max-w-2xl, px-8
 *   desktop → max-w-5xl
 * Pass `className` for vertical rhythm / per-section tweaks.
 */
function Container({ children, className = '' }) {
  return (
    <div
      className={`st:mx-auto st:w-full st:px-5 st:sm:max-w-2xl st:sm:px-8 st:lg:max-w-5xl ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
