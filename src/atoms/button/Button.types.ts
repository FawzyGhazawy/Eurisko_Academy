// src/atoms/button/button.types.ts

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  /**
   * The variant of the button (e.g., primary, secondary, danger).
   */
  variant?: ButtonVariant;

  /**
   * The size of the button (e.g., small, medium, large).
   */
  size?: ButtonSize;

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;

  /**
   * The function to execute when the button is clicked.
   */
  onClick?: () => void;

  /**
   * The content inside the button (e.g., text or an icon).
   */
  children: React.ReactNode;

  /**
   * The HTML `type` attribute for the button (e.g., "submit", "button", "reset").
   */
  type?: 'submit' | 'button' | 'reset';
}