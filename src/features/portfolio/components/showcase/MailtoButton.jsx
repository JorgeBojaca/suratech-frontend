/**
 * MailtoButton — primary-styled mailto link (spec §1.2).
 * Shows the address with an arrow that nudges on hover. Full-width on mobile,
 * shrinks to content at sm+. Colors mirror the primary Button (explicit
 * light + dark pairs).
 *
 * @param {string} email  address to open in the user's mail client
 * @param {React.ReactNode} children  optional label (defaults to the address)
 */
function MailtoButton({ email, children }) {
  return (
    <a
      href={`mailto:${email}`}
      className="st:group st:inline-flex st:w-full st:items-center st:justify-center st:gap-2 st:rounded-md st:bg-indigo-600 st:px-5 st:py-3 st:text-base st:font-medium st:text-white st:transition-colors st:hover:bg-indigo-500 st:focus-visible:outline-none st:focus-visible:ring-2 st:focus-visible:ring-accent st:dark:bg-indigo-400 st:dark:text-neutral-950 st:dark:hover:bg-indigo-300 st:sm:w-auto"
    >
      <span>{children ?? email}</span>
      <span
        aria-hidden="true"
        className="st:transition-transform st:duration-300 st:ease-in-out st:group-hover:translate-x-0.5 st:motion-reduce:transform-none"
      >
        →
      </span>
    </a>
  );
}

export default MailtoButton;
