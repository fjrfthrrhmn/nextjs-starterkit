# AGENTS.md

Dokumen ini adalah **kontrak kolaborasi AI** untuk proyek FilmGueh. Setiap tindakan harus mengikuti aturan yang tertulis di sini untuk memastikan konsistensi, kualitas, dan prediktabilitas output AI.

---

## Sistem Eksekusi Berbasis Skill

Sebelum menyelesaikan tugas, AI **WAJIB** menganalisis dan memilih skill yang paling relevan.

### Skill yang Tersedia

| Skill                       | Gunakan ketika...                                                  |
| --------------------------- | ------------------------------------------------------------------ |
| `next-best-practices`       | Task Next.js routing, RSC, metadata, error handling                |
| `shadcn-ui`                 | Task komponen UI, forms, dialog, atau styling pattern              |
| `tailwind-design-system`    | Task design tokens, component library, atau responsive patterns    |
| `typescript-advanced-types` | Task generics, conditional types, atau type-safe utilities         |
| `zod-validation-expert`     | Task schema validation, form handling, atau API validation         |
| `frontend-design`           | Task涉及 membuat UI lengkap, landing page, atau design system      |
| `context7-mcp`              | Butuh dokumentasi/library terkini untuk framework/library spesifik |
| `writing-plans`             | Task kompleks multi-step yang butuh rencana sebelum eksekusi       |

### Proses Seleksi Skill

```
Analisis Request
    ↓
Identifikasi Skill Relevan (1-2 skill maks)
    ↓
Justifikasi Internal (untuk task kompleks)
    ↓
Eksekusi dengan Mindset Skill
    ↓
Verifikasi Output
```

### Aturan Penggunaan Skill

- **Maksimal 2 skill** per task — avoid overcomplication
- Jika task tidak match skill manapun, gunakan reasoning umum + best practices
- Dokumentasi `.docs/` selalu prioritas sebelum skill apapun

---

## Context Awareness

### Proses Pengecekan Dokumentasi

```
Task Baru
    ↓
Cek folder `.docs/` untuk dokumen terkait
    ↓
Jika ditemukan → Gunakan sebagai sumber kebenaran
Jika tidak ditemukan → Gunakan reasoning + best practices
    ↓
Eksekusi Task
```

### Dokumen `.docs/` yang Tersedia

| Dokumen                       | Topik                     |
| ----------------------------- | ------------------------- |
| `product-definition.md`       | Definisi produk           |
| `information-architecture.md` | Arsitektur informasi      |
| `project-structure.md`        | Struktur proyek           |
| `project-standards.md`        | Standar proyek            |
| `components-and-styling.md`   | Komponen UI & styling     |
| `state-management.md`         | Strategi state management |
| `data-fetching.md`            | Layer API & data fetching |
| `api-layer.md`                | Detail API layer          |
| `error-handling.md`           | Strategi error handling   |
| `performance.md`              | Optimasi performa         |
| `testing.md`                  | Strategi testing          |
| `security.md`                 | Keamanan aplikasi         |
| `deployment.md`               | Build & deployment        |
| `ux-writing.md`               | Guidelines UX writing     |
| `design.md`                   | Design system             |

### Aturan Prioritas Dokumen

1. `.docs/` folder — dokumentasi spesifik proyek
2. `AGENTS.md` — aturan umum & kontrak kolaborasi
3. Existing code patterns — preseden dari codebase
4. Best practices umum — fallback jika tidak ada referensi

---

## Kerangka Penalaran

AI mengikuti langkah-langkah ini untuk setiap task:

### 1. Pahami Masalah

- Baca ulang request pengguna
- Identifikasi requirement eksplisit dan implisit
- Clarify jika ada ambiguitas

### 2. Identifikasi Asumsi Tersembunyi

- Apa yang diasumsikan tentang state saat ini?
- Apa batasan teknis atau arsitektur?
- Apa yang tidak boleh diubah?

### 3. Evaluasi Alternatif

- Apakah ada trade-off yang perlu dipertimbangkan?
- Apa implikasi jangka pendek vs jangka panjang?
- Apakah ada solusi yang lebih sederhana?

### 4. Selaraskan dengan Arsitektur

- Apakah sesuai dengan existing patterns?
- Apakah melanggar unidirectional flow?
- Apakah perlu konfirmasi sebelum melanjutkan?

