// src/atoms/button/button.tsx
import React from 'react';
import { ButtonProps } from './Button.types';

/**
 * A reusable button component with customizable variants and sizes.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  type = 'button',
}) => {
  // Define styles based on the variant
  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-[#3251D0] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3251D0]',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
  };

  // Define styles based on the size
  const sizeStyles: Record<'small' | 'medium' | 'large', string> = {
    small: 'px-2 py-1 text-sm rounded',
    medium: 'px-4 py-2 text-base rounded',
    large: 'px-6 py-3 text-lg rounded',
  };

  return (
    <button
      className={`
        font-medium transition-colors duration-200 cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;