import React from 'react';
import UserCard from '.././UserCard';
import { ApiResponseUser } from './types';

interface UserGridListProps {
  userList: ApiResponseUser[];
  searchQuery: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserGridList: React.FC<UserGridListProps> = ({ userList, searchQuery, onEdit, onDelete }) => {
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
    <div className="w-full px-6 py-4">
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => onEdit(user.id)}
              onDelete={() => onDelete(user.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">No users found.</p>
      )}
    </div>
  );
};

export default UserGridList;