### 5. Produksi Solusi

- Implementasi sesuai best practices
- Dokumentasi perubahan jika perlu
- Verifikasi dengan lint/typecheck/tests

---

## Constraints (Aturan yang WAJIB Diikuti)

### Hal yang TIDAK BOLEH Dilakukan

```markdown
❌ Jangan abaikan arsitektur yang sudah ada
❌ Jangan perkenalkan library baru tanpa justifikasi kuat
❌ Jangan refactor kode yang tidak terkait task
❌ Jangan bypass sistem tersentralisasi (icons, config, data layer)
❌ Jangan asumsikan requirement yang hilang — tanya atau nyatakan asumsi
❌ Jangan buat duplicate abstraction
❌ Jangan overengineering fitur sederhana
❌ Jangan violate unidirectional flow
❌ Jangan skip lint/typecheck sebelum submit
```

### Kondisi yang Memerlukan Konfirmasi

Sebelum melanjutkan, AI HARUS mengonfirmasi jika:

- Task memerlukan perubahan arsitektur signifikan
- Perlu introduce library atau dependency baru
- Melibatkan refactor di luar scope task
- Requirement tidak jelas atau ambigu
- Decision yang punya trade-off signifikan

---

## Response Guidelines

### Prinsip Komunikasi

| ситуация                  | Respons                           |
| ------------------------- | --------------------------------- |
| Task sederhana            | Langsung eksekusi, minimal output |
| Task kompleks             | Jelaskan approach, lalu eksekusi  |
| Decision dengan trade-off | Nyatakan options + rekomendasi    |
| Clarification needed      | Ajukan pertanyaan spesifik        |
| Error/kegagalan           | Nyatakan masalah + proposed fix   |

### Standar Output

- **Konsis** — tidak ada preamble/postamble tidak perlu
- **Aksi** — fokus pada apa yang dilakukan, bukan teori
- **Terstruktur** — gunakan format yang konsisten
- **Tepat** — hanya informasi yang diperlukan

### Contoh Respons Buruk vs Baik

```markdown
# ❌ Buruk

"Berikut adalah implementasi dari fitur yang Anda minta. Saya membuat komponen baru
yang terdiri dari beberapa file karena saya pikir itu perlu untuk skalabilitas.
Semoga bermanfaat!"

# ✅ Baik

[tidak ada intro]
[membuat file dengan pattern yang ada]
[tidak ada outro]
```

---

## Anti-Patterns

### Tanda-Tanda AI Bermasalah

| Pattern                | Masalah                  | Solusi              |
| ---------------------- | ------------------------ | ------------------- |
| Overengineering        | Kompleksitas tidak perlu | KISS principle      |
| Duplicate code         | Abstraksi tidak perlu    | Shared utilities    |
| Cross-feature import   | Violasi arsitektur       | Perbaiki boundary   |
| Magic numbers/strings  | Hardcoded values         | Konstanta terpusat  |
| Prop drilling          | Tight coupling           | Composition pattern |
| Premature optimization | Complexity tanpa bukti   | Profile first       |

### Cara Mendeteksi Anti-Patterns

```
Sebelum commit:
1. Apakah ada code yang tidak related dengan task?
2. Apakah ada duplicate logic yang sudah ada?
3. Apakah violates existing patterns?
4. Apakah perlu konfirmasi sebelum proceed?

Jika ya untuk salah satu → Stop dan clarify
```

---

## Priority System

### Urutan Prioritas Rules

```
1. Existing Code Patterns
   └── Selalu ikuti pattern yang sudah ada di codebase

2. .docs/ Documentation
   └── Jika ada dokumen terkait, itu adalah source of truth

3. AGENTS.md Rules
   └── Aturan umum di dokumen ini

4. General Best Practices
   └── Fallback jika tidak ada referensi spesifik
```

### Konflik Resolution

```
Jika terjadi konflik antar rules:

Priority tinggi > Priority rendah

Contoh:
- Best practice bilang "use effect dependency array"
- Tapi existing pattern di codebase tidak pakai
- → Ikuti existing pattern (prioritas lebih tinggi)
```

---

## Integrasi dengan `.docs/`

### Hubungan AGENTS.md dan `.docs/`

