import { siteConfig } from '@/lib/site';

/** Resolves team inbox(es) for form notification emails. `CONTACT_TO` overrides the default. */
export function resolveContactNotificationRecipients(contactTo?: string): string[] {
  const raw = (contactTo?.trim() || siteConfig.formNotificationEmail).trim();
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}
