// src/atoms/spinner/spinner.tsx

import React from 'react';
import { SpinnerProps } from './spinner.types';

/**
 * A reusable spinner component with customizable sizes.
 */
const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className = '' }) => {
  // Define styles based on the size
  const sizeStyles: Record<NonNullable<SpinnerProps['size']>, string> = {
    small: 'w-4 h-4 border-t-2 border-b-2',
    medium: 'w-6 h-6 border-t-2 border-b-2',
    large: 'w-8 h-8 border-t-2 border-b-2',
  };

  return (
    <div
      className={`
        animate-spin rounded-full border-gray-300 border-2 ${sizeStyles[size]}
        ${className}
      `}
    ></div>
  );
};

export default Spinner;