```
AGENTS.md = Entry Point (ringkasan + rules utama)
.docs/ = Deep Knowledge (dokumentasi detail per topik)

Jika tugas match topik di .docs/:
1. Cek .docs/ terlebih dahulu
2. Apply rules dari .docs/
3. AGENTS.md sebagai referensi umum

Jika tugas tidak match .docs/ manapun:
1. Gunakan rules dari AGENTS.md
2. Apply best practices yang relevan
```

### Cross-Reference

Untuk detail lengkap, lihat dokumen terkait di `.docs/`:

- **UI & Styling** → `.docs/components-and-styling.md`
- **State Management** → `.docs/state-management.md`
- **API & Data Fetching** → `.docs/data-fetching.md`, `.docs/api-layer.md`
- **Error Handling** → `.docs/error-handling.md`
- **Testing** → `.docs/testing.md`
- **Performance** → `.docs/performance.md`
- **Arsitektur** → `.docs/information-architecture.md`, `.docs/project-structure.md`
- **Standards** → `.docs/project-standards.md`

---

## Project Overview

**FilmGueh** is a movie tracking web application that helps users record, manage, and filter movies they have watched or want to watch. It uses the TMDB API for movie data and stores user data in browser LocalStorage (no backend, no authentication).

Built on the **Bulletproof React** architecture — a scalable Next.js application following a feature-based structure with strong conventions for maintainability.

### Application Domain

- Users discover movies via interactive search on the home page
- Users search for movies via the TMDB API
- Users add movies to a personal tracker
- Movies can be categorized (Watched / Plan to Watch / Dropped)
- Users can filter by category and genre
- Users can edit entries (category, rating, notes) and delete them
- Data persists in LocalStorage

## Setup Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run check-types

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/              # Application layer (pages, layouts, providers)
│   ├── layout.tsx    # Root layout (metadata, viewport from config)
│   ├── page.tsx      # Home/landing page
│   ├── not-found.tsx # 404 page
│   └── provider.tsx  # Global providers (QueryClient, ErrorBoundary)
├── components/       # Shared UI components
│   ├── errors/       # Error boundary fallbacks
│   ├── layouts/      # Shared layout components (header, footer, app-layout)
│   └── ui/           # Design system components (barrel export via index.ts)
│       ├── button/   # Button component (variants: default, outline, destructive, etc.)
│       ├── form/     # Form components (Form, Input, Textarea, Select, Switch, Label, FieldWrapper, Error)
│       ├── index.ts  # Barrel exports — single entry point
├── config/           # Global configs, env variables, and static data
│   ├── env.ts        # Zod-validated env vars
│   ├── icons.tsx     # Central SVG icon components (Search, Bookmark, Chart, Star, etc.)
│   ├── paths.ts      # Route path constants
│   └── site.ts       # Central static data (site name, description, nav links, features)
├── constants/        # Application-wide constants
│   └── icons/        # Centralized Lucide icon mapping (barrel export via index.ts)
│       ├── icons.tsx # ICON_MAP + getIcon() function
│       └── index.ts  # Exports: getIcon, ICON_MAP, IconKey, IconConfig
├── data/             # Data layer — dummy data & domain models (barrel export via index.ts)
│   ├── categories.ts # Category constants (Category type, categories array)
│   ├── movies.ts     # Movie model + data + utility functions
│   └── index.ts      # Exports: Movie, categories, movies, getMoviesByCategory, searchMovies
├── features/         # Feature-based modules
│   └── landing/      # Landing page feature
│       └── components/
├── hooks/            # Shared React hooks
│   ├── use-disclosure.ts  # Open/close toggle hook
│   ├── use-keyboard-shortcut.ts  # Keyboard shortcut listener
│   └── use-scroll.ts      # Scroll position hook
├── lib/              # Preconfigured libraries
│   ├── api-client.ts # Fetch-based API client with cookie forwarding
│   └── react-query.ts # TanStack Query config defaults
├── testing/          # Test utilities
│   ├── setup-tests.ts # Vitest setup (MSW mock for next/navigation)
│   └── test-utils.tsx # Custom render with AppProvider wrapper
├── types/            # Shared TypeScript types
│   └── api.ts        # BaseEntity, Entity<T>, Meta
├── utils/            # Shared utility functions
│   ├── cn.ts         # className merge utility (clsx + tailwind-merge)
│   └── format.ts     # Date formatting (dayjs)
└── styles/
    └── globals.css   # Tailwind imports + CSS variables
