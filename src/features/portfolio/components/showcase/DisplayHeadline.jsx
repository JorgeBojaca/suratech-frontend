/**
 * DisplayHeadline — the hero value statement and page <h1> (spec §1.2/§1.3).
 * Mobile-first hero scale: text-5xl → 6xl → 7xl, tight leading + tracking,
 * width capped for readable line length on larger screens.
 */
function DisplayHeadline({ children }) {
  return (
    <h1 className="st:max-w-2xl st:text-5xl st:font-medium st:leading-[0.95] st:tracking-tight st:text-ink st:text-balance st:sm:text-6xl st:lg:max-w-4xl st:lg:text-7xl">
      {children}
    </h1>
  );
}

export default DisplayHeadline;
