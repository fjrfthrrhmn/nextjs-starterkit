# Data Fetching Strategy — FilmGueh

> No backend. All fetching is client-side. API keys are exposed (public-facing apps).
> Two providers: TMDB (primary) and OMDb (fallback). Normalized output.

---

## 1. Architecture Overview

```
                   ┌──────────────┐
                   │  Application │
                   └──────┬───────┘
                          │ normalized Movie
                          ▼
                 ┌────────────────┐
                 │ Data Normalizer│
                 └───────┬────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
   ┌──────────┐   ┌──────────┐   ┌──────────────┐
   │ TMDB API │   │ OMDb API │   │ LocalStorage │
   │ (primary)│   │(fallback)│   │ (user data)  │
   └──────────┘   └──────────┘   └──────────────┘
```

**Decision flow:**

1. Try TMDB first
2. If TMDB fails (network error, 5xx, rate limit), fall back to OMDb
3. If both fail, show error to user
4. User's collection is always read from LocalStorage (instant, no network)

---

## 2. Data Contract (Normalized Model)

All external data is normalized to this shape before reaching components.

### Normalized Movie

```typescript
interface Movie {
	id: string; // Composite: "{source}-{externalId}", e.g. "tmdb-550"
	source: 'tmdb' | 'omdb';
	externalId: string; // Original ID from the provider

	title: string;
	year: string; // "1994" (4-digit, provider-agnostic)
	posterUrl: string | null; // Full URL to poster image
	genres: string[]; // ["Drama", "Crime"]
	plot: string; // Short description / overview
	rating: number | null; // Normalized to 0–10 scale

	meta: {
		tmdbRating?: number;
		omdbRating?: string;
		imdbId?: string;
		runtime?: string; // "142 min"
		director?: string;
		actors?: string[];
	};
}
```

### TrackedEntry (what we store in LocalStorage)

```typescript
interface TrackedEntry {
	id: string; // Local UUID (nanoid/uuid)
	movieId: string; // Maps to Movie.id
	source: 'tmdb' | 'omdb';

	title: string;
	year: string;
	posterUrl: string | null;
	genres: string[];
	plot: string;

	category: 'watched' | 'plan_to_watch' | 'dropped';
	rating: number | null; // 1–5 (user rating, not API)
	notes: string;
	createdAt: number; // Date.now()
	updatedAt: number;
}
```

### Input for Adding a Movie

```typescript
interface AddMovieInput {
	movieId: string;
	source: 'tmdb' | 'omdb';
	title: string;
	year: string;
	posterUrl: string | null;
	genres: string[];
	plot: string;
	category: Category; // Default: 'plan_to_watch'
}
```

---

## 3. Primary API: TMDB

### Endpoints

| Endpoint                                            | Purpose                     | Cache           |
| --------------------------------------------------- | --------------------------- | --------------- |
| `GET https://api.themoviedb.org/3/search/movie`     | Search movies by title      | 5 min staleTime |
| `GET https://api.themoviedb.org/3/genre/movie/list` | Get genre ID → name mapping | 24 hr staleTime |
| `GET https://api.themoviedb.org/3/movie/{id}`       | Get single movie details    | 5 min staleTime |

### Authentication

```
Header: Authorization: Bearer {TMDB_ACCESS_TOKEN}
```

**Token type:** API Read Access Token (v4) — not the API Key (v3).
Why: Bearer token is the current standard. Avoids query-param key exposure in URLs.

**Env var:** `NEXT_PUBLIC_TMDB_ACCESS_TOKEN`

> **Constraint:** Token is in client-side env var (`NEXT_PUBLIC_` prefix). This is acceptable because TMDB tokens are designed for public-facing apps. Rate limiting is per-token, not per-origin.

### Config

```typescript
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE = 'https://image.tmdb.org/t/p/w500';

const tmdbHeaders = {
	Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
	'Content-Type': 'application/json'
};
```

