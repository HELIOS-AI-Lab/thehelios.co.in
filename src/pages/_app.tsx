import type { AppProps } from 'next/app';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MotionConfig } from 'framer-motion';

import { siteConfig } from '@/lib/site';
import CookieBanner from '@/components/shared/CookieBanner';
import ScrollProgress from '@/components/ui/ScrollProgress';

// Import global CSS (ensure this file exists as shown in Step 4)
import '@/styles/globals.css';

// Load Design System Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    /*
     * reducedMotion="user" makes every Framer Motion animation on the site
     * honour the OS setting: transforms and opacity are skipped to their final
     * value rather than tweened. It is the one switch that covers all of them.
     */
    <MotionConfig reducedMotion="user">
      <Head>
        {/* charSet is emitted by next/document automatically — don't duplicate it here */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#131921" />
        <meta name="format-detection" content="telephone=no" />

        {/* Icons — sized variants, so the tab no longer pulls the 907 KB master */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="author" content={siteConfig.name} />
      </Head>

      {/* The font variables are injected into the main wrapper.
        The antialiased class ensures crisp rendering across browsers.
      */}
      <div
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-text-primary bg-surface-page min-h-screen`}
      >
        <ScrollProgress />

        {/*
          Keying on the route remounts the subtree on navigation, which restarts
          the CSS entrance. This is a plain <div>, not a <motion.div> — see the
          note at the top of @/lib/motion for why wrapping every page in a
          motion component broke both rendering and the scroll reveals.
        */}
        <div key={router.asPath} className="animate-page-enter">
          <Component {...pageProps} />
        </div>

        <CookieBanner />
      </div>
    </MotionConfig>
  );
}
