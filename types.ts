
export type Category = string;

export enum Level {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced'
}

export interface Resource {
  id: number; // API uses number
  category: string;
  title: string;
  description: string;
  instrument?: string;
  level: Level | string;
  ragaTala?: string;
  referenceUrl: string;
  videoPath?: string | null;
  audioPath?: string | null;
  thumbnailUrl?: string; // Optional now, since API doesn't provide it
  mantra?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string; // Optional, API doesn't provide icons
}
