import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The fluid type steps declared in globals.css. They have to be registered
 * here or tailwind-merge cannot tell `text-fluid-display` from a text *colour*
 * — it falls back to the colour group, and a `text-white` further along the
 * same `cn()` call silently strips the size off the element.
 */
const FLUID_FONT_SIZES = ['fluid-display', 'fluid-title', 'fluid-quote'];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: FLUID_FONT_SIZES }],
    },
  },
});

/**
 * Merges conditional class names and lets later Tailwind utilities win over
 * earlier ones in the same group, so a `className` prop can override a
 * component's own defaults instead of fighting them on specificity.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
