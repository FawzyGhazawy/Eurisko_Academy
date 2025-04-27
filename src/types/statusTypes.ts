// Define the enum for type safety
export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
}

// Map the enum to an array of objects for UI components
export const statusOptions = [
  { value: StatusEnum.ACTIVE, label: 'Active' },
  { value: StatusEnum.LOCKED, label: 'Locked' },
];

// Optional: Helper function to get the label for a given status value
export const getStatusLabel = (status: StatusEnum): string => {
  const option = statusOptions.find((opt) => opt.value === status);
  return option?.label || 'Unknown';
};