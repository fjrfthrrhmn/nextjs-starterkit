import type { Movie, OmdbMovieDetail, OmdbSearchResult } from '@/types/movie';

import { fetchOmdb } from '@/lib/movie-api-client';

export async function omdbSearch(query: string): Promise<OmdbSearchResult[]> {
	const data = await fetchOmdb<{ Search: OmdbSearchResult[]; Error?: string }>({
		s: query,
		type: 'movie'
	});

	return data.Search ?? [];
}

export async function omdbGetById(imdbId: string): Promise<OmdbMovieDetail> {
	return fetchOmdb<OmdbMovieDetail>({
		i: imdbId,
		type: 'movie',
		plot: 'short'
	});
}

export function omdbToMovie(omdb: OmdbSearchResult): Movie {
	return {
		id: `omdb-${omdb.imdbID}`,
		source: 'omdb',
		externalId: omdb.imdbID,
		title: omdb.Title,
		year: omdb.Year?.split(/[-–]/)[0] ?? '',
		posterUrl: omdb.Poster && omdb.Poster !== 'N/A' ? omdb.Poster : null,
		genres: [],
		plot: '',
		rating: null,
		meta: {
			imdbId: omdb.imdbID
		}
	};
}

export function omdbDetailToMovie(omdb: OmdbMovieDetail): Movie {
	return {
		id: `omdb-${omdb.imdbID}`,
		source: 'omdb',
		externalId: omdb.imdbID,
		title: omdb.Title,
		year: omdb.Year?.split(/[-–]/)[0] ?? '',
		posterUrl: omdb.Poster && omdb.Poster !== 'N/A' ? omdb.Poster : null,
		genres: omdb.Genre ? omdb.Genre.split(', ').filter(Boolean) : [],
		plot: omdb.Plot ?? '',
		rating: omdb.imdbRating ? parseFloat(omdb.imdbRating) : null,
		meta: {
			omdbRating: omdb.imdbRating,
			imdbId: omdb.imdbID,
			runtime: omdb.Runtime,
			director: omdb.Director,
			actors: omdb.Actors?.split(', ')
		}
	};
}
