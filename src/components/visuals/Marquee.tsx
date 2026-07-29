'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Larger is slower. */
  duration?: number;
  /** Pause while the pointer is over the strip. */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Seamless horizontal marquee.
 *
 * The track holds two identical copies of the content and translates by exactly
 * -50%, so the second copy lands where the first began and the loop has no
 * visible seam. The duplicate is hidden from assistive tech so the content is
 * only announced once.
 */
export default function Marquee({
  children,
  duration = 32,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        // Feathered edges so items fade out rather than clipping at the bounds
        '[mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 animate-marquee items-center',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
