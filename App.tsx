'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Category, Resource } from './types';
import LessonList from './components/LessonList';
import LessonDetail from './components/LessonDetail';
import HomeView from './components/HomeView';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

// Custom Hooks
import { useKirtanData } from './hooks/useKirtanData';
import { useUrlSync } from './hooks/useUrlSync';
import { useDynamicMetadata } from './hooks/useDynamicMetadata';
import { useLessonNavigation } from './hooks/useLessonNavigation';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(() => {
    if (typeof window === 'undefined') return 'home';
    const params = new URLSearchParams(window.location.search);
    return (params.get('category') as Category) || 'home';
  });
  
  const [activeLesson, setActiveLesson] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window === 'undefined') return false;
    const storedPlayState = sessionStorage.getItem('kirtan_isPlaying');
    return storedPlayState === 'true';
  });
  
  const [isHydrated, setIsHydrated] = useState(false);
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    if (typeof window === 'undefined') return 'en';
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en';
  });

  const hasLessonInUrl = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('lesson');
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Theme Sync
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Playback state persistence across refreshes
  useEffect(() => {
    sessionStorage.setItem('kirtan_isPlaying', isPlaying.toString());
  }, [isPlaying]);

  // Data Fetching Hook
  const { resources, navItems, loading, error } = useKirtanData(selectedLanguage);

  // URL Sync Hook
  useUrlSync({
    loading,
    resources,
    activeCategory,
    setActiveCategory,
    activeLesson,
    setActiveLesson,
    selectedLanguage,
    setSelectedLanguage,
  });

  // Dynamic Metadata Hook
  useDynamicMetadata({
    activeLesson,
    activeCategory,
    navItems,
    selectedLanguage,
  });

  const filteredResources = useMemo(() => {
    return resources
      .filter(res =>
        res &&
        (res.category || '').toLowerCase() === (activeCategory || '').toLowerCase() &&
        (((res.title || '').toLowerCase().includes((searchQuery || '').toLowerCase())) ||
          ((res.description || '').toLowerCase().includes((searchQuery || '').toLowerCase())) ||
          ((res.tamilLyrics || '').toLowerCase().includes((searchQuery || '').toLowerCase())) ||
          ((res.englishLyrics || '').toLowerCase().includes((searchQuery || '').toLowerCase())))
      )
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [activeCategory, searchQuery, resources]);

  const activeNavItem = navItems.find(item => item.id === activeCategory);

  // Navigation Hook
  const { handleNextLesson, handlePreviousLesson, hasNext, hasPrevious } = useLessonNavigation({
    activeLesson,
    activeCategory,
    filteredResources,
    resources,
    navItems,
    setActiveLesson,
    setActiveCategory,
  });

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

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

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
            navItems={navItems}
          />
        ) : (hasLessonInUrl && loading) ? (
          <div className="flex-1 flex items-center justify-center py-20 bg-stone-50 dark:bg-stone-950">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : activeCategory === 'home' ? (
          <HomeView
            onStart={setActiveCategory}
            categories={navItems.filter(item => item.id !== 'home')}
            selectedLanguage={selectedLanguage}
          />
        ) : (
          <>
            <Header
              title={activeNavItem?.label || ''}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLanguage={selectedLanguage}
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
                    navItems={navItems}
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
        {!activeLesson && <Footer selectedLanguage={selectedLanguage} />}
        </main>
      </div>


    </div>
  );
};

export default App;