```

### Feature Structure

Each feature should be self-contained:

```
src/features/movies/
├── api/         # API calls and hooks (TMDB, LocalStorage operations)
├── components/  # Feature-specific components
├── hooks/       # Feature-specific hooks
├── stores/      # Feature-specific state (Zustand stores)
├── types/       # Feature-specific TypeScript types
└── utils/       # Feature-specific utilities
```

## Code Standards

### TypeScript

- **Strict mode enabled** — all strict checks are enforced
- **Type-first approach** — define types before implementation
- **Absolute imports** — use `@/` prefix for all src imports (e.g., `@/components/ui/button`)
- **No `any`** — avoid unless absolutely necessary; prefer `unknown` + type guards

### Code Style (enforced by ESLint + Prettier)

- **Kebab-case** for file and folder names (e.g., `movie-card.tsx`)
- **PascalCase** for React components (e.g., `MovieCard`)
- **camelCase** for functions and variables (e.g., `fetchMovies`, `isLoading`)
- **Single quotes** for strings
- **Trailing commas** everywhere
- **2-space indentation**
- **LF line endings** (via Prettier `endOfLine: auto`)
- **Alphabetized imports** with newlines between groups

### Architecture Rules

- **No cross-feature imports** — features should not import from each other
- **Unidirectional flow** — `utils/ → lib/ → components/ → features/ → app/`
- **Colocation** — keep related code as close as possible to where it's used
- **Single responsibility** — each file/module should have one clear purpose

## Component Guidelines

### Best Practices

- **Composition over props** — use `children`/slots instead of many props
- **Extract render functions** — move complex JSX into separate components
- **Limit prop count** — if a component accepts too many props, split it or use composition

### Styling

- **Tailwind CSS** is the primary styling solution
- **ShadCN/UI pattern** — components are copied into codebase, not installed as packages
- **CSS variables** in `globals.css` for theme tokens (colors, border-radius, etc.)

### Available UI Components

#### From barrel (RECOMMENDED)

```tsx
import { Button, Form, Input, Kbd, Typography } from '@/components/ui';
```

#### Button

```tsx
<Button
	variant="default|outline|destructive|secondary|ghost|link"
	size="default|sm|lg|icon"
	icon={<LucideIcon />}
>
	Click me
</Button>
```

#### Form

```tsx
<Form submitHandler={handleSubmit} schema={validationSchema}>
  <Input label="Title" name="title" placeholder="Movie title" />
  <Select label="Category" name="category" options={[...]} />
  <Textarea label="Notes" name="notes" />
  <Switch label="Watched" name="watched" />
</Form>
```

### Central Config (`@/config/`)

#### site.ts — Static Data Hub

All static data lives in `src/config/site.ts`:

- `siteConfig` — name, description, tagline, URL, author
- `navLinks` — navigation link definitions
- `features` — feature card data for landing page

Import anywhere without duplication:

```tsx
import { features, navLinks, siteConfig } from '@/config/site';
```

#### icons.tsx — Central SVG Icon Components

Custom SVG icons as named React components with a dynamic `Icon` wrapper:

```tsx
import { Icon, SearchIcon, iconMap } from '@/config/icons';

// Direct component usage
<SearchIcon className="size-6" strokeWidth={1} />

// Dynamic usage by name
<Icon name="search" className="size-6" />
```

### Centralized Icon System (`@/constants/icons/`)

All Lucide React icons are mapped centrally — never import from `lucide-react` directly in components.

```tsx
import { getIcon } from '@/constants';

