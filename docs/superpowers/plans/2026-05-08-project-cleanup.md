# Project Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip the Bulletproof React demo boilerplate down to a clean foundation — shared UI components, infrastructure, config, and testing setup — ready for building a custom website.

**Architecture:** Delete all feature-specific code (auth, discussions, comments, teams, users) and their corresponding pages. Delete unused UI components. Remove demo dependencies from package.json. Simplify the root layout, provider, and landing page to remove demo references. Clean up testing infra to remove demo mocks while keeping vitest + testing library.

**Tech Stack:** Next.js 14 (App Router), React 18, TanStack Query, React Hook Form + Zod, Tailwind CSS, Vitest + Testing Library

---

### Task 1: Delete demo feature modules

**Files:**
- Delete: `src/features/auth/` (entire directory)
- Delete: `src/features/comments/` (entire directory)
- Delete: `src/features/discussions/` (entire directory)
- Delete: `src/features/teams/` (entire directory)
- Delete: `src/features/users/` (entire directory)

- [ ] **Step 1: Remove all feature directories**

```bash
Remove-Item -Recurse -Force "src/features/auth"
Remove-Item -Recurse -Force "src/features/comments"
Remove-Item -Recurse -Force "src/features/discussions"
Remove-Item -Recurse -Force "src/features/teams"
Remove-Item -Recurse -Force "src/features/users"
```

Expected: No `src/features/` directory or it exists as an empty folder. Verify with `Get-ChildItem "src/features"`.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove demo feature modules (auth, comments, discussions, teams, users)"
```

---

### Task 2: Delete demo pages (auth, app dashboard, public)

**Files:**
- Delete: `src/app/auth/` (entire directory)
- Delete: `src/app/app/` (entire directory)
- Delete: `src/app/public/` (entire directory)

- [ ] **Step 1: Remove demo page directories**

```bash
Remove-Item -Recurse -Force "src/app/auth"
Remove-Item -Recurse -Force "src/app/app"
Remove-Item -Recurse -Force "src/app/public"
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove demo pages (auth, dashboard, public discussions)"
```

---

### Task 3: Delete unused UI components

**Files:**
- Delete: `src/components/ui/dialog/` (entire directory)
- Delete: `src/components/ui/drawer/` (entire directory)
- Delete: `src/components/ui/dropdown/` (entire directory)
- Delete: `src/components/ui/link/` (entire directory)
- Delete: `src/components/ui/md-preview/` (entire directory)
- Delete: `src/components/ui/notifications/` (entire directory)
- Delete: `src/components/ui/spinner/` (entire directory)
- Delete: `src/components/ui/table/` (entire directory)

- [ ] **Step 1: Remove unused UI component directories**

```bash
Remove-Item -Recurse -Force "src/components/ui/dialog"
Remove-Item -Recurse -Force "src/components/ui/drawer"
Remove-Item -Recurse -Force "src/components/ui/dropdown"
Remove-Item -Recurse -Force "src/components/ui/link"
Remove-Item -Recurse -Force "src/components/ui/md-preview"
Remove-Item -Recurse -Force "src/components/ui/notifications"
Remove-Item -Recurse -Force "src/components/ui/spinner"
Remove-Item -Recurse -Force "src/components/ui/table"
```

- [ ] **Step 2: Remove form-drawer.tsx (depends on deleted drawer)**

```bash
Remove-Item -Force "src/components/ui/form/form-drawer.tsx"
```

- [ ] **Step 3: Update form/index.ts to remove form-drawer and switch exports**

Read `src/components/ui/form/index.ts`. Replace its content:

```typescript
export * from './form';
export * from './input';
export * from './select';
export * from './textarea';
export * from './label';
export * from './error';
export * from './field-wrapper';
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused UI components (dialog, drawer, dropdown, link, md-preview, notifications, spinner, table)"
```

---

### Task 4: Delete demo library code

**Files:**
- Delete: `src/lib/auth.tsx`
- Delete: `src/lib/authorization.ts`

- [ ] **Step 1: Remove demo library files**

```bash
Remove-Item -Force "src/lib/auth.tsx"
Remove-Item -Force "src/lib/authorization.ts"
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove demo library modules (auth, authorization)"
```

---

### Task 5: Clean up app/provider.tsx (remove Notifications reference)

**Files:**
- Modify: `src/app/provider.tsx`

- [ ] **Step 1: Edit provider.tsx to remove Notifications import and usage**

Current content:
```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications';
import { queryConfig } from '@/lib/react-query';
```

Replace with:
```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { queryConfig } from '@/lib/react-query';
```

- [ ] **Step 2: Remove the `<Notifications />` JSX line**

Find this inside the return statement:
```tsx
        <Notifications />
```

Delete that line so the JSX becomes:
```tsx
        {children}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor: remove Notifications from AppProvider (component deleted)"
