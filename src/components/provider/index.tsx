'use client';

import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { LanguageProvider } from './language-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

type ProvidersProps = {
  children: React.ReactNode;
  locale?: string;
};

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <ThemeProvider>
        <QueryProvider>
          <LanguageProvider locale={locale}>
            {children}
          </LanguageProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