#### next.config.mjs

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'image.tmdb.org' },
  ],
}
```

### Response → Normalized Mapper

```typescript
function tmdbToMovie(tmdb: TmdbSearchResult, genreMap: Map<number, string>): Movie {
	return {
		id: `tmdb-${tmdb.id}`,
		source: 'tmdb',
		externalId: String(tmdb.id),
		title: tmdb.title,
		year: tmdb.release_date?.split('-')[0] ?? '',
		posterUrl: tmdb.poster_path ? `${TMDB_IMAGE}${tmdb.poster_path}` : null,
		genres: tmdb.genre_ids.map(id => genreMap.get(id) ?? 'Unknown'),
		plot: tmdb.overview ?? '',
		rating: tmdb.vote_average,
		meta: {
			tmdbRating: tmdb.vote_average,
			imdbId: null // requires separate /movie/{id} call
		}
	};
}
```

> **Note:** TMDB search results return `genre_ids` (numbers), not genre names. Fetch `/genre/movie/list` first and build a `Map<number, string>` to resolve names client-side.

---

## 4. Fallback API: OMDb

### When to Fall Back

- TMDB returns a network error
- TMDB returns 5xx status
- TMDB rate-limit exceeded (429)
- Browser is offline and TMDB fetch fails

### Endpoint

```
GET https://www.omdbapi.com/?apikey={KEY}&s={query}&type=movie
GET https://www.omdbapi.com/?apikey={KEY}&i={imdbId}&type=movie
```

### Authentication

```
Query param: apikey={OMDB_API_KEY}
```

**Env var:** `NEXT_PUBLIC_OMDB_API_KEY`

> **Constraint:** API key is client-side. OMDb keys are per-website, rate-limited to 1,000/day (free tier). Use as fallback only to conserve quota.

### Known Limitations

| Aspect         | OMDb Limitation                             |
| -------------- | ------------------------------------------- |
| Poster quality | Lower resolution, sometimes missing         |
| Genre          | Single string `"Drama, Crime"` — must parse |
| Rating         | String format — must parse to number        |
| Search results | Max 10 per page, no genre filter            |
| Rate limit     | 1,000 requests/day (free) — use sparingly   |

### Response → Normalized Mapper

```typescript
function omdbToMovie(omdb: OmdbSearchResult): Movie {
	return {
		id: `omdb-${omdb.imdbID}`,
		source: 'omdb',
		externalId: omdb.imdbID,
		title: omdb.Title,
		year: omdb.Year?.split('–')[0] ?? '', // Handle "1994–2004" ranges
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
```

---

## 5. Fetching Strategy

### Cache Strategy

| Data                | Library           | Strategy                             | Stale Time |
| ------------------- | ----------------- | ------------------------------------ | ---------- |
| TMDB search results | TanStack Query    | Cache-first (stale-while-revalidate) | 5 min      |
| TMDB genre list     | TanStack Query    | Cache-first, refetch on mount        | 24 hr      |
| Movie details       | TanStack Query    | Cache-first                          | 5 min      |
| User entries        | Zustand + persist | LocalStorage (immediate)             | N/A        |

### Fallback Logic (Encapsulated)

```typescript
async function searchMovies(query: string, page = 1): Promise<Movie[]> {
	// Try primary
	try {
		const data = await tmdbSearch(query, page);
		return data.results.map(r => tmdbToMovie(r, genreMap));
	} catch (tmdbError) {
		// Log for debugging, don't show to user
		console.warn('TMDB failed, falling back to OMDb:', tmdbError);
	}

	// Try fallback
	try {
		const data = await omdbSearch(query, page);
		return data.Search.map(omdbToMovie);
	} catch (omdbError) {
		console.warn('OMDb also failed:', omdbError);
		throw new Error('All movie search providers are unavailable.');
	}
}
```

### React Query Hook

```typescript
export function useSearchMovies(query: string) {
	return useQuery({
		queryKey: ['movies', 'search', query],
		queryFn: () => searchMovies(query),
		enabled: query.length >= 2,
		staleTime: 5 * 60 * 1000,
		retry: 1
	});
}
```

### Genre Prefetch

```typescript
export function useGenres() {
	return useQuery({
		queryKey: ['movies', 'genres'],
		queryFn: fetchAndMapGenres,
		staleTime: 24 * 60 * 60 * 1000
	});
}
```

---

## 6. Error Handling

### Error Categorization

| Error                 | User Message                                            | Recovery                               |
| --------------------- | ------------------------------------------------------- | -------------------------------------- |
| TMDB network error    | "Can't search right now. Please check your connection." | Auto-fallback to OMDb                  |
| TMDB 429 (rate limit) | "Search is temporarily busy. Try again in a moment."    | Auto-fallback to OMDb                  |
| OMDb also fails       | "Movie search is unavailable. Please try again later."  | Show "Try Again" button                |
| TMDB token missing    | "Search is not configured. Check API settings."         | Show setup instructions                |
| LocalStorage corrupt  | "Your collection data appears corrupted."               | Show "Reset Data" button               |
| Offline               | "You're offline. Your collection is still accessible."  | Disable search, show offline indicator |

### Best Practice: Graceful Degradation

```
Normal:      TMDB search → normalized Movie → UI
Degraded:    TMDB fails → OMDb search → normalized Movie → UI
Offline:     Show cached collection only → disable search
Unavailable: Both fail → error message + retry button
```

---

## 7. Deduplication

Prevent adding the same movie twice by checking `movieId` (composite ID string like `tmdb-550`) against existing entries:

```typescript
// In movie-store.ts
isDuplicate: (movieId: string) => {
	return get().entries.some(e => e.movieId === movieId);
};
```

If duplicate is detected:

- Show "Already in your collection" on the search result card
- Disable the "Add" button
- On add attempt via other path, show toast: `"{title}" is already in your collection.`

---

## 8. API Key Security Notes

- Both TMDB and OMDb API keys are exposed to the client (`NEXT_PUBLIC_` prefix)
- This is intentional: there is no backend to proxy through
- TMDB token is a read-only public token — no write endpoints are exposed
- OMDb free tier is 1,000 requests/day — the app should only call OMDb when TMDB is unavailable
- If rate limits become a concern, add a simple Vercel Edge Function proxy (out of current scope)

---

## 9. Quick Reference: Endpoints

### TMDB

```bash
# Search
GET https://api.themoviedb.org/3/search/movie?query=inception&page=1
Authorization: Bearer {TOKEN}

# Genres
GET https://api.themoviedb.org/3/genre/movie/list
Authorization: Bearer {TOKEN}

# Movie detail
GET https://api.themoviedb.org/3/movie/550
Authorization: Bearer {TOKEN}

# Images
https://image.tmdb.org/t/p/w500{poster_path}
```

### OMDb

```bash
# Search
GET https://www.omdbapi.com/?apikey={KEY}&s=inception&type=movie

# Detail by ID
GET https://www.omdbapi.com/?apikey={KEY}&i=tt1375666

# Detail by title
GET https://www.omdbapi.com/?apikey={KEY}&t=Inception
```
