import {
	BarChart3,
	Clapperboard,
	Command,
	FileText,
	Film,
	Folder,
	FolderOpen,
	Home,
	Settings,
	User,
	Users,
	type LucideIcon
} from 'lucide-react';

export type NavIconKey =
	| 'all'
	| 'film'
	| 'command'
	| 'folder'
	| 'folder-open'
	| 'file'
	| 'home'
	| 'settings'
	| 'user'
	| 'users'
	| 'chart';

export const NAV_ICONS: Record<NavIconKey, LucideIcon> = {
	all: Clapperboard,
	film: Film,
	command: Command,
	folder: Folder,
	'folder-open': FolderOpen,
	file: FileText,
	home: Home,
	settings: Settings,
	user: User,
	users: Users,
	chart: BarChart3
} as const;

export const NAV_ICON_KEYS = Object.keys(NAV_ICONS) as NavIconKey[];
