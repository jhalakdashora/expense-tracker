import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Card = memo(({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  onClick,
  hoverable = false,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-soft',
    lg: 'shadow-soft-lg',
  };

  const hoverClass = hoverable ? 'hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  const classes = `bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClass} ${clickableClass} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
});

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
};

Card.displayName = 'Card';

export default Card;

