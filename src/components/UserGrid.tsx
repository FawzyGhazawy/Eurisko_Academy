// src/components/UserGrid.tsx
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { useOutletContext } from 'react-router-dom';
import api from '../api/axiosInstance';
import EditUserForm from '../forms/EditUserForm';
import Button from '../atoms/button/Button';
import Spinner from '../atoms/spinner/spinner'; // Import the reusable Spinner component

interface ApiResponseUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: 'ACTIVE' | 'LOCKED';
  dateOfBirth: string;
}

const UserGrid: React.FC = () => {
  const {
    users,
    fetchUsers,
    searchQuery,
  }: {
    users: ApiResponseUser[];
    fetchUsers: () => void;
    searchQuery: string;
  } = useOutletContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<ApiResponseUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<ApiResponseUser | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        await fetchUsers(); // Fetch users from the parent context
      } catch (err: any) {
        console.error('Error fetching users:', err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Transform users to include a `name` field
  const transformedUsers = users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName || ''}`.trim(),
    email: user.email,
    status: user.status.toLowerCase() as 'active' | 'locked',
    dob: user.dateOfBirth,
  }));

  // Filter users based on the search query
  const filteredUsers = transformedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle opening the edit modal
  const handleEdit = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setUserToEdit(user);
      setIsEditModalOpen(true);
    }
  };

  // Handle updating the user
  const handleSubmit = async (updatedUser: Partial<ApiResponseUser>) => {
    if (!userToEdit) return;

    try {
      await api.put(`/api/users/${userToEdit.id}`, updatedUser);
      console.log(`User ${userToEdit.firstName} ${userToEdit.lastName || ''} updated successfully`);

      // Refetch users to update the list
      fetchUsers();
      setIsEditModalOpen(false); // Close the edit modal
    } catch (err: any) {
      console.error('Error updating user:', err.message);
    }
  };

  // Handle opening the confirmation modal for deletion
  const handleDelete = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setUserToDelete(user);
      setIsDeleteModalOpen(true);
    }
  };

  // Handle user deletion
  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await api.delete(`/api/users/${userToDelete.id}`);
      console.log(`User ${userToDelete.firstName} ${userToDelete.lastName || ''} deleted successfully`);

      // Refetch users to update the list
      fetchUsers();
      setIsDeleteModalOpen(false); // Close the delete modal
    } catch (err: any) {
      console.error('Error deleting user:', err.message);
    }
  };

  return (
    <>
      {/* Edit Modal */}
      {isEditModalOpen && userToEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Edit User</h2>
            <EditUserForm
              user={userToEdit}
              onSubmit={handleSubmit}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deletion */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
              Are you sure you want to delete user {userToDelete.firstName}{' '}
              {userToDelete.lastName || ''}?
            </h2>
            <div className="flex justify-end gap-2">
              {/* Cancel Button */}
              <Button variant="secondary" size="medium" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>

              {/* Delete Button */}
              <Button variant="danger" size="medium" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Grid */}
      <div className="w-full px-6 py-4">
        {loading ? (
          // Show spinner while loading
          <div className="flex items-center justify-center h-48">
            <Spinner size="large" />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Loading users...</span>
          </div>
        ) : filteredUsers.length > 0 ? (
          // Display users if available
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          // Show "No users found" message if no users are available
          <p className="text-center text-gray-500 dark:text-gray-300">No users found.</p>
        )}
      </div>
    </>
  );
};

export default UserGrid;