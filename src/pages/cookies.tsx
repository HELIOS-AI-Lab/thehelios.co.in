import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Activity } from 'lucide-react';

import Seo from '@/components/shared/Seo';
import LegalLayout, { LegalSection } from '@/components/shared/LegalLayout';
import { riseIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion';
import {
  breadcrumbSchema,
  buildJsonLd,
  organizationSchema,
  webPageSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  'Cookie and tracking technology policy for HELIOS AI Labs — which cookies are essential, what we cache locally, and how to manage your preferences.';

const categories = [
  {
    icon: <Settings className="h-6 w-6 text-accent-500" />,
    title: 'Essential and security',
    description:
      'Strictly necessary for platform operation. This includes JWT tokens for secure authentication, preventing CSRF attacks, and maintaining active sessions while you interact with your financial portfolio.',
  },
  {
    icon: <Activity className="h-6 w-6 text-link-500" />,
    title: 'Agent context and preferences',
    description:
      'We use local storage to cache your preferred local language (for example Hindi or Telugu) and temporary conversational context, so our GPT-based agents respond rapidly without excessive server round-trips.',
  },
];

const jsonLd = buildJsonLd(
  organizationSchema(),
  webPageSchema({
    path: '/cookies',
    title: 'Cookie Policy',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Cookie Policy', path: '/cookies' },
  ])
);

export default function CookiesPage() {
  return (
    <>
      <Seo
        title="Cookie Policy"
        description={DESCRIPTION}
        path="/cookies"
        type="article"
        jsonLd={jsonLd}
      />

      <LegalLayout
        eyebrow="Tracking Protocol"
        icon={<Cookie className="h-4 w-4" />}
        title="Cookie Policy"
        effectiveDate="1 April 2026"
        effectiveDateISO="2026-04-01"
      >
        <LegalSection>
          <p className="text-[16px] font-medium text-primary-800">
            To provide a seamless, culturally adapted, and secure AI companion,
            HELIOS AI Labs uses cookies and local storage mechanisms. This policy
            outlines what we track and why it is necessary for our intelligent
            agents to function.
          </p>
        </LegalSection>

        <LegalSection title="What we store">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mt-2 grid gap-4 sm:grid-cols-2 sm:gap-6"
          >
            {categories.map((category) => (
              <motion.div
                key={category.title}
                variants={riseIn}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="group relative h-full overflow-hidden rounded-lg border border-border-default bg-surface-card p-5 transition-colors duration-300 hover:border-accent-500/40 hover:shadow-lift sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-transparent transition-transform duration-500 ease-standard group-hover:scale-x-100"
                />
                <span className="mb-4 inline-flex transition-transform duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-110">
                  {category.icon}
                </span>
                <h3 className="mb-2 text-[16px] font-bold text-primary-700">
                  {category.title}
                </h3>
                <p className="text-[13px] leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </LegalSection>

        <LegalSection title="Managing your preferences">
          <p className="mb-4">
            You can control cookie settings directly through your browser.
            However, please be aware that disabling{' '}
            <strong>essential cookies</strong> will prevent you from logging in
            to the HELIOS dashboard, and clearing{' '}
            <strong>agent context</strong> will reset your active chat session
            with the AI companion.
          </p>
          <p>
            By choosing &ldquo;Accept&rdquo; on our cookie banner, you consent to
            the aggregation of generalised, anonymised usage metrics, which help
            our engineering team improve the experience for Bharat&rsquo;s
            demographics. Choosing &ldquo;Decline&rdquo; keeps only the cookies
            that are strictly necessary.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
