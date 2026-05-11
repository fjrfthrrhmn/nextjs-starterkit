'use client';

import Image from 'next/image';

import { Typography } from '@/components/ui';
import { cn } from '@/utils/cn';

import { getIcon } from '@/constants';
import type { Movie } from '@/data';

type MovieItemProps = {
  movie: Movie;
  index: number;
  selectedIndex: number;
  onSelect: (movie: Movie) => void;
  onHover: (index: number) => void;
};

export function MovieItem({
  movie,
  index,
  selectedIndex,
  onSelect,
  onHover,
}: MovieItemProps) {
  const isSelected = selectedIndex === index;

  return (
    <button
      data-hero-item={index}
      role="option"
      aria-selected={isSelected}
      type="button"
      onMouseEnter={() => onHover(index)}
      onClick={() => onSelect(movie)}
      className={cn(
        'group flex w-full items-center gap-3 px-3 py-2 text-left transition-all duration-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset rounded-2xl',
        isSelected
          ? 'bg-accent/70 ring-1 ring-ring/40'
          : 'hover:bg-accent/40',
      )}
    >
      <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={movie.poster}
          alt=""
          fill
          sizes="36px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Typography.Text
          variant="sm/normal"
          className={cn(
            'line-clamp-1 font-medium',
            isSelected ? 'text-foreground' : 'text-foreground/90',
          )}
        >
          {movie.title}
        </Typography.Text>
        <Typography.Text
          variant="xs/normal"
          className="line-clamp-1 text-muted-foreground"
        >
          {movie.year} &middot; {movie.genre.join(', ')}
        </Typography.Text>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {getIcon('star', 'size-3')}
        <span className="text-xs font-medium tabular-nums text-foreground/70">
          {movie.rating}
        </span>
      </div>
    </button>
  );
}
