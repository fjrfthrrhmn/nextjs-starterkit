'use client';

import { useTranslations } from 'next-intl';

import type { QuickTag, TagId } from '../types';

type UseSearchTagsResult = {
	tags: readonly QuickTag[];
	getTagById: (id: TagId) => QuickTag;
};

export function useSearchTags(): UseSearchTagsResult {
	const t = useTranslations('search');

	const tags: readonly QuickTag[] = [
		{
			id: 'all',
			label: t('tags.all'),
			tag: null,
			iconKey: 'all'
		},
		{
			id: 'action',
			label: t('tags.action'),
			tag: 'Action',
			iconKey: 'action'
		},
		{
			id: 'comedy',
			label: t('tags.comedy'),
			tag: 'Comedy',
			iconKey: 'komedi'
		},
		{
			id: 'horror',
			label: t('tags.horror'),
			tag: 'Horror',
			iconKey: 'horror'
		},
		{
			id: 'thriller',
			label: t('tags.thriller'),
			tag: 'Thriller',
			iconKey: 'thriller'
		},
		{
			id: 'animation',
			label: t('tags.animation'),
			tag: 'Animation',
			iconKey: 'animasi'
		}
	] as const;

	const getTagById = (id: TagId): QuickTag => {
		const found = tags.find(tag => tag.id === id);
		return found ?? tags[0];
	};

	return { tags, getTagById };
}
