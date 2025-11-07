import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Select = memo(({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  name,
  id,
}) => {
  const selectId = id || name;
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-danger-500 focus:ring-danger-500' : 'border-gray-300 focus:ring-primary-500';

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          block w-full rounded-xl border-2 ${errorClass}
          px-4 py-2.5 pr-10
          text-gray-900 font-medium
          focus:outline-none focus:ring-2 focus:border-transparent
          disabled:bg-gray-50 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm
          hover:shadow-md focus:shadow-md
          appearance-none bg-white
          bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%225%22%20viewBox%3D%220%200%2010%205%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20fill%3D%22%236366f1%22%20d%3D%22M0%200l5%205%205-5z%22/%3E%3C/svg%3E')]
          bg-no-repeat
          bg-[right_1rem_center]
          bg-[length:0.75rem]
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1.5 text-sm font-medium text-danger-600">{error}</p>
      )}
    </div>
  );
});

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

Select.displayName = 'Select';

export default Select;

