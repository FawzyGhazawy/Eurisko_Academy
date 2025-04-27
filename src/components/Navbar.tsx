// src/components/Navbar.tsx
import React, { useState } from 'react';
import CreateUserForm from '../forms/CreateUserForm';
import { Link } from 'react-router-dom';
import useThemeStore from '../store/themeStore';
import Button from '../atoms/button/Button';

interface NavbarProps {
  addUser: (user: any) => void; // Required prop
}

const Navbar: React.FC<NavbarProps> = ({ addUser }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
<div className="fixed top-0 left-0 w-full bg-[#3251D0] dark:bg-gray-900 flex items-center justify-between p-4 z-50">
  {/* Styled "User Management" Heading */}
  <h1 className="text-2xl font-bold text-white tracking-wide">
    User Management
  </h1>
  <div className="flex items-center space-x-3">
    {/* Open Modal Button */}
    <Button variant="secondary" size="medium" onClick={() => setIsModalOpen(true)}>
      Create User
    </Button>
    {/* Logout Button */}
    <Link to="/login">
      <Button variant="danger" size="medium">
        Logout
      </Button>
    </Link>
    {/* Dark Mode Toggle */}
    <button
      onClick={toggleDarkMode}
      className={`
        p-2 rounded-full cursor-pointer transition-colors duration-200
        ${!isDarkMode && 'hover:bg-gray-200'} // Hover effect in light mode
        ${isDarkMode && 'hover:bg-gray-700'}
        group
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={isDarkMode ? '#ffffff' : '#ffffff'}
        className={`
          w-5 h-5 transition-colors duration-200
          ${!isDarkMode && 'group-hover:stroke-black'} // Stroke changes on hover over the parent
        `}
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
        <CreateUserForm
              onClose={() => setIsModalOpen(false)}
              addUser={async (user) => {
                await addUser(user); // Ensure the function returns a Promise<void>
              }}
            />      
      </div>
    </div>
  )}
</div>
  );
};

export default Navbar;