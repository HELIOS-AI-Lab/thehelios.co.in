import { absoluteUrl, siteConfig } from './site';

/**
 * schema.org builders. Everything is emitted as a single @graph so the page
 * ships one <script type="application/ld+json"> instead of several competing
 * blocks, which is what Google's Rich Results test prefers.
 */

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icons/icon-512.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    foundingDate: siteConfig.founded,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.x,
      siteConfig.socials.github,
    ],
    knowsAbout: [
      'Reinforcement Learning',
      'Explainable AI',
      'Generative AI',
      'MLOps',
      'Financial Technology',
      'Large Language Models',
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  };
}

export function webPageSchema(opts: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

/** Trail of { name, path } pairs, root first. Omit for the home page. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function softwareApplicationSchema() {
  return {
    '@type': 'SoftwareApplication',
    name: 'HELIOS Buddy',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web, Android, iOS',
    description:
      'A multilingual, AI-powered investment companion that combines reinforcement learning, financial literacy and local language AI to make wealth creation accessible across Bharat.',
    url: absoluteUrl('/product'),
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: '50',
      priceCurrency: 'INR',
      description: 'Frictionless, low-cost investment plans starting at ₹50.',
    },
  };
}

export function jobPostingCollectionSchema() {
  return {
    '@type': 'CollectionPage',
    name: 'HELIOS Student Fellowship',
    description:
      'An elite fellowship for undergraduate and graduate students to work on frontier AI problems in finance, healthcare and deep tech.',
    url: absoluteUrl('/students'),
    about: { '@id': ORG_ID },
  };
}

/** Wraps one or more node builders into the @graph document. */
export function buildJsonLd(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
