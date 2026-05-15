import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslations } from 'next-intl';

import { useDebounceValue, useOnClickOutside } from 'usehooks-ts';

import { categories, getMoviesByCategory, searchMovies } from '@/data';

import {
	DEBOUNCE_MS,
	MAX_RESULTS,
	type Movie,
	type QuickTag,
	type SearchPanelState
} from '../types';
import { useSearchTags } from './use-search-tags';

export type UseHeroSearchReturn = {
	containerRef: React.RefObject<HTMLDivElement>;
	inputRef: React.RefObject<HTMLInputElement>;
	listRef: React.RefObject<HTMLDivElement>;
	searchQuery: string;
	setSearchQuery: (q: string) => void;
	debouncedQuery: string;
	selectedTag: QuickTag;
	selectedIndex: number;
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	panelState: SearchPanelState;
	emptyMessage: { title: string; subtitle: string };
	displayMovies: Movie[];
	groupLabel: string;
	handleTagChange: (tag: QuickTag) => void;
	handleSelect: (movie: Movie) => void;
};

export function useHeroSearch(): UseHeroSearchReturn {
	const t = useTranslations('search');
	const { tags, getTagById } = useSearchTags();

	const containerRef = React.useRef<HTMLDivElement>(null!);
	const inputRef = React.useRef<HTMLInputElement>(null!);
	const listRef = React.useRef<HTMLDivElement>(null!);

	const [searchQuery, setSearchQuery] = React.useState('');
	const [debouncedQuery] = useDebounceValue(searchQuery, DEBOUNCE_MS);
	const [selectedTag, setSelectedTag] = React.useState<QuickTag>(tags[0]);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [isOpen, setIsOpen] = React.useState(false);

	const hasQuery = debouncedQuery.trim().length > 0;

	const displayMovies = React.useMemo(() => {
		if (hasQuery) {
			return searchMovies(debouncedQuery).slice(0, MAX_RESULTS);
		}
		if (selectedTag.tag === null) {
			return categories.flatMap(cat => getMoviesByCategory(cat)).slice(0, MAX_RESULTS);
		}
		return getMoviesByCategory(selectedTag.tag).slice(0, MAX_RESULTS);
	}, [hasQuery, debouncedQuery, selectedTag]);

	const groupLabel = React.useMemo(() => {
		if (hasQuery) return t('results', { count: displayMovies.length, query: debouncedQuery });
		if (selectedTag.tag === null) return t('allCategories') || 'All Categories';
		return selectedTag.label;
	}, [hasQuery, debouncedQuery, selectedTag, displayMovies.length, t]);

	const panelState = React.useMemo<SearchPanelState>(() => {
		if (isOpen) {
			if (displayMovies.length > 0) return 'results';
			if (hasQuery) return 'empty';
			return 'initial';
		}
		return 'initial';
	}, [isOpen, displayMovies.length, hasQuery]);

	const emptyMessage = React.useMemo(() => {
		if (panelState === 'empty') {
			return {
				title: t('noResultsFor', { query: debouncedQuery }),
				subtitle: t('checkSpelling')
			};
		}
		if (panelState === 'initial') {
			if (hasQuery) {
				return {
					title: t('noResultsFor', { query: debouncedQuery }),
					subtitle: t('checkSpelling')
				};
			}
			return {
				title: t('findMovies'),
				subtitle: t('startTyping')
			};
		}
		return {
			title: t('findMovies'),
			subtitle: t('startTyping')
		};
	}, [panelState, debouncedQuery, hasQuery, t]);

	useOnClickOutside(containerRef, () => {
		setIsOpen(false);
		setSelectedIndex(0);
	});

	useHotkeys(
		'/',
		e => {
			e.preventDefault();
			inputRef.current?.focus();
		},
		{ preventDefault: true }
	);

	useHotkeys(
		'meta+k,ctrl+k',
		e => {
			e.preventDefault();
			inputRef.current?.focus();
		},
		{ preventDefault: true }
	);

	useHotkeys(
		'escape',
		e => {
			if (!isOpen) return;
			e.preventDefault();
			setIsOpen(false);
			setSelectedIndex(0);
			inputRef.current?.blur();
		},
		{ enableOnFormTags: true }
	);

	useHotkeys(
		'arrowdown',
		e => {
			if (!isOpen || displayMovies.length === 0) return;
			e.preventDefault();
			setSelectedIndex(prev => Math.min(prev + 1, displayMovies.length - 1));
		},
		{ enableOnFormTags: true }
	);

	useHotkeys(
		'arrowup',
		e => {
			if (!isOpen) return;
			e.preventDefault();
			setSelectedIndex(prev => Math.max(prev - 1, 0));
		},
		{ enableOnFormTags: true }
	);

	useHotkeys(
		'enter',
		e => {
			if (!isOpen || displayMovies.length === 0) return;
			e.preventDefault();
			const movie = displayMovies[selectedIndex];
			if (movie) {
				window.location.href = `/search?q=${encodeURIComponent(movie.title)}`;
			}
		},
		{ enableOnFormTags: true }
	);

	React.useEffect(() => {
		setSelectedIndex(0);
	}, [debouncedQuery, selectedTag]);

	React.useEffect(() => {
		if (isOpen && selectedIndex >= 0 && listRef.current) {
			const items = listRef.current.querySelectorAll('[data-hero-item]');
			const item = items[selectedIndex] as HTMLElement | undefined;
			item?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}
	}, [selectedIndex, isOpen]);

	function handleTagChange(tag: QuickTag) {
		setSelectedTag(tag);
		setSearchQuery('');
		inputRef.current?.focus();
	}

	function handleSelect(movie: Movie) {
		window.location.href = `/search?q=${encodeURIComponent(movie.title)}`;
	}

	return {
		containerRef,
		inputRef,
		listRef,
		searchQuery,
		setSearchQuery,
		debouncedQuery,
		selectedTag,
		selectedIndex,
		setSelectedIndex,
		isOpen,
		setIsOpen,
		panelState,
		emptyMessage,
		displayMovies,
		groupLabel,
		handleTagChange,
		handleSelect
	};
}
