import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-page font-sans text-text-primary antialiased selection:bg-accent-200 selection:text-text-primary">
      {/* Keyboard users can jump the nav; hidden until focused */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-md focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-primary-700"
      >
        Skip to content
      </a>

      <Navbar />

      {/* The pt-16 absorbs the height of the fixed Navbar so page content starts cleanly.
        flex-1 ensures the footer is pushed to the bottom of the screen on short pages.
      */}
      <main id="main" className="flex-1 w-full flex flex-col pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
