import React from 'react';
import { Search as SearchIcon, X as ClearIcon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const SearchBar: React.FC = () => {
  const { search, setSearch } = useStore(); // Get search and setSearch from the store

  const handleClear = () => {
    setSearch(''); // Clear search input
  };

  return (
    <div className="relative mb-6">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search state on input change
        placeholder="Search cryptocurrencies..."
        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />
      {search && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Clear search"
        >
          <ClearIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