// Usage
{
	getIcon('search', 'size-4 text-muted-foreground');
}
{
	getIcon('star', 'size-3 text-yellow-500');
}
```

Icon map definition (`src/constants/icons/icons.tsx`):

```tsx
export const ICON_MAP: Record<IconKey, IconConfig> = {
	search: { icon: Search, label: 'Search' },
	star: { icon: Star, label: 'Rating' },
	all: { icon: Clapperboard, label: 'Semua' }
	// ... more icons
};
```

### Centralized Data Layer (`@/data/`)

All dummy data and domain models are centralized and exported via barrel file:

```tsx
import { categories, getMoviesByCategory, Movie, movies, searchMovies } from '@/data';
```

Structure:

- `categories.ts` — Category constants and type
- `movies.ts` — Movie model, data array, and utility functions (getMoviesByCategory, searchMovies)
- `index.ts` — Barrel exports

## State Management Strategy

### Component State

- `useState` for simple independent state
- `useDisclosure` hook (`@/hooks/use-disclosure`) for open/close UI state (modals, drawers)

### Application State

- **Zustand** for global client state (modals, filters, theme)
- Keep state as close to usage as possible — avoid premature globalization

### Server/External State

- **TanStack Query** for TMDB API data fetching with caching
- Separate fetcher functions from hooks

### Form State

- **React Hook Form** for form management
- **Zod** for validation schemas
- Use the `Form` component abstraction

### Persistent State

- **LocalStorage** for movie tracker data (no backend)
- Read/write via utility functions or a Zustand store with persist middleware

## API Layer

### Structure

Each API endpoint should follow a consistent pattern:

1. **Types & validation schemas** for request/response data
2. **Fetcher function** using the configured API client (`@/lib/api-client`)
3. **React Query hook** for data fetching/caching

### Example Pattern

```typescript
// features/movies/api/search-movies.ts
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';

export const searchMoviesInputSchema = z.object({
	query: z.string().min(1),
	page: z.number().optional()
});

export type SearchMoviesInput = z.infer<typeof searchMoviesInputSchema>;

export const searchMovies = ({ query, page = 1 }: SearchMoviesInput): Promise<Movie[]> => {
	return api.get('/search/movie', { params: { query, page } });
};

export const useSearchMovies = (input: SearchMoviesInput) => {
	return useQuery({
		queryKey: ['movies', 'search', input],
		queryFn: () => searchMovies(input),
		enabled: input.query.length > 0
	});
};
```

### API Client (`@/lib/api-client`)

- Pre-configured fetch-based client with:
  - Base URL from `NEXT_PUBLIC_API_URL`
  - Cookie forwarding for SSR
  - JSON content type by default
  - Auto-sends `credentials: 'include'`
  - Error throwing on non-OK responses
- Methods: `api.get()`, `api.post()`, `api.put()`, `api.patch()`, `api.delete()`

## Testing Strategy

### Testing Pyramid

1. **Integration Tests** (primary focus) — test feature workflows
2. **Unit Tests** — test shared utilities and complex logic

### Tools

- **Vitest** — test runner (globals enabled: `vi`, `describe`, `it`, `expect`)
- **Testing Library** — `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`

### Patterns

- Test behavior, not implementation details
- Use `renderApp` utility for wrapped component rendering
- Mock `next/navigation` via the global setup in `setup-tests.ts`
- Focus on user interactions and rendered output

```tsx
import { renderApp, screen, userEvent } from '@/testing/test-utils';

