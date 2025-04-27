import React from 'react';
import Button from '../../atoms/button/Button';
import { useToast } from '../Toast'; 
import { ApiResponseUser } from './types';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ApiResponseUser | null;
  onDelete: () => Promise<void>;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, user, onDelete }) => {
  const { showToast } = useToast();

  if (!isOpen || !user) return null;

  const handleDelete = async () => {
    try {
      await onDelete();
      showToast(`User ${user.firstName} deleted successfully!`, 'success');
    } catch (err: any) {
      showToast('Failed to delete user. Please try again.', 'error');
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
          Are you sure you want to delete user {user.firstName} {user.lastName || ''}?
        </h2>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="medium" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="medium" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;