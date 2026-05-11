'use client';

import { NextIntlClientProvider, useMessages } from 'next-intl';

type LanguageProviderProps = {
  children: React.ReactNode;
  locale?: string;
};

export function LanguageProvider({
  children,
  locale,
}: LanguageProviderProps) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
