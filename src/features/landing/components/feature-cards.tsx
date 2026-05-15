import React from 'react';
import { useTranslations } from 'next-intl';

import { getIcon, type IconKey } from '@/constants/icons';

import { cn } from '@/utils/cn';

import { Typography } from '@/components/ui';

type FeatureKey = 'database' | 'collection' | 'stats' | 'more';

const FEATURE_KEYS: FeatureKey[] = ['database', 'collection', 'stats', 'more'];

type FeatureCardProps = React.ComponentProps<'div'> & {
	featureKey: FeatureKey;
};

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & {
	width: number;
	height: number;
	x: string;
	y: string;
	squares?: number[][];
}) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					id={patternId}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([sx, sy], index) => (
						<rect
							strokeWidth="0"
							key={index}
							width={width + 1}
							height={height + 1}
							x={sx * width}
							y={sy * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}

function genRandomPattern(length?: number): number[][] {
	const len = length ?? 5;
	return Array.from({ length: len }, () => [
		Math.floor(Math.random() * 4) + 7,
		Math.floor(Math.random() * 6) + 1
	]);
}

const FEATURE_ICONS: Record<FeatureKey, IconKey> = {
	database: 'search',
	collection: 'bookmark',
	stats: 'chart',
	more: 'star'
};

function FeatureCard({ featureKey, className, ...props }: FeatureCardProps) {
	const t = useTranslations('features');
	const p = genRandomPattern();
	const iconKey = FEATURE_ICONS[featureKey];

	return (
		<div className={cn('relative overflow-hidden p-6 sm:p-8 rounded-2xl', className)} {...props}>
			<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>
			{getIcon(iconKey, 'text-primary/75 size-6', 1.5)}
			<Typography.Title variant="5/semibold" className="mt-10">
				{t(`${featureKey}.title`)}
			</Typography.Title>
			<Typography.Text variant="xs/normal" className="text-muted-foreground relative z-20 mt-2">
				{t(`${featureKey}.description`)}
			</Typography.Text>
		</div>
	);
}

export function FeatureCards() {
	return (
		<div className="grid gap-1 sm:grid-cols-2 [&>div]:border [&>div]:border-border">
			{FEATURE_KEYS.map(key => (
				<FeatureCard key={key} featureKey={key} />
			))}
		</div>
	);
}
