'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { EASE_SOFT } from '@/lib/motion';
import {
  getCookieConsentServerSnapshot,
  getCookieConsentSnapshot,
  isCloudflareBeaconLoaded,
  OPEN_PREFERENCES_EVENT,
  persistCookieConsent,
  STORAGE_KEY,
  subscribeCookieConsent,
  type CookieConsentChoice,
} from '@/lib/cookie-consent';

export default function CookieBanner() {
  /*
   * useSyncExternalStore is the sanctioned way to read a browser-only value
   * during render: hydration uses the server snapshot, so the first client
   * render matches the HTML exactly, and React re-reads the real value
   * immediately afterwards. Doing this with useEffect + setState would trigger
   * a cascading render.
   */
  const stored = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot
  );
  const [dismissed, setDismissed] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    const open = () => {
      setForceOpen(true);
      setDismissed(false);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.oldValue !== 'accepted' || event.newValue !== 'declined') return;
      if (!isCloudflareBeaconLoaded()) return;
      window.location.reload();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isVisible = forceOpen || (stored === '' && !dismissed);

  const closeBanner = useCallback(() => {
    setForceOpen(false);
    setDismissed(true);
  }, []);

  const record = useCallback(
    (choice: CookieConsentChoice) => {
      let previous: string | null = null;
      try {
        previous = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* see getCookieConsentSnapshot */
      }

      const beaconWasLoaded = isCloudflareBeaconLoaded();

      try {
        persistCookieConsent(choice);
      } catch {
        /* storage unavailable */
        closeBanner();
        return;
      }

      if (
        choice === 'declined' &&
        previous === 'accepted' &&
        beaconWasLoaded
      ) {
        window.location.reload();
        return;
      }

      closeBanner();
    },
    [closeBanner]
  );

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
