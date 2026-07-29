import type { GetServerSideProps } from 'next';
import { absoluteUrl, siteRoutes } from '@/lib/site';

/**
 * Serves /sitemap.xml straight from the route table in @/lib/site, so adding a
 * page there is the only step needed to get it indexed.
 *
 * Rendered through getServerSideProps rather than a static file in public/ to
 * keep the two from drifting apart; the response is cached at the edge for a
 * day, so it is generated at most once per day per region.
 */
function toXml(): string {
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = siteRoutes
    .map(
      (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );
  res.write(toXml());
  res.end();

  return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
export default function Sitemap() {
  return null;
}
