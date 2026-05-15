import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	GripVertical,
	Minus,
	MoreHorizontal,
	MoreVertical,
	Plus,
	X,
	type LucideIcon
} from 'lucide-react';

export type UiIconKey =
	| 'close'
	| 'plus'
	| 'minus'
	| 'chevron-left'
	| 'chevron-right'
	| 'chevron-down'
	| 'chevron-up'
	| 'more-horizontal'
	| 'more-vertical'
	| 'grip';

export const UI_ICONS: Record<UiIconKey, LucideIcon> = {
	close: X,
	plus: Plus,
	minus: Minus,
	'chevron-left': ChevronLeft,
	'chevron-right': ChevronRight,
	'chevron-down': ChevronDown,
	'chevron-up': ChevronUp,
	'more-horizontal': MoreHorizontal,
	'more-vertical': MoreVertical,
	grip: GripVertical
} as const;

export const UI_ICON_KEYS = Object.keys(UI_ICONS) as UiIconKey[];
