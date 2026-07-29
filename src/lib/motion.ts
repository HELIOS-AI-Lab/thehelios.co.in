import type { Transition, Variants } from 'framer-motion';

/**
 * One shared motion vocabulary for the whole site.
 *
 * Note on shape: `transition` and `viewport` must live *inside* a variant's
 * target state. Framer Motion treats every top-level key of a variants object
 * as a named variant, so a top-level `transition: {...}` is silently read as a
 * variant called "transition" and never applied — which is why the custom
 * easing and stagger used to have no effect on most pages.
 */

/** Ease-out expo. Matches `ease-standard` in tailwind.config.ts. */
export const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Slightly softer ease-out quint, for larger travel distances. */
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Springy press/hover feedback for interactive chrome. */
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

/**
 * Default viewport trigger. The margin is kept small on purpose: a large
 * negative inset means a block sitting just below the fold on page load stays
 * hidden until the visitor scrolls, which reads as a broken page rather than a
 * reveal.
 */
export const VIEWPORT_ONCE = { once: true, margin: '-40px' } as const;

/** Eager variant for above-the-fold content that should not wait for scroll. */
export const VIEWPORT_EAGER = { once: true, margin: '0px' } as const;

const base = (duration: number): Transition => ({
  duration,
  ease: EASE_STANDARD,
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: base(0.5) },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: base(0.6) },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: base(0.5) },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: base(0.6) },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: base(0.6) },
};

/** Cards and tiles: rises and settles from slightly under-scale. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_SOFT },
  },
};

/** Decorative visuals: scales up from the centre. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: base(0.7) },
};

/**
 * Parent that cascades its children. Children inherit `hidden`/`visible`
 * automatically, so they only need `variants={fadeInUp}` and no initial/animate.
 */
export function staggerContainer(stagger = 0.09, delayChildren = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Ready-made container for the common case. */
export const stagger: Variants = staggerContainer();

/** Tighter cascade for dense grids of small items. */
export const staggerFast: Variants = staggerContainer(0.05);

/** Per-word headline reveal. Pair with `wordChild` on each word span. */
export const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: '0.45em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.65, ease: EASE_SOFT },
  },
};

/*
 * Note: the route-level entrance is deliberately NOT defined here.
 *
 * It lives in _app.tsx as the plain CSS class `animate-page-enter`, because a
 * <motion.div> wrapping every page caused two separate failures:
 *
 *  1. With <AnimatePresence mode="wait"> the exit never reported complete, so
 *     the incoming page never mounted and the outgoing one stayed at opacity 0
 *     — a blank screen until a scroll forced a repaint.
 *  2. Without AnimatePresence the wrapper still stalled at opacity 0, and its
 *     `animate="visible"` propagated down the variant tree to every child, so
 *     `whileInView` reveals fired on mount instead of on scroll.
 *
 * A CSS animation on a keyed plain <div> restarts on every route change, runs
 * off the main thread, and shares no state with Framer's variant graph.
 */

/**
 * Returns a copy of `variants` with `delay` merged into the `visible` state's
 * own transition.
 *
 * Setting the `transition` prop on a motion element would replace the variant's
 * transition outright — dropping its duration and easing — so a delay has to be
 * folded into the variant instead of layered on top of it.
 */
export function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible;
  if (typeof visible !== 'object' || visible === null) return variants;

  const { transition, ...target } = visible as Record<string, unknown> & {
    transition?: Transition;
  };

  return {
    ...variants,
    visible: { ...target, transition: { ...transition, delay } },
  };
}

/** Standard hover/tap feedback for cards. */
export const hoverLift = {
  whileHover: { y: -4, transition: SPRING_SNAPPY },
  whileTap: { y: -1, scale: 0.995 },
} as const;

/** Standard hover/tap feedback for buttons and pills. */
export const hoverPress = {
  whileHover: { scale: 1.025, transition: SPRING_SNAPPY },
  whileTap: { scale: 0.97 },
} as const;
