import { useQuery } from '@tanstack/react-query';

import type {
	Movie,
	TmdbGenreListResponse,
	TmdbSearchResponse,
	TmdbSearchResult
} from '@/types/movie';

import { fetchTmdb, TMDB_IMAGE } from '@/lib/movie-api-client';

export const TMDB_STALE_TIME = 5 * 60 * 1000;
export const TMDB_GENRE_STALE_TIME = 24 * 60 * 60 * 1000;

let genreMapCache: Map<number, string> | null = null;

export async function tmdbGetGenres(): Promise<Map<number, string>> {
	if (genreMapCache) return genreMapCache;

	const data = await fetchTmdb<TmdbGenreListResponse>('/genre/movie/list');
	genreMapCache = new Map(data.genres.map((g: { id: number; name: string }) => [g.id, g.name]));
	return genreMapCache;
}

export async function tmdbSearch(
	query: string,
	page: number = 1
): Promise<{ results: TmdbSearchResult[]; totalPages: number }> {
	const data = await fetchTmdb<TmdbSearchResponse>('/search/movie', {
		params: { query, page }
	});

	return {
		results: data.results,
		totalPages: data.total_pages
	};
}

export function tmdbToMovie(tmdb: TmdbSearchResult, genreMap: Map<number, string>): Movie {
	return {
		id: `tmdb-${tmdb.id}`,
		source: 'tmdb',
		externalId: String(tmdb.id),
		title: tmdb.title,
		year: tmdb.release_date?.split('-')[0] ?? '',
		posterUrl: tmdb.poster_path ? `${TMDB_IMAGE}${tmdb.poster_path}` : null,
		genres: tmdb.genre_ids.map((id: number) => genreMap.get(id) ?? 'Unknown'),
		plot: tmdb.overview ?? '',
		rating: tmdb.vote_average,
		meta: {
			tmdbRating: tmdb.vote_average,
			imdbId: undefined
		}
	};
}

export function useGenres() {
	return useQuery({
		queryKey: ['movies', 'genres'],
		queryFn: tmdbGetGenres,
		staleTime: TMDB_GENRE_STALE_TIME
	});
}
