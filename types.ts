
export interface Resource {
  id: number;
  title: string;
  category: string;
  authorName: string;
  description: string;
  tamilLyrics: string;
  englishLyrics: string;
  audioPath: string | null;
  imagePath: string | null;
  videoPath: string | null;
  created_at: string;
  updated_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

export type Category = string;
