// src/atoms/input/input.tsx

import React from 'react';
import { InputProps } from './input.types';

/**
 * A reusable input component with customizable variants and styles.
 */
const Input: React.FC<InputProps> = ({
  variant = 'default',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  type = 'text',
  required = false, // Default to false
  className = '',
}) => {
  // Define styles based on the variant
  const variantStyles: Record<NonNullable<InputProps['variant']>, string> = {
    default:
      'w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white',
    search:
      'w-full max-w-md px-3 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white',
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      required={required} // Pass the required prop here
      className={`${variantStyles[variant]} ${className}`}
    />
  );
};

export default Input;