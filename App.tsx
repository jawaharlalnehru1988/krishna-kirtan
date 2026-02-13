import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Category, Resource, NavItem } from './types';
import LessonCard from './components/LessonCard';
import LessonDetail from './components/LessonDetail';
import HomeView from './components/HomeView';

const CATEGORY_ICONS: Record<string, string> = {
  mridanga: '🥁',
  mritanga: '🥁',
  harmonium: '🎹',
  karatal: '🔔',
  raga: '🎵',
  bhajans: '📜',
  kirtan: '🙌',
  default: '🪔'
};

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('home');
  const [activeLesson, setActiveLesson] = useState<Resource | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.askharekrishna.com/api/v1/kirtans');
        const data = response.data;

        // Transform API data to Resource type
        const fetchedResources: Resource[] = data.map((item: any) => {
          let category = item.category.toLowerCase();
          if (category === 'mritanga') category = 'mridanga'; // Fix typo from API

          return {
            id: item.id,
            category: category,
            title: item.title,
            description: item.description,
            instrument: item.category, // Use original category name for instrument display
            level: item.level,
            ragaTala: item.ragaTalaName,
            referenceUrl: item.videoPath || item.audioPath || '',
            thumbnailUrl: null, // Will be handled by LessonCard fallback
            mantra: item.beatSwara
          };
        });

        setResources(fetchedResources);

        // Extract unique categories for sidebar
        const uniqueCategories = Array.from(new Set(fetchedResources.map(r => r.category)));

        const dynamicNavItems: NavItem[] = [
          { id: 'home', label: 'Home', icon: '🏠' },
          ...uniqueCategories.map(cat => ({
            id: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1), // Capitalize label
            icon: CATEGORY_ICONS[cat] || CATEGORY_ICONS['default']
          }))
        ];

        setNavItems(dynamicNavItems);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load lessons. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter(res =>
      res.category === activeCategory &&
      (res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [activeCategory, searchQuery, resources]);

  const activeNavItem = navItems.find(item => item.id === activeCategory);

  const handleLessonView = (resource: Resource) => {
    setActiveLesson(resource);
  };

  const handleBackToLibrary = () => {
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-stone-200 flex flex-col sticky top-0 h-auto md:h-screen z-20">
        <div
          className="p-6 border-b border-stone-100 bg-orange-50/30 cursor-pointer"
          onClick={() => { setActiveCategory('home'); setActiveLesson(null); }}
        >
          <h1 className="text-2xl font-bold text-orange-800 tracking-tight flex items-center gap-2">
            🪔 <span className="playfair">Sri Krishna Kirtan</span>
          </h1>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-widest mt-1">Resource Library</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveCategory(item.id); setActiveLesson(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${activeCategory === item.id && !activeLesson
                ? 'bg-orange-100 text-orange-800 font-bold shadow-sm'
                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto h-screen relative">
        {activeLesson ? (
          <LessonDetail resource={activeLesson} onBack={handleBackToLibrary} />
        ) : activeCategory === 'home' ? (
          <HomeView onStart={setActiveCategory} />
        ) : (
          <>
            <header className="sticky top-0 bg-stone-50/80 backdrop-blur-md z-10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-stone-900">{activeNavItem?.label}</h2>
                <p className="text-stone-500 text-sm mt-1">Browse and learn various lessons and techniques.</p>
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
              </div>
            </header>

            <section className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-20">{error}</div>
              ) : filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  {filteredResources.map((resource) => (
                    <LessonCard
                      key={resource.id}
                      resource={resource}
                      onView={handleLessonView}
                    />
                  ))}
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

        {/* Footer - Only show on home or list view, arguably could be in detail too but cleaner without */}
        {!activeLesson && (
          <footer className="mt-auto p-10 bg-stone-100 border-t border-stone-200">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-stone-400 text-sm italic">
                "Kirtaniyah sada harih" - Chant the holy names always.
              </p>
              <div className="mt-4 flex justify-center gap-6">
                <a href="#" className="text-stone-400 hover:text-stone-600 transition-colors">Documentation</a>
                <a href="#" className="text-stone-400 hover:text-stone-600 transition-colors">Our Gurus</a>
                <a href="#" className="text-stone-400 hover:text-stone-600 transition-colors">Community</a>
              </div>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
};

export default App;

