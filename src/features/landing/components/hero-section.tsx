'use client';

import { Typography } from '@/components/ui/typography';

import { HeroSearch } from './hero-search';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center px-4 pt-20 sm:pt-28">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <Typography.Title
          variant="1/extrabold"
          className="mb-2 tracking-tight font-mono"
        >
          Cari & Simpan Film Favoritmu
        </Typography.Title>

        <Typography.Text
          variant="sm/normal"
          className="mb-8 block text-muted-foreground"
        >
          Temukan ribuan film, simpan ke koleksi pribadi, dan lacak tontonanmu.
        </Typography.Text>

        <HeroSearch />
      </div>
    </section>
  );
}
