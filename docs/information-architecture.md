# Information Architecture — FilmGueh

> **Domain:** Movie tracking web app (single-user, no backend, no auth)

---

## 1. Site Overview

**FilmGueh** helps users track movies they've watched or plan to watch. All data lives in the browser's LocalStorage. Movie metadata is fetched from the TMDB API.

**Core Objects:**
- **Movie** — a film entity from TMDB (id, title, poster, genres, release date, overview)
- **Entry** — a movie the user has added to their tracker (movie data + category + rating + notes)

**Entry Categories:** `Watched` | `Plan to Watch` | `Dropped`

---

## 2. Navigation & Routes

```
/                         → Home (landing page)
/movies                   → Movie collection (view, filter, manage entries)
/movies?category=watched  → Filtered collection
/movies?genre=18          → Filtered by genre
/movies?q=inception       → Search within collection
/search?q=                → Search TMDB API for movies to add
```

**Current `src/config/paths.ts`:**
```typescript
export const paths = {
  home: { getHref: () => '/' },
  // Future routes to add:
  // movies: { getHref: (params?) => '/movies' + buildQuery(params) },
  // search: { getHref: (query: string) => `/search?q=${query}` },
} as const;
```

### Navigation Hierarchy
```
Home (/)
└── My Movies (/movies)
│   ├── Filter by category (query param)
│   ├── Filter by genre (query param)
│   └── Sort (title, rating, date)
└── Search (/search?q=)
    └── Search results → Add to tracker
```

---

## 3. Page-Level Architecture

### 3.1 Home Page (`/`)
| Element | Description |
|---------|-------------|
| **Purpose** | Landing page with welcome message |
| **State** | Static — no data loading |
| **Content** | App title, tagline, CTA button to navigate to `/movies` |
| **Components** | `Button` |

### 3.2 My Movies Page (`/movies`)
| Element | Description |
|---------|-------------|
| **Purpose** | View, filter, and manage saved movie entries |
| **Data Source** | LocalStorage (via Zustand store) |
| **States** | Empty state, loading, populated list, filtered empty |
| **URL Params** | `?category=`, `?genre=`, `?q=`, `?sort=` |
| **Sub-components** | `MovieGrid`, `MovieCard`, `FilterBar`, `SortDropdown`, `StatsPanel` |

**Layout:**
```
┌─────────────────────────────────────┐
│  StatsPanel (total per category)    │
├──────────────────┬──────────────────┤
│  FilterBar       │  MovieGrid       │
│  ─ category      │  ┌──────────┐    │
│  ─ genre         │  │ Card 1   │    │
│  ─ sort          │  └──────────┘    │
│                  │  ┌──────────┐    │
│                  │  │ Card 2   │    │
│                  │  └──────────┘    │
└──────────────────┴──────────────────┘
```

### 3.3 Search Page (`/search?q=`)
| Element | Description |
|---------|-------------|
| **Purpose** | Search TMDB API and add results to tracker |
| **Data Source** | TMDB API (via TanStack Query) |
| **States** | Initial (no query), loading, results, no results, error |
| **URL Params** | `?q=` search query |
| **Sub-components** | `SearchInput`, `SearchResults`, `AddMovieButton` |

**Layout:**
```
┌─────────────────────────────────────┐
│  SearchInput (with debounce)        │
├─────────────────────────────────────┤
│  SearchResults                      │
│  ┌──────────┐  ┌──────────┐        │
│  │ Card 1   │  │ Card 2   │        │
│  │ + Add    │  │ + Add    │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐        │
│  │ Card 3   │  │ Card 4   │        │
│  │ + Add    │  │ + Add    │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
```

### 3.4 Entry Detail / Edit Modal (overlay on `/movies`)
| Element | Description |
|---------|-------------|
| **Purpose** | Edit category, rating, notes for a saved entry |
| **Trigger** | Click on a MovieCard |
| **Data Source** | LocalStorage |
| **Components** | `Dialog`, `Form` (Select for category, rating, Textarea for notes) |

---

## 4. Data Architecture

### 4.1 Data Models

**TMDB Movie (external, read-only):**
```typescript
interface TmdbMovie {
  id: number;           // TMDB movie ID
  title: string;
  poster_path: string | null;
  genre_ids: number[];
  release_date: string;
  overview: string;
  vote_average: number;
}
```

