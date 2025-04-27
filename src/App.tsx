import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Optional: For debugging
// import UserGrid from './components/UserGrid';
import UserGrid from './components/UserGrid/UserGrid';
import LoginPage from './pages/LoginPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UserProfile from './pages/UserProfile';
import useThemeStore from './store/themeStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer />
        </BrowserRouter>
         {/* Custom Toast Container */}
         <div className="fixed top-[150px] left-0 right-0 z-50">
          <ToastContainer
            position="top-center" // Use top-center to center the toasts horizontally
            limit={3} // Limit the number of toasts displayed at once
            style={{
              maxWidth: '400px', // Optional: Set a max-width for the toasts
            }}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;