'use client';

import { useEffect, useRef, useState } from 'react';
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

interface AnimatedCounterProps {
  /** The number to count up to. */
  value: number;
  /** Rendered before the number, e.g. "₹". */
  prefix?: string;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The final value is rendered on the server and as the initial client state, so
 * the real number is always in the HTML for crawlers and for anyone who has
 * asked for reduced motion — the animation only ever replays a value that is
 * already there.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, motionValue, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
