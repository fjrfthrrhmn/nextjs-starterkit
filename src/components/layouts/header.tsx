'use client';

import Link from 'next/link';
import React from 'react';

import { Button, buttonVariants, Typography } from '@/components/ui';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { paths } from '@/config/paths';
import { navLinks, siteConfig } from '@/config/site';
import {
  ACTION_2_ICONS,
  ICON_SIZES,
  ICON_STROKE,
  type Action2IconKey,
} from '@/constants/icons';
import { useLanguage } from '@/contexts/language-context';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/utils/cn';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const { language } = useLanguage();
  const scrolled = useScroll(10);

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

  const navLabels = {
    movies: language === 'id' ? 'Film' : 'Movies',
    search: language === 'id' ? 'Cari' : 'Search',
  };

  const createIconElement = (key: Action2IconKey, className: string) => {
    const IconComponent = ACTION_2_ICONS[key];
    return React.createElement(IconComponent, {
      className,
      strokeWidth: ICON_STROKE.default,
    });
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-3xl md:border md:transition-all md:ease-out',
        {
          'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur md:top-4 md:max-w-4xl':
            scrolled && !open,
          'bg-background/90': open,
        },
      )}
    >
      <nav
        className={cn(
          'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
          {
            'md:px-2': scrolled,
          },
        )}
      >
        <Link
          href={paths.home.getHref()}
          className="font-mono text-lg font-semibold tracking-tight md:ms-2"
        >
          {siteConfig.name}
        </Link>



        <div className="hidden items-center gap-1 md:flex">
          <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
            >
              <Typography.Text size="sm">
              {link.label}
              </Typography.Text>
            </Link>
          ))}
        </div>
          <div className="mx-2 h-4 w-px bg-border" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="size-8 rounded-full"
            title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            {createIconElement('languages', ICON_SIZES.sm)}
            <span className="sr-only">
              {language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full"
            title={language === 'id' ? 'Ganti Tema' : 'Toggle Theme'}
          >
            {createIconElement('moon', ICON_SIZES.sm)}
            <span className="sr-only">
              {language === 'id' ? 'Ganti Tema' : 'Toggle Theme'}
            </span>
          </Button>

          <div className="mx-2 h-4 w-px bg-border" />

          <Button variant="default" size="sm" className="rounded-full" asChild>
            <Link href={paths.movies.getHref()}>Get Started</Link>
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden size-8 rounded-full"
        >
          <MenuToggleIcon open={open} className="size-4" duration={300} />
        </Button>
      </nav>

      <div
        className={cn(
          'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
            'flex h-full w-full flex-col justify-between gap-y-2 p-4',
          )}
        >
          <div className="grid gap-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'justify-start',
                })}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label === 'Movies'
                  ? navLabels.movies
                  : link.label === 'Search'
                    ? navLabels.search
                    : link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                className="flex-1 rounded-full"
              >
                {createIconElement('languages', ICON_SIZES.sm)}
                <span className="ms-2">
                  {language === 'id' ? 'English' : 'Bahasa Indonesia'}
                </span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="size-9 rounded-full"
              >
                {createIconElement('moon', ICON_SIZES.sm)}
              </Button>
            </div>

            <Button
              className="w-full rounded-full"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={paths.movies.getHref()}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
