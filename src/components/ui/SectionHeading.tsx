'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { fadeInUp, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion';

interface SectionHeadingProps {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Rendered opposite the heading on wide screens, e.g. a link or button. */
  action?: ReactNode;
  align?: 'left' | 'center';
  inverse?: boolean;
  /** Heading level. Defaults to h2 — use h3 only inside an existing h2 section. */
  as?: 'h2' | 'h3';
  className?: string;
}

const container = staggerContainer(0.08);

/**
 * The one section header used across the site, so eyebrow/title/description
 * spacing, type scale and reveal timing stay identical on every page.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  inverse = false,
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  const MotionHeading = Tag === 'h2' ? motion.h2 : motion.h3;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center',
        className
      )}
    >
      <div
        className={cn(
          'max-w-2xl',
          align === 'center' && 'mx-auto text-center'
        )}
      >
        {eyebrow && (
          <motion.p
            variants={fadeInUp}
            className={cn(
              'mb-4 flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em]',
              align === 'center' && 'justify-center',
              inverse ? 'text-accent-400' : 'text-accent-600'
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'h-px w-6',
                inverse ? 'bg-accent-400/60' : 'bg-accent-500/60'
              )}
            />
            {eyebrow}
          </motion.p>
        )}

        <MotionHeading
          variants={fadeInUp}
          className={cn(
            'text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.15]',
            inverse ? 'text-white' : 'text-primary-700'
          )}
        >
          {title}
        </MotionHeading>

        {description && (
          <motion.p
            variants={fadeInUp}
            className={cn(
              'mt-4 text-[16px] leading-relaxed',
              inverse ? 'text-white/70' : 'text-text-secondary'
            )}
          >
            {description}
          </motion.p>
        )}
      </div>

      {action && (
        <motion.div variants={fadeInUp} className="shrink-0">
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
