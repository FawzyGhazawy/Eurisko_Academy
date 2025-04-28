import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import UserGrid from '../components/UserGrid/UserGrid';
import UserProfile from '../pages/UserProfile';
import AddUserPage from '../pages/AddUserPage';

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated Routes */}
      <Route path="/dashboard/*" element={<AuthenticatedLayout />}>
        <Route index element={<UserGrid />} />
        <Route path="profile/:id" element={<UserProfile />} />
        <Route path="new" element={<AddUserPage />} />
      </Route>

      {/* Redirect to Login if no route matches */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;