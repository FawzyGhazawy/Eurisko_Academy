import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../atoms/button/Button'; // Import the reusable Button component
import Input from '../atoms/input/input'; // Import the reusable Input component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useToast } from '../components/Toast'; // Import the custom Toast hook
import Select from '../atoms/select/Select';
import { statusOptions } from '../types/statusTypes';

// Define the Zod schema for validation
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  status: z.enum(['ACTIVE', 'LOCKED']),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

type FormData = z.infer<typeof schema>;

interface CreateUserFormProps {
  onClose: () => void;
  addUser: (user: FormData) => Promise<void>; // Add the addUser prop
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onClose, addUser }) => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const { showToast } = useToast(); // Initialize the custom Toast hook
  const {
    register,
    handleSubmit,
    watch, // Use the watch method to get the current value of fields
    setValue, // Use setValue to update the form state
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'ACTIVE', // Set a default value for 'status'
    },
  });

// Watch the 'status' field to get its current value
const statusValue = watch('status');

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      await addUser(data); // Call the addUser function to add the new user
      showToast('User created successfully!', 'success'); // Show success toast
      onClose(); // Close the modal after successful submission
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err: any) {
      showToast('Failed to create user. Please try again.', 'error'); // Show error toast
      console.error('Error creating user:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          options={statusOptions} // Use the centralized statusOptions
          value={statusValue} // Use the watched value of 'status'
          onChange={(value) => {
            // Ensure the value is one of the allowed options
            if (value === 'ACTIVE' || value === 'LOCKED') {
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
      <div className="flex justify-end space-x-3">
        {/* Cancel Button */}
        <Button variant="secondary" size="medium" onClick={onClose}>
          Cancel
        </Button>
        {/* Create Button */}
        <Button variant="primary" size="medium" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateUserForm;