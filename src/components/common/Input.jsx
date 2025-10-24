import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = memo(forwardRef(({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  icon,
  name,
  id,
}, ref) => {
  const inputId = id || name;
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-danger-500 focus:ring-danger-500' : 'border-gray-300 focus:ring-primary-500';

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            block w-full rounded-lg border ${errorClass}
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
        />
      </div>

      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-danger-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}));

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;

