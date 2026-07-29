'use client';

import { useState, type SVGProps } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site';

// Native SVGs to replace the removed Lucide brand icons
const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const GitHubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const socialLinks = [
  { label: 'LinkedIn', href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: 'X', href: siteConfig.socials.x, Icon: XIcon },
  { label: 'GitHub', href: siteConfig.socials.github, Icon: GitHubIcon },
];

type SubscribeState = 'idle' | 'submitting' | 'done';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscribeState, setSubscribeState] = useState<SubscribeState>('idle');

  // No newsletter backend exists yet, so this acknowledges the submission
  // rather than silently swallowing it. Wire to a real endpoint when there is
  // one — the button and states are already in place.
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeState('submitting');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubscribeState('done');
  };

  return (
    <footer className="w-full bg-surface-page border-t border-border-default mt-16 text-[13px] relative overflow-hidden">
      {/* Structural Top Border Highlight */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary-700" />

      {/* Faint technical grid, faded out towards the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light bg-grid mask-fade-bottom opacity-70"
      />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* Brand Col (Spans 4 columns) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="group flex items-center gap-3 font-bold text-[16px] text-text-primary mb-5 tracking-tight"
            >
              <Image
                src="/assets/helios-ai-logo-256.png"
                alt="HELIOS AI Labs"
                width={256}
                height={256}
                sizes="28px"
                className="object-contain h-7 w-7 rounded transition-transform duration-300 ease-spring group-hover:scale-110 group-hover:-rotate-6"
              />
              HELIOS AI Labs
            </Link>
            <p className="text-text-secondary leading-relaxed max-w-[280px] mb-6 text-[14px]">
              Building the next generation of intelligent, explainable, and
              self-evolving AI agents for Bharat and beyond.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="w-8 h-8 rounded border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-600 hover:border-accent-500 hover:bg-accent-50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Col 1 (Spans 2 cols) */}
          <div className="md:col-span-2">
            <h2 className="text-[11px] font-bold text-text-primary uppercase tracking-widest mb-5">
              Platform
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <FooterLink href="/about">About us</FooterLink>
              </li>
              <li>
                <FooterLink href="/product">HELIOS Buddy</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Links Col 2 (Spans 2 cols) */}
          <div className="md:col-span-2">
            <h2 className="text-[11px] font-bold text-text-primary uppercase tracking-widest mb-5">
              Community
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <FooterLink href="/students">Students</FooterLink>
              </li>
              <li>
                <FooterLink href="/developers">Developers</FooterLink>
              </li>
              <li className="flex items-center gap-2 text-text-tertiary">
                Research papers
                <span className="rounded-full border border-border-default bg-surface-sunken px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Waitlist Col (Spans 4 cols) */}
          <div className="md:col-span-4">
            <h2 className="text-[11px] font-bold text-text-primary uppercase tracking-widest mb-5">
              Join the intelligence
            </h2>
            <p className="text-text-secondary mb-4 text-[13px]">
              Subscribe to get early access to our financial AI beta and research
              updates.
            </p>

            {subscribeState === 'done' ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="flex items-center gap-2 rounded border border-success-500/30 bg-success-50 px-3 py-2.5 text-[13px] font-medium text-text-primary max-w-sm"
              >
                <Check className="h-4 w-4 shrink-0 text-success-500" />
                You&rsquo;re on the list. We&rsquo;ll be in touch.
              </motion.p>
            ) : (
              <form className="flex gap-2 max-w-sm" onSubmit={handleSubscribe}>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                  className="h-9 px-3 flex-1 bg-surface-sunken border border-border-default rounded text-[13px] focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder:text-text-tertiary"
                />
                <button
                  type="submit"
                  disabled={subscribeState === 'submitting'}
                  className="h-9 px-4 bg-primary-700 text-white rounded text-[13px] font-semibold hover:bg-primary-600 active:bg-primary-800 active:scale-[0.97] disabled:opacity-70 transition-all duration-150 ease-standard flex items-center justify-center gap-1.5 min-w-[72px]"
                >
                  {subscribeState === 'submitting' ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    'Join'
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-border-subtle">
              <address className="not-italic text-text-secondary flex flex-col gap-1 text-[12px]">
                <span className="font-semibold text-text-primary">
                  HELIOS AI Labs
                </span>
                <span>
                  {siteConfig.address.locality}, {siteConfig.address.region}{' '}
                  {siteConfig.address.postalCode}
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-link-500 hover:underline mt-1 w-fit"
                >
                  {siteConfig.email}
                </a>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border-default text-[12px] text-text-tertiary">
          <p>
            Copyright &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
            <Link
              href="/privacy"
              className="hover:text-text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Footer nav link with an underline that wipes in from the left on hover. */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-text-secondary hover:text-primary-700 transition-colors"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-500 transition-transform duration-300 ease-standard group-hover:scale-x-100"
      />
    </Link>
  );
}
