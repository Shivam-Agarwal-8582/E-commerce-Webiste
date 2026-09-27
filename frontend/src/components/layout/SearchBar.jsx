import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export const SearchBar = ({ className = '', placeholder = 'Search in our shop...' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-100 hover:bg-slate-50/80 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-full py-2.5 pl-11 pr-4 border border-transparent focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
      />
      <button
        type="submit"
        className="absolute left-3.5 text-slate-400 hover:text-indigo-600 transition-colors"
      >
        <HiMagnifyingGlass className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
