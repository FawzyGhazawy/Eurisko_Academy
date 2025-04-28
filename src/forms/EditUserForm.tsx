import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../atoms/button/Button'; // Import the reusable Button component
import Input from '../atoms/input/input'; // Import the reusable Input component
import { useToast } from '../components/Toast'; // Import the custom Toast hook
import { StatusEnum, statusOptions } from '../types/statusTypes';
import Select from '../atoms/select/Select';
import { userSchema, FormData } from '../schema/userSchema';



interface EditUserFormProps {
  user: FormData & { id: string };
  onSubmit: (updatedUser: Partial<FormData>) => Promise<void>; // Ensure onSubmit returns a promise
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSubmit, onClose }) => {
  const { showToast } = useToast(); // Initialize the custom Toast hook
  const normalizeStatus = (status: string): 'ACTIVE' | 'LOCKED' => {
    if (status.toUpperCase() === 'ACTIVE') return 'ACTIVE';
    if (status.toUpperCase() === 'LOCKED') return 'LOCKED';
    throw new Error(`Invalid status: ${status}`);
  };

  const {
    register,
    handleSubmit,
    watch, // Use the watch method to get the current value of fields
    setValue, // Use setValue to update the form state
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: normalizeStatus(user.status) as StatusEnum, // Ensure status is valid
      dateOfBirth: user.dateOfBirth,
    },
  });

  // Watch the 'status' field to get its current value
  const statusValue = watch('status');

  // Handle form submission
  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit(data); // Call the onSubmit function to update the user
      showToast('User updated successfully!', 'success'); // Show success toast
      onClose(); // Close the modal after successful submission
    } catch (err: any) {
      showToast('Failed to update user. Please try again.', 'error'); // Show error toast
      console.error('Error updating user:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
        <Input
          type="text"
          placeholder="Enter first name"
          {...register('firstName')}
          error={errors.firstName?.message}
          required
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
        <Input
          type="text"
          placeholder="Enter last name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <Input
          type="email"
          placeholder="Enter email"
          {...register('email')}
          error={errors.email?.message}
          required
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
        <Input
          type="date"
          {...register('dateOfBirth')}
          error={errors.dateOfBirth?.message}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <Select
          size="medium"
          options={statusOptions}
          value={statusValue}
          onChange={(value) => {
            if (value === StatusEnum.ACTIVE || value === StatusEnum.LOCKED) {
              setValue('status', value); // Update the form state
            } else {
              console.error(`Invalid status value: ${value}`);
            }
          }}
          placeholder="Select a status"
          error={errors.status?.message}
        />
      </div>


      {/* Buttons */}
      <div className="flex justify-end gap-2">
        {/* Cancel Button */}
        <Button variant="secondary" size="medium" onClick={onClose}>
          Cancel
        </Button>
        {/* Save Button */}
        <Button variant="primary" size="medium" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;