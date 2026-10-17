import type { NextApiRequest, NextApiResponse } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * Contact, student and newsletter submissions, delivered as a plain-text email
 * through Resend (https://resend.com/docs/api-reference/emails/send-email).
 *
 * Worker secrets (`wrangler secret put …`), which OpenNext exposes on process.env:
 *   RESEND_API_KEY  required
 *   CONTACT_TO      optional, comma-separated, defaults to siteConfig.email
 *   CONTACT_FROM    optional, must be on a domain verified in Resend
 *   RESEND_CONTACTS_API_KEY  optional, a key allowed to create contacts; newsletter
 *                   signups are saved to Resend Audience with it (falls back to
 *                   RESEND_API_KEY, which is enough if that key has full access)
 *
 * Each sender also gets a fixed-text confirmation email.
 *
 * ponytail: honeypot + length caps only. The confirmation email goes to whatever
 * address is typed in, so add Turnstile or a Cloudflare WAF rate-limit rule on
 * /api/contact as soon as spam or abuse shows up.
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

  const from = process.env.CONTACT_FROM || 'HELIOS Website <forms@thehelios.co.in>';
  const team = (process.env.CONTACT_TO || siteConfig.email).split(',').map((s) => s.trim());

  // 1. The team notification is the one that must succeed.
  const sent = await resend(apiKey, '/emails', { from, to: team, reply_to: f.email, subject, text });
  if (!sent) {
    return res.status(502).json({ ok: false, error: 'Sending failed. Please try again.' });
  }

  // 2. Best effort: confirmation to the sender, and newsletter signups saved as
  // Resend contacts. Failures are logged and never fail the request.
  // The confirmation is fixed text with nothing the visitor typed in it, so the
  // form can't be used to send someone else arbitrary content.
  await Promise.all([
    resend(apiKey, '/emails', {
      from,
      to: [f.email],
      reply_to: team[0],
      subject: CONFIRM[kind].subject,
      text: CONFIRM[kind].text,
    }),
    kind === 'newsletter' &&
      resend(process.env.RESEND_CONTACTS_API_KEY || apiKey, '/contacts', {
        email: f.email,
        unsubscribed: false,
      }),
  ]);

  return res.status(200).json({ ok: true });
}

const SIGNOFF = '\n\nThe HELIOS team\nhttps://thehelios.co.in';
const CONFIRM: Record<Kind, { subject: string; text: string }> = {
  contact: {
    subject: 'We received your message - HELIOS',
    text: 'Thank you for contacting HELIOS. We have received your message and will get back to you soon.' + SIGNOFF,
  },
  student: {
    subject: 'We received your enquiry - HELIOS',
    text: 'Thank you for your interest in HELIOS. We have received your enquiry and will get back to you soon.' + SIGNOFF,
  },
  newsletter: {
    subject: 'You are subscribed to HELIOS updates',
    text: 'Thank you for subscribing to HELIOS updates. You will hear from us when we have news to share.\n\nIf this was not you, reply to this email and we will remove you.' + SIGNOFF,
  },
};

async function resend(key: string, path: string, payload: unknown): Promise<boolean> {
  try {
    const r = await fetch(`https://api.resend.com${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error(`contact: Resend ${path} returned`, r.status, await r.text());
    return r.ok;
  } catch (err) {
    console.error(`contact: Resend ${path} request failed`, err);
    return false;
  }
}
