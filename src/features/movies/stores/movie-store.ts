import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

import type { AddMovieInput, Category, TrackedEntry } from '@/types/movie';

interface MovieStore {
	entries: TrackedEntry[];
	addEntry: (input: AddMovieInput) => TrackedEntry;
	updateEntry: (
		id: string,
		updates: Partial<Omit<TrackedEntry, 'id' | 'movieId' | 'createdAt'>>
	) => void;
	deleteEntry: (id: string) => void;
	getEntryById: (id: string) => TrackedEntry | undefined;
	getEntriesByCategory: (category: Category) => TrackedEntry[];
	isDuplicate: (movieId: string) => boolean;
	getEntryByMovieId: (movieId: string) => TrackedEntry | undefined;
	resetData: () => void;
}

const initialState = {
	entries: [] as TrackedEntry[]
};

export const useMovieStore = create<MovieStore>()(
	persist(
		(set, get) => ({
			...initialState,

			addEntry: input => {
				const now = Date.now();
				const newEntry: TrackedEntry = {
					id: nanoid(),
					movieId: input.movieId,
					source: input.source,
					title: input.title,
					year: input.year,
					posterUrl: input.posterUrl,
					genres: input.genres,
					plot: input.plot,
					category: input.category,
					rating: null,
					notes: '',
					createdAt: now,
					updatedAt: now
				};

				set(state => ({
					entries: [...state.entries, newEntry]
				}));

				return newEntry;
			},

			updateEntry: (id, updates) => {
				set(state => ({
					entries: state.entries.map(entry =>
						entry.id === id ? { ...entry, ...updates, updatedAt: Date.now() } : entry
					)
				}));
			},

			deleteEntry: id => {
				set(state => ({
					entries: state.entries.filter(entry => entry.id !== id)
				}));
			},

			getEntryById: id => {
				return get().entries.find(entry => entry.id === id);
			},

			getEntriesByCategory: category => {
				return get().entries.filter(entry => entry.category === category);
			},

			isDuplicate: movieId => {
				return get().entries.some(entry => entry.movieId === movieId);
			},

			getEntryByMovieId: movieId => {
				return get().entries.find(entry => entry.movieId === movieId);
			},

			resetData: () => {
				set(initialState);
			}
		}),
		{
			name: 'filmgueh-movies',
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => {
				return (state, error) => {
					if (error) {
						console.error('Failed to rehydrate movie store:', error);
					}
				};
			}
		}
	)
);
