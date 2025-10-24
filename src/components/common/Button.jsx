import React, { memo } from 'react';
import PropTypes from 'prop-types';

const VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  SUCCESS: 'success',
  GHOST: 'ghost',
};

const SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

const Button = memo(({
  children,
  variant = VARIANTS.PRIMARY,
  size = SIZES.MD,
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-touch';

  const variantClasses = {
    [VARIANTS.PRIMARY]: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    [VARIANTS.SECONDARY]: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    [VARIANTS.DANGER]: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500',
    [VARIANTS.SUCCESS]: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500',
    [VARIANTS.GHOST]: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizeClasses = {
    [SIZES.SM]: 'px-3 py-1.5 text-sm',
    [SIZES.MD]: 'px-4 py-2 text-base',
    [SIZES.LG]: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.values(VARIANTS)),
  size: PropTypes.oneOf(Object.values(SIZES)),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  icon: PropTypes.node,
};

Button.displayName = 'Button';

export default Button;
export { VARIANTS as BUTTON_VARIANTS, SIZES as BUTTON_SIZES };

