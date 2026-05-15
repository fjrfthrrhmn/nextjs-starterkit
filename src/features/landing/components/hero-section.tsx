'use client';

import { useTranslations } from 'next-intl';

import { Typography } from '@/components/ui';
import { useGenres } from '@/features/movies/api';

import { HeroSearch } from './hero-search';

export function HeroSection() {
	const t = useTranslations('hero');
	const data = useGenres();

	console.log('Genres:', data);

	return (
		<section className="relative flex min-h-[50vh] flex-col items-center px-4 pt-20 sm:pt-28">
			<div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
				<Typography.Title variant="1/bold" className="mb-2 tracking-tight">
					{t('title')}
				</Typography.Title>

				<Typography.Text variant="sm/normal" className="mb-8 block text-muted-foreground">
					{t('subtitle')}
				</Typography.Text>

				<HeroSearch />
			</div>
		</section>
	);
}
