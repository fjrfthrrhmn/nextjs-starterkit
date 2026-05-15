import { env } from '@/config/env';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE = 'https://image.tmdb.org/t/p/w500';

type RequestOptions = {
	method?: string;
	headers?: Record<string, string>;
	params?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrlWithParams(url: string, params?: RequestOptions['params']): string {
	if (!params) return url;
	const filteredParams = Object.fromEntries(
		Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
	);
	if (Object.keys(filteredParams).length === 0) return url;
	const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
	return `${url}?${queryString}`;
}

async function fetchTmdb<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
	const { method = 'GET', headers = {}, params } = options;

	const fullUrl = buildUrlWithParams(`${TMDB_BASE}${endpoint}`, params);

	const response = await fetch(fullUrl, {
		method,
		headers: {
			Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...headers
		}
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		const errorMessage = errorData.status_message || response.statusText;
		throw new TmdbError(response.status, errorMessage, endpoint);
	}

	return response.json();
}

export class TmdbError extends Error {
	constructor(
		public status: number,
		message: string,
		public endpoint: string
	) {
		super(message);
		this.name = 'TmdbError';
	}
}

export class OmdbError extends Error {
	constructor(
		message: string,
		public status?: number
	) {
		super(message);
		this.name = 'OmdbError';
	}
}

async function fetchOmdb<T>(params: Record<string, string>): Promise<T> {
	const OMDB_BASE = 'https://www.omdbapi.com/';
	const queryString = new URLSearchParams({
		...params,
		apikey: env.NEXT_PUBLIC_OMDB_API_KEY || ''
	}).toString();

	const response = await fetch(`${OMDB_BASE}?${queryString}`);

	if (!response.ok) {
		throw new OmdbError(response.statusText, response.status);
	}

	const data = (await response.json()) as T & { Response: string; Error?: string };

	if (data.Response === 'False' && data.Error) {
		throw new OmdbError(data.Error);
	}

	return data;
}

export { TMDB_IMAGE, fetchTmdb, fetchOmdb };
