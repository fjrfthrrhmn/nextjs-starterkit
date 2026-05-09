# Information Architecture — FilmGueh

> Domain: Movie tracking web app (single-user, no backend, no auth)

---

## 1. Site Overview

**FilmGueh** helps users track movies they've watched or plan to watch. All user data lives in LocalStorage. Movie metadata comes from external APIs.

**Core Concepts:**

| Term           | Definition                                                                            |
| -------------- | ------------------------------------------------------------------------------------- |
| **Movie**      | A film entity from an external API (TMDB/OMDb)                                        |
| **Entry**      | A movie the user has added to their personal tracker with category, rating, and notes |
| **Collection** | The user's full set of entries stored in LocalStorage                                 |

**Entry Categories:** `Watched` | `Plan to Watch` | `Dropped`

---

## 2. Navigation & Routes

### Route Map

```
/                         Home (landing page)
/movies                   Movie collection
/movies?category=watched  Filtered by category
/movies?genre=18          Filtered by genre (TMDB genre ID)
/movies?q=inception       Search within collection (client-side)
/search?q=inception       Search external API for movies to add
```

### Route Config (`src/config/paths.ts`)

```typescript
export const paths = {
  home: { getHref: () => '/' },
  movies: {
    getHref: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return `/movies${qs}`;
    },
  },
  search: {
    getHref: (query: string) => `/search?q=${encodeURIComponent(query)}`,
  },
} as const;
```

### Navigation Flow

```
Home (/) ──search/explore──> Search (/search?q=)
Home (/) ──movie card click──> /search?q=<title>
Home (/) ──CTA──> Movies (/movies)
Movies (/movies) ──search──> Search (/search?q=)
                     │                               │
                     │ (click card)                  │ (click "Add")
                     ▼                              ▼
                  EditDialog                    → redirect to /movies
```

---

## 3. Page-Level Architecture

### 3.1 Home Page (`/`)

|                |                                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| **Purpose**    | Interactive discovery surface, entry point to the app                              |
| **Content**    | Headline, subheadline, search bar, category tags, trending/explore movie row       |
| **States**     | Idle (default), Focused (search active), Filtered (by category), Search (by query) |
| **Components** | `HeroSection` (search bar, category chips, `HeroMovieCard`, vertical scroll row)   |

### 3.2 Movies Page (`/movies`)

|                |                                                                                 |
| -------------- | ------------------------------------------------------------------------------- | --------- | ----------------------- | -------------------- |
| **Purpose**    | View, filter, sort, and manage saved movie entries                              |
| **URL Params** | `?category=` `?genre=` `?q=` `?sort=`                                           |
| **States**     | Empty collection                                                                | Populated | Filtered (empty result) | Error (corrupt data) |
| **Components** | `StatsPanel`, `FilterBar`, `MovieGrid`, `MovieCard`, `EditDialog`, `EmptyState` |

### 3.3 Search Page (`/search?q=`)

|                |                                                                                      |
| -------------- | ------------------------------------------------------------------------------------ | ------- | ------- | ---------- | --------- | --------------- |
| **Purpose**    | Query external API, browse results, add to collection                                |
| **URL Params** | `?q=` search query                                                                   |
| **States**     | Initial (no query)                                                                   | Loading | Results | No results | API error | Duplicate found |
| **Components** | `SearchInput`, `SearchResults`, `MovieCard`, `AddButton`, `EmptyState`, `ErrorState` |

### 3.4 EditDialog (overlay on `/movies`)

|                |                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------ | ---------------- |
| **Purpose**    | Edit category, rating, and notes for a saved entry                                                    |
| **Trigger**    | Click edit icon on a MovieCard                                                                        |
| **Components** | `Dialog` (if available) or modal overlay, `Form` with `Select` (category, rating), `Textarea` (notes) |
| **States**     | Open (pre-filled)                                                                                     | Saving | Close on success |

---

## 4. Component Architecture

### 4.1 Component Tree

```
AppProvider
└── Layout
    └── Page
        ├── HomePage
        │   ├── HeroSection (Interactive Discovery)
        │   │   ├── SearchInput (with Cmd+K shortcut)
        │   │   ├── CategoryChips (Action, Komedi, Horror, etc.)
        │   │   ├── HeroMovieCard[] (horizontal scroll)
        │   │   │   └── Poster Image (lazy loaded)
        │   │   │   └── Title, year, genre, rating
        │   │   └── EmptyState (no results)
        │   └── FeatureCards (bento grid)
        │
        ├── MoviesPage
        │   ├── StatsPanel
        │   ├── FilterBar
        │   │   ├── CategoryFilter (Select)
        │   │   ├── GenreFilter (Select)
        │   │   └── SortDropdown
        │   ├── MovieGrid
        │   │   └── MovieCard[]
        │   │       ├── Poster img
        │   │       ├── Title, year
        │   │       ├── Category badge
        │   │       ├── Rating (stars / numeric)
        │   │       ├── Edit button → EditDialog
        │   │       └── Delete button
        │   ├── EditDialog (conditional)
        │   │   └── Form
        │   │       ├── Select (category)
        │   │       ├── Select (rating)
        │   │       └── Textarea (notes)
        │   └── EmptyState
        │
        └── SearchPage
            ├── SearchInput
            └── SearchResults
                └── MovieCard[] (external results)
                    ├── Poster, title, year
                    ├── Add button
                    └── "Already added" badge (if duplicate)
```

