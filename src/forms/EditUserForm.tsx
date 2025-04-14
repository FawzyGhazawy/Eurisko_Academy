// src/forms/EditUserForm.tsx
import React, { useState } from 'react';
import Button from '../atoms/button/Button'; // Import the reusable Button component
import Input from '../atoms/input/input'; // Import the reusable Input component

interface EditUserFormProps {
  user: {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    status: 'ACTIVE' | 'LOCKED';
    dateOfBirth: string;
  };
  onSubmit: (updatedUser: Partial<{ 
    firstName: string; 
    lastName: string; 
    email: string; 
    status: 'ACTIVE' | 'LOCKED'; 
    dateOfBirth: string; 
  }>) => void;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName || '',
    email: user.email,
    status: user.status,
    dateOfBirth: user.dateOfBirth,
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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

        {/* Save Button */}
        <Button variant="primary" size="medium" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;