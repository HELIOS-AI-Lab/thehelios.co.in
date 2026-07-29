/**
 * Single source of truth for site-wide identity, URLs and social profiles.
 * Consumed by <Seo />, the JSON-LD builders, the sitemap and the footer so
 * these values never drift apart across pages.
 */

export const siteConfig = {
  name: 'HELIOS AI Labs',
  legalName: 'Helios AI Labs Pvt Ltd',
  shortName: 'HELIOS',
  url: 'https://thehelios.co.in',
  locale: 'en_IN',
  description:
    'HELIOS AI Labs builds explainable, self-evolving AI agents for finance, education and public systems — starting with Bharat and scaling globally.',
  tagline: "Bharat's Open AI Wealth Engine",
  founded: '2025',
  email: 'info@thehelios.co.in',
  privacyEmail: 'privacy@thehelios.co.in',
  ogImage: '/og-image.png',
  address: {
    locality: 'Bejjanki',
    region: 'Telangana',
    postalCode: '505528',
    country: 'IN',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/heliosailabs/',
    x: 'https://x.com/heliosailabs',
    github: 'https://github.com/HELIOS-AI-Lab/',
  },
  product: {
    url: 'https://helios-tech.co.in/',
  },
} as const;

/**
 * Every indexable route, with the priority/change frequency used by the sitemap.
 * Add a page here when you add a route — the sitemap is generated from this list.
 */
export const siteRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/product', priority: 0.9, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/students', priority: 0.8, changefreq: 'weekly' },
  { path: '/developers', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/cookies', priority: 0.3, changefreq: 'yearly' },
] as const;

/** Resolves a route or asset path against the canonical origin. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString();
}
