'use client';

import { openCookiePreferences } from '@/lib/cookie-consent';

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className="mt-4 inline-flex items-center justify-center rounded-lg border border-border-default bg-white px-4 py-2.5 text-[13px] font-semibold text-text-primary transition-all duration-150 ease-standard hover:border-border-strong hover:bg-neutral-100 active:scale-[0.97]"
    >
      Change cookie preferences
    </button>
  );
}
