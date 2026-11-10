'use client';

import Script from 'next/script';
import { useSyncExternalStore } from 'react';

import {
  getCookieConsentServerSnapshot,
  getCookieConsentSnapshot,
  subscribeCookieConsent,
} from '@/lib/cookie-consent';

const BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js';

export default function CloudflareAnalytics() {
  const cfBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot
  );

  if (!cfBeaconToken || consent !== 'accepted') {
    return null;
  }

  return (
    <Script
      defer
      src={BEACON_SRC}
      data-cf-beacon={JSON.stringify({ token: cfBeaconToken })}
      strategy="afterInteractive"
    />
  );
}
