import React from 'react';
import { InputProps } from './input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  type = 'text',
  required = false,
  className = '',
  label,
  error,
  name,
  ...rest
}, ref) => {
  const variantStyles: Record<NonNullable<InputProps['variant']>, string> = {
    default:
      'w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white',
    search:
      'w-full max-w-md px-3 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white',
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}

      <input
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${variantStyles[variant]} ${className}`}
        {...rest}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
