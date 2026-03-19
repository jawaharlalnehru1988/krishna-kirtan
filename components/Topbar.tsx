import React from 'react';
import { Menu, X } from 'lucide-react';

interface TopbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onHomeClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onHomeClick,
}) => {
  return (
    <div className="bg-white border-b border-stone-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onHomeClick}
      >
        <img src="/lord caitanya.jpeg" alt="Logo" className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover shadow-sm" />
        <div className="flex flex-col">
          <span className="font-bold text-orange-800 tracking-tight text-lg md:text-xl playfair">Sri Krishna Kirtan</span>
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none hidden md:block">Resource Library</span>
        </div>
      </div>
      
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 text-stone-600 hover:text-orange-600 transition-colors"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Optional Desktop Menu Items or User Profile could go here */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-stone-600 hover:text-orange-700 transition-colors">Library</a>
        <a href="#" className="text-sm font-medium text-stone-600 hover:text-orange-700 transition-colors">About</a>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-orange-700 transition-all">
          Join Academy
        </button>
      </div>
    </div>
  );
};

export default Topbar;
