// src/atoms/select/Select.types.ts

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  /**
   * The value of the option.
   */
  value: string;

  /**
   * The display label for the option.
   */
  label: string;
}

export interface SelectProps {
  /**
   * The size of the select dropdown (e.g., small, medium, large).
   */
  size?: SelectSize;

  /**
   * Whether the select is disabled.
   */
  disabled?: boolean;

  /**
   * The list of options to display in the dropdown.
   */
  options: SelectOption[];

  /**
   * The function to execute when the selection changes.
   */
  onChange?: (value: string) => void;

  /**
   * The currently selected value.
   */
  value?: string;

  /**
   * Placeholder text for the select dropdown.
   */
  placeholder?: string;

  /**
   * Optional error message to display below the select.
   */
  error?: string;

  /**
   * Additional class names for custom styling.
   */
  className?: string;
}