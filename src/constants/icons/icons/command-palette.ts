import {
	Bell,
	Bookmark,
	Camera,
	Clock,
	Command,
	Copy,
	FileText,
	GitBranch,
	Globe,
	HelpCircle,
	Home,
	Info,
	Lock,
	Mail,
	Maximize,
	Moon,
	Palette,
	Play,
	Printer,
	RefreshCw,
	Search,
	Settings,
	Share2,
	Smartphone,
	Terminal,
	Trash2,
	Twitter,
	User,
	Volume2,
	Zap,
	type LucideIcon
} from 'lucide-react';

export type CommandIconKey =
	| 'home'
	| 'info'
	| 'settings'
	| 'user'
	| 'mail'
	| 'moon'
	| 'bell'
	| 'maximize'
	| 'copy'
	| 'share'
	| 'printer'
	| 'camera'
	| 'refresh'
	| 'trash'
	| 'clock'
	| 'bookmark'
	| 'zap'
	| 'help'
	| 'file'
	| 'twitter'
	| 'git-branch'
	| 'play'
	| 'volume'
	| 'terminal'
	| 'smartphone'
	| 'palette'
	| 'lock'
	| 'globe'
	| 'search'
	| 'command';

export const COMMAND_ICONS: Record<CommandIconKey, LucideIcon> = {
	home: Home,
	info: Info,
	settings: Settings,
	user: User,
	mail: Mail,
	moon: Moon,
	bell: Bell,
	maximize: Maximize,
	copy: Copy,
	share: Share2,
	printer: Printer,
	camera: Camera,
	refresh: RefreshCw,
	trash: Trash2,
	clock: Clock,
	bookmark: Bookmark,
	zap: Zap,
	help: HelpCircle,
	file: FileText,
	twitter: Twitter,
	'git-branch': GitBranch,
	play: Play,
	volume: Volume2,
	terminal: Terminal,
	smartphone: Smartphone,
	palette: Palette,
	lock: Lock,
	globe: Globe,
	search: Search,
	command: Command
} as const;

export const COMMAND_ICON_KEYS = Object.keys(COMMAND_ICONS) as CommandIconKey[];
