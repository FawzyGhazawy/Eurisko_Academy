import React, { useState, useEffect, useCallback } from 'react';
import UserCard from './UserCard';
import { useOutletContext } from 'react-router-dom';
import api from '../api/axiosInstance';
import EditUserForm from '../forms/EditUserForm';
import Button from '../atoms/button/Button';
import Spinner from '../atoms/spinner/spinner'; // Import the reusable Spinner component
import Searchbar from './SearchBar';

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
  }: {
    users: ApiResponseUser[];
    fetchUsers: () => void;
  } = useOutletContext();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<ApiResponseUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<ApiResponseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string; statusCode: number } | null>(null);

  const [userList, setUserList] = useState<ApiResponseUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Local search query state

  const memoizedFetchUsers = useCallback(fetchUsers, []);

  useEffect(() => {
    const fetchData = async () => {
      if (users.length === 0) {
        try {
          setLoading(true);
          await memoizedFetchUsers();
          setError(null);
        } catch (err: any) {
          setError({ message: err.message, statusCode: err.response?.status || 500 });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [memoizedFetchUsers, users.length]);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const transformedUsers = userList.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName || ''}`.trim(),
    email: user.email,
    status: user.status.toLowerCase() as 'active' | 'locked',
    dob: user.dateOfBirth,
  }));

  const filteredUsers = transformedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
          {/* Search Bar */}
          <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
      {/* Error Display */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          <p>{error.message}</p>
          <p>Status Code: {error.statusCode}</p>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && userToEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Edit User</h2>
            <EditUserForm
              user={{
                ...userToEdit,
                lastName: userToEdit.lastName || '',
              }}
              onSubmit={(updatedUser) => {
                api.put(`/api/users/${userToEdit.id}`, updatedUser)
                  .then(() => {
                    setUserList((prevUsers) =>
                      prevUsers.map((user) =>
                        user.id === userToEdit.id ? { ...user, ...updatedUser } : user
                      )
                    );
                    setIsEditModalOpen(false);
                  })
                  .catch((err: any) => {
                    setError({ message: err.message, statusCode: err.response?.status || 500 });
                  });
              }}
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
              <Button variant="secondary" size="medium" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="medium"
                onClick={() => {
                  api.delete(`/api/users/${userToDelete.id}`)
                    .then(() => {
                      setUserList((prevUsers) =>
                        prevUsers.filter((user) => user.id !== userToDelete.id)
                      );
                      setIsDeleteModalOpen(false);
                    })
                    .catch((err: any) => {
                      setError({ message: err.message, statusCode: err.response?.status || 500 });
                    });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Grid */}
      <div className="w-full px-6 py-4">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner size="large" />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Loading users...</span>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={(id) => {
                  const userToEdit = userList.find((u) => u.id === id);
                  if (userToEdit) {
                    setUserToEdit(userToEdit);
                    setIsEditModalOpen(true);
                  }
                }}
                onDelete={(id) => {
                  const userToDelete = userList.find((u) => u.id === id);
                  if (userToDelete) {
                    setUserToDelete(userToDelete);
                    setIsDeleteModalOpen(true);
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">No users found.</p>
        )}
      </div>
    </>
  );
};

export default UserGrid;
