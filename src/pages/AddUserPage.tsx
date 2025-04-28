import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import Button from '../atoms/button/Button';
import Input from '../atoms/input/input';
import Select from '../atoms/select/Select';
import { StatusEnum, statusOptions } from '../types/statusTypes';
import { userSchema, FormData } from '../schema/userSchema';
import api from '../api/axiosInstance'; // Import your API client

const AddUserPage: React.FC = () => {
  const navigate = useNavigate(); // For redirection after submission
  const { showToast } = useToast(); // For displaying toast notifications

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: StatusEnum.ACTIVE, // Default status
    },
  });

  // Watch the 'status' field to get its current value
  const statusValue = watch('status');

  // Use react-query's useMutation for API submission
  const { mutate, isPending } = useMutation({
    mutationFn: (newUser: FormData) => api.post('/api/users', newUser), // POST request to create a user
    onSuccess: () => {
      showToast('User created successfully!', 'success'); // Show success toast
      navigate('/dashboard'); // Redirect to the dashboard
    },
    onError: (err: any) => {
      showToast(`Failed to create user: ${err.message}`, 'error'); // Show error toast
      console.error('Error creating user:', err);
    },
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    mutate(data); // Trigger the mutation to submit the form data
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <Input
            type="text"
            placeholder="Enter last name"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date of Birth
          </label>
          <Input
            type="date"
            {...register('dateOfBirth')}
            error={errors.dateOfBirth?.message}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
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
        <div className="flex justify-end gap-3">
          {/* Cancel Button */}
          <Button variant="secondary" size="medium" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          {/* Create Button */}
          <Button variant="primary" size="medium" type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;