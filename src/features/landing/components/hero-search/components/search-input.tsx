'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { AnimatePresence, motion } from 'motion/react';

import { getIcon, NAV_ICONS } from '@/constants';

import { cn } from '@/utils/cn';

import { Kbd } from '@/components/ui';

type SearchInputProps = {
	inputRef: React.RefObject<HTMLInputElement>;
	value: string;
	onChange: (v: string) => void;
	onFocus: () => void;
	onClear: () => void;
	hasValue: boolean;
};

export function SearchInput({
	inputRef,
	value,
	onChange,
	onFocus,
	onClear,
	hasValue
}: SearchInputProps) {
	const tSearch = useTranslations('search');
	const tNav = useTranslations('nav');

	return (
		<div className="relative flex items-center gap-2 px-3 py-2.5">
			{getIcon('search', 'size-4 shrink-0 text-muted-foreground')}

			<input
				ref={inputRef}
				type="text"
				value={value}
				onChange={e => onChange(e.target.value)}
				onFocus={onFocus}
				placeholder={tSearch('initial').split('.')[0] + '.'}
				className={cn(
					'flex-1 bg-transparent text-sm text-foreground outline-none',
					'placeholder:text-muted-foreground/60',
					'caret-primary'
				)}
				aria-label={tNav('search')}
				role="combobox"
				aria-autocomplete="list"
			/>

			<AnimatePresence>
				{hasValue && (
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.1 }}
						type="button"
						onClick={onClear}
						className={cn(
							'flex size-5 items-center justify-center rounded-md',
							'text-muted-foreground hover:bg-muted hover:text-foreground',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
							'transition-colors duration-100'
						)}
						aria-label={tSearch('clear')}
					>
						{getIcon('close', 'size-3')}
					</motion.button>
				)}
			</AnimatePresence>

			<Kbd className="gap-0.5 text-[10px]">
				{React.createElement(NAV_ICONS.command, { className: 'size-2.5' })}K
			</Kbd>
		</div>
	);
}
