import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-page font-sans text-text-primary antialiased selection:bg-accent-200 selection:text-text-primary">
      <Navbar />
      
      {/* The pt-16 absorbs the height of the fixed Navbar so page content starts cleanly.
        flex-1 ensures the footer is pushed to the bottom of the screen on short pages.
      */}
      <main className="flex-1 w-full flex flex-col pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}