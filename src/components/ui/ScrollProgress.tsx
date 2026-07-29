'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin reading-progress bar pinned under the navbar.
 *
 * Driven entirely by a motion value, so scrolling never triggers a React
 * render — the transform is written straight to the DOM node.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"
    />
  );
}
