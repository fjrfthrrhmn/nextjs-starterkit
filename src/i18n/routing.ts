import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['id', 'en'] as const;
export const defaultLocale = 'id';

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: {
    mode: 'always',
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);