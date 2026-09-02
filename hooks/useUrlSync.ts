import { useEffect } from 'react';
import { Category, Resource } from '../types';

interface UseUrlSyncProps {
  loading: boolean;
  resources: Resource[];
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  activeLesson: Resource | null;
  setActiveLesson: (lesson: Resource | null) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export const useUrlSync = ({
  loading,
  resources,
  activeCategory,
  setActiveCategory,
  activeLesson,
  setActiveLesson,
  selectedLanguage,
  setSelectedLanguage,
}: UseUrlSyncProps) => {
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
  }, [loading, resources, setActiveCategory, setActiveLesson, setSelectedLanguage]);

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
};
