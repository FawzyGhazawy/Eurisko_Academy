// src/atoms/spinner/spinner.types.ts

export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps {
  /**
   * The size of the spinner (e.g., small, medium, large).
   */
  size?: SpinnerSize;

  /**
   * Additional class names for custom styling.
   */
  className?: string;
}