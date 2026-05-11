'use client';

import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { paths } from '@/config/paths';
import { type NavLink } from '@/config/site';
import { useScroll } from '@/hooks/use-scroll';

export type NavConfig = {
  key: string;
  href: string;
  label: NavLink['label'];
  getHref: () => string;
};

const NAV_CONFIG: NavConfig[] = [
  { key: 'home', href: '/', label: 'Home', getHref: () => '/' },
  { key: 'movies', href: '/movies', label: 'Movies', getHref: () => paths.movies.getHref() },
  { key: 'search', href: '/search', label: 'Search', getHref: () => paths.search.getHref('') },
  { key: 'about', href: '/about', label: 'About', getHref: () => paths.about.getHref() },
];

export function useHeader() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');
  const scrolled = useScroll(10);

  const [open, setOpen] = React.useState(false);

  const toggleLanguage = (newLocale: string) => {
    const cleanPath = pathname.replace(/^\/(en|id)/, '') || '/';
    router.replace(`/${newLocale}${cleanPath}`);
  };

  const getLanguageButtonText = () => {
    return locale === 'id' ? tHeader('switchToEn') : tHeader('switchToId');
  };

  const getNavLabel = (label: NavLink['label']) => {
    if (label === 'Home') return t('home');
    if (label === 'Movies') return t('movies');
    if (label === 'Search') return t('search');
    if (label === 'About') return t('about');
    return label;
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname.startsWith('/en') || pathname.startsWith('/id');
    }
    return pathname === href || pathname.startsWith(`${href}`);
  };

  const closeMobileMenu = () => setOpen(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return {
    open,
    setOpen,
    scrolled,
    locale,
    navLinks: NAV_CONFIG,
    toggleLanguage,
    getLanguageButtonText,
    getNavLabel,
    isActive,
    closeMobileMenu,
  };
}

export type UseHeaderReturn = ReturnType<typeof useHeader>;
