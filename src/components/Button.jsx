import { base, sizes, variants, fullWidthClass } from './buttonStyles';

/**
 * Button — primary / secondary / ghost.
 * `fullWidth` makes it span the row on mobile and shrink to content at sm+.
 * Extra props (type, onClick, disabled…) pass through to the <button>.
 * Shares its styling with LinkButton via ./buttonStyles.
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const width = fullWidth ? fullWidthClass : '';

  return (
    <button
      type={type}
      className={`${base} ${sizes[size]} ${variants[variant]} ${width} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
