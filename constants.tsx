
import { Resource, Level, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'mridanga', label: 'Mridanga Lessons', icon: '🥁' },
  { id: 'harmonium', label: 'Harmonium Lessons', icon: '🎹' },
  { id: 'karatal', label: 'Karatal Lessons', icon: '🔔' },
  { id: 'raga', label: 'Raga Lessons', icon: '🎵' },
  { id: 'bhajans', label: 'Bhajan Library', icon: '📜' },
  { id: 'kirtan', label: 'Kirtan Lists', icon: '🙌' },
];

export const MOCK_RESOURCES: Resource[] = [
  // Mridanga
  {
    id: 'm1',
    category: 'mridanga',
    title: 'Basic 1-2-3 Mantras',
    description: 'The foundation of all kirtan beats. Learn the correct hand placement for Ghen, Te, and Re.',
    instrument: 'Mridanga',
    level: Level.Beginner,
    ragaTala: 'Kaharva (8 Beats)',
    referenceUrl: 'https://www.youtube.com/watch?v=example1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599408162449-373857e4918e?auto=format&fit=crop&q=80&w=400',
    mantra: 'Ghen Ta, Ghen Ta, Ghen Ta Ti'
  },
  {
    id: 'm2',
    category: 'mridanga',
    title: 'Prabhupada Style - Fast',
    description: 'The iconic fast beat used during ecstatic kirtans.',
    instrument: 'Mridanga',
    level: Level.Intermediate,
    ragaTala: 'Fast Kaharva',
    referenceUrl: 'https://www.youtube.com/watch?v=example2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544211501-0c43057e0969?auto=format&fit=crop&q=80&w=400',
    mantra: 'Tere Kheta Ghen Ghen'
  },
  // Harmonium
  {
    id: 'h1',
    category: 'harmonium',
    title: 'Morning Melody (Bhairavi)',
    description: 'Learn the fingerings for the classic morning raga used for Mangala Arati.',
    instrument: 'Harmonium',
    level: Level.Beginner,
    ragaTala: 'Raga Bhairavi',
    referenceUrl: 'https://www.youtube.com/watch?v=example3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'h2',
    category: 'harmonium',
    title: 'Chords for Mahamantra',
    description: 'Using basic chords to enhance your kirtan accompaniment.',
    instrument: 'Harmonium',
    level: Level.Intermediate,
    ragaTala: 'N/A',
    referenceUrl: 'https://www.youtube.com/watch?v=example4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1520522139393-01608930928a?auto=format&fit=crop&q=80&w=400'
  },
  // Karatal
  {
    id: 'k1',
    category: 'karatal',
    title: 'The Slow 1-2-3',
    description: 'Simple stroke technique for slow bhajan accompaniment.',
    instrument: 'Karatal',
    level: Level.Beginner,
    ragaTala: 'Dadra',
    referenceUrl: 'https://www.youtube.com/watch?v=example5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400'
  },
  // Ragas
  {
    id: 'r1',
    category: 'raga',
    title: 'Raga Yaman Deep-Dive',
    description: 'The "Evening Queen" raga. Understanding the sharp Ma and the mood of surrender.',
    instrument: 'Voice / Harmonium',
    level: Level.Intermediate,
    ragaTala: 'Raga Yaman',
    referenceUrl: 'https://www.youtube.com/watch?v=example6',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507838596016-a946e38a4d96?auto=format&fit=crop&q=80&w=400'
  },
  // Bhajans
  {
    id: 'b1',
    category: 'bhajans',
    title: 'Jaya Radha Madhava',
    description: 'Srila Prabhupada\'s favorite meditation before class.',
    instrument: 'All',
    level: Level.Beginner,
    ragaTala: 'Various',
    referenceUrl: 'https://www.youtube.com/watch?v=example7',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400'
  }
];
