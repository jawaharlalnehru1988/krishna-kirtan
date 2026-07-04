import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';

interface TopbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onHomeClick: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const LANGUAGES = [
  { id: 'ta', label: 'தமிழ்', icon: '🇮🇳' },
  { id: 'en', label: 'Eng', icon: '🇬🇧' },
];

const Topbar: React.FC<TopbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onHomeClick,
  theme,
  onToggleTheme,
  selectedLanguage,
  onLanguageChange,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // 1. Check if already installed & running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    if (isStandalone) {
      alert("Sri Krishna Kirtan is already installed and running as a standalone app.");
      return;
    }

    // 2. If browser supports programmatic installation (deferredPrompt is set)
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.error("Installation prompt failed:", err);
      }
      return;
    }

    // 3. Fallbacks when deferredPrompt is not available (e.g. iOS Safari, or manual install)
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);

    if (isIOS) {
      alert("To install Sri Krishna Kirtan on iOS:\n1. Open this website in Safari.\n2. Tap the 'Share' button at the bottom of the screen.\n3. Scroll down and select 'Add to Home Screen'.");
    } else if (isMobile) {
      alert("To install Sri Krishna Kirtan on Android:\n1. Tap the three dots (menu) in Chrome or your default browser.\n2. Select 'Install app' or 'Add to Home screen'.\n\nIf you don't see this option, the app might already be installed.");
    } else {
      // Desktop fallback
      alert("To install Sri Krishna Kirtan on Desktop:\n1. Click the 'Install' icon in the browser address bar (top right, near the star/bookmark icon).\n2. Or open the browser menu (three dots) and select 'Install Sri Krishna Kirtan'.");
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row justify-between sticky top-0 z-40 shadow-sm transition-colors duration-300 gap-3 md:gap-0">
      
      {/* Top Row on Mobile (Left on Desktop) */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={onHomeClick}
        >
          <img src="/lord caitanya.jpeg" alt="Logo" className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover shadow-sm" />
          <div className="flex flex-col">
            <span className="font-bold text-orange-800 dark:text-orange-500 tracking-tight text-lg md:text-xl playfair whitespace-nowrap">Sri Krishna Kirtan</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest leading-none hidden md:block">Music Library</span>
          </div>
        </div>

        {/* Hamburger Menu - Mobile Only */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Bottom Row on Mobile (Right on Desktop) */}
      <div className="flex items-center justify-end gap-2 md:gap-4 w-full md:w-auto">
        {/* Language Switcher */}
        <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl shadow-inner mr-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onLanguageChange(lang.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                selectedLanguage === lang.id
                  ? 'bg-white dark:bg-stone-700 text-orange-600 dark:text-orange-400 shadow-sm scale-105'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Theme Switcher */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 shadow-inner"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Install PWA Switcher */}
        <button
          onClick={handleInstallClick}
          className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-all duration-300 shadow-inner"
          title="Install App"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
