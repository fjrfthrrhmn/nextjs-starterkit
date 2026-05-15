export interface Movie {
	id: string;
	source: 'tmdb' | 'omdb';
	externalId: string;
	title: string;
	year: string;
	posterUrl: string | null;
	genres: string[];
	plot: string;
	rating: number | null;
	meta: {
		tmdbRating?: number;
		omdbRating?: string;
		imdbId?: string;
		runtime?: string;
		director?: string;
		actors?: string[];
	};
}

export interface TrackedEntry {
	id: string;
	movieId: string;
	source: 'tmdb' | 'omdb';
	title: string;
	year: string;
	posterUrl: string | null;
	genres: string[];
	plot: string;
	category: Category;
	rating: number | null;
	notes: string;
	createdAt: number;
	updatedAt: number;
}

export type Category = 'watched' | 'plan_to_watch' | 'dropped';

export interface AddMovieInput {
	movieId: string;
	source: 'tmdb' | 'omdb';
	title: string;
	year: string;
	posterUrl: string | null;
	genres: string[];
	plot: string;
	category: Category;
}

export interface TmdbSearchResponse {
	page: number;
	results: TmdbSearchResult[];
	total_pages: number;
	total_results: number;
}

export interface TmdbSearchResult {
	id: number;
	title: string;
	original_title: string;
	release_date: string;
	poster_path: string | null;
	overview: string;
	vote_average: number;
	genre_ids: number[];
}

export interface TmdbGenreListResponse {
	genres: TmdbGenre[];
}

export interface TmdbGenre {
	id: number;
	name: string;
}

export interface OmdbSearchResponse {
	Search: OmdbSearchResult[];
	totalResults: string;
	Response: string;
	Error?: string;
}

export interface OmdbSearchResult {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface OmdbMovieDetail {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: OmdbRating[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
	Error?: string;
}

export interface OmdbRating {
	Source: string;
	Value: string;
}
