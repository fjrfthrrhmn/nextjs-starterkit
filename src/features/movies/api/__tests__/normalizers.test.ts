import { describe, expect, it } from 'vitest';

import type { OmdbMovieDetail, OmdbSearchResult, TmdbSearchResult } from '@/types/movie';

import { omdbDetailToMovie, omdbToMovie } from '../omdb';
import { tmdbToMovie } from '../tmdb';

describe('tmdbToMovie', () => {
	it('normalizes TMDB search result to Movie', () => {
		const tmdb: TmdbSearchResult = {
			id: 550,
			title: 'Inception',
			original_title: 'Inception',
			release_date: '2010-07-15',
			poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
			overview: 'A thief who steals corporate secrets through dream-sharing technology.',
			vote_average: 8.4,
			genre_ids: [28, 878, 12]
		};

		const genreMap = new Map([
			[28, 'Action'],
			[878, 'Science Fiction'],
			[12, 'Adventure']
		]);

		const movie = tmdbToMovie(tmdb, genreMap);

		expect(movie.id).toBe('tmdb-550');
		expect(movie.source).toBe('tmdb');
		expect(movie.externalId).toBe('550');
		expect(movie.title).toBe('Inception');
		expect(movie.year).toBe('2010');
		expect(movie.posterUrl).toBe('https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg');
		expect(movie.genres).toEqual(['Action', 'Science Fiction', 'Adventure']);
		expect(movie.plot).toBe(
			'A thief who steals corporate secrets through dream-sharing technology.'
		);
		expect(movie.rating).toBe(8.4);
		expect(movie.meta.tmdbRating).toBe(8.4);
	});

	it('handles missing release date', () => {
		const tmdb: TmdbSearchResult = {
			id: 123,
			title: 'Unknown Date Movie',
			original_title: 'Unknown Date Movie',
			release_date: '',
			poster_path: null,
			overview: 'No release date available.',
			vote_average: 7.0,
			genre_ids: []
		};

		const movie = tmdbToMovie(tmdb, new Map());

		expect(movie.year).toBe('');
		expect(movie.posterUrl).toBeNull();
	});

	it('uses Unknown for unmapped genre IDs', () => {
		const tmdb: TmdbSearchResult = {
			id: 999,
			title: 'Test Movie',
			original_title: 'Test Movie',
			release_date: '2023-01-01',
			poster_path: null,
			overview: 'Test overview.',
			vote_average: 6.5,
			genre_ids: [9999]
		};

		const movie = tmdbToMovie(tmdb, new Map());
		expect(movie.genres).toEqual(['Unknown']);
	});
});

describe('omdbToMovie', () => {
	it('normalizes OMDb search result to Movie', () => {
		const omdb: OmdbSearchResult = {
			Title: 'The Dark Knight',
			Year: '2008',
			imdbID: 'tt0468569',
			Type: 'movie',
			Poster: 'https://example.com/poster.jpg'
		};

		const movie = omdbToMovie(omdb);

		expect(movie.id).toBe('omdb-tt0468569');
		expect(movie.source).toBe('omdb');
		expect(movie.externalId).toBe('tt0468569');
		expect(movie.title).toBe('The Dark Knight');
		expect(movie.year).toBe('2008');
		expect(movie.posterUrl).toBe('https://example.com/poster.jpg');
		expect(movie.meta.imdbId).toBe('tt0468569');
	});

	it('handles N/A poster', () => {
		const omdb: OmdbSearchResult = {
			Title: 'Test Movie',
			Year: '2020',
			imdbID: 'tt0000001',
			Type: 'movie',
			Poster: 'N/A'
		};

		const movie = omdbToMovie(omdb);
		expect(movie.posterUrl).toBeNull();
	});

	it('handles year range (e.g., 1994-2004)', () => {
		const omdb: OmdbSearchResult = {
			Title: 'Series Movie',
			Year: '1994-2004',
			imdbID: 'tt0000002',
			Type: 'movie',
			Poster: 'N/A'
		};

		const movie = omdbToMovie(omdb);
		expect(movie.year).toBe('1994');
	});
});

describe('omdbDetailToMovie', () => {
	it('normalizes OMDb detail response with full metadata', () => {
		const omdb: OmdbMovieDetail = {
			Title: 'Interstellar',
			Year: '2014',
			Rated: 'PG-13',
			Released: '07 Nov 2014',
			Runtime: '169 min',
			Genre: 'Adventure, Drama, Sci-Fi',
			Director: 'Christopher Nolan',
			Writer: 'Jonathan Nolan, Christopher Nolan',
			Actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
			Plot: 'A team of explorers travel through a wormhole in space.',
			Language: 'English',
			Country: 'USA, UK',
			Awards: 'Won 1 Oscar.',
			Poster: 'https://example.com/interstellar.jpg',
			Ratings: [{ Source: 'Internet Movie Database', Value: '8.7/10' }],
			Metascore: '74',
			imdbRating: '8.7',
			imdbVotes: '2,500,000',
			imdbID: 'tt0816692',
			Type: 'movie',
			DVD: 'N/A',
			BoxOffice: '$675,120,000',
			Production: 'Paramount Pictures',
			Website: 'N/A',
			Response: 'True'
		};

		const movie = omdbDetailToMovie(omdb);

		expect(movie.title).toBe('Interstellar');
		expect(movie.year).toBe('2014');
		expect(movie.meta.runtime).toBe('169 min');
		expect(movie.meta.director).toBe('Christopher Nolan');
		expect(movie.meta.actors).toEqual(['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']);
		expect(movie.genres).toEqual(['Adventure', 'Drama', 'Sci-Fi']);
	});
});
