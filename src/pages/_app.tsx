import type { AppProps } from 'next/app';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Head from 'next/head';

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
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/helios-ai-logo-v2.png" />
      </Head>
      
      {/* The font variables are injected into the main wrapper.
        The antialiased class ensures crisp rendering across browsers.
      */}
      <div className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-text-primary bg-surface-page min-h-screen`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}