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
      <section className="relative mx-auto max-w-[840px] overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          aria-hidden="true"
          className="aurora-blob animate-aurora pointer-events-none absolute -top-24 left-1/4 h-[14rem] w-[14rem] bg-accent-500/[0.07] sm:h-[20rem] sm:w-[20rem]"
        />

        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate="visible"
          className="relative mb-10 border-b border-border-default pb-6 sm:mb-12 sm:pb-8 lg:mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded border border-primary-100 bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-700 sm:mb-6 sm:text-[12px] sm:tracking-widest"
          >
            {icon}
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-fluid-display mb-4 font-bold tracking-tight text-primary-700"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-[13px] text-text-secondary sm:text-[15px]"
          >
            Effective date:{' '}
            <time dateTime={effectiveDateISO}>{effectiveDate}</time>
            &nbsp;&middot;&nbsp; {siteConfig.legalName}
          </motion.p>
        </motion.div>

        <div className="relative space-y-10 text-[14px] leading-relaxed text-text-secondary sm:space-y-12 sm:text-[15px]">
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
        <h2 className="mb-4 flex items-start gap-2 text-[18px] font-bold text-primary-700 [&>svg]:mt-0.5 [&>svg]:shrink-0 sm:text-[20px]">
          {icon}
          {title}
        </h2>
      )}
      {children}
    </Reveal>
  );
}
