'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { EASE_SOFT } from '@/lib/motion';

const STORAGE_KEY = 'helios_cookie_consent';

/** Sentinel returned on the server, where localStorage does not exist. */
const UNKNOWN = 'unknown';

function subscribe(onStoreChange: () => void) {
  // Keeps the banner in sync if the choice is made in another tab
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Treating it
    // as "already answered" is better than crashing the page over a banner.
    return UNKNOWN;
  }
}

function getServerSnapshot(): string {
  return UNKNOWN;
}

export default function CookieBanner() {
  /*
   * useSyncExternalStore is the sanctioned way to read a browser-only value
   * during render: hydration uses the server snapshot, so the first client
   * render matches the HTML exactly, and React re-reads the real value
   * immediately afterwards. Doing this with useEffect + setState would trigger
   * a cascading render.
   */
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const isVisible = stored === '' && !dismissed;

  const record = useCallback((choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* see getSnapshot */
    }
    setDismissed(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.4, ease: EASE_SOFT }}
          className="fixed bottom-3 left-3 right-3 z-50 sm:bottom-4 sm:left-4 sm:right-4 md:left-6 md:right-auto md:w-[420px]"
        >
          <div className="flex flex-col gap-4 rounded-xl border border-border-default bg-surface-card/95 p-4 shadow-lift backdrop-blur-xl sm:p-5">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                <Cookie className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[14px] font-semibold text-text-primary">
                  This website uses cookies
                </h2>
                <p className="text-[13px] leading-relaxed text-text-secondary">
                  We use cookies to analyse website traffic and optimise your
                  experience. Accepting aggregates your data with all other user
                  data. Read our{' '}
                  <Link
                    href="/cookies"
                    className="font-medium text-link-600 underline underline-offset-2 hover:text-link-700"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => record('declined')}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-border-default bg-white px-3 text-[13px] font-semibold text-text-primary transition-all duration-150 ease-standard hover:border-border-strong hover:bg-neutral-100 active:scale-[0.97] sm:h-9 sm:flex-none"
              >
                Decline
              </button>

              <button
                onClick={() => record('accepted')}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-accent-500 px-4 text-[13px] font-semibold text-primary-700 transition-all duration-150 ease-standard hover:bg-accent-400 hover:shadow-accent active:scale-[0.97] sm:h-9 sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
