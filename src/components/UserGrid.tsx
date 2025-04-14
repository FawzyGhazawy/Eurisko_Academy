// src/components/UserGrid.tsx
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import api from '../api/axiosInstance';
import useAuthStore from '../store/authStore';

interface ApiResponseUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: 'ACTIVE' | 'LOCKED';
  dateOfBirth: string;
}

interface UserCardUser {
  name: string;
  email: string;
  status: 'active' | 'locked';
  dob: string;
}

const UserGrid: React.FC = () => {
  const [users, setUsers] = useState<UserCardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuthStore(); // Retrieve the token from Zustand

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await api.get('/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Transform the API response to match the UserCardUser interface
        const transformedUsers = response.data.result.data.users.map(
          (user: ApiResponseUser): UserCardUser => ({
            name: `${user.firstName} ${user.lastName || ''}`.trim(),
            email: user.email,
            status: user.status.toLowerCase() as 'active' | 'locked',
            dob: user.dateOfBirth,
          })
        );

        setUsers(transformedUsers);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]); // Add token as a dependency to re-fetch if it changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full px-6 py-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserGrid;