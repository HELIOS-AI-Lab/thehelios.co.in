import type { NextApiRequest, NextApiResponse } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * Contact, student and newsletter submissions, delivered as a plain-text email
 * through Resend (https://resend.com/docs/api-reference/emails/send-email).
 *
 * Worker secrets (`wrangler secret put …`), which OpenNext exposes on process.env:
 *   RESEND_API_KEY  required
 *   CONTACT_TO      optional, defaults to siteConfig.email
 *   CONTACT_FROM    optional, must be on a domain verified in Resend
 *
 * ponytail: honeypot + length caps only. Add Turnstile or a Cloudflare WAF
 * rate-limit rule on /api/contact if spam shows up.
 */

const KINDS = ['contact', 'student', 'newsletter'] as const;
type Kind = (typeof KINDS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 120, email: 254, college: 160, interest: 160, message: 5000 };

type Field = keyof typeof LIMITS;

const clean = (value: unknown, field: Field): string =>
  typeof value === 'string' ? value.trim().slice(0, LIMITS[field]) : '';

// A newline in the subject line would be a header-injection vector.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const kind = body.kind as Kind;
  if (!KINDS.includes(kind)) {
    return res.status(400).json({ ok: false, error: 'Unknown form' });
  }

  // Hidden "website" field: people never fill it, bots usually do. Pretend success.
  if (typeof body.website === 'string' && body.website !== '') {
    return res.status(200).json({ ok: true });
  }

  const f = {
    name: clean(body.name, 'name'),
    email: clean(body.email, 'email'),
    college: clean(body.college, 'college'),
    interest: clean(body.interest, 'interest'),
    message: clean(body.message, 'message'),
  };

  if (!EMAIL_RE.test(f.email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }
  if (kind !== 'newsletter' && !f.name) {
    return res.status(400).json({ ok: false, error: 'Please tell us your name.' });
  }
  if (kind === 'student' && !f.college) {
    return res.status(400).json({ ok: false, error: 'Please tell us where you study.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not set');
    return res.status(503).json({ ok: false, error: 'Sending is not available right now.' });
  }

  const subject = oneLine(
    kind === 'newsletter'
      ? `Newsletter signup: ${f.email}`
      : `${kind === 'student' ? 'Student enquiry' : 'Contact'}: ${f.name}`
  );
  const text = [
    `Form: ${kind}`,
    f.name && `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.college && `College: ${f.college}`,
    f.interest && `Interest: ${f.interest}`,
    f.message && `\n${f.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'HELIOS Website <forms@thehelios.co.in>',
        to: [process.env.CONTACT_TO || siteConfig.email],
        reply_to: f.email,
        subject,
        text,
      }),
    });
    if (!r.ok) {
      console.error('contact: Resend returned', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'Sending failed. Please try again.' });
    }
  } catch (err) {
    console.error('contact: Resend request failed', err);
    return res.status(502).json({ ok: false, error: 'Sending failed. Please try again.' });
  }

  return res.status(200).json({ ok: true });
}
