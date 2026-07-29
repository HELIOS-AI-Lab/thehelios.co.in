'use client';

import { ElementType, Fragment, ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  fadeInUp,
  VIEWPORT_ONCE,
  withDelay,
  wordChild,
  wordContainer,
} from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  /** Any variant from @/lib/motion. Defaults to a fade-and-rise. */
  variants?: Variants;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  className?: string;
  /** Render as something other than a div, e.g. "section" or "li". */
  as?: ElementType;
  /** Play immediately instead of waiting for the element to scroll into view. */
  immediate?: boolean;
}

/**
 * Scroll-triggered entrance for a single block. Wraps the shared variants so
 * pages stop redeclaring near-identical (and previously broken) motion objects.
 */
export function Reveal({
  children,
  variants = fadeInUp,
  delay = 0,
  className,
  as = 'div',
  immediate = false,
}: RevealProps) {
  const MotionTag = motion[as as 'div'];
  const resolved = delay ? withDelay(variants, delay) : variants;

  return (
    <MotionTag
      className={className}
      variants={resolved}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: VIEWPORT_ONCE })}
    >
      {children}
    </MotionTag>
  );
}

interface RevealTextProps {
  /** Plain text — it is split on whitespace and revealed word by word. */
  text: string;
  className?: string;
  as?: ElementType;
  immediate?: boolean;
}

/**
 * Headline treatment that cascades word by word. Each word sits in its own
 * overflow-hidden mask so it slides up from behind a clean edge.
 *
 * The words remain ordinary text nodes in document order, so screen readers and
 * crawlers still read the heading as one continuous string.
 */
export function RevealText({
  text,
  className,
  as = 'span',
  immediate = true,
}: RevealTextProps) {
  const MotionTag = motion[as as 'span'];
  const words = text.split(' ');

  return (
    <MotionTag
      className={className}
      variants={wordContainer}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: VIEWPORT_ONCE })}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* The padding/negative-margin pair keeps descenders (g, y, p) from
              being clipped by the mask. */}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={wordChild} className="inline-block">
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
