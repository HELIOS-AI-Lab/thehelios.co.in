export const STORAGE_KEY = 'helios_cookie_consent';

/** Sentinel returned on the server, where localStorage does not exist. */
export const CONSENT_UNKNOWN = 'unknown';

export const CONSENT_CHANGE_EVENT = 'helios_cookie_consent_change';
export const OPEN_PREFERENCES_EVENT = 'helios_cookie_preferences_open';

const BEACON_SCRIPT_SELECTOR =
  'script[src*="static.cloudflareinsights.com/beacon"]';

export type CookieConsentChoice = 'accepted' | 'declined';

export function subscribeCookieConsent(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener('storage', handler);
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
  };
}

export function getCookieConsentSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return CONSENT_UNKNOWN;
  }
}

export function getCookieConsentServerSnapshot(): string {
  return CONSENT_UNKNOWN;
}

export function notifyCookieConsentChange() {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function persistCookieConsent(choice: CookieConsentChoice) {
  localStorage.setItem(STORAGE_KEY, choice);
  notifyCookieConsentChange();
}

export function isCloudflareBeaconLoaded(): boolean {
  return Boolean(document.querySelector(BEACON_SCRIPT_SELECTOR));
}
