import React from 'react';

interface HeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 bg-stone-50/80 backdrop-blur-md z-10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-3xl font-bold text-stone-900">{title}</h2>
        <p className="text-stone-500 text-sm mt-1">Browse and Hear Various {title}</p>
      </div>

      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
      </div>
    </header>
  );
};

export default Header;
