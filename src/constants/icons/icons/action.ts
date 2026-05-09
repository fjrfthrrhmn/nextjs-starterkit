import {
  Zap,
  Crosshair,
  Ghost,
  Laugh,
  Theater,
  type LucideIcon,
} from 'lucide-react';

export type ActionIconKey = 'action' | 'thriller' | 'horror' | 'komedi' | 'animasi';

export const ACTION_ICONS: Record<ActionIconKey, LucideIcon> = {
  action: Zap,
  thriller: Crosshair,
  horror: Ghost,
  komedi: Laugh,
  animasi: Theater,
} as const;

export const ACTION_ICON_KEYS = Object.keys(ACTION_ICONS) as ActionIconKey[];