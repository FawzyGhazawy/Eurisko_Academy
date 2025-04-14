// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserGrid from './components/UserGrid';
import LoginPage from './pages/LoginPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UserProfile from './pages/UserProfile';
import useThemeStore from './store/themeStore'; // Ensure correct import

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  console.log(`[App] Dark Mode Enabled: ${isDarkMode}`); // Debugging

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        {/* Debug element to confirm Tailwind styles */}

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
      </div>
  );
};

export default App;