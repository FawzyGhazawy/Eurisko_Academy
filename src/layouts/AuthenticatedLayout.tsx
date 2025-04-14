// src/layouts/AuthenticatedLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Searchbar from '../components/SearchBar';
import useAuth from '../hooks/useAuth';
import api from '../api/axiosInstance';

const AuthenticatedLayout: React.FC = () => {
  const isAuthenticated = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data.result.data.users);
    } catch (err: any) {
      console.error('Error fetching users:', err.message);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  // Function to add a new user
  const addUser = async (newUser: any) => {
    try {
      // Send the new user to the API
      await api.post('/api/users', newUser);

      // Refetch users to update the list
      fetchUsers();
    } catch (err: any) {
      console.error('Error adding user:', err.message);
    }
  };

  if (!isAuthenticated) {
    return null; // Redirect handled by the hook
  }

  return (
    <div className="min-h-screen text-black bg-white dark:bg-black dark:text-white">
      <Navbar addUser={addUser} />
      {/* Pass searchQuery and setSearchQuery to SearchBar */}
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Pass users, addUser, fetchUsers, and searchQuery to UserGrid */}
      <Outlet context={{ users, addUser, fetchUsers, searchQuery }} />
    </div>
  );
};

export default AuthenticatedLayout;