// src/forms/CreateUserForm.tsx
import React, { useState } from 'react';
import Button from '../atoms/button/Button';
import Input from '../atoms/input/input';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  status: 'ACTIVE' | 'LOCKED';
  dateOfBirth: string;
}

interface CreateUserFormProps {
  onClose: () => void;
  addUser: (user: FormData) => void; // Add the addUser prop with proper typing
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onClose, addUser }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    status: 'ACTIVE',
    dateOfBirth: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the addUser function to add the new user
      addUser(formData);
      // Close the modal
      onClose();
    } catch (err: any) {
      console.error('Error creating user:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
        <Input
          type="text"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={(value) => handleChange('firstName', value)}
          required
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
        <Input
          type="text"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={(value) => handleChange('lastName', value)}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <Input
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        >
          <option value="ACTIVE">Active</option>
          <option value="LOCKED">Locked</option>
        </select>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
        <Input
          type="date"
          value={formData.dateOfBirth}
          onChange={(value) => handleChange('dateOfBirth', value)}
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
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