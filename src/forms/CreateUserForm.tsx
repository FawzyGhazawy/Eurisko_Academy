// src/forms/CreateUserForm.tsx
import React, { useState } from 'react';

interface CreateUserFormProps {
  onClose: () => void;
  addUser: (user: any) => void; // Add the addUser prop
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  status: 'ACTIVE' | 'LOCKED';
  dateOfBirth: string;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onClose, addUser }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    status: 'ACTIVE',
    dateOfBirth: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        >
          <option value="ACTIVE">Active</option>
          <option value="LOCKED">Locked</option>
        </select>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#3251D0] rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3251D0]"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;