```

---

### Task 6: Clean up app/layout.tsx (remove auth prefetch)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Edit layout.tsx to remove auth-related code**

Current file:
```tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

import { AppProvider } from '@/app/provider';
import { getUserQueryOptions } from '@/lib/auth';

import '@/styles/globals.css';

export const metadata = {
  title: 'Bulletproof React',
  description: 'Showcasing Best Practices For Building React Applications',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const dynamic = 'force-dynamic';
```

Replace with:
```tsx
import { ReactNode } from 'react';

import { AppProvider } from '@/app/provider';

import '@/styles/globals.css';

export const metadata = {
  title: 'My App',
  description: 'A Next.js application',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "refactor: clean up root layout (remove auth prefetch, hydration boundary)"
```

---

### Task 7: Clean up landing page (remove demo references)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace landing page with clean placeholder**

Current content (`src/app/page.tsx`):

Replace the entire file with:

```tsx
const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Welcome
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Start building your application.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "refactor: clean up landing page with placeholder content"
```

---

### Task 8: Clean up not-found page (remove Link dependency)

**Files:**
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Replace not-found page to remove Link import**

Current content:
```tsx
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

const NotFoundPage = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href={paths.home.getHref()} replace>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
```

Replace with:
```tsx
import NextLink from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NextLink href="/" className="text-blue-500 underline mt-4 inline-block">
        Go to Home
      </NextLink>
    </div>
  );
};

export default NotFoundPage;
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "refactor: clean up not-found page to use next/link directly"
```

---

### Task 9: Clean up config (paths.ts, env.ts)

**Files:**
- Modify: `src/config/paths.ts`
- Modify: `src/config/env.ts`

- [ ] **Step 1: Simplify paths.ts to remove demo routes**

Replace entire `src/config/paths.ts`:

```typescript
export const paths = {
  home: {
    getHref: () => '/',
  },
} as const;
```

- [ ] **Step 2: Simplify env.ts**

Replace entire `src/config/env.ts`:

```typescript
import * as z from 'zod';
import 'dotenv/config';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
  });

  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    APP_URL: process.env.NEXT_PUBLIC_URL,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor: simplify config (remove demo paths, env vars)"
```

---

### Task 10: Clean up api-client.ts (remove notifications dependency)

**Files:**
- Modify: `src/lib/api-client.ts`

- [ ] **Step 1: Remove Notifications import and error toast**

Current import line:
```typescript
import { useNotifications } from '@/components/ui/notifications';
```

Remove that import. Then in the error handling block in `fetchApi`, replace:

```typescript
  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    if (typeof window !== 'undefined') {
      useNotifications.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });
    }
    throw new Error(message);
  }
```

With:
```typescript
  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    throw new Error(message);
  }
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "refactor: remove notifications dependency from api-client"
```

---

### Task 11: Clean up types/api.ts (remove demo domain types)

**Files:**
- Modify: `src/types/api.ts`

- [ ] **Step 1: Strip to only generic types**

Replace entire `src/types/api.ts`:

```typescript
export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "refactor: strip demo domain types, keep only BaseEntity/Entity/Meta"
```

---

### Task 12: Delete demo utilities

**Files:**
- Delete: `src/utils/auth.ts`

- [ ] **Step 1: Remove auth utility**

```bash
Remove-Item -Force "src/utils/auth.ts"
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove demo auth utility"
```

---

### Task 13: Clean up testing infrastructure

**Files:**
- Delete: `src/testing/data-generators.ts`
- Delete: `src/testing/mocks/` (entire directory)
- Modify: `src/testing/setup-tests.ts`
- Modify: `src/testing/test-utils.tsx`

- [ ] **Step 1: Delete data-generators.ts**

```bash
Remove-Item -Force "src/testing/data-generators.ts"
```

- [ ] **Step 2: Delete mocks directory**

```bash
Remove-Item -Recurse -Force "src/testing/mocks"
```

- [ ] **Step 3: Simplify setup-tests.ts**

Replace entire `src/testing/setup-tests.ts`:

```typescript
import '@testing-library/jest-dom/vitest';

beforeAll(() => {
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
      }),
      usePathname: () => '/',
      useSearchParams: () => ({
        get: vi.fn(),
      }),
    };
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
```

- [ ] **Step 4: Simplify test-utils.tsx**

Replace entire `src/testing/test-utils.tsx`:

```typescript
import {
  render as rtlRender,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppProvider } from '@/app/provider';

export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

export const renderApp = (
  ui: React.ReactElement,
  renderOptions: Record<string, any> = {},
) => {
  return {
    ...rtlRender(ui, {
      wrapper: AppProvider,
      ...renderOptions,
    }),
  };
};

export * from '@testing-library/react';
export { userEvent, rtlRender };
```

- [ ] **Step 5: Delete __mocks__/zustand.ts (no longer needed)**

```bash
Remove-Item -Recurse -Force "__mocks__"
```

- [ ] **Step 6: Delete remaining demo test files**

```bash
Remove-Item -Recurse -Force "src/hooks/__tests__"
Remove-Item -Recurse -Force "src/lib/__tests__"
Remove-Item -Recurse -Force "src/components/ui/form/__tests__"
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: clean up testing infra (remove demo mocks, generators, simplify setup)"
```

---

### Task 14: Delete dev tooling (Storybook, Husky, Plop, E2E)

**Files:**
- Delete: `.storybook/` (entire directory)
- Delete: `.husky/` (entire directory)
- Delete: `generators/` (entire directory)
- Delete: `e2e/` (entire directory)
- Delete: `mock-server.ts`
- Delete: `public/mockServiceWorker.js`
- Delete: `public/logo.svg`, `public/logo192.png`, `public/logo512.png`
- Delete: `__mocks__/`

- [ ] **Step 1: Remove all dev tooling directories and files**

```bash
Remove-Item -Recurse -Force ".storybook"
Remove-Item -Recurse -Force ".husky"
Remove-Item -Recurse -Force "generators"
Remove-Item -Recurse -Force "e2e"
Remove-Item -Force "mock-server.ts"
Remove-Item -Force "public/mockServiceWorker.js"
Remove-Item -Force "public/logo.svg"
Remove-Item -Force "public/logo192.png"
Remove-Item -Force "public/logo512.png"
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove dev tooling (Storybook, Husky, Plop, E2E, mock server)"
```

---

### Task 15: Update package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update name and remove demo scripts**

Replace the `package.json` with updated `name`, `scripts`, and `dependencies`/`devDependencies`.

**Updated scripts:**
```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "check-types": "tsc --project tsconfig.json --pretty --noEmit"
  }
}
```

**Removed dependencies:**
- `@ngneat/falso`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-icons`
- `isomorphic-dompurify`
- `marked`
- `nanoid`

**Removed devDependencies:**
- `@mswjs/data`
- `@mswjs/http-middleware`
- `@playwright/test`
- `@storybook/*` (all 7 packages)
- `@types/cors`
- `@types/dompurify`
- `@types/js-cookie`
- `@types/marked`
- `cors`
- `express`
- `husky`
- `jest-environment-jsdom`
- `js-cookie`
- `lint-staged`
- `msw`
- `pino-http`
- `pino-pretty`
- `plop`
- `pm2`
- `storybook`
- `tsx`

- [ ] **Step 2: Install to update lockfile**

```bash
yarn install
```

Expected: No errors. Verify with `yarn lint --version`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: update package.json (rename, remove demo deps and scripts)"
```

---

### Task 16: Remove demo eslint-plugin-check-file from deps

**Files:**
- Modify: `.eslintrc.cjs`

The `eslint-plugin-check-file` is in `dependencies` (not devDeps). Move it or remove the rules.

- [ ] **Step 1: Remove check-file plugin reference from .eslintrc.cjs**

Read `.eslintrc.cjs` and remove or comment out the `check-file` plugin and its rules (they enforce the feature-sliced import patterns which no longer apply).

Edit to remove `check-file` related config - just remove any references to `check-file` plugin and the `check-file/folder-naming-convention` and `check-file/filename-naming-convention` rules.

- [ ] **Step 2: Remove eslint-plugin-check-file from package.json**

In the `dependencies` section, remove `"eslint-plugin-check-file": "^2.8.0",`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove eslint-plugin-check-file (demo-specific)"
```

---

### Task 17: Clean up .env files

**Files:**
- Modify: `.env`
- Modify: `.env.example`

- [ ] **Step 1: Simplify .env.example**

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_URL=http://localhost:3000
```

- [ ] **Step 2: Update .env to match**

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_URL=http://localhost:3000
```

- [ ] **Step 3: Delete .env.example-e2e**

```bash
Remove-Item -Force ".env.example-e2e"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: clean up env files"
```

---

### Task 18: Add a default .gitkeep to features directory

**Files:**
- Create: `src/features/.gitkeep` (so the directory stays in git)

- [ ] **Step 1: Create placeholder file**

```bash
New-Item -ItemType File -Path "src/features/.gitkeep" -Force
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: add .gitkeep to features directory"
```

---

### Task 19: Verify the project still builds

- [ ] **Step 1: Run type check**

```bash
yarn check-types
```

Expected: No type errors.

- [ ] **Step 2: Run lint**

```bash
yarn lint
```

Expected: No lint errors.

- [ ] **Step 3: Run tests**

```bash
yarn test
```

Expected: No tests to run (or just passes with 0 tests).

- [ ] **Step 4: Build**

```bash
yarn build
```

Expected: Successful build with no errors.
