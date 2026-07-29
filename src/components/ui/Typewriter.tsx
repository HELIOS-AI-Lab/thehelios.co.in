'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface TypewriterProps {
  /** Lines typed one after another. */
  lines: string[];
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds to hold between lines. */
  linePause?: number;
  className?: string;
  /** Class applied to the blinking caret. */
  caretClassName?: string;
}

/**
 * Types the given lines out once the block scrolls into view.
 *
 * The complete text is always present in the DOM inside a visually hidden node,
 * so crawlers and screen readers get the full content immediately and never see
 * a half-typed sentence; the animated copy is hidden from assistive tech.
 *
 * Anyone with reduced motion enabled gets the finished text with no typing.
 */
export default function Typewriter({
  lines,
  speed = 22,
  linePause = 420,
  className,
  caretClassName,
}: TypewriterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  const [typed, setTyped] = useState<string[]>(() => lines.map(() => ''));
  const [finished, setFinished] = useState(false);

  // Reduced motion is resolved during render rather than by writing state from
  // an effect, so there is no cascading re-render and no half-typed frame.
  const skipAnimation = Boolean(prefersReducedMotion);
  const shown = skipAnimation ? lines : typed;
  const done = skipAnimation || finished;

  useEffect(() => {
    if (!isInView || skipAnimation) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const run = async () => {
      for (let l = 0; l < lines.length; l++) {
        for (let c = 1; c <= lines[l].length; c++) {
          // Awaiting first keeps the initial setState out of the effect body
          await wait(speed);
          if (cancelled) return;
          setTyped((prev) => {
            const next = [...prev];
            next[l] = lines[l].slice(0, c);
            return next;
          });
        }
        await wait(linePause);
        if (cancelled) return;
      }
      setFinished(true);
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isInView, skipAnimation, lines, speed, linePause]);

  return (
    <div ref={ref} className={className}>
      {/* Full text for assistive tech and crawlers */}
      <span className="sr-only">{lines.join(' ')}</span>

      <div aria-hidden="true">
        {shown.map((line, i) => (
          /*
           * Each line renders the finished string invisibly to hold its final
           * height, with the typed portion overlaid on top. Without this the
           * block grows line by line and shoves everything below it down the
           * page while the animation runs.
           */
          <p key={i} className={cn('relative', i > 0 && 'mt-3')}>
            <span className="invisible">{lines[i]}</span>
            <span className="absolute inset-0">
              {line}
              {!done && line.length > 0 && line.length < lines[i].length && (
                <span
                  className={cn(
                    'ml-0.5 inline-block h-[1em] w-[0.5em] animate-caret bg-accent-500 align-middle',
                    caretClassName
                  )}
                />
              )}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