### 4.2 Component Responsibilities

| Component        | Responsibility                                                 | Data Source                 |
| ---------------- | -------------------------------------------------------------- | --------------------------- |
| `StatsPanel`     | Show counts per category, total entries                        | Derived from store          |
| `FilterBar`      | Category filter, genre filter, sort control                    | URL params ↔ local state   |
| `CategoryFilter` | Select dropdown for Watched / Plan / Dropped / All             | URL param                   |
| `GenreFilter`    | Multi-select or dropdown from available genres                 | URL param                   |
| `MovieGrid`      | Render filtered/sorted list of MovieCards                      | Props (computed list)       |
| `MovieCard`      | Display poster, title, year, badge, rating, actions            | Props (pure)                |
| `EditDialog`     | Modal form for editing category, rating, notes                 | Zustand (open/close) + form |
| `SearchInput`    | Debounced text input, syncs with URL `?q=`                     | URL param                   |
| `SearchResults`  | Render external API results                                    | TanStack Query              |
| `AddButton`      | Add movie to collection, check duplicates                      | Mutates Zustand store       |
| `EmptyState`     | Placeholder for empty collection, no results, no filters match | Props                       |
| `HeroSection`    | Interactive entry point: search bar, category chips, movie row | Dummy data (mock)           |
| `HeroMovieCard`  | Poster card with lazy-load Image, rating badge, genre tags     | Props (DummyMovie)          |

---

## 5. State Architecture

### 5.1 State Categories

| Category             | Tool                         | Scope                                         |
| -------------------- | ---------------------------- | --------------------------------------------- |
| **Component State**  | `useState`                   | Form inputs, dropdown open, active filter tab |
| **UI State**         | Zustand                      | EditDialog open/close, active modal           |
| **Persistent State** | Zustand + persist middleware | Movie entries array (→ LocalStorage)          |
| **URL State**        | `useSearchParams`            | `?category=`, `?genre=`, `?sort=`, `?q=`      |

### 5.2 Zustand Store Design

```typescript
interface MovieStore {
  entries: MovieEntry[];

  addEntry: (entry: NewEntryInput) => void;
  updateEntry: (id: string, partial: Partial<MovieEntry>) => void;
  deleteEntry: (id: string) => void;

  getByCategory: (category: Category) => MovieEntry[];
  getByGenre: (genreId: number) => MovieEntry[];
  getStats: () => CategoryStats;
  isDuplicate: (movieId: number) => boolean;
}
```

---

## 6. User Flows

### 6.1 First-time User

```
Open app
→ See Home (Search + Trending)
→ Type movie in search bar
→ See search results (inline or redirect to /search)
→ Click "Add"
→ Choose category
→ Saved!
→ See confirmation (toast / UI update)
→ Movie muncul di "Recently Added"
```

### 6.2 Returning User

```
Open app
→ See Home (Stats + Recently Added + Plan to Watch)
→ Scroll / lihat collection snapshot
→ Click "View All" → /movies
→ Filter / sort
→ Edit / delete entry
```

### 6.3 Quick Add Flow

```
Open app
→ Focus ke search bar (auto focus)
→ Type → Enter
→ Add movie
→ Repeat
```

### 6.4 Discover Flow (New Behavior)

```
Open app
→ Lihat "Trending Now"
→ Scroll film
→ Klik film
→ Add to collection
```

### 6.5 Collection Exploration Flow

```
Open app
→ Lihat "Recently Added"
→ Klik movie card
→ EditDialog terbuka
→ Update rating / notes
→ Save
```

### 6.3 Edge Cases

| Scenario                          | Behavior                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| **Empty collection**              | Show CTA: "Your collection is empty. Search movies to add."                               |
| **Filter yields nothing**         | Show: "No movies match this filter. Try a different category or genre."                   |
| **Search in collection is empty** | Show: "No movies matching 'query' in your collection."                                    |
| **Duplicate add attempt**         | Show inline badge "Already in collection" on search result card                           |
| **Corrupt LocalStorage**          | Show error state: "Something went wrong. Clear data and start fresh?" with a reset button |

---

## 7. Folder Structure

```
src/features/movies/
├── components/
│   ├── movie-card.tsx
│   ├── movie-grid.tsx
│   ├── filter-bar.tsx
│   ├── search-input.tsx
│   ├── search-results.tsx
│   ├── stats-panel.tsx
│   ├── edit-dialog.tsx
│   └── empty-state.tsx
├── stores/
│   └── movie-store.ts
├── types/
│   └── index.ts        # MovieEntry, Category, Genre, NewEntryInput
├── utils/
│   └── filters.ts      # Filter/sort helper functions
└── hooks/
    └── use-movie-filters.ts  # URL params ↔ store filtering
```

---

## 8. Future Considerations

| Area                     | Approach                                             |
| ------------------------ | ---------------------------------------------------- |
| **Search in collection** | Add client-side filter by `?q=` against entry titles |
| **Custom tags**          | Add `tags: string[]` to `MovieEntry`                 |
| **Pagination**           | Slice `MovieGrid` into pages if entries > 50         |
| **Export/Import**        | JSON download of store, file upload to restore       |
| **Service Worker**       | Cache TMDB images, serve offline fallback            |
