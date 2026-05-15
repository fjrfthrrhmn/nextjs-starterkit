'use client';

import { motion } from 'motion/react';

import { getIcon } from '@/constants';

import { cn } from '@/utils/cn';

import { Typography } from '@/components/ui';

type EmptyStateProps = {
	title: string;
	subtitle: string;
};

export function EmptyState({ title, subtitle }: EmptyStateProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -4 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.12 }}
			className="flex flex-col items-center justify-center py-10 px-4"
		>
			<div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted/60">
				{getIcon('empty', 'text-muted-foreground/60 size-5')}
			</div>
			<Typography.Text variant="sm/normal" className="text-center font-medium text-foreground">
				{title}
			</Typography.Text>
			<Typography.Text variant="xs/normal" className="mt-1 text-center text-muted-foreground">
				{subtitle}
			</Typography.Text>
		</motion.div>
	);
}
