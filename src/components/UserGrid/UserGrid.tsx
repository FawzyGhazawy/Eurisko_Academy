import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/axiosInstance';
import { useOutletContext } from 'react-router-dom';
import Searchbar from '../SearchBar';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import UserGridList from './UserGridList';
import ErrorDisplay from './ErrorDisplay';
import Spinner from '../../atoms/spinner/spinner';
import { ApiResponseUser } from './types';

const UserGrid: React.FC = () => {
  const {
    users,
    fetchUsers,
  }: {
    users: ApiResponseUser[];
    fetchUsers: () => void;
  } = useOutletContext();

  const [userList, setUserList] = useState<ApiResponseUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string; statusCode: number } | null>(null);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<ApiResponseUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<ApiResponseUser | null>(null);

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

  // Handle editing a user
  const handleEdit = (id: string) => {
    const userToEdit = userList.find((user) => user.id === id);
    if (userToEdit) {
      setUserToEdit(userToEdit);
      setIsEditModalOpen(true);
    }
  };

  // Handle deleting a user
  const handleDelete = (id: string) => {
    const userToDelete = userList.find((user) => user.id === id);
    if (userToDelete) {
      setUserToDelete(userToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  // Update the user list after editing
  const handleUpdateUser = (updatedUser: Partial<ApiResponseUser>) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Remove the user from the list after deletion
  const handleDeleteUser = (id: string) => {
    setUserList((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <>
      {/* Search Bar */}
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Error Display */}
      <ErrorDisplay error={error} />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <Spinner size="large" />
          <span className="ml-2 text-gray-700 dark:text-gray-300">Loading users...</span>
        </div>
      )}

      {/* Modals */}
      {isEditModalOpen && userToEdit && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={userToEdit}
          onSubmit={(updatedUser) => {
            return api
              .put(`/api/users/${userToEdit.id}`, updatedUser)
              .then(() => {
                handleUpdateUser({ ...updatedUser, id: userToEdit.id }); // Include the ID explicitly
                setIsEditModalOpen(false);
              })
              .catch((err: any) => {
                setError({ message: err.message, statusCode: err.response?.status || 500 });
              });
          }}
        />
      )}

      {isDeleteModalOpen && userToDelete && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          user={userToDelete}
          onDelete={() => {
            return api
              .delete(`/api/users/${userToDelete.id}`)
              .then(() => {
                handleDeleteUser(userToDelete.id);
                setIsDeleteModalOpen(false);
              })
              .catch((err: any) => {
                setError({ message: err.message, statusCode: err.response?.status || 500 });
              });
          }}
        />
      )}

      {/* User Grid List */}
      {!loading && (
        <UserGridList
          userList={userList}
          searchQuery={searchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default UserGrid;