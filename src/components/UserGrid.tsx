// src/components/UserGrid.tsx
import React, { useState } from 'react';
import UserCard from './UserCard';
import { useOutletContext } from 'react-router-dom';
import api from '../api/axiosInstance';

interface ApiResponseUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: 'ACTIVE' | 'LOCKED';
  dateOfBirth: string;
}

interface UserCardUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'locked';
  dob: string;
}

const UserGrid: React.FC = () => {
  const { users, fetchUsers }: { users: ApiResponseUser[]; fetchUsers: () => void } =
    useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserCardUser | null>(null);

  // Transform users to include a `name` field
  const transformedUsers = users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName || ''}`.trim(),
    email: user.email,
    status: user.status.toLowerCase() as 'active' | 'locked',
    dob: user.dateOfBirth,
  }));

  // Handle opening the confirmation modal
  const handleDelete = (id: string) => {
    const user = transformedUsers.find((u) => u.id === id);
    if (user) {
      setUserToDelete(user);
      setIsModalOpen(true);
    }
  };

  // Handle user deletion
  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await api.delete(`/api/users/${userToDelete.id}`);
      console.log(`User ${userToDelete.name} deleted successfully`);

      // Refetch users to update the list
      fetchUsers(); // Use fetchUsers instead of addUser
      setIsModalOpen(false); // Close the modal
    } catch (err: any) {
      console.error('Error deleting user:', err.message);
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {isModalOpen && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
              Are you sure you want to delete user {userToDelete.name}?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Grid */}
      <div className="w-full px-6 py-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {transformedUsers.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserGrid;