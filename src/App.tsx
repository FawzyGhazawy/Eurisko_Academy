// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserGrid from './components/UserGrid';
import LoginPage from './pages/LoginPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UserProfile from './pages/UserProfile';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Routes */}
        <Route path="/dashboard/*" element={<AuthenticatedLayout />}>
          <Route index element={<UserGrid />} /> {/* Default route for /dashboard */}
          <Route path="profile/:id" element={<UserProfile />} /> {/* Nested route */}
        </Route>

        {/* Redirect to Login if no route matches */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;