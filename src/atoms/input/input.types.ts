// src/atoms/input/input.types.ts

export type InputVariant = 'default' | 'search';

export interface InputProps {
  /**
   * The variant of the input (e.g., default, search).
   */
  variant?: InputVariant;

  /**
   * The placeholder text for the input.
   */
  placeholder?: string;

  /**
   * The value of the input.
   */
  value?: string;

  /**
   * The function to execute when the input value changes.
   */
  onChange?: (value: string) => void;

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * The type of the input (e.g., text, email, date).
   */
  type?: string;

  /**
   * Whether the input is required.
   */
  required?: boolean;

  /**
   * Additional class names for custom styling.
   */
  className?: string;

  /**
   * The label for the input field.
   */
  label?: string;

  /**
   * Error message to display below the input field.
   */
  error?: string;
}