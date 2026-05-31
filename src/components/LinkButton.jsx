import { base, sizes, variants, fullWidthClass } from './buttonStyles';

const ARROWS = {
  right: { glyph: '→', side: 'after', nudge: 'st:group-hover:translate-x-0.5' },
  left: { glyph: '←', side: 'before', nudge: 'st:group-hover:-translate-x-0.5' },
  upRight: {
    glyph: '↗',
    side: 'after',
    nudge: 'st:group-hover:-translate-y-0.5 st:group-hover:translate-x-0.5',
  },
};

function Arrow({ spec }) {
  return (
    <span
      aria-hidden="true"
      className={`st:transition-transform st:duration-300 st:ease-in-out st:motion-reduce:transform-none ${spec.nudge}`}
    >
      {spec.glyph}
    </span>
  );
}

/**
 * LinkButton — an <a> styled like Button (shared variants/sizes).
 * Use for navigation/mailto/external links that should look like buttons.
 *
 * @param {string} href
 * @param {'primary'|'secondary'|'ghost'} [variant]
 * @param {'sm'|'md'|'lg'} [size]
 * @param {boolean} [fullWidth]  full-width on mobile, auto at sm+
 * @param {boolean} [external]   adds target/rel + announces "(opens in new tab)"
 * @param {'right'|'left'|'upRight'} [arrow]  arrow glyph + hover nudge
 */
function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  external = false,
  arrow,
  className = '',
  children,
  'aria-label': ariaLabel,
  ...rest
}) {
  const spec = arrow ? ARROWS[arrow] : null;
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const computedAriaLabel =
    ariaLabel ??
    (external && typeof children === 'string' ? `${children} (opens in new tab)` : undefined);

  return (
    <a
      href={href}
      aria-label={computedAriaLabel}
      className={`st:group ${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? fullWidthClass : ''} ${className}`}
      {...externalProps}
      {...rest}
    >
      {spec?.side === 'before' && <Arrow spec={spec} />}
      <span>{children}</span>
      {spec?.side === 'after' && <Arrow spec={spec} />}
    </a>
  );
}

export default LinkButton;
