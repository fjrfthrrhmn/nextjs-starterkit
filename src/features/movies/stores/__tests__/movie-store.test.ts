import { describe, expect, it } from 'vitest';

import { useMovieStore } from '@/features/movies/stores';

describe('movieStore', () => {
	beforeEach(() => {
		useMovieStore.getState().resetData();
	});

	describe('addEntry', () => {
		it('adds a new entry to the store', () => {
			const { addEntry } = useMovieStore.getState();

			const entry = addEntry({
				movieId: 'tmdb-550',
				source: 'tmdb',
				title: 'Inception',
				year: '2010',
				posterUrl: 'https://example.com/poster.jpg',
				genres: ['Action', 'Sci-Fi'],
				plot: 'A dream heist.',
				category: 'watched'
			});

			expect(entry.id).toBeDefined();
			expect(entry.movieId).toBe('tmdb-550');
			expect(entry.title).toBe('Inception');
			expect(entry.category).toBe('watched');
			expect(entry.createdAt).toBeDefined();
			expect(entry.updatedAt).toBeDefined();
		});

		it('defaults rating to null and notes to empty string', () => {
			const { addEntry } = useMovieStore.getState();

			const entry = addEntry({
				movieId: 'tmdb-123',
				source: 'tmdb',
				title: 'Test',
				year: '2020',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'plan_to_watch'
			});

			expect(entry.rating).toBeNull();
			expect(entry.notes).toBe('');
		});
	});

	describe('updateEntry', () => {
		it('updates an existing entry', () => {
			const { addEntry, updateEntry } = useMovieStore.getState();

			const entry = addEntry({
				movieId: 'tmdb-550',
				source: 'tmdb',
				title: 'Inception',
				year: '2010',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'plan_to_watch'
			});

			updateEntry(entry.id, {
				category: 'watched',
				rating: 5,
				notes: 'Amazing movie!'
			});

			const updated = useMovieStore.getState().getEntryById(entry.id);
			expect(updated?.category).toBe('watched');
			expect(updated?.rating).toBe(5);
			expect(updated?.notes).toBe('Amazing movie!');
		});
	});

	describe('deleteEntry', () => {
		it('removes an entry from the store', () => {
			const { addEntry, deleteEntry } = useMovieStore.getState();

			const entry = addEntry({
				movieId: 'tmdb-550',
				source: 'tmdb',
				title: 'Inception',
				year: '2010',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'watched'
			});

			deleteEntry(entry.id);

			const found = useMovieStore.getState().getEntryById(entry.id);
			expect(found).toBeUndefined();
		});
	});

	describe('getEntriesByCategory', () => {
		it('returns only entries matching the category', () => {
			const { addEntry } = useMovieStore.getState();

			addEntry({
				movieId: 'tmdb-1',
				source: 'tmdb',
				title: 'Movie 1',
				year: '2020',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'watched'
			});

			addEntry({
				movieId: 'tmdb-2',
				source: 'tmdb',
				title: 'Movie 2',
				year: '2021',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'plan_to_watch'
			});

			addEntry({
				movieId: 'tmdb-3',
				source: 'tmdb',
				title: 'Movie 3',
				year: '2022',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'watched'
			});

			const watched = useMovieStore.getState().getEntriesByCategory('watched');
			const planToWatch = useMovieStore.getState().getEntriesByCategory('plan_to_watch');

			expect(watched).toHaveLength(2);
			expect(planToWatch).toHaveLength(1);
		});
	});

	describe('isDuplicate', () => {
		it('detects duplicate movieId', () => {
			const { addEntry, isDuplicate } = useMovieStore.getState();

			addEntry({
				movieId: 'tmdb-550',
				source: 'tmdb',
				title: 'Inception',
				year: '2010',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'watched'
			});

			expect(isDuplicate('tmdb-550')).toBe(true);
			expect(isDuplicate('tmdb-999')).toBe(false);
		});
	});

	describe('getEntryByMovieId', () => {
		it('finds entry by movieId', () => {
			const { addEntry, getEntryByMovieId } = useMovieStore.getState();

			addEntry({
				movieId: 'tmdb-550',
				source: 'tmdb',
				title: 'Inception',
				year: '2010',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'watched'
			});

			const entry = getEntryByMovieId('tmdb-550');
			expect(entry).toBeDefined();
			expect(entry?.title).toBe('Inception');
		});
	});

	describe('resetData', () => {
		it('clears all entries', () => {
			const { addEntry, resetData, entries } = useMovieStore.getState();

			addEntry({
				movieId: 'tmdb-1',
				source: 'tmdb',
				title: 'Movie 1',
				year: '2020',
				posterUrl: null,
				genres: [],
				plot: '',
				category: 'watched'
			});

			resetData();

			const currentEntries = useMovieStore.getState().entries;
			expect(currentEntries).toHaveLength(0);
		});
	});
});
