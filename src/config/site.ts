export const siteConfig = {
	name: 'FilmGueh.',
	description:
		'Track every movie you watch — and the ones you plan to. Search, save, and organize your personal movie collection.',
	tagline: 'Track every movie you watch — and the ones you plan to.',
	subtitle: 'Search movies, build your personal collection, and keep your watchlist organized.',
	url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
	author: 'FilmGueh',
	defaultLocale: 'id'
};

export type NavLink = {
	label: string;
	href: string;
};

export const navLinks: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Movies', href: '/movies' },
	{ label: 'Search', href: '/search' },
	{ label: 'About', href: '/about' }
];

export type FeatureKey = 'database' | 'collection' | 'stats' | 'more';

export type SocialLink = {
	label: string;
	href: string;
	icon: string;
};

export const socialLinks: SocialLink[] = [
	{ label: 'GitHub', href: 'https://github.com', icon: 'github' },
	{ label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' }
];

export type FooterLink = {
	label: string;
	href: string;
};

export const footerLinks: FooterLink[] = [
	{ label: 'Privacy Policy', href: '/privacy' },
	{ label: 'Terms & Conditions', href: '/terms' }
];
