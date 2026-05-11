'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = {
  children: React.ReactNode;
  themes?: string[];
  defaultTheme?: string;
};

export function ThemeProvider({
  children,
  themes = ['dark'],
  defaultTheme = 'dark',
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme={defaultTheme}
      themes={themes}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
