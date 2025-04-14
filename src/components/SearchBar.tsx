// src/components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full px-6 py-4">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleChange}
        className="w-full max-w-md px-3 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3251D0] shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default Searchbar;