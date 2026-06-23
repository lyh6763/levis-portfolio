import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { SkipLink } from './SkipLink';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
