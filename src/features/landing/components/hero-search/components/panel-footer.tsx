'use client';

import { Kbd, Typography } from '@/components/ui';
import { cn } from '@/utils/cn';

import { getIcon } from '@/constants';

type PanelFooterProps = {
  panelState: string;
  movieCount: number;
};

export function PanelFooter({ panelState, movieCount }: PanelFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-border/40 px-3 py-2">
      <div className="flex items-center gap-2.5">
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          {getIcon('navigate', 'size-3 text-muted-foreground')}
          <Kbd className="gap-0 px-1 py-0.5 text-[10px]">↑↓</Kbd>
          navigasi
        </span>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          {getIcon('select', 'size-3 text-muted-foreground')}
          <Kbd className="gap-0 px-1 py-0.5 text-[10px]">↵</Kbd>
          pilih
        </span>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          {getIcon('close', 'size-3 text-muted-foreground')}
          <Kbd className="gap-0 px-1 py-0.5 text-[10px]">esc</Kbd>
          tutup
        </span>
      </div>

      {panelState === 'results' && (
        <Typography.Text variant="xs/normal" className="text-muted-foreground">
          {movieCount} hasil
        </Typography.Text>
      )}
    </div>
  );
}
