import LinkButton from '../../../../components/LinkButton';

/**
 * MailtoButton — primary-styled mailto link (spec §1.2).
 * Thin wrapper over the shared LinkButton primitive: large primary button,
 * full-width on mobile, with a → that nudges on hover.
 *
 * @param {string} email  address to open in the user's mail client
 * @param {React.ReactNode} children  optional label (defaults to the address)
 */
function MailtoButton({ email, children }) {
  return (
    <LinkButton href={`mailto:${email}`} variant="primary" size="lg" fullWidth arrow="right">
      {children ?? email}
    </LinkButton>
  );
}

export default MailtoButton;
