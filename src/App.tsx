import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Optional: For debugging
import UserGrid from './components/UserGrid';
import LoginPage from './pages/LoginPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UserProfile from './pages/UserProfile';
import useThemeStore from './store/themeStore';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent unnecessary refetching on window focus
      retry: 1, // Retry failed queries only once
    },
  },
});

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  // Apply or remove the 'dark' class based on the isDarkMode state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`
          min-h-screen transition-colors duration-300
          ${isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}
        `}
      >
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />
  
            {/* Authenticated Routes */}
            <Route path="/dashboard/*" element={<AuthenticatedLayout />}>
              <Route index element={<UserGrid />} />
              <Route path="profile/:id" element={<UserProfile />} />
            </Route>
  
            {/* Redirect to Login if no route matches */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;