import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import { siteConfig } from '@/config/site';

import { AppLayout } from '@/components/layouts/app-layout';

// @ts-ignore
import '@/styles/globals.css';

import { Providers } from '@/components/provider';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	authors: [{ name: siteConfig.author }],
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		images: [
			{
				url: `${siteConfig.url}/og-image.png`,
				width: 1200,
				height: 630,
				alt: `${siteConfig.name} Open Graph Image`
			}
		],
		locale: routing.defaultLocale,
		type: 'website'
	}
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1
};

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale: locale }));
}

export default async function LocaleLayout({
	children,
	params
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>
					<Providers locale={locale}>
						<AppLayout>{children}</AppLayout>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
