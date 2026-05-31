import MailtoButton from './MailtoButton';

/**
 * CTAHeadline — oversized closing headline (spec §1.2).
 * Local to ContactCTA (single-use, no logic) — module scope so it keeps a
 * stable identity across renders. text-4xl → text-6xl at lg.
 */
function CTAHeadline({ children }) {
  return (
    <h2 className="st:text-4xl st:font-medium st:tracking-tight st:text-balance st:text-ink st:lg:text-6xl">
      {children}
    </h2>
  );
}

/**
 * ContactCTA — closing call-to-action band (spec §1.1/§1.3).
 * Separated by a hairline top border. Stacked with a full-width button on
 * mobile; at lg the oversized headline sits left and the button inline-right.
 *
 * @param {string} email  contact address for the MailtoButton
 */
function ContactCTA({ email = 'jorgebojaca@gmail.com' }) {
  return (
    <section className="st:border-t st:border-line st:py-16 st:sm:py-20">
      <div className="st:flex st:flex-col st:gap-8 st:lg:flex-row st:lg:items-end st:lg:justify-between">
        <CTAHeadline>Have a project in mind? Let&apos;s talk.</CTAHeadline>
        <div className="st:w-full st:shrink-0 st:sm:w-auto">
          <MailtoButton email={email} />
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
