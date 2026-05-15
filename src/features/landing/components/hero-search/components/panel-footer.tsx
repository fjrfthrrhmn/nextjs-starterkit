'use client';

import { useTranslations } from 'next-intl';

import { getIcon } from '@/constants';

import { Kbd, Typography } from '@/components/ui';

type PanelFooterProps = {
	panelState: string;
	movieCount: number;
};

export function PanelFooter({ panelState, movieCount }: PanelFooterProps) {
	const t = useTranslations('search');

	return (
		<div className="flex items-center justify-between border-t border-border/40 px-3 py-2">
			<div className="flex items-center gap-3">
				<span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
					<Kbd>
						{getIcon('arrow-up', 'size-3')}
						{getIcon('arrow-down', 'size-3')}
					</Kbd>
					{t('navigate')}
				</span>
				<span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
					<Kbd>{getIcon('enter', 'size-3')}</Kbd>
					{t('select')}
				</span>
				<span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
					<Kbd>{getIcon('close', 'size-3')}</Kbd>
					{t('close')}
				</span>
			</div>

			{panelState === 'results' && (
				<Typography.Text variant="xs/normal" className="text-muted-foreground text-[11px]">
					{movieCount} {t('movies_found')}
				</Typography.Text>
			)}
		</div>
	);
}
