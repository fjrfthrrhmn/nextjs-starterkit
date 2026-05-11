'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { Button, Typography } from '@/components/ui';
import { paths } from '@/config/paths';
import { footerLinks, navLinks, siteConfig, socialLinks } from '@/config/site';
import {
  ACTION_2_ICONS,
  ICON_SIZES,
  ICON_STROKE,
  type Action2IconKey,
} from '@/constants/icons';
import { cn } from '@/utils/cn';

function GridPattern({ className }: { className?: string }) {
  const patternId = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={cn('absolute inset-0 w-full h-full', className)}
    >
      <defs>
        <pattern
          id={patternId}
          width={40}
          height={40}
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <path
            d="M.5 40V.5H40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="opacity-10"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
    </svg>
  );
}

function GridPatternSquares({ className }: { className?: string }) {
  const patternId = React.useId();
  const p = [[0, 1, 0, 1], [1, 0, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0]];

  return (
    <svg
      aria-hidden="true"
      className={cn('absolute inset-0 w-full h-full', className)}
    >
      <defs>
        <pattern
          id={patternId}
          width={40}
          height={40}
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          {p.map((row, y) =>
            row.map((cell, x) =>
              cell ? (
                <rect
                  key={`${x}-${y}`}
                  width={10}
                  height={10}
                  x={x * 20}
                  y={y * 20}
                  className="fill-foreground/5 stroke-foreground/25"
                />
              ) : null
            )
          )}
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
    </svg>
  );
}

export const Footer = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const createIconElement = (key: Action2IconKey, className: string) => {
    const IconComponent = ACTION_2_ICONS[key];
    return React.createElement(IconComponent, {
      className,
      strokeWidth: ICON_STROKE.default,
    });
  };

  const getNavLabel = (label: string) => {
    if (label === 'Movies') return tNav('movies');
    if (label === 'Search') return tNav('search');
    return label;
  };

  const getSocialIcon = (icon: string): Action2IconKey => {
    return icon as Action2IconKey;
  };

  return (
    <footer className="relative border-t bg-card/50 overflow-hidden">

      <div className="relative mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href={paths.home.getHref()} className="inline-block">
              <span className="text-xl font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <Typography.Text
              variant="sm/normal"
              className="mt-3 max-w-xs text-muted-foreground"
            >
              {siteConfig.description}
            </Typography.Text>

            <div className="mt-6">
              <Button variant="default" size="sm" className="gap-2" asChild>
                <Link
                  href="https://www.buymeacoffee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {createIconElement('coffee', ICON_SIZES.sm)}
                  {t('buyMeCoffee')}
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <Typography.Text
              variant="xs/medium"
              className="mb-3 text-muted-foreground uppercase tracking-wider"
            >
              {t('discover')}
            </Typography.Text>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {getNavLabel(link.label)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <Typography.Text
              variant="xs/medium"
              className="mb-3 text-muted-foreground uppercase tracking-wider"
            >
              {t('about')}
            </Typography.Text>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground inline-flex items-center gap-1.5"
                >
                  {link.label}
                  {createIconElement('external-link', cn(ICON_SIZES.xs, 'ms-0.5 opacity-60'))}
                </Link>
              ))}
              <span className="text-sm text-muted-foreground">
                {t('version')}
              </span>
            </div>
          </div>

          <div>
            <Typography.Text
              variant="xs/medium"
              className="mb-3 text-muted-foreground uppercase tracking-wider"
            >
              {t('followUs')}
            </Typography.Text>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label={social.label}
                >
                  {createIconElement(getSocialIcon(social.icon), ICON_SIZES.sm)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <Typography.Text variant="xs/normal" className="text-muted-foreground">
            {`© ${new Date().getFullYear()} ${siteConfig.name} ${t('copyright')}`}
          </Typography.Text>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Typography.Text variant="xs/normal" className="text-muted-foreground">
              {t('poweredBy')}
            </Typography.Text>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              TMDB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
