import { Resource, NavItem, Category } from '../types';

interface UseLessonNavigationProps {
  activeLesson: Resource | null;
  activeCategory: Category;
  filteredResources: Resource[];
  resources: Resource[];
  navItems: NavItem[];
  setActiveLesson: (lesson: Resource | null) => void;
  setActiveCategory: (category: Category) => void;
}

export const useLessonNavigation = ({
  activeLesson,
  activeCategory,
  filteredResources,
  resources,
  navItems,
  setActiveLesson,
  setActiveCategory,
}: UseLessonNavigationProps) => {
  const handleNextLesson = () => {
    if (!activeLesson || filteredResources.length === 0) return;
    const currentIndex = filteredResources.findIndex(r => r.id === activeLesson.id);
    
    if (currentIndex < filteredResources.length - 1) {
      // Go to next lesson in current category
      setActiveLesson(filteredResources[currentIndex + 1]);
    } else {
      // Reached the end of the current category. Find the next category with resources.
      const currentCategoryIndex = navItems.findIndex(item => item.id === activeCategory);
      let nextCategoryFound = false;
      let checkIndex = currentCategoryIndex + 1;
      
      for (let i = 0; i < navItems.length - 1; i++) {
        if (checkIndex >= navItems.length) checkIndex = 1; // Wrap to 1 (skip home)
        if (checkIndex === 0) checkIndex = 1;
        
        const nextCategory = navItems[checkIndex].id;
        const nextCategoryResources = resources
          .filter(res => res && (res.category || '').toLowerCase() === (nextCategory || '').toLowerCase())
          .sort((a, b) => (a.order || 0) - (b.order || 0));
          
        if (nextCategoryResources.length > 0) {
          setActiveCategory(nextCategory as Category);
          setActiveLesson(nextCategoryResources[0]);
          nextCategoryFound = true;
          break;
        }
        checkIndex++;
      }
      
      if (!nextCategoryFound) {
        // Fallback to start of current list if no other categories have items
        setActiveLesson(filteredResources[0]);
      }
    }
  };

  const handlePreviousLesson = () => {
    if (!activeLesson || filteredResources.length === 0) return;
    const currentIndex = filteredResources.findIndex(r => r.id === activeLesson.id);
    
    if (currentIndex > 0) {
      // Go to previous lesson in current category
      setActiveLesson(filteredResources[currentIndex - 1]);
    } else {
      // Go to previous category's LAST lesson
      const currentCategoryIndex = navItems.findIndex(item => item.id === activeCategory);
      let prevCategoryFound = false;
      let checkIndex = currentCategoryIndex - 1;
      
      for (let i = 0; i < navItems.length - 1; i++) {
        if (checkIndex <= 0) checkIndex = navItems.length - 1; // Wrap to end, skip home (0)
        
        const prevCategory = navItems[checkIndex].id;
        const prevCategoryResources = resources
          .filter(res => res && (res.category || '').toLowerCase() === (prevCategory || '').toLowerCase())
          .sort((a, b) => (a.order || 0) - (b.order || 0));
          
        if (prevCategoryResources.length > 0) {
          setActiveCategory(prevCategory as Category);
          setActiveLesson(prevCategoryResources[prevCategoryResources.length - 1]);
          prevCategoryFound = true;
          break;
        }
        checkIndex--;
      }
      
      if (!prevCategoryFound) {
        // Fallback to end of current list
        setActiveLesson(filteredResources[filteredResources.length - 1]);
      }
    }
  };

  const currentIndex = activeLesson ? filteredResources.findIndex(r => r.id === activeLesson.id) : -1;
  const hasNext = filteredResources.length > 1;
  const hasPrevious = filteredResources.length > 1;

  return {
    handleNextLesson,
    handlePreviousLesson,
    currentIndex,
    hasNext,
    hasPrevious,
  };
};
