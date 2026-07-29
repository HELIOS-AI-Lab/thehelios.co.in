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

      <section className="relative mx-auto max-w-[1280px] overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Ambient warmth behind the form column */}
        <div
          aria-hidden="true"
          className="aurora-blob animate-aurora pointer-events-none absolute -top-16 right-0 h-[16rem] w-[16rem] bg-accent-500/10 sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem]"
        />

        <div className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column: connection details */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInLeft}
              className="text-fluid-display mb-5 font-bold leading-[1.1] text-primary-700 sm:mb-6"
            >
              <RevealText text="Let’s start a" />
              <br />
              <RevealText text="conversation." className="text-accent-500" />
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mb-10 max-w-md text-[16px] text-text-secondary sm:mb-12 sm:text-[18px]"
            >
              Whether you are a researcher looking to collaborate or a partner
              interested in our FinTech engine, we’re ready to talk.
            </motion.p>

            <div className="space-y-6 sm:space-y-8">
              {channels.map((channel) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-border-default bg-neutral-50 text-primary-600 transition-all duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-105 group-hover:border-accent-500/40 group-hover:bg-accent-50 group-hover:text-accent-600">
                      {channel.icon}
                    </span>
                    <span className="block min-w-0">
                      <span className="mb-1 block text-[13px] font-bold uppercase tracking-wider text-text-tertiary sm:text-[14px]">
                        {channel.label}
                      </span>
                      <span className="block break-words text-[15px] font-medium leading-relaxed text-primary-700 sm:text-[16px]">
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
              className="mt-12 flex flex-wrap gap-6 border-t border-border-subtle pt-8 sm:mt-16"
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
            className="relative overflow-hidden rounded-xl border border-border-default bg-white p-5 shadow-8 sm:p-8 lg:p-10 xl:p-12"
          >
            {/* Visual background element */}
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-accent-500/5"
            />

            <div className="relative">
              <div className="mb-6 flex items-center gap-2 sm:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success-500 animate-ping-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
                </span>
                <span className="text-[12px] font-bold uppercase tracking-widest text-text-tertiary">
                  Our lab is active
                </span>
              </div>

              <h2 className="mb-6 text-[20px] font-bold text-primary-700 sm:mb-8 sm:text-[24px]">
                Send a message
              </h2>
              <ContactForm variant="general" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust quote */}
      <section className="relative overflow-hidden bg-primary-700 py-14 text-white sm:py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid mask-fade-edges"
        />
        <div className="relative mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.2em] text-accent-500 sm:mb-6 sm:text-[14px] sm:tracking-[0.3em]">
              Operational protocol
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mx-auto max-w-4xl">
              <p className="text-fluid-quote font-bold leading-tight">
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