it('renders the form and submits', async () => {
	const { user } = renderApp(<MyForm />);
	await user.type(screen.getByLabelText('Title'), 'Inception');
	await user.click(screen.getByRole('button', { name: /save/i }));
	expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## Performance Optimization

### React Optimizations

- **Children prop pattern** — prevent unnecessary re-renders
- **State colocation** — keep state close to where it's used
- **State initializer functions** — for expensive initial computations (`useState(() => expensive())`)

### Image Optimization

- Use Next.js `Image` component with TMDB image URLs
- Lazy loading for images outside viewport
- Configure remote patterns in `next.config.mjs`

## Error Handling

### API Errors

- Global error handling in `api-client.ts` — throws `Error` with server message

### Application Errors

- **Error Boundaries** at feature level (not just app level)
- `MainErrorFallback` component for top-level errors
- Graceful fallbacks for broken components

## Build and Deployment

### Development

- **Next.js 14** with App Router
- **TypeScript strict mode** for compile-time safety
- **ESLint + Prettier** for code quality
- **HMR** via Next.js dev server

### Production

- Static site generation (SSG) where possible
- Deploy to **Vercel**, **Netlify**, or **Cloudflare Pages**
- Environment variables via `.env` files

## Key Libraries

### Core

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript** (strict mode)

### UI & Styling

- **Tailwind CSS** — utility-first styling
- **Radix UI** — `@radix-ui/react-label`, `@radix-ui/react-slot`, `@radix-ui/react-switch`
- **Lucide React** — icons (consumed via centralized `@/constants/icons/`)
- **class-variance-authority** + **tailwind-merge** + **clsx** — component variants and class merging
- **motion/react** — animations for command palette and UI transitions

### Data & State

- **TanStack Query** — server state (TMDB API)
- **Zustand** — client state (filters, UI state)
- **React Hook Form + Zod** — forms
- **usehooks-ts** — shared React hooks (`useDebounceValue`, `useOnClickOutside`, etc.)
- **dayjs** — date formatting

### Testing

- **Vitest** — test runner
- **Testing Library** — component testing

## File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `movie-card.tsx`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-movies.ts`)
- **Stores**: `kebab-case.ts` (e.g., `movie-store.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Types**: `kebab-case.ts` (e.g., `api-types.ts`)
- **Folders**: `kebab-case` throughout

## Common Patterns

### Feature Development

1. Start with API types and validation schemas (Zod)
2. Create API/fetcher functions
3. Create React Query hooks for TMDB data and LocalStorage operations
4. Build Zustand stores for persistent UI state
5. Build UI components with proper TypeScript integration
6. Add tests covering the feature workflow

### Component Creation

1. Create a folder under the appropriate feature: `src/features/<feature>/components/<kebab-name>/`
2. Use composition patterns over prop drilling
3. Include integration tests for components with logic

### LocalStorage Persistence

1. Define types for the data model
2. Create a Zustand store with `persist` middleware or plain read/write utilities
3. Create React hooks that read/write to the store
4. Components consume the hooks — never access LocalStorage directly

### State Management (decision tree)

1. Start with local component state
2. Lift to parent component if needed by siblings
3. Use Zustand if needed across features or for persisted data
4. Use React Query for all TMDB API data

---

## Priority System

### Urutan Prioritas Rules

```
1. Existing Code Patterns
   └── Selalu ikuti pattern yang sudah ada di codebase

2. .docs/ Documentation
   └── Jika ada dokumen terkait, itu adalah source of truth

3. AGENTS.md Rules
   └── Aturan umum di dokumen ini

4. General Best Practices
   └── Fallback jika tidak ada referensi spesifik
```

### Konflik Resolution

```
Jika terjadi konflik antar rules:

Priority tinggi > Priority rendah

Contoh:
- Best practice bilang "use effect dependency array"
- Tapi existing pattern di codebase tidak pakai
- → Ikuti existing pattern (prioritas lebih tinggi)
```

---

## Integrasi dengan `.docs/`

### Hubungan AGENTS.md dan `.docs/`

```
AGENTS.md = Entry Point (ringkasan + rules utama)
.docs/ = Deep Knowledge (dokumentasi detail per topik)

Jika tugas match topik di .docs/:
1. Cek .docs/ terlebih dahulu
2. Apply rules dari .docs/
3. AGENTS.md sebagai referensi umum

Jika tugas tidak match .docs/ manapun:
1. Gunakan rules dari AGENTS.md
2. Apply best practices yang relevan
```

### Cross-Reference

Untuk detail lengkap, lihat dokumen terkait di `.docs/`:

- **UI & Styling** → `.docs/components-and-styling.md`
- **State Management** → `.docs/state-management.md`
- **API & Data Fetching** → `.docs/data-fetching.md`, `.docs/api-layer.md`
- **Error Handling** → `.docs/error-handling.md`
- **Testing** → `.docs/testing.md`
- **Performance** → `.docs/performance.md`
- **Arsitektur** → `.docs/information-architecture.md`, `.docs/project-structure.md`
- **Standards** → `.docs/project-standards.md`

---

## Common Patterns

### Feature Development

1. Start with API types and validation schemas (Zod)
2. Create API/fetcher functions
3. Create React Query hooks for TMDB data and LocalStorage operations
4. Build Zustand stores for persistent UI state
5. Build UI components with proper TypeScript integration
6. Add tests covering the feature workflow

### Component Creation

1. Create a folder under the appropriate feature: `src/features/<feature>/components/<kebab-name>/`
2. Use composition patterns over prop drilling
3. Include integration tests for components with logic

### LocalStorage Persistence

1. Define types for the data model
2. Create a Zustand store with `persist` middleware or plain read/write utilities
3. Create React hooks that read/write to the store
4. Components consume the hooks — never access LocalStorage directly

### State Management (decision tree)

1. Start with local component state
2. Lift to parent component if needed by siblings
3. Use Zustand if needed across features or for persisted data
4. Use React Query for all TMDB API data
