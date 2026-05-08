import { ReactNode } from 'react';

import { AppProvider } from '@/app/provider';

// @ts-ignore
import '@/styles/globals.css';

export const metadata = {
  title: 'My App',
  description: 'A Next.js application',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
