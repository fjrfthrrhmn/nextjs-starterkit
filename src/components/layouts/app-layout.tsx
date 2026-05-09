import { BackgroundSnippet } from '../widgets/background-snippets';
import { Footer } from './footer';
import { Header } from './header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <main className="relative container mx-auto max-w-250 px-2 pb-20 space-y-20">
        {children}
      </main>
      <Footer />
      <BackgroundSnippet/>
    </section>
  );
}
