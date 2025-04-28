import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Optional: For debugging
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useThemeStore from './store/themeStore';
import Router from './routes/router'; // Import the Router component

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
          {/* Render the Router component */}
          <Router />
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
      {/* Optional: React Query Devtools */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;