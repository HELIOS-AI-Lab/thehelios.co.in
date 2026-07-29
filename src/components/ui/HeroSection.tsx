'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { fadeInUp, staggerContainer } from '@/lib/motion';

interface HeroSectionProps {
  badge?: string;
  title: ReactNode;
  subtitle: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  theme?: 'light' | 'inverse';
  alignment?: 'left' | 'center';
  /** Rendered under the actions, e.g. a stat strip or trust row. */
  footer?: ReactNode;
  className?: string;
}

const heroStagger = staggerContainer(0.11, 0.05);

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  theme = 'light',
  alignment = 'center',
  footer,
  className = '',
}: HeroSectionProps) {

  const isInverse = theme === 'inverse';

  const bgClass = isInverse ? 'bg-primary-700' : 'bg-surface-page';
  const titleClass = isInverse ? 'text-white' : 'text-text-primary';
  const subtitleClass = isInverse ? 'text-white/80' : 'text-text-secondary';
  const badgeClass = isInverse
    ? 'bg-white/10 text-white ring-1 ring-inset ring-white/15'
    : 'bg-neutral-100 text-primary-700 ring-1 ring-inset ring-border-default';

  const alignClass =
    alignment === 'center'
      ? 'items-center text-center mx-auto'
      : 'items-start text-left';

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden border-b py-16 md:py-24 lg:py-32',
        isInverse ? 'border-white/10' : 'border-border-default',
        bgClass,
        className
      )}
    >
      {/*
        Ambient background. Purely decorative and pointer-transparent; the
        drifting blobs are CSS animations, so `prefers-reduced-motion` in
        globals.css freezes them without touching this markup.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            'absolute inset-0 bg-grid mask-fade-edges',
            isInverse ? 'bg-grid-dark' : 'bg-grid-light'
          )}
        />
        <div
          className={cn(
            'aurora-blob animate-aurora absolute -top-28 left-[8%] h-[26rem] w-[26rem] gpu',
            isInverse ? 'bg-accent-500/25' : 'bg-accent-500/12'
          )}
        />
        <div
          className={cn(
            'aurora-blob animate-aurora-slow absolute -bottom-40 right-[4%] h-[30rem] w-[30rem] gpu',
            isInverse ? 'bg-link-500/20' : 'bg-link-500/10'
          )}
        />
      </div>

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className={cn(
          'relative max-w-[1024px] px-6 mx-auto flex flex-col gap-6',
          alignClass
        )}
      >
        {/* Overline Badge */}
        {badge && (
          <motion.span
            variants={fadeInUp}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-semibold uppercase tracking-widest',
              badgeClass
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500 animate-ping-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
            </span>
            {badge}
          </motion.span>
        )}

        {/* H1 Title */}
        <motion.h1
          variants={fadeInUp}
          className={cn(
            'text-[34px] md:text-[48px] lg:text-[56px] font-bold leading-[1.15] tracking-[-0.02em]',
            titleClass
          )}
        >
          {title}
        </motion.h1>

        {/* Subtitle / Lede */}
        <motion.p
          variants={fadeInUp}
          className={cn(
            'text-[16px] md:text-[18px] max-w-[720px] leading-relaxed',
            subtitleClass
          )}
        >
          {subtitle}
        </motion.p>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <motion.div
            variants={fadeInUp}
            className={cn(
              'flex flex-wrap gap-3 mt-4',
              alignment === 'center' ? 'justify-center' : 'justify-start'
            )}
          >
            {primaryAction}
            {secondaryAction}
          </motion.div>
        )}

        {footer && (
          <motion.div variants={fadeInUp} className="mt-6 w-full">
            {footer}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
