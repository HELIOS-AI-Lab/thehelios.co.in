'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { riseIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion';

interface FeatureGridProps {
  columns?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  /**
   * Cascade the children in as the grid enters the viewport. Set false when the
   * caller already provides its own stagger container.
   */
  stagger?: boolean;
}

const colClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

const gridStagger = staggerContainer(0.1);

export function FeatureGrid({
  columns = 3,
  children,
  className = '',
  stagger = true,
}: FeatureGridProps) {
  const classes = cn(
    'grid grid-cols-1 gap-4 sm:gap-6 w-full',
    colClasses[columns],
    className
  );

  if (!stagger) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      className={classes}
      variants={gridStagger}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </motion.div>
  );
}

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  /** Zero-padded index shown in the corner, e.g. 1 renders as "01". */
  index?: number;
  className?: string;
}

/**
 * Feature tile. Lifts on hover, warms its icon plate, and runs a hairline
 * gradient across the top edge — enough motion to feel responsive without
 * competing with the copy.
 */
export function FeatureItem({
  icon,
  title,
  description,
  index,
  className,
}: FeatureItemProps) {
  return (
    <motion.div
      variants={riseIn}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={cn(
        'group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-border-default bg-surface-card p-5 sm:p-6',
        'transition-shadow duration-300 ease-standard hover:border-accent-500/40 hover:shadow-lift',
        className
      )}
    >
      {/* Hairline that wipes across the top edge on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-500 via-accent-400 to-transparent transition-transform duration-500 ease-standard group-hover:scale-x-100"
      />

      {index !== undefined && (
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 font-mono text-[11px] font-bold tracking-widest text-text-tertiary/60 transition-colors duration-300 group-hover:text-accent-500 sm:right-5 sm:top-5"
        >
          {String(index).padStart(2, '0')}
        </span>
      )}

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-primary-700 transition-all duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white">
        {icon}
      </div>

      <div>
        <h3 className="mb-1.5 text-[16px] font-semibold leading-tight tracking-tight text-text-primary">
          {title}
        </h3>
        <p className="text-[14px] leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
