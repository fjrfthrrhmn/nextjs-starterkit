import {
	Bookmark,
	BookmarkCheck,
	Camera,
	Eye,
	EyeOff,
	Heart,
	Image,
	Pause,
	Play,
	SkipBack,
	SkipForward,
	Sparkles,
	Star,
	Volume2,
	VolumeX,
	type LucideIcon
} from 'lucide-react';

export type MediaIconKey =
	| 'star'
	| 'sparkles'
	| 'heart'
	| 'bookmark'
	| 'bookmark-check'
	| 'eye'
	| 'eye-off'
	| 'camera'
	| 'image'
	| 'play'
	| 'pause'
	| 'skip-back'
	| 'skip-forward'
	| 'volume'
	| 'volume-off';

export const MEDIA_ICONS: Record<MediaIconKey, LucideIcon> = {
	star: Star,
	sparkles: Sparkles,
	heart: Heart,
	bookmark: Bookmark,
	'bookmark-check': BookmarkCheck,
	eye: Eye,
	'eye-off': EyeOff,
	camera: Camera,
	image: Image,
	play: Play,
	pause: Pause,
	'skip-back': SkipBack,
	'skip-forward': SkipForward,
	volume: Volume2,
	'volume-off': VolumeX
} as const;

export const MEDIA_ICON_KEYS = Object.keys(MEDIA_ICONS) as MediaIconKey[];
