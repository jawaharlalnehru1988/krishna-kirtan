import { Menu, X, Sun, Moon } from 'lucide-react';

interface TopbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onHomeClick: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onHomeClick,
  theme,
  onToggleTheme,
}) => {
  return (
    <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm transition-colors duration-300">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onHomeClick}
      >
        <img src="/lord caitanya.jpeg" alt="Logo" className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover shadow-sm" />
        <div className="flex flex-col">
          <span className="font-bold text-orange-800 dark:text-orange-500 tracking-tight text-lg md:text-xl playfair">Sri Krishna Kirtan</span>
          <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest leading-none hidden md:block">Music Library</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Switcher */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 shadow-inner"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
