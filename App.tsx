import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { Category, Resource, NavItem } from './types';
import LessonList from './components/LessonList';
import LessonDetail from './components/LessonDetail';
import HomeView from './components/HomeView';
import InactivityPrompt from './components/InactivityPrompt';

import { Menu, X } from 'lucide-react';
import { CATEGORY_ICONS } from './constants';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('home');
  const [activeLesson, setActiveLesson] = useState<Resource | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInactivityPrompt, setShowInactivityPrompt] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ta');
  const lastActivityTimeRef = useRef<number>(Date.now());

  // Theme Sync
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync state FROM URL on initial load and popstate
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get('category') as Category || 'home';
      const lessonId = params.get('lesson');
      const lang = params.get('lang');

      setActiveCategory(category);
      if (lang) setSelectedLanguage(lang);

      if (lessonId && resources.length > 0) {
        const lesson = resources.find(r => r.id.toString() === lessonId);
        setActiveLesson(lesson || null);
      } else {
        setActiveLesson(null);
      }
    };

    // Initial sync once resources are loaded
    if (!loading && resources.length > 0) {
      handlePopState();
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [loading, resources]);

  // Sync state TO URL
  useEffect(() => {
    if (loading) return;

    const params = new URLSearchParams();
    if (activeCategory !== 'home') {
      params.set('category', activeCategory);
    }
    if (activeLesson) {
      params.set('lesson', activeLesson.id.toString());
    }
    if (selectedLanguage !== 'ta') {
      params.set('lang', selectedLanguage);
    }

    const newSearch = params.toString() ? `?${params.toString()}` : '';
    if (window.location.search !== newSearch) {
      window.history.pushState(null, '', window.location.pathname + newSearch);
    }
  }, [activeCategory, activeLesson, selectedLanguage, loading]);

  // Dynamic Metadata Sync
  useEffect(() => {
    const updateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[property="twitter:${name}"], meta[name="twitter:${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', `twitter:${name}`);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    if (activeLesson) {
      const title = activeLesson.title;
      const description = activeLesson.description || "Sri Krishna Kirtan Music Library";
      const image = (activeLesson.imagePath || "/lord caitanya.jpeg").replace(/ /g, '%20');

      document.title = `${title} | Sri Krishna Kirtan`;
      updateMeta('og:title', title);
      updateMeta('og:description', description);
      updateMeta('og:image', image);
      updateMeta('og:url', window.location.href);

      updateTwitterMeta('title', title);
      updateTwitterMeta('description', description);
      updateTwitterMeta('image', image);
    } else {
      const defaultTitle = "Sri Krishna Kirtan - Music Library";
      const defaultDesc = "Discover divine kirtans, lyrics, and translations in multiple languages.";
      const defaultImg = "/lord caitanya.jpeg".replace(/ /g, '%20');

      document.title = "Sri Krishna Kirtan";
      updateMeta('og:title', defaultTitle);
      updateMeta('og:description', defaultDesc);
      updateMeta('og:image', defaultImg);
      updateMeta('og:url', window.location.origin);

      updateTwitterMeta('title', defaultTitle);
      updateTwitterMeta('description', defaultDesc);
      updateTwitterMeta('image', defaultImg);
    }
  }, [activeLesson]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kirtansResponse, categoriesResponse] = await Promise.all([
          axios.get('https://api.askharekrishna.com/api/v1/kirtans/'),
          axios.get('https://api.askharekrishna.com/api/v1/kirtan-categories/')
        ]);

        const kirtansData = kirtansResponse.data;
        const categoriesData = categoriesResponse.data;

        // Transform API data to Resource type
        const fetchedResources: Resource[] = kirtansData.map((item: any) => {
          const translations = item.translations || [];
          const enTranslation = translations.find((t: any) => t.language_code === 'en') || translations[0];
          const taTranslation = translations.find((t: any) => t.language_code === 'ta');

          return {
            id: item.id,
            category: item.category,
            audioPath: item.audioPath,
            imagePath: item.imagePath,
            videoPath: item.videoPath,
            translations: translations,
            created_at: item.created_at,
            updated_at: item.updated_at,
            // Flattened fields for UI components
            title: enTranslation?.title || `Kirtan ${item.id}`,
            authorName: enTranslation?.authorName || '',
            description: enTranslation?.description || '',
            tamilLyrics: taTranslation?.lyrics || '',
            englishLyrics: enTranslation?.lyrics || '',
            order: item.order || 0
          };
        });

        setResources(fetchedResources);

        // Build navigation items from categories API
        const dynamicNavItems: NavItem[] = [
          { id: 'home', label: 'Home', icon: '🏠' },
          ...categoriesData.map((cat: any) => ({
            id: cat.name, // Use name as ID to match resource.category
            label: cat.name,
            image: cat.categoryImage,
            icon: CATEGORY_ICONS[cat.name.toLowerCase()] || CATEGORY_ICONS['default']
          }))
        ];

        setNavItems(dynamicNavItems);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResources = useMemo(() => {
    return resources
      .filter(res =>
        res.category.toLowerCase() === activeCategory.toLowerCase() &&
        (res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.tamilLyrics.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.englishLyrics.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [activeCategory, searchQuery, resources]);

  // Inactivity tracking logic
  useEffect(() => {
    const handleActivity = () => {
      lastActivityTimeRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('click', handleActivity);

    const interval = setInterval(() => {
      const INACTIVITY_THRESHOLD = 45 * 60 * 1000; // 45 minutes
      if (isPlaying && !showInactivityPrompt && (Date.now() - lastActivityTimeRef.current > INACTIVITY_THRESHOLD)) {
        setShowInactivityPrompt(true);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(interval);
    };
  }, [isPlaying, showInactivityPrompt]);

  const handleInactivityContinue = () => {
    lastActivityTimeRef.current = Date.now();
    setShowInactivityPrompt(false);
  };

  const handleInactivityStop = () => {
    setIsPlaying(false);
    setShowInactivityPrompt(false);
  };

  const activeNavItem = navItems.find(item => item.id === activeCategory);

  const handleNextLesson = () => {
    if (!activeLesson || filteredResources.length === 0) return;
    const currentIndex = filteredResources.findIndex(r => r.id === activeLesson.id);
    const nextIndex = (currentIndex + 1) % filteredResources.length;
    setActiveLesson(filteredResources[nextIndex]);
  };

  const handlePreviousLesson = () => {
    if (!activeLesson || filteredResources.length === 0) return;
    const currentIndex = filteredResources.findIndex(r => r.id === activeLesson.id);
    const prevIndex = (currentIndex - 1 + filteredResources.length) % filteredResources.length;
    setActiveLesson(filteredResources[prevIndex]);
  };

  const currentIndex = activeLesson ? filteredResources.findIndex(r => r.id === activeLesson.id) : -1;
  const hasNext = filteredResources.length > 1;
  const hasPrevious = filteredResources.length > 1;

  const handleLessonView = (resource: Resource) => {
    setActiveLesson(resource);
    setIsSidebarOpen(false); // Close sidebar on mobile when selecting a lesson
  };

  const handleBackToLibrary = () => {
    setActiveLesson(null);
  };

  const handleHomeClick = () => {
    setActiveCategory('home');
    setActiveLesson(null);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col relative transition-colors duration-300">
      <Topbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onHomeClick={handleHomeClick}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      <div className="flex flex-1 flex-col md:flex-row relative overflow-hidden">
        <Sidebar
          navItems={navItems}
          activeCategory={activeCategory}
          activeLesson={activeLesson}
          onCategoryChange={(id) => {
            setActiveCategory(id as Category);
            setActiveLesson(null);
            setIsSidebarOpen(false);
          }}
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto h-[calc(100vh-73px)] relative">
        {activeLesson ? (
          <LessonDetail
            resource={activeLesson}
            onBack={handleBackToLibrary}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            selectedLanguage={selectedLanguage}
          />
        ) : activeCategory === 'home' ? (
          <HomeView
            onStart={setActiveCategory}
            categories={navItems.filter(item => item.id !== 'home')}
          />
        ) : (
          <>
            <Header
              title={activeNavItem?.label || ''}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <section className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-20">{error}</div>
              ) : filteredResources.length > 0 ? (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <LessonList 
                    resources={filteredResources} 
                    onView={handleLessonView} 
                    selectedLanguage={selectedLanguage}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-stone-400 bg-white rounded-3xl border-2 border-dashed border-stone-200">
                  <span className="text-5xl mb-4">📿</span>
                  <p className="text-lg font-medium">No lessons found in this category.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-orange-600 hover:underline"
                  >
                    Clear search filter
                  </button>
                </div>
              )}
            </section>
          </>
        )}


        {/* Footer */}
        {!activeLesson && <Footer />}
        </main>
      </div>

      {showInactivityPrompt && (
        <InactivityPrompt
          onContinue={handleInactivityContinue}
          onStop={handleInactivityStop}
        />
      )}
    </div>
  );
};

export default App;

