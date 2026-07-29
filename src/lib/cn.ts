import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges conditional class names and lets later Tailwind utilities win over
 * earlier ones in the same group, so a `className` prop can override a
 * component's own defaults instead of fighting them on specificity.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
