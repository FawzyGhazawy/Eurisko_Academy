import React, { useState } from 'react';

const Navbar = () => {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
<div className="w-full bg-[#3251D0] dark:bg-gray-900 flex items-center justify-between p-4">
  <h1 className="text-lg font-bold text-white">User Management</h1>
  <div className="flex items-center space-x-3">
    <button className="bg-amber-50 dark:bg-yellow-300 px-4 py-2 rounded text-[#3251D0] dark:text-black font-semibold">Create User</button>
    <button className="px-4 py-2 font-semibold text-white bg-red-500 rounded">Logout</button>
    <button onClick={toggleDarkMode} className="p-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
    </button>
  </div>
</div>

  );
};

export default Navbar;