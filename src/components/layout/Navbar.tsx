'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About us', href: '/about' },
    { name: 'Learn more', href: '/product' },
    { name: 'Students', href: '/students' },
    { name: 'Developers', href: '/developers' },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-standard border-b ${
        scrolled 
          ? 'h-14 bg-primary-700/90 backdrop-blur-md border-white/10 shadow-8' 
          : 'h-16 bg-primary-700 border-transparent'
      } text-white`}
    >
      <div className="flex h-full items-center justify-between px-6 max-w-[1440px] mx-auto">
        
        {/* Brand with Next.js Image */}
        <Link href="/" className="flex items-center gap-3 font-bold text-[15px] tracking-tight group">
          <div className="relative w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-accent-500/50 transition-colors">
            <Image 
              src="/assets/helios-ai-logo.png" 
              alt="HELIOS AI Labs Logo" 
              width={32} 
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="hidden sm:block">HELIOS AI Labs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-200 ease-standard relative ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-500 rounded-t-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/contact"
            className="group inline-flex items-center justify-center gap-1.5 h-8 px-4 text-[13px] font-semibold bg-accent-500 text-primary-700 rounded hover:bg-accent-400 active:bg-accent-600 transition-all duration-150 ease-standard overflow-hidden"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown (Animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-primary-800 border-b border-white/10 shadow-8"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[14px] font-medium px-4 py-3 rounded transition-colors ${
                      isActive 
                        ? 'bg-white/10 text-white border-l-2 border-accent-500' 
                        : 'text-white/80 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link 
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 h-10 w-full text-[14px] font-semibold bg-accent-500 text-primary-700 rounded hover:bg-accent-400 active:bg-accent-600 transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}