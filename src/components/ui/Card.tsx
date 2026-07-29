'use client';

import { HTMLAttributes, forwardRef, useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '@/lib/cn';

export type CardVariant = 'flat' | 'raised' | 'interactive';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const base = 'bg-surface-card rounded overflow-hidden text-text-primary';

const variants: Record<CardVariant, string> = {
  flat: 'border border-border-default',
  raised: 'shadow-1 border border-transparent',
  interactive:
    'border border-border-default hover:shadow-lift hover:border-accent-500/40 hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-standard',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'flat', className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

export const CardHeader = ({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-4 pb-2', className)} {...props}>
    {children}
  </div>
);

export const CardBody = ({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-4 pt-2', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'p-4 border-t border-border-subtle bg-neutral-50 flex items-center gap-2',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Extends the motion props rather than React's HTMLAttributes: framer-motion
// redefines onDrag/onAnimationStart with its own signatures, which conflict.
interface SpotlightCardProps
  extends Omit<HTMLMotionProps<'div'>, 'ref' | 'children'> {
  // Motion's `children` also allows MotionValue; narrow it back to plain nodes
  children?: ReactNode;
  /** Radial highlight colour that follows the cursor. */
  glow?: string;
  /** Degrees of 3D rotation at the card's corners. Set 0 to disable tilt. */
  tilt?: number;
  /** Use on dark sections so the border and highlight read against navy. */
  inverse?: boolean;
}

/**
 * Premium surface: the card tilts subtly towards the pointer and a soft
 * highlight tracks the cursor across it.
 *
 * All pointer state lives in motion values, so moving the mouse writes straight
 * to the DOM without re-rendering React. The tilt is driven by springs, so it
 * settles rather than snapping, and `MotionConfig reducedMotion="user"` in
 * _app.tsx neutralises it for anyone who has asked for less motion.
 */
export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  (
    {
      glow = 'rgba(249, 115, 22, 0.16)',
      tilt = 5,
      inverse = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);

    // Pointer position within the card, normalised to -0.5 … 0.5
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    // Pointer position in pixels, for the highlight's centre
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const opacity = useMotionValue(0);

    const springCfg = { stiffness: 260, damping: 26, mass: 0.5 };
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [tilt, -tilt]), springCfg);
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-tilt, tilt]), springCfg);

    const background = useTransform(
      [mx, my],
      ([x, y]: number[]) =>
        `radial-gradient(300px circle at ${x}px ${y}px, ${glow}, transparent 72%)`
    );

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mx.set(x);
      my.set(y);
      px.set(x / rect.width - 0.5);
      py.set(y / rect.height - 0.5);
      opacity.set(1);
    };

    const handlePointerLeave = () => {
      opacity.set(0);
      px.set(0);
      py.set(0);
    };

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className={cn(
          'group/spot relative rounded-xl border transition-colors duration-300',
          inverse
            ? 'border-white/10 bg-white/[0.04] hover:border-accent-500/40'
            : 'border-border-default bg-surface-card hover:border-accent-500/40 hover:shadow-lift',
          className
        )}
        {...props}
      >
        <motion.span
          aria-hidden="true"
          style={{ background, opacity }}
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        />
        <div className="relative" style={{ transform: 'translateZ(28px)' }}>
          {children}
        </div>
      </motion.div>
    );
  }
);
SpotlightCard.displayName = 'SpotlightCard';
