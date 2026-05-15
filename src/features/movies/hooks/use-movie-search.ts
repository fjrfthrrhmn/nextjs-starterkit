import { useCallback, useState } from 'react';

import type { Movie } from '@/types/movie';

import { useSearchMovies } from '@/features/movies/api';

export interface SearchState {
	movies: Movie[];
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	source: 'tmdb' | 'omdb' | null;
}

export function useMovieSearch() {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, error, dataUpdatedAt } = useSearchMovies(query, page);

	const state: SearchState = {
		movies: data?.movies ?? [],
		isLoading,
		isError,
		error: error as Error | null,
		source: data?.source ?? null
	};

	const search = useCallback((newQuery: string) => {
		setQuery(newQuery);
		setPage(1);
	}, []);

	const nextPage = useCallback(() => {
		setPage(p => p + 1);
	}, []);

	const prevPage = useCallback(() => {
		setPage(p => Math.max(1, p - 1));
	}, []);

	const reset = useCallback(() => {
		setQuery('');
		setPage(1);
	}, []);

	return {
		...state,
		query,
		page,
		totalPages: data?.totalPages ?? 1,
		search,
		nextPage,
		prevPage,
		reset
	};
}
