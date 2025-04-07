import React from "react";

export const Searchbar = () => {
  return (
    <div className="w-full px-6 py-4">
    <input
      type="search"
      name="search"
      placeholder="Search users..."
      className="w-full max-w-md px-3 py-2 text-black bg-white border border-gray-400 rounded shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    />

    </div>
  );
};
