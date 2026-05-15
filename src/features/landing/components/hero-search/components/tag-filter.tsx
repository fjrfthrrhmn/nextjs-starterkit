'use client';

import React from 'react';

import { getIcon, type IconKey } from '@/constants';

import { cn } from '@/utils/cn';

import type { QuickTag } from '../types';

type TagFilterProps = {
	tags: readonly QuickTag[];
	selectedTag: QuickTag;
	onTagChange: (tag: QuickTag) => void;
};

export function TagFilter({ tags, selectedTag, onTagChange }: TagFilterProps) {
	return (
		<div className="flex items-center gap-1.5 px-1 py-1.5">
			{tags.map(tag => {
				const isActive = tag.id === selectedTag.id;
				return (
					<button
						key={tag.id}
						type="button"
						onClick={() => onTagChange(tag)}
						className={cn(
							'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
							'transition-all duration-150',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
							isActive
								? 'bg-primary text-primary-foreground shadow-sm'
								: 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
						)}
						aria-pressed={isActive}
						aria-label={tag.label}
					>
						{getIcon(tag.iconKey as IconKey, 'size-3')}
						{tag.label}
					</button>
				);
			})}
		</div>
	);
}
