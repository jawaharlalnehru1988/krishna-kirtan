import React from 'react';
import { X } from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  navItems: NavItem[];
  activeCategory: string;
  activeLesson: any;
  onCategoryChange: (id: string) => void;
  isSidebarOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  activeCategory,
  activeLesson,
  onCategoryChange,
  isSidebarOpen,
  onClose,
}) => {
  return (
    <>
      {/* Sidebar Overlay (Mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-stone-200 flex flex-col z-50 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:h-[calc(100vh-73px)] md:sticky md:top-[73px]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand is now in Topbar */}

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onCategoryChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${activeCategory === item.id && !activeLesson
                ? 'bg-orange-100 text-orange-800 font-bold shadow-sm'
                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                {item.image ? (
                  <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl">{item.icon}</span>
                )}
              </div>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
