import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Download, User as UserIcon, ChevronDown, Check } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { AuthModal } from './auth/AuthModal';

const SUBSCRIBER_EMAIL_KEY = 'askharekrishna-subscriber-email';
const SUBSCRIBER_NAME_KEY = 'askharekrishna-subscriber-name';
const SUBSCRIBER_PICTURE_KEY = 'askharekrishna-subscriber-picture';

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
  { id: 'en', label: 'English', code: 'EN' },
  { id: 'ta', label: 'தமிழ்', code: 'TA' },
  { id: 'hi', label: 'हिन्दी', code: 'HI' },
  { id: 'kn', label: 'ಕನ್ನಡ', code: 'KN' },
  { id: 'ml', label: 'മലയാളം', code: 'ML' },
  { id: 'bn', label: 'বাংলা', code: 'BN' },
  { id: 'te', label: 'తెలుగు', code: 'TE' },
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
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [googleUser, setGoogleUser] = useState<{ name: string; email: string; picture: string } | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncUser = () => {
      const name = localStorage.getItem(SUBSCRIBER_NAME_KEY) || '';
      const email = localStorage.getItem(SUBSCRIBER_EMAIL_KEY) || '';
      const picture = localStorage.getItem(SUBSCRIBER_PICTURE_KEY) || '';
      if (name || email) {
        setGoogleUser({ name: name || email, email, picture });
      } else {
        setGoogleUser(null);
      }
    };

    syncUser();
    window.addEventListener('subscriber-updated', syncUser);
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('subscriber-updated', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(SUBSCRIBER_NAME_KEY);
    localStorage.removeItem(SUBSCRIBER_EMAIL_KEY);
    localStorage.removeItem(SUBSCRIBER_PICTURE_KEY);
    window.dispatchEvent(new Event('subscriber-updated'));
    logout();
    setGoogleUser(null);
    setShowProfileMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const currentUser = googleUser || (user ? { name: user.first_name || user.username, email: user.email, picture: '' } : null);

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
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors shadow-inner text-sm font-bold"
          >
            <span className="font-mono font-bold text-[10px] bg-stone-200 dark:bg-stone-700 px-1.5 py-0.5 rounded text-stone-600 dark:text-stone-300">
              {LANGUAGES.find(l => l.id === selectedLanguage)?.code || 'EN'}
            </span>
            <span className="hidden sm:inline">{LANGUAGES.find(l => l.id === selectedLanguage)?.label || 'Language'}</span>
            <span className="sm:hidden">{LANGUAGES.find(l => l.id === selectedLanguage)?.code || 'LANG'}</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 max-h-64 overflow-y-auto bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      onLanguageChange(lang.id);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedLanguage === lang.id
                        ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[10px] bg-stone-200 dark:bg-stone-700 px-1.5 py-0.5 rounded text-stone-600 dark:text-stone-300 w-6 text-center">
                        {lang.code}
                      </span>
                      <span>{lang.label}</span>
                    </span>
                    {selectedLanguage === lang.id && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
          )}
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

        {/* User / Login Button */}
        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors shadow-inner overflow-hidden"
            >
              {currentUser.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentUser.picture} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
              )}
              <span className="hidden md:block font-medium text-stone-700 dark:text-stone-300 text-sm max-w-[120px] truncate">
                {currentUser.name}
              </span>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-700">
                  <p className="text-sm font-bold text-stone-900 dark:text-white truncate">{currentUser.name}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all duration-300 shadow-sm text-sm flex items-center gap-1.5"
          >
            <UserIcon size={16} />
            <span>Login</span>
          </button>
        )}
      </div>

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Topbar;

