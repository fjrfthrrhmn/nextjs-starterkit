import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { AppProvider } from '@/app/provider';
import { AppLayout } from '@/components/layouts/app-layout';
import { siteConfig } from '@/config/site';
import { LanguageProvider } from '@/contexts/language-context';

// @ts-ignore
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="id" className="dark">
      <body>
        <AppProvider>
          <LanguageProvider>
            <AppLayout>{children}</AppLayout>
          </LanguageProvider>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
