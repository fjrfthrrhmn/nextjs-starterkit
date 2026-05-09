import type { Movie } from '@/data';

export type { Movie };

export const QUICK_TAGS = [
  { id: 'all', label: 'Semua', tag: null, iconKey: 'all' },
  { id: 'action', label: 'Action', tag: 'Action', iconKey: 'action' },
  { id: 'komedi', label: 'Komedi', tag: 'Komedi', iconKey: 'komedi' },
  { id: 'horror', label: 'Horror', tag: 'Horror', iconKey: 'horror' },
  { id: 'thriller', label: 'Thriller', tag: 'Thriller', iconKey: 'thriller' },
  { id: 'animasi', label: 'Animasi', tag: 'Animasi', iconKey: 'animasi' },
] as const;

export type QuickTag = (typeof QUICK_TAGS)[number];
export type TagId = QuickTag['id'];

export const DEBOUNCE_MS = 250;
export const MAX_RESULTS = 8;
export const LIST_MAX_HEIGHT = 320;

export const PANEL_EMPTY_STATES = {
  initial: {
    title: 'Find movies to add to your collection.',
    subtitle: 'Start typing above.',
  },
  noResults: (q: string) => ({
    title: `No movies found for "${q}".`,
    subtitle: 'Check the spelling or try a different title.',
  }),
  noCategoryResults: (cat: string) => ({
    title: `No movies in "${cat}".`,
    subtitle: 'Try a different category.',
  }),
} as const;

export type SearchPanelState = 'initial' | 'results' | 'empty' | 'loading';

export const MOTION_DROPDOWN = {
  initial: { opacity: 0, scale: 0.92, y: -12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.92, y: -12 },
  transition: {
    type: 'spring' as const,
    damping: 26,
    stiffness: 300,
    duration: 0.25,
  },
};

export const MOTION_ITEM = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
};

export const SCROLLBAR_STYLE = {
  scrollbarWidth: 'thin' as const,
  scrollbarColor: 'oklch(0.7 0 0 / 0.15) transparent',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'oklch(0.5 0 0 / 0.15)',
    borderRadius: '9999px',
  },
};
