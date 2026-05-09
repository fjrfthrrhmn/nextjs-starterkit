import * as React from 'react';

import {
  SEARCH_ICONS,
  type SearchIconKey,
} from './icons/search';

import {
  UI_ICONS,
  type UiIconKey,
} from './icons/ui';

import {
  MEDIA_ICONS,
  type MediaIconKey,
} from './icons/media';

import {
  ACTION_ICONS,
  type ActionIconKey,
} from './icons/action';

import {
  NAV_ICONS,
  type NavIconKey,
} from './icons/navigation';

import {
  ACTION_2_ICONS,
  type Action2IconKey,
} from './icons/system';

export const ICON_SIZES = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8',
} as const;

export type IconSizeKey = keyof typeof ICON_SIZES;

export const ICON_STROKE = {
  thin: 1,
  default: 1.5,
  bold: 2,
} as const;

export type IconStrokeKey = keyof typeof ICON_STROKE;

export type IconKey =
  | SearchIconKey
  | UiIconKey
  | MediaIconKey
  | ActionIconKey
  | NavIconKey
  | Action2IconKey;

type IconRecord = Record<string, React.ComponentType<{ className?: string; strokeWidth?: number | string }>>;

const ALL_ICONS: IconRecord = {
  ...SEARCH_ICONS,
  ...UI_ICONS,
  ...MEDIA_ICONS,
  ...ACTION_ICONS,
  ...NAV_ICONS,
  ...ACTION_2_ICONS,
};

export function getIcon(
  key: IconKey,
  classNameOrSize?: string,
  strokeWidth?: number,
): React.ReactElement {
  const Icon = ALL_ICONS[key];
  if (!Icon) {
    console.warn(`Icon "${key}" not found in ICON_MAP`);
    return <React.Fragment />;
  }
  return (
    <Icon
      className={classNameOrSize ?? ICON_SIZES.md}
      strokeWidth={strokeWidth ?? ICON_STROKE.default}
    />
  );
}

export function getIconBySize(
  key: IconKey,
  size: IconSizeKey = 'md',
  strokeWidth: IconStrokeKey = 'default',
): React.ReactElement {
  const Icon = ALL_ICONS[key];
  if (!Icon) {
    console.warn(`Icon "${key}" not found in ICON_MAP`);
    return <React.Fragment />;
  }
  return (
    <Icon className={ICON_SIZES[size]} strokeWidth={ICON_STROKE[strokeWidth]} />
  );
}

export function getIconComponent(
  key: IconKey,
  strokeWidth: IconStrokeKey = 'default',
) {
  const Icon = ALL_ICONS[key];
  if (!Icon) {
    console.warn(`Icon "${key}" not found in ICON_MAP`);
    return null;
  }
  return (props?: React.ComponentPropsWithoutRef<'svg'>) => (
    <Icon {...props} strokeWidth={props?.strokeWidth ?? ICON_STROKE[strokeWidth]} />
  );
}

export { SEARCH_ICONS } from './icons/search';
export type { SearchIconKey } from './icons/search';

export { UI_ICONS } from './icons/ui';
export type { UiIconKey } from './icons/ui';

export { MEDIA_ICONS } from './icons/media';
export type { MediaIconKey } from './icons/media';

export { ACTION_ICONS } from './icons/action';
export type { ActionIconKey } from './icons/action';

export { NAV_ICONS } from './icons/navigation';
export type { NavIconKey } from './icons/navigation';

export { ACTION_2_ICONS } from './icons/system';
export type { Action2IconKey } from './icons/system';