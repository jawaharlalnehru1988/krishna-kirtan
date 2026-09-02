import { useEffect } from 'react';
import { Resource, NavItem, Category } from '../types';

interface UseDynamicMetadataProps {
  activeLesson: Resource | null;
  activeCategory: Category;
  navItems: NavItem[];
  selectedLanguage: string;
}

export const useDynamicMetadata = ({
  activeLesson,
  activeCategory,
  navItems,
  selectedLanguage,
}: UseDynamicMetadataProps) => {
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
      const categoryItem = navItems.find(item => (item?.id || '').toString().toLowerCase() === (activeLesson.category || '').toString().toLowerCase());
      const image = (activeLesson.imagePath || categoryItem?.image || "/lord caitanya.jpeg").replace(/ /g, '%20');

      document.title = `${title} | Sri Krishna Kirtan`;
      updateMeta('og:title', title);
      updateMeta('og:description', description);
      updateMeta('og:image', image);
      updateMeta('og:url', window.location.href);

      updateTwitterMeta('title', title);
      updateTwitterMeta('description', description);
      updateTwitterMeta('image', image);
    } else if (activeCategory && activeCategory !== 'home') {
      const categoryItem = navItems.find(item => (item?.id || '').toString().toLowerCase() === (activeCategory || '').toString().toLowerCase());
      const title = categoryItem?.label || activeCategory;
      const isTa = selectedLanguage === 'ta';
      const description = isTa 
        ? `ஸ்ரீ கிருஷ்ண கீர்த்தனம் - ${title} பகுப்பில் உள்ள தெய்வீக கீர்த்தனைகள், வரிகள் மற்றும் மொழிபெயர்ப்புகளைக் கண்டறியவும்.`
        : `Sri Krishna Kirtan - Discover divine kirtans, lyrics, and translations in the ${title} category.`;
      const image = (categoryItem?.image || "/lord caitanya.jpeg").replace(/ /g, '%20');

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
  }, [activeLesson, activeCategory, navItems, selectedLanguage]);
};
