'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_STANDARD } from '@/lib/motion';

const navLinks = [
  { name: 'About us', href: '/about' },
  { name: 'Learn more', href: '/product' },
  { name: 'Students', href: '/students' },
  { name: 'Developers', href: '/developers' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  // Detect scroll for dynamic header styling.
  // Reads are batched into a rAF and the listener is passive, so scrolling
  // never blocks the compositor and setState fires at most once per frame.
  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // A route change can also come from the browser's back button, so close the
  // menu on navigation rather than only in the link's onClick.
  useEffect(() => {
    const close = () => setIsMobileMenuOpen(false);
    router.events.on('routeChangeComplete', close);
    return () => router.events.off('routeChangeComplete', close);
  }, [router.events]);

  // Stop the page behind the open mobile menu from scrolling
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  // Escape closes the menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-standard border-b ${
        scrolled
          ? 'h-14 bg-primary-700/85 backdrop-blur-xl border-white/10 shadow-8'
          : 'h-16 bg-primary-700 border-transparent'
      } text-white`}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">

        {/* Brand with Next.js Image */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-[15px] tracking-tight group"
        >
          <motion.div
            whileHover={{ rotate: -6, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="relative w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-accent-500/60 transition-colors"
          >
            <Image
              src="/assets/helios-ai-logo-256.png"
              alt="HELIOS AI Labs"
              width={256}
              height={256}
              sizes="32px"
              className="object-contain h-full w-full"
              priority
            />
          </motion.div>
          <span className="hidden sm:block transition-colors group-hover:text-accent-300">
            HELIOS AI Labs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group/link text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-colors duration-200 ease-standard relative ${
                  isActive
                    ? 'text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive ? (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-500 rounded-t-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                ) : (
                  // Inactive links get a hover rule that wipes in from the left
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] origin-left scale-x-0 rounded-t-full bg-white/40 transition-transform duration-300 ease-standard group-hover/link:scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-1.5 h-8 px-4 text-[13px] font-semibold bg-accent-500 text-primary-700 rounded transition-all duration-150 ease-standard overflow-hidden hover:bg-accent-400 hover:shadow-accent active:scale-[0.97]"
          >
            {/* Light sweeps across the button on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-standard group-hover:translate-x-full"
            />
            <span className="relative">Get in touch</span>
            <ArrowRight
              className="relative w-3.5 h-3.5 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden -mr-1 flex h-10 w-10 items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <motion.span
            key={isMobileMenuOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.18, ease: EASE_STANDARD }}
            className="block"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.span>
        </button>
      </div>

      {/* Mobile Navigation Dropdown (Animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: EASE_STANDARD }}
            className="md:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain bg-primary-800/95 backdrop-blur-xl border-b border-white/10 shadow-8"
          >
            <motion.nav
              aria-label="Mobile"
              className="flex flex-col p-4 gap-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
              }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-[14px] font-medium px-4 py-3 rounded transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white border-l-2 border-accent-500'
                          : 'text-white/80 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 h-10 w-full text-[14px] font-semibold bg-accent-500 text-primary-700 rounded hover:bg-accent-400 active:bg-accent-600 transition-colors"
                >
                  Get in touch
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
