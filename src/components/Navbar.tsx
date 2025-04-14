// src/components/Navbar.tsx
import React, { useState } from 'react';
import CreateUserForm from '../forms/CreateUserForm';
import { Link } from 'react-router-dom';

interface NavbarProps {
  addUser: (user: any) => void; // Prop to handle adding a new user
}

const Navbar: React.FC<NavbarProps> = ({ addUser }) => {
  const [dark, setDark] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleDarkMode = (): void => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="w-full bg-[#3251D0] dark:bg-gray-900 flex items-center justify-between p-4">
      <h1 className="text-lg font-bold text-white">User Management</h1>
      <div className="flex items-center space-x-3">
        {/* Open Modal Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-50 dark:bg-yellow-300 px-4 py-2 rounded text-[#3251D0] dark:text-black font-semibold"
        >
          Create User
        </button>

        {/* Logout Button */}
        <Link to="/login">
          <button className="px-4 py-2 font-semibold text-white bg-red-500 rounded">
            Logout
          </button>
        </Link>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Create User</h2>
            <CreateUserForm onClose={() => setIsModalOpen(false)} addUser={addUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;