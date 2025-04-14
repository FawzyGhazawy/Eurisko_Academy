// src/layouts/AuthenticatedLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Searchbar from '../components/SearchBar';
import useAuth from '../hooks/useAuth';

const AuthenticatedLayout: React.FC = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null; // Redirect handled by the hook
  }

  return (
    <div className="min-h-screen text-black bg-white dark:bg-black dark:text-white">
      <Navbar />
      <Searchbar />
      <Outlet />
    </div>
  );
};

export default AuthenticatedLayout;