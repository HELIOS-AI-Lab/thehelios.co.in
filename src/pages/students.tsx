import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  Microscope,
  Cpu,
  Lightbulb,
  FileSearch,
  ArrowDown,
  Check,
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/shared/Seo';
import { HeroSection } from '@/components/ui/HeroSection';
import { FeatureGrid, FeatureItem } from '@/components/ui/FeatureGrid';
import { Card, SpotlightCard } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import ContactForm from '@/components/shared/ContactForm';
import {
  fadeInUp,
  riseIn,
  staggerContainer,
  VIEWPORT_ONCE,
} from '@/lib/motion';
import {
  breadcrumbSchema,
  buildJsonLd,
  jobPostingCollectionSchema,
  organizationSchema,
  webPageSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  'Join the HELIOS Student Fellowship. Work on reinforcement learning, MLOps and FinTech AI alongside our lab teams, with mentorship, publication opportunities and a route to a full-time role.';

const tracks = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: 'MLOps & infrastructure',
    description:
      'Build scalable GPU scheduling systems, serverless LLM deployment pipelines, and automated model monitoring tools on AWS and Azure.',
  },
  {
    icon: <Microscope className="h-5 w-5" />,
    title: 'Scientific computing',
    description:
      'Contribute to our DockX platform, using RDKit and AutoDock Vina for molecular docking and ADMET profiling research.',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Explainable FinTech',
    description:
      'Develop interpretable reinforcement learning agents for Bharat’s wealth engine, focusing on local language reasoning.',
  },
];

const benefits = [
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: 'Direct mentorship',
    description:
      'Weekly one-to-one sessions with Srikanth and our lead engineers to guide your technical growth.',
  },
  {
    icon: <FileSearch className="h-5 w-5" />,
    title: 'Paper publication',
    description:
      'Opportunities to co-author research papers and contribute to open-source scientific software.',
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: 'Career pathway',
    description:
      'Top-performing fellows receive pre-placement offers (PPOs) for full-time roles at HELIOS AI Labs.',
  },
];

const phases = [
  {
    label: 'Weeks 1–2',
    title: 'Onboarding',
    description:
      'Environment setup, codebase walkthrough, and a scoped first issue on a live service.',
  },
  {
    label: 'Weeks 3–8',
    title: 'Deep work',
    description:
      'You own a track deliverable end to end, reviewed weekly against production standards.',
  },
  {
    label: 'Weeks 9–12',
    title: 'Ship & write',
    description:
      'Deploy your work, then turn the findings into an internal report or a paper submission.',
  },
];

const requirements = [
  'Currently enrolled in B.Tech / M.Tech (CSE / IT / EEE)',
  'Proficiency in Python, React, or MLOps',
  'Strong foundation in data structures',
];

const jsonLd = buildJsonLd(
  organizationSchema(),
  jobPostingCollectionSchema(),
  webPageSchema({
    path: '/students',
    title: 'Student Fellowship',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Student Fellowship', path: '/students' },
  ])
);

export default function StudentsPage() {
  return (
    <Layout>
      <Seo
        title="Student Fellowship"
        description={DESCRIPTION}
        path="/students"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <HeroSection
        theme="inverse"
        badge="Academic Collaboration"
        title={<RevealText text="Building the next generation of AI researchers" />}
        subtitle="The HELIOS Student Fellowship is an elite programme for undergraduate and graduate students to work on frontier AI problems in finance, healthcare, and deep tech."
        primaryAction={
          <ButtonLink href="#apply" variant="primary" size="lg">
            Apply for Summer 2026
          </ButtonLink>
        }
        secondaryAction={
          <ButtonLink
            href="#tracks"
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20"
            leadingIcon={<ArrowDown className="h-4 w-4" />}
          >
            See research tracks
          </ButtonLink>
        }
      />

      {/* Research tracks */}
      <section
        id="tracks"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <SectionHeading
          eyebrow="Programme"
          title="Research tracks"
          description="Fellows are embedded directly into our lab teams, working on production-grade AI infrastructure and research papers."
          className="mb-10 sm:mb-12 lg:mb-16"
        />

        <FeatureGrid columns={3}>
          {tracks.map((track, i) => (
            <FeatureItem key={track.title} index={i + 1} {...track} />
          ))}
        </FeatureGrid>
      </section>

      {/* Benefits */}
      <section className="overflow-hidden border-y border-border-subtle bg-neutral-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="grid items-center gap-10 md:grid-cols-2 md:gap-12"
          >
            <div className="space-y-6 sm:space-y-8">
              <motion.h2
                variants={fadeInUp}
                className="text-fluid-title mb-2 font-bold text-primary-700"
              >
                Why fellow with HELIOS?
              </motion.h2>

              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="group flex gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-accent-500/20 bg-accent-500/10 text-accent-700 transition-all duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white sm:h-12 sm:w-12">
                    {benefit.icon}
                  </span>
                  <div>
                    <h3 className="mb-1 text-[16px] font-bold">
                      {benefit.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-text-secondary">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={riseIn} className="relative mt-8 md:mt-0">
              <SpotlightCard
                tilt={5}
                className="relative z-10 border-2 border-accent-500/20 bg-white p-6 shadow-8 sm:p-8"
              >
                <blockquote className="mb-6 text-[16px] italic leading-relaxed text-primary-700 sm:mb-8 sm:text-[18px]">
                  <p>
                    “The fellowship isn’t about fetching coffee. It’s about
                    solving the port-scanning abuse alerts on EC2, optimising
                    RDKit kernels, and building the future of Bharat’s AI.”
                  </p>
                </blockquote>
                <footer className="flex items-center gap-4 border-t border-border-subtle pt-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-mono font-bold text-primary-700">
                    FA
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-primary-700">
                      Fellowship alumnus
                    </p>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-text-tertiary">
                      Class of 2025
                    </p>
                  </div>
                </footer>
              </SpotlightCard>

              {/* Decorative technical grid element */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 z-0 hidden h-full w-full rounded border border-dashed border-border-strong bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-40 [background-size:16px_16px] sm:-bottom-6 sm:-right-6 sm:block"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Programme shape */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Twelve weeks"
          title="How the fellowship runs"
          description="A fixed shape, so you always know what the next milestone is and what you will have to show at the end of it."
          className="mb-10 sm:mb-12 lg:mb-16"
        />

        <motion.ol
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {/* Connecting rule behind the markers on wide screens */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-accent-500/50 via-border-default to-transparent md:block"
          />

          {phases.map((phase, i) => (
            <motion.li key={phase.title} variants={fadeInUp} className="relative">
              <span className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-accent-500/30 bg-surface-page font-mono text-[13px] font-bold text-accent-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                {phase.label}
              </p>
              <h3 className="mb-2 text-[17px] font-bold text-primary-700 sm:text-[18px]">
                {phase.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-text-secondary">
                {phase.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      {/* Application */}
      <section
        id="apply"
        className="mx-auto max-w-[1024px] scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
      >
        <div className="grid gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
          <Reveal className="md:col-span-1">
            <h2 className="text-fluid-title mb-4 font-bold text-primary-700">
              Apply for the fellowship
            </h2>
            <p className="mb-6 text-[14px] leading-relaxed text-text-secondary">
              We accept applications on a rolling basis. Please ensure your GitHub
              profile or research portfolio is up to date.
            </p>
            <div className="rounded-lg border border-primary-100 bg-primary-50 p-5">
              <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-primary-700">
                Requirements
              </h3>
              <ul className="space-y-2.5 text-[13px] font-medium text-primary-800">
                {requirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variants={riseIn} delay={0.1} className="md:col-span-2">
            <Card variant="flat" className="bg-white p-5 shadow-8 sm:p-8">
              <ContactForm variant="student" />
            </Card>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
