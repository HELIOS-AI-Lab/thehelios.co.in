'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { siteConfig } from '@/lib/site';

interface LegalLayoutProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  icon: ReactNode;
  title: string;
  /** Human-readable date, e.g. "1 April 2026". */
  effectiveDate: string;
  /** Machine-readable ISO date for the <time> element. */
  effectiveDateISO: string;
  children: ReactNode;
}

/**
 * Shared chrome for /privacy, /terms and /cookies — one header treatment and
 * one prose scale, so the three pages cannot drift apart in wording or spacing.
 */
export default function LegalLayout({
  eyebrow,
  icon,
  title,
  effectiveDate,
  effectiveDateISO,
  children,
}: LegalLayoutProps) {
  return (
    <Layout>
      <section className="relative mx-auto max-w-[840px] px-6 py-24">
        <div
          aria-hidden="true"
          className="aurora-blob animate-aurora pointer-events-none absolute -top-24 left-1/4 h-[20rem] w-[20rem] bg-accent-500/[0.07]"
        />

        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate="visible"
          className="relative mb-16 border-b border-border-default pb-8"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded border border-primary-100 bg-primary-50 px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-primary-700"
          >
            {icon}
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="mb-4 text-[36px] font-bold tracking-tight text-primary-700 md:text-[48px]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-[15px] text-text-secondary"
          >
            Effective date:{' '}
            <time dateTime={effectiveDateISO}>{effectiveDate}</time>
            &nbsp;&middot;&nbsp; {siteConfig.legalName}
          </motion.p>
        </motion.div>

        <div className="relative space-y-12 text-[15px] leading-relaxed text-text-secondary">
          {children}
        </div>
      </section>
    </Layout>
  );
}

interface LegalSectionProps {
  /** Omit for an untitled lead-in block. */
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** One numbered clause. Always renders an h2 so the outline stays flat. */
export function LegalSection({
  title,
  icon,
  children,
  className,
}: LegalSectionProps) {
  return (
    <Reveal as="section" className={className}>
      {title && (
        <h2 className="mb-4 flex items-center gap-2 text-[20px] font-bold text-primary-700">
          {icon}
          {title}
        </h2>
      )}
      {children}
    </Reveal>
  );
}
