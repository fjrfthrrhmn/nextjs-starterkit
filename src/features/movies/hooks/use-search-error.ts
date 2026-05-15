import { TmdbError } from '@/lib/movie-api-client';

import { SearchError } from '@/features/movies/api';

export interface ErrorState {
	type: 'network' | 'rate_limit' | 'offline' | 'auth' | 'unknown';
	message: string;
	canRetry: boolean;
}

export function getErrorState(error: unknown): ErrorState {
	if (error instanceof TmdbError) {
		if (error.status === 429) {
			return {
				type: 'rate_limit',
				message: 'Search is temporarily busy. Try again in a moment.',
				canRetry: true
			};
		}
		if (error.status === 401) {
			return {
				type: 'auth',
				message: 'Search is not configured. Check API settings.',
				canRetry: false
			};
		}
		if (error.status === 404) {
			return {
				type: 'unknown',
				message: 'No results found.',
				canRetry: true
			};
		}
		return {
			type: 'network',
			message: "Can't search right now. Please check your connection.",
			canRetry: true
		};
	}

	if (error instanceof SearchError) {
		return {
			type: 'unknown',
			message: error.message,
			canRetry: true
		};
	}

	if (!navigator.onLine) {
		return {
			type: 'offline',
			message: "You're offline. Your collection is still accessible.",
			canRetry: false
		};
	}

	return {
		type: 'unknown',
		message: 'An unexpected error occurred. Please try again.',
		canRetry: true
	};
}

export function useSearchError(error: unknown) {
	return getErrorState(error);
}
