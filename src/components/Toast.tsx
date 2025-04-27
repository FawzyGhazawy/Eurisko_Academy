import React from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the types for the toast messages
type ToastType = 'success' | 'error';

const showToast = (message: string, type: ToastType) => {
  const options: ToastOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored', // Valid theme options: 'light', 'dark', 'colored'
  };

  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    toast.error(message, options);
  }
};

export default function Toast() {
  return (
    <ToastContainer
      position="bottom-center" // Position the toasts below the navbar
      limit={3} // Limit the number of toasts displayed at once
      style={{
        width: '100%', // Full width for centering
        maxWidth: '400px', // Optional: Set a max-width for the toasts
        margin: '20px auto', // Add some spacing below the navbar
      }}
    />
  );
}

// Export the showToast function for external use
export const useToast = () => {
  return { showToast };
};