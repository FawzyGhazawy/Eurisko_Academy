import React from 'react';
import { SelectProps, SelectOption, SelectSize } from './Select.types';

/**
 * A reusable select dropdown component with customizable sizes and options.
 */
const Select: React.FC<SelectProps> = ({
  size = 'medium',
  disabled = false,
  options,
  onChange,
  value,
  placeholder,
  error,
  className = '',
}) => {
  // Define styles based on the size
  const sizeStyles: Record<SelectSize, string> = {
    small: 'px-2 py-1 text-sm rounded',
    medium: 'px-3 py-2 text-base rounded',
    large: 'px-4 py-3 text-lg rounded',
  };

  return (
    <div className="space-y-1">
      {/* Select Dropdown */}
      <select
        className={`
          w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] shadow-sm
          dark:border-gray-600 dark:bg-gray-700 dark:text-white
          ${sizeStyles[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option: SelectOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;