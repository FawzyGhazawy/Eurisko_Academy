// src/components/SearchBar.tsx
import React from 'react';
import Input from '../atoms/input/input'; // Import the reusable Input component

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full px-6 py-4">
      <Input
        variant="search"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        type="text"
      />
    </div>
  );
};

export default Searchbar;