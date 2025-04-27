// src/types/statusTypes.ts

export interface StatusOption {
    /**
     * The value of the status (used internally).
     */
    value: string;
  
    /**
     * The display label for the status.
     */
    label: string;
  }
  
  /**
   * A predefined list of status options.
   */
  export const statusOptions: StatusOption[] = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'LOCKED', label: 'Locked' },
  ];