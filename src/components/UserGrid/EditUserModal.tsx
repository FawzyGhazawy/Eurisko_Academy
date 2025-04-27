import React from 'react';
import Button from '../../atoms/button/Button';
import EditUserForm from '../../forms/EditUserForm';
import { ApiResponseUser } from './types';
import { StatusEnum } from '../../types/statusTypes';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ApiResponseUser | null;
  onSubmit: (updatedUser: Partial<ApiResponseUser>) => Promise<void>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onSubmit }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Edit User</h2>
        <EditUserForm
          user={{
            ...user,
            lastName: user.lastName || '',
            status: user.status as StatusEnum,
          }}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditUserModal;