import { useState, useEffect } from 'react';
import axios from 'axios';
import { Resource, NavItem } from '../types';
import { CATEGORY_ICONS } from '../constants';

export const useKirtanData = (selectedLanguage: string) => {
  const [resources, setResources] = useState<Resource[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const cached = localStorage.getItem('kirtan_resources');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      console.warn("Could not read kirtan_resources from localStorage:", e);
      return [];
    }
  });
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [navItemsCache, setNavItemsCache] = useState<Record<string, NavItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (resources.length > 0) {
        setLoading(false);
      }

      try {
        const kirtansResponse = await axios.get('/api/kirtans');
        const kirtansData = kirtansResponse.data;

        // Transform API data to Resource type
        const fetchedResources: Resource[] = kirtansData.map((item: any) => {
          const translations = item?.translations || [];
          const enTranslation = translations.find((t: any) => t?.language_code === 'en') || translations[0];
          const taTranslation = translations.find((t: any) => t?.language_code === 'ta');

          return {
            id: item.id,
            category: item.category || '',
            audioPath: item.audioPath,
            imagePath: item.imagePath || item.image || item.categoryImage || null,
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
        try {
          localStorage.setItem('kirtan_resources', JSON.stringify(fetchedResources));
        } catch (e) {
          console.warn("Could not cache resources to localStorage (payload may exceed browser quota):", e);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch kirtans:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch localized categories whenever language changes (with caching)
  useEffect(() => {
    const fetchCategories = async () => {
      // Check in-memory cache first
      if (navItemsCache[selectedLanguage]) {
        setNavItems(navItemsCache[selectedLanguage]);
        return;
      }

      try {
        const response = await axios.get(`/api/kirtan-categories?lang=${selectedLanguage}`);
        const categoriesData = response.data;

        const getHomeLabel = (lang: string) => {
          const labels: Record<string, string> = {
            en: 'Home',
            ta: 'முகப்பு',
            hi: 'होम',
            kn: 'ಮುಖಪುಟ',
            ml: 'ഹോം',
            bn: 'হোম',
            te: 'హోమ్'
          };
          return labels[lang] || 'Home';
        };

        // Transform API data to NavItem type with localized labels
        const dynamicNavItems: NavItem[] = [
          { id: 'home', label: getHomeLabel(selectedLanguage), icon: '🏠' },
          ...categoriesData.map((cat: any) => {
            // Find stable English name for internal logic (ID and Icons)
            const englishTranslation = cat?.translations?.find((t: any) => t?.language_code === 'en');
            const stableId = englishTranslation?.name || (selectedLanguage === 'en' ? cat?.name : cat?.id?.toString()) || (cat?.name || 'Category');
            const safeKey = (stableId || '').toString().toLowerCase();
            
            return {
              id: stableId,
              label: cat?.name || stableId, // Localized name from API
              image: cat?.categoryImage || null,
              icon: CATEGORY_ICONS[safeKey] || CATEGORY_ICONS['default']
            };
          })
        ];

        setNavItems(dynamicNavItems);
        setNavItemsCache(prev => ({ ...prev, [selectedLanguage]: dynamicNavItems }));
      } catch (err) {
        console.error("Failed to fetch localized categories:", err);
      }
    };

    fetchCategories();
  }, [selectedLanguage, navItemsCache]);

  return { resources, navItems, loading, error };
};
