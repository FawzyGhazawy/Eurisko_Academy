import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../atoms/button/Button'; // Import the reusable Button component
import Input from '../atoms/input/input'; // Import the reusable Input component
import { useToast } from '../components/Toast'; // Import the custom Toast hook

// Define the Zod schema for validation
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  status: z.enum(['ACTIVE', 'LOCKED']),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

type FormData = z.infer<typeof schema>;

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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: normalizeStatus(user.status), // Ensure status is valid
      dateOfBirth: user.dateOfBirth,
    },
  });

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
        <select
          {...register('status')}
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        >
          <option value="ACTIVE">Active</option>
          <option value="LOCKED">Locked</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
        )}
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