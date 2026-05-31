/**
 * AvailabilityPill — status chip with a pulsing dot (spec §1.2),
 * e.g. "● Available for work". The ping animation collapses under
 * reduced-motion (a static dot remains).
 *
 * @param {boolean} available  toggles dot color + default label
 * @param {string}  label      overrides the text
 */
function AvailabilityPill({ available = true, label }) {
  const text = label ?? (available ? 'Available for work' : 'Currently booked');
  const dot = available ? 'st:bg-emerald-500' : 'st:bg-subtle';

  return (
    <span className="st:inline-flex st:items-center st:gap-2 st:rounded-full st:border st:border-line st:px-3 st:py-1 st:text-sm st:text-muted">
      <span className="st:relative st:flex st:size-2">
        {available && (
          <span
            className={`st:absolute st:inline-flex st:size-full st:animate-ping st:rounded-full st:opacity-75 st:motion-reduce:animate-none ${dot}`}
          />
        )}
        <span className={`st:relative st:inline-flex st:size-2 st:rounded-full ${dot}`} />
      </span>
      {text}
    </span>
  );
}

export default AvailabilityPill;
