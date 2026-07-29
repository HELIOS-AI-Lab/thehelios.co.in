import React, { type SVGProps } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/shared/Seo';
import ContactForm from '@/components/shared/ContactForm';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from '@/lib/motion';
import { absoluteUrl, siteConfig } from '@/lib/site';
import {
  breadcrumbSchema,
  buildJsonLd,
  organizationSchema,
  webPageSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  'Get in touch with HELIOS AI Labs. Whether you are a researcher looking to collaborate or a partner interested in our FinTech engine, we’re ready to talk.';

// Native SVGs to replace the removed Lucide brand icons
const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const channels = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email us',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Visit us',
    value: `${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}, India`,
  },
];

const jsonLd = buildJsonLd(
  organizationSchema(),
  {
    '@type': 'ContactPage',
    '@id': `${absoluteUrl('/contact')}#webpage`,
    url: absoluteUrl('/contact'),
    name: 'Contact HELIOS AI Labs',
    description: DESCRIPTION,
    mainEntity: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Telugu'],
    },
  },
  webPageSchema({
    path: '/contact',
    title: 'Contact',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ])
);

export default function ContactPage() {
  return (
    <Layout>
      <Seo
        title="Contact"
        description={DESCRIPTION}
        path="/contact"
        jsonLd={jsonLd}
      />

      <section className="relative mx-auto max-w-[1280px] px-6 py-24">
        {/* Ambient warmth behind the form column */}
        <div
          aria-hidden="true"
          className="aurora-blob animate-aurora pointer-events-none absolute -top-16 right-0 h-[24rem] w-[24rem] bg-accent-500/10"
        />

        <div className="relative grid items-start gap-20 lg:grid-cols-2">
          {/* Left column: connection details */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInLeft}
              className="mb-6 text-[42px] font-bold leading-[1.1] text-primary-700 md:text-[48px]"
            >
              <RevealText text="Let’s start a" />
              <br />
              <RevealText text="conversation." className="text-accent-500" />
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mb-12 max-w-md text-[18px] text-text-secondary"
            >
              Whether you are a researcher looking to collaborate or a partner
              interested in our FinTech engine, we’re ready to talk.
            </motion.p>

            <div className="space-y-8">
              {channels.map((channel) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-border-default bg-neutral-50 text-primary-600 transition-all duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-105 group-hover:border-accent-500/40 group-hover:bg-accent-50 group-hover:text-accent-600">
                      {channel.icon}
                    </span>
                    <span className="block">
                      <span className="mb-1 block text-[14px] font-bold uppercase tracking-wider text-text-tertiary">
                        {channel.label}
                      </span>
                      <span className="block text-[16px] font-medium leading-relaxed text-primary-700">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <motion.div key={channel.label} variants={fadeInUp}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="group flex gap-4 rounded-lg outline-none transition-colors"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="group flex gap-4">{body}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Social */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex gap-6 border-t border-border-subtle pt-8"
            >
              <motion.a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-text-secondary transition-colors hover:text-link-600"
              >
                <LinkedInIcon className="h-5 w-5" />
                <span className="text-[14px] font-bold">LinkedIn</span>
              </motion.a>
              <motion.a
                href={siteConfig.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-text-secondary transition-colors hover:text-primary-700"
              >
                <XIcon className="h-5 w-5" />
                <span className="text-[14px] font-bold">X</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column: the form */}
          <Reveal
            variants={fadeInRight}
            immediate
            className="relative overflow-hidden rounded-xl border border-border-default bg-white p-8 shadow-8 md:p-12"
          >
            {/* Visual background element */}
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-accent-500/5"
            />

            <div className="relative">
              <div className="mb-8 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success-500 animate-ping-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
                </span>
                <span className="text-[12px] font-bold uppercase tracking-widest text-text-tertiary">
                  Our lab is active
                </span>
              </div>

              <h2 className="mb-8 text-[24px] font-bold text-primary-700">
                Send a message
              </h2>
              <ContactForm variant="general" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust quote */}
      <section className="relative overflow-hidden bg-primary-700 py-20 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid mask-fade-edges"
        />
        <div className="relative mx-auto max-w-[1280px] px-6 text-center">
          <Reveal>
            <p className="mb-6 font-mono text-[14px] uppercase tracking-[0.3em] text-accent-500">
              Operational protocol
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mx-auto max-w-4xl">
              <p className="text-[28px] font-bold leading-tight md:text-[36px]">
                “Transparency is the foundation of intelligence. Every inquiry is
                handled with technical rigour and professional punctuality.”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
