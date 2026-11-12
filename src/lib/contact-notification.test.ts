import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/lib/site';
import { resolveContactNotificationRecipients } from '@/lib/contact-notification';

describe('resolveContactNotificationRecipients', () => {
  it('defaults to the form notification inbox', () => {
    expect(resolveContactNotificationRecipients()).toEqual([siteConfig.formNotificationEmail]);
    expect(siteConfig.formNotificationEmail).toBe('heliosailabs.india@gmail.com');
  });

  it('keeps the public contact email separate from form notifications', () => {
    expect(siteConfig.email).toBe('info@thehelios.co.in');
    expect(siteConfig.email).not.toBe(siteConfig.formNotificationEmail);
  });

  it('honours CONTACT_TO with comma-separated addresses', () => {
    expect(resolveContactNotificationRecipients('a@example.com, b@example.com')).toEqual([
      'a@example.com',
      'b@example.com',
    ]);
  });
});
