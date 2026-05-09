import {
  Search,
  Compass,
  Mic,
  type LucideIcon,
} from 'lucide-react';

export type SearchIconKey = 'search' | 'empty' | 'mic' | 'compass';

export const SEARCH_ICONS: Record<SearchIconKey, LucideIcon> = {
  search: Search,
  empty: Compass,
  mic: Mic,
  compass: Compass,
} as const;

export const SEARCH_ICON_KEYS = Object.keys(SEARCH_ICONS) as SearchIconKey[];