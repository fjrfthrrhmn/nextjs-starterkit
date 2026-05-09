'use client';

import Link from 'next/link';
import React from 'react';

import { Typography } from '@/components/ui/typography';
import { paths } from '@/config/paths';
import { navLinks, siteConfig } from '@/config/site';
import {
  ACTION_2_ICONS,
  ICON_SIZES,
  ICON_STROKE,
  type Action2IconKey,
} from '@/constants/icons';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/utils/cn';

export const Footer = () => {
  const { language } = useLanguage();

  const createIconElement = (key: Action2IconKey, className: string) => {
    const IconComponent = ACTION_2_ICONS[key];
    return React.createElement(IconComponent, {
      className,
      strokeWidth: ICON_STROKE.default,
    });
  };

  const footerLabels = {
    movies: language === 'id' ? 'Koleksi Film' : 'Movie Collection',
    search: language === 'id' ? 'Pencarian' : 'Search',
    discover: language === 'id' ? 'Jelajahi' : 'Discover',
    about: language === 'id' ? 'Tentang' : 'About',
    copyright: language === 'id'
      ? `Hak cipta ${new Date().getFullYear()} ${siteConfig.name}`
      : `© ${new Date().getFullYear()} ${siteConfig.name}`,
    tagline: language === 'id'
      ? 'Lacak setiap film yang kamu tonton.'
      : 'Track every movie you watch.',
    poweredBy: language === 'id' ? 'Data oleh' : 'Powered by',
  };

  return (
    <footer className="border-t bg-background/50">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href={paths.home.getHref()} className="inline-block">
              <span className="font-mono text-xl font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <Typography.Text
              variant="sm/normal"
              className="mt-3 max-w-sm text-muted-foreground"
            >
              {footerLabels.tagline}
            </Typography.Text>
            <div className="mt-4 flex items-center gap-2">
              <Typography.Text variant="xs/normal" className="text-muted-foreground">
                {footerLabels.poweredBy}
              </Typography.Text>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                TMDB
              </a>
            </div>
          </div>

          <div>
            <Typography.Text
              variant="xs/medium"
              className="mb-3 text-muted-foreground uppercase tracking-wider"
            >
              {footerLabels.discover}
            </Typography.Text>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label === 'Movies'
                    ? footerLabels.movies
                    : link.label === 'Search'
                      ? footerLabels.search
                      : link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <Typography.Text
              variant="xs/medium"
              className="mb-3 text-muted-foreground uppercase tracking-wider"
            >
              {footerLabels.about}
            </Typography.Text>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">
                v1.0.0
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
                {createIconElement('external-link', cn(ICON_SIZES.xs, 'ms-0.5'))}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <Typography.Text variant="xs/normal" className="text-muted-foreground">
            {footerLabels.copyright}
          </Typography.Text>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              {createIconElement('globe', ICON_SIZES.sm)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