**Tracked Entry (stored in LocalStorage):**
```typescript
interface MovieEntry {
  id: string;                  // UUID (local)
  movieId: number;             // TMDB movie ID (used for dedup)
  title: string;
  posterPath: string | null;
  genres: Genre[];
  releaseDate: string;
  overview: string;
  rating: number;              // 1-5 or 1-10
  category: 'watched' | 'plan_to_watch' | 'dropped';
  notes: string;
  createdAt: number;           // timestamp
  updatedAt: number;
}
```

**Genre (reference data):**
```typescript
interface Genre {
  id: number;
  name: string;
}
```

### 4.2 Data Flow

```
TMDB API (external)
    │
    ▼
TanStack Query cache
    │
    ▼
SearchPage component
    │
    ▼ (user clicks "Add")
    │
    ▼
Zustand store (persist middleware)
    │
    ▼
LocalStorage (key: "filmgueh-entries")
    │
    ▼
MoviesPage component
    │
    ▼
Filter + Sort (client-side)
    │
    ▼
Rendered MovieGrid
```

### 4.3 Storage Strategy

| Data | Storage | Mechanism | Persistence |
|------|---------|-----------|-------------|
| TMDB search results | In-memory | TanStack Query cache | Session (staleTime: 5 min) |
| User's movie entries | LocalStorage | Zustand persist middleware | Forever |
| Genre list | In-memory | TanStack Query (from TMDB) | Session |
| UI state (filters, sort) | Component state | useState + URL params | Tab session |

**LocalStorage key:** `filmgueh-entries`
**Format:** `MovieEntry[]` serialized as JSON

### 4.4 Preventing Duplicates

Before adding an entry, check if `movieId` already exists in the store. If it does, show an alert or toast: "This movie is already in your collection."

---

## 5. Component Architecture

### 5.1 Component Tree

```
AppProvider
└── Layout (html > body)
    └── Page (based on route)
        ├── HomePage
        │   └── Button → /movies
        ├── MoviesPage
        │   ├── StatsPanel
        │   ├── FilterBar
        │   │   ├── CategoryFilter (Select)
        │   │   └── GenreFilter (Select)
        │   ├── MovieGrid
        │   │   └── MovieCard[] (iterates entries)
        │   │       ├── Poster image
        │   │       ├── Title + year
        │   │       ├── Category badge
        │   │       ├── Rating stars
        │   │       ├── Edit button → opens EditDialog
        │   │       └── Delete button
        │   ├── EditDialog (conditional)
        │   │   └── Form
        │   │       ├── Select (category)
        │   │       ├── Select (rating)
        │   │       └── Textarea (notes)
        │   └── EmptyState (conditional, when no movies)
        └── SearchPage
            ├── SearchInput
            ├── SearchResults
            │   └── MovieCard[] (from TMDB)
            │       ├── Poster + details
            │       └── AddButton
            └── EmptyState / ErrorState (conditional)
```

### 5.2 Component Responsibilities

| Component | Responsibility | State |
|-----------|---------------|-------|
| `MovieCard` | Display movie poster, title, category badge, rating | Props only (pure) |
| `MovieGrid` | Render grid of MovieCards | Receives filtered/sorted array |
| `FilterBar` | Render category and genre filter controls, sort control | Local state + URL sync |
| `StatsPanel` | Show counts per category/genre | Derived from entries |
| `SearchInput` | Debounced input field, updates URL query param | Local state + URL sync |
| `SearchResults` | Fetch and display TMDB search results | TanStack Query |
| `EditDialog` | Modal form for editing an entry | Zustand (open/close) + form state |
| `EmptyState` | Placeholder when no data to display | Props only |

---

## 6. State Architecture

### 6.1 State Categories

| Category | Tool | Examples |
|----------|------|---------|
| **Component State** | `useState` | Form input values, dropdown open/close, active filter |
| **UI State** | Zustand | EditDialog open/close, active tab |
| **Persistent State** | Zustand + persist | Movie entries array |
| **Server Cache** | TanStack Query | TMDB search results, genres |
| **URL State** | `useSearchParams` | ?category=, ?genre=, ?sort=, ?q= |

### 6.2 Zustand Store Design

```typescript
// src/features/movies/stores/movie-store.ts
interface MovieStore {
  entries: MovieEntry[];
  // Mutations
  addEntry: (movie: TmdbMovie, category: Category) => void;
  updateEntry: (id: string, partial: Partial<MovieEntry>) => void;
  deleteEntry: (id: string) => void;
  // Selectors
  getFiltered: (filters: Filters) => MovieEntry[];
  getStats: () => CategoryStats;
}
```

---

## 7. TMDB API Architecture

### 7.1 Required Endpoints

| Endpoint | Purpose | Hook |
|----------|---------|------|
| `GET /search/movie?query=&page=` | Search movies by title | `useSearchMovies` |
| `GET /genre/movie/list` | Get all genres | `useGenres` |
| `GET /movie/{id}` | Get movie details | `useMovieDetails` |

### 7.2 TMDB Configuration

```
Base URL: https://api.themoviedb.org/3
Auth: Bearer token (via NEXT_PUBLIC_TMDB_API_KEY or server-side)
Images: https://image.tmdb.org/t/p/w500{poster_path}
```

Add TMDB image domain to `next.config.mjs` for Next.js Image optimization:

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'image.tmdb.org' },
  ],
}
```

---

## 8. User Flows

### 8.1 Add a Movie
```
Home → Click "My Movies" → Click "Search Movies"
→ Type movie title → See results → Click "Add"
→ Select category → Click "Save"
→ Redirect to /movies → See new entry in grid
```

### 8.2 Filter Collection
```
/movies → Click category filter "Watched"
→ Grid updates to show only watched movies
→ Click genre filter "Action"
→ Grid further filtered
→ Clear filter → Full list restored
```

### 8.3 Edit or Delete Entry
```
/movies → Click on a MovieCard → Edit dialog opens
→ Change rating → Save
→ Entry updates in grid
→ Click delete → Confirm → Entry removed
```

### 8.4 Empty States
- **No movies yet:** Show welcome illustration + "Search Movies to add" CTA
- **No results for filter:** "No movies match this filter" message
- **TMDB search no results:** "No movies found for '[query]'" message
- **TMDB API error:** Error message with retry button

---

## 9. Folder Structure (Feature)

```
src/features/movies/
├── api/
│   ├── search-movies.ts      # TMDB search fetcher + useSearchMovies hook
│   ├── get-genres.ts         # TMDB genres fetcher + useGenres hook
│   └── get-movie.ts          # TMDB movie detail fetcher + useMovie hook
├── components/
│   ├── movie-card.tsx        # Displays movie poster, title, badge
│   ├── movie-grid.tsx        # Grid layout for movie cards
│   ├── filter-bar.tsx        # Category + genre + sort controls
│   ├── search-input.tsx      # Debounced search input
│   ├── search-results.tsx    # TMDB search results list
│   ├── stats-panel.tsx       # Category counts summary
│   ├── edit-dialog.tsx       # Modal form to edit entry
│   └── empty-state.tsx       # Placeholder when no entries
├── stores/
│   └── movie-store.ts        # Zustand store with persist
├── types/
│   └── index.ts              # MovieEntry, TmdbMovie, Category, Genre
├── utils/
│   └── filters.ts            # Filter/sort helper functions
├── hooks/
│   └── use-movie-filters.ts  # Combines URL params + store filtering
└── __tests__/
    ├── movie-store.test.ts
    ├── movie-card.test.tsx
    └── search-movies.test.ts
```

---

## 10. Design Tokens & Theming

Available CSS variables from `src/styles/globals.css`:

```css
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring
--radius: 0.5rem
```

Dark mode supported via `.dark` class selector.

**Category colors** (to define in globals.css or Tailwind config):
- `Watched` → green
- `Plan to Watch` → blue
- `Dropped` → red/gray

---

## 11. Future Considerations

| Area | Description |
|------|-------------|
| **Search in collection** | `?q=` param filters by title client-side |
| **Custom tags** | Add `tags: string[]` to MovieEntry |
| **Sorting** | By title A-Z, rating high-low, date added |
| **Pagination** | If collection grows large, paginate MovieGrid |
| **Export/Import** | JSON export/import of LocalStorage data |
| **Service Worker** | Cache TMDB images for offline viewing |
