import Head from 'next/head';
import { absoluteUrl, siteConfig } from '@/lib/site';

export interface SeoProps {
  /** Page title without the brand suffix — the suffix is appended for you. */
  title: string;
  description: string;
  /** Route path, e.g. "/product". Used for the canonical URL and og:url. */
  path: string;
  /** Absolute or root-relative image path. Defaults to the site OG card. */
  image?: string;
  imageAlt?: string;
  /** "website" for landing pages, "article" for long-form/legal pages. */
  type?: 'website' | 'article';
  /** Set on pages that should stay out of the index. */
  noindex?: boolean;
  /** schema.org @graph document, already built with buildJsonLd(). */
  jsonLd?: object;
  /** Rendered verbatim after the generated tags. */
  children?: React.ReactNode;
}

/**
 * Every page's <head> in one place: canonical, robots, Open Graph, Twitter
 * cards and structured data.
 *
 * Tags must stay *direct* children of next/head's <Head> or they are dropped on
 * client-side navigation, so this component renders the <Head> itself rather
 * than returning a fragment for a caller to nest.
 */
export default function Seo({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  imageAlt,
  type = 'website',
  noindex = false,
  jsonLd,
  children,
}: SeoProps) {
  // Pages pass their bare title; the brand suffix is appended unless the title
  // already carries it (as the home page's does).
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const resolvedImageAlt = imageAlt ?? `${fullTitle} — social preview card`;

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonical} key="canonical" />

      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
        key="robots"
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:site_name" content={siteConfig.name} key="og:site_name" />
      <meta property="og:locale" content={siteConfig.locale} key="og:locale" />
      <meta property="og:title" content={fullTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:image:alt" content={resolvedImageAlt} key="og:image:alt" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={fullTitle} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      <meta
        name="twitter:image:alt"
        content={resolvedImageAlt}
        key="twitter:image:alt"
      />

      {jsonLd && (
        <script
          type="application/ld+json"
          key="jsonld"
          // JSON.stringify output is escaped below so a stray "</script>" in the
          // data can never break out of the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      )}

      {children}
    </Head>
  );
}
