import { useQuery } from '@tanstack/react-query';

import type { Movie } from '@/types/movie';

import { TmdbError } from '@/lib/movie-api-client';

import { omdbSearch, omdbToMovie } from './omdb';
import { TMDB_STALE_TIME, tmdbGetGenres, tmdbSearch, tmdbToMovie, useGenres } from './tmdb';

export class SearchError extends Error {
	constructor(
		message: string,
		public source: 'tmdb' | 'omdb' | 'unknown',
		public originalError?: Error
	) {
		super(message);
		this.name = 'SearchError';
	}
}

export async function searchMovies(
	query: string,
	page: number = 1
): Promise<{ movies: Movie[]; totalPages: number; source: 'tmdb' | 'omdb' }> {
	try {
		const genreMap = await tmdbGetGenres();
		const { results, totalPages } = await tmdbSearch(query, page);
		return {
			movies: results.map(r => tmdbToMovie(r, genreMap)),
			totalPages,
			source: 'tmdb'
		};
	} catch (tmdbError) {
		if (tmdbError instanceof TmdbError) {
			console.warn('TMDB failed, falling back to OMDb:', tmdbError.message);
			if (tmdbError.status === 401 || tmdbError.status === 404) {
				throw new SearchError('TMDB authentication failed. Check API settings.', 'tmdb', tmdbError);
			}
			if (tmdbError.status === 429) {
				console.warn('TMDB rate limit exceeded, falling back to OMDb');
			}
		} else {
			console.warn('TMDB network error, falling back to OMDb:', tmdbError);
		}
	}

	try {
		const results = await omdbSearch(query);
		return {
			movies: results.map(omdbToMovie),
			totalPages: 1,
			source: 'omdb'
		};
	} catch (omdbError) {
		console.warn('OMDb also failed:', omdbError);
		throw new SearchError(
			'Movie search is unavailable. Please try again later.',
			'unknown',
			omdbError instanceof Error ? omdbError : undefined
		);
	}
}

export function useSearchMovies(query: string, page: number = 1) {
	const { data: genreMap } = useGenres();

	return useQuery({
		queryKey: ['movies', 'search', query, page],
		queryFn: () => searchMovies(query, page),
		enabled: query.length >= 2 && !!genreMap,
		staleTime: TMDB_STALE_TIME,
		retry: 1
	});
}
