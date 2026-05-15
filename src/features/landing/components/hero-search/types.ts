import type { Movie } from '@/data';

export type { Movie };

export const TAG_IDS = ['all', 'action', 'comedy', 'horror', 'thriller', 'animation'] as const;

export type TagId = (typeof TAG_IDS)[number];

export interface QuickTag {
	id: TagId;
	label: string;
	tag: string | null;
	iconKey: string;
}

export const DEBOUNCE_MS = 250;
export const MAX_RESULTS = 8;
export const LIST_MAX_HEIGHT = 320;

export type SearchPanelState = 'initial' | 'results' | 'empty' | 'loading';

export const MOTION_DROPDOWN = {
	initial: { opacity: 0, scale: 0.92, y: -12 },
	animate: { opacity: 1, scale: 1, y: 0 },
	exit: { opacity: 0, scale: 0.92, y: -12 },
	transition: {
		type: 'spring' as const,
		damping: 26,
		stiffness: 300,
		duration: 0.25
	}
};

export const MOTION_ITEM = {
	initial: { opacity: 0, y: -4 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -4 },
	transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] as const }
};

export const SCROLLBAR_STYLE = {
	scrollbarWidth: 'thin' as const,
	scrollbarColor: 'oklch(0.7 0 0 / 0.15) transparent',
	'&::-webkit-scrollbar': {
		width: '4px'
	},
	'&::-webkit-scrollbar-track': {
		background: 'transparent'
	},
	'&::-webkit-scrollbar-thumb': {
		background: 'oklch(0.5 0 0 / 0.15)',
		borderRadius: '9999px'
	}
};
