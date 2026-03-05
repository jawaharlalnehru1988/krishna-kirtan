
import { Resource, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 999,
    category: 'Mock',
    title: 'Loading Example...',
    authorName: 'Sri Kirtan Academy',
    description: 'This is a placeholder for loading content from the API.',
    tamilLyrics: '',
    englishLyrics: '',
    audioPath: null,
    imagePath: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400',
    videoPath: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
