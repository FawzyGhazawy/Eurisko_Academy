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
      const response = await api.get('/api/users', { params: { search: searchQuery } });
      const data = response.data.result.data.users; // Extract the users array
      setUsers(data);
    } catch (err: any) {
      console.error('Error fetching users:', err.message);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, searchQuery]);

  // Function to add a new user
  const addUser = async (newUser: any) => {
    try {
      const response = await api.post('/api/users', newUser);
      const addedUser = response.data.result.data.user;
  
      // Add the new user to the top of the users array
      setUsers((prevUsers) => [addedUser, ...prevUsers]);
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