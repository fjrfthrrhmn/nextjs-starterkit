import {
	ArrowDown,
	ArrowUp,
	Coffee,
	Contrast,
	Copy,
	CornerDownRight,
	Download,
	Edit,
	ExternalLink,
	Github,
	Globe,
	Languages,
	Link,
	Moon,
	Share2,
	Sun,
	Trash2,
	Twitter,
	Upload,
	X,
	type LucideIcon
} from 'lucide-react';

export type Action2IconKey =
	| 'copy'
	| 'trash'
	| 'edit'
	| 'share'
	| 'download'
	| 'upload'
	| 'external-link'
	| 'link'
	| 'select'
	| 'navigate'
	| 'globe'
	| 'moon'
	| 'sun'
	| 'languages'
	| 'contrast'
	| 'github'
	| 'twitter'
	| 'coffee'
	| 'arrow-up'
	| 'arrow-down'
	| 'enter'
	| 'escape';

export const ACTION_2_ICONS: Record<Action2IconKey, LucideIcon> = {
	copy: Copy,
	trash: Trash2,
	edit: Edit,
	share: Share2,
	download: Download,
	upload: Upload,
	'external-link': ExternalLink,
	link: Link,
	select: Copy,
	navigate: Copy,
	globe: Globe,
	moon: Moon,
	sun: Sun,
	languages: Languages,
	contrast: Contrast,
	github: Github,
	twitter: Twitter,
	coffee: Coffee,
	'arrow-up': ArrowUp,
	'arrow-down': ArrowDown,
	enter: CornerDownRight,
	escape: X
} as const;

export const ACTION_2_ICON_KEYS = Object.keys(ACTION_2_ICONS) as Action2IconKey[];
