import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  LineChart,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Database,
  Cpu,
  Languages,
  ShieldCheck,
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/shared/Seo';
import { HeroSection } from '@/components/ui/HeroSection';
import { SpotlightCard } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import NeuralNetwork from '@/components/visuals/NeuralNetwork';
import { fadeInUp, riseIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion';
import { siteConfig } from '@/lib/site';
import {
  breadcrumbSchema,
  buildJsonLd,
  organizationSchema,
  softwareApplicationSchema,
  webPageSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  "Bharat's Open AI Wealth Engine. HELIOS is an evolving AI-powered ecosystem designed to help Bharat's people think, invest, and grow — intelligently.";

const capabilities = [
  {
    icon: <Bot className="h-4 w-4" />,
    title: 'AI intelligence',
    summary:
      'HELIOS is an AI-powered, multilingual investment assistant built specifically for Bharat’s unique linguistic and cultural landscape.',
    points: [
      'GPT-based explainable agents',
      'Local language voice and chat interfaces',
      'Real-time market reasoning and logic',
    ],
  },
  {
    icon: <LineChart className="h-4 w-4" />,
    title: 'Financial analytics',
    summary:
      'Combines AI data crunching with human support to guide users through personalised, goal-based portfolios.',
    points: [
      'Automated portfolio tracking and rebalancing',
      'Advanced risk and SIP modelling',
      'Goal-based plans with strict safety rails',
    ],
  },
  {
    icon: <HeartHandshake className="h-4 w-4" />,
    title: 'Behavioral nudging',
    summary:
      'Built-in education, SIP nudges, rebalancing alerts, and emotion-aware flows that drive long-term financial continuity.',
    points: [
      'Emotion-aware SIP nudges',
      'Frictionless, low-cost plans (₹50 starter)',
      'Deep cultural adaptation for Bharat',
    ],
  },
];

const techStack = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'Reinforcement learning',
    description:
      'Self-evolving algorithms that optimise for long-term portfolio health.',
  },
  {
    icon: <Languages className="h-6 w-6" />,
    title: 'Local NLP models',
    description:
      'Custom-trained LLMs that understand nuance in regional languages.',
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: 'Data visuals',
    description:
      'Translating complex market data into simple, actionable visual insights.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Safety and guardrails',
    description:
      'Hard-coded risk thresholds that protect wealth from market volatility.',
  },
];

const jsonLd = buildJsonLd(
  organizationSchema(),
  softwareApplicationSchema(),
  webPageSchema({
    path: '/product',
    title: 'HELIOS Buddy | Your AI Financial Companion',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'HELIOS Buddy', path: '/product' },
  ])
);

export default function ProductPage() {
  return (
    <Layout>
      <Seo
        title="HELIOS Buddy — Your AI Financial Companion"
        description={DESCRIPTION}
        path="/product"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <HeroSection
        theme="light"
        alignment="center"
        badge="Bharat’s Open AI Wealth Engine"
        title={
          <>
            <RevealText text="Your local, trusted" />
            <br />
            <RevealText text="AI financial buddy" className="text-accent-700" />
          </>
        }
        subtitle="HELIOS is more than an app. It’s an evolving AI-powered ecosystem designed to help Bharat’s people think, invest, and grow — intelligently. We bring together reinforcement learning, financial literacy, and local language AI to make wealth creation accessible to all."
        primaryAction={
          <ButtonLink
            href={siteConfig.product.url}
            variant="primary"
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" />}
          >
            Get early access
          </ButtonLink>
        }
        secondaryAction={
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Talk to the team
          </ButtonLink>
        }
      />

      {/* Manifesto quote */}
      <section className="border-b border-border-default bg-surface-sunken py-16">
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <Reveal>
            <blockquote className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 font-serif text-[96px] leading-none text-accent-500/15"
              >
                &ldquo;
              </span>
              <p className="relative text-[24px] font-bold leading-snug text-primary-700 md:text-[28px]">
                We’re not just building a product. We’re training a generation of
                confident, culturally aware, AI-powered investors.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="mx-auto max-w-[1280px] px-6 py-24">
        <SectionHeading
          eyebrow="The product"
          title="Core capabilities"
          description="Engineered for Bharat. Combining deep technical rigour with frictionless, human-centred design."
          align="center"
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-6 md:grid-cols-3"
        >
          {capabilities.map((capability) => (
            <motion.div key={capability.title} variants={riseIn}>
              <SpotlightCard className="flex h-full flex-col" tilt={4}>
                <div className="flex items-center gap-3 rounded-t-xl border-b border-border-subtle bg-neutral-50 p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-primary-100 text-primary-700">
                    {capability.icon}
                  </span>
                  <h3 className="text-[18px] font-bold">{capability.title}</h3>
                </div>

                <div className="flex flex-1 flex-col gap-6 p-5">
                  <p className="text-[14px] text-text-secondary">
                    {capability.summary}
                  </p>
                  <ul className="mt-auto space-y-3">
                    {capability.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[13px] font-medium text-text-primary"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-primary-700 py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid mask-fade-edges"
        />

        <div className="relative mx-auto max-w-[1280px] px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Architecture"
                title="How HELIOS works"
                description="We combine cutting-edge technology to deliver trustworthy intelligence for everyday people. The AI doesn’t just predict — it reflects, adapts, and aligns with your life goals."
                inverse
                className="mb-6"
              />

              <Reveal delay={0.1}>
                <p className="mb-8 text-[16px] leading-relaxed text-white/70">
                  The future isn’t just coded. It’s felt. HELIOS is AI with a
                  human heartbeat: explaining itself clearly, and helping you act
                  wisely.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <ButtonLink
                  href="/about"
                  variant="primary"
                  trailingIcon={<ArrowRight className="h-4 w-4" />}
                >
                  About the lab
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal variants={riseIn}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2 px-2">
                  <span className="h-2 w-2 rounded-full bg-accent-500" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Reasoning pipeline
                  </span>
                </div>
                <div className="aspect-[4/3] w-full">
                  <NeuralNetwork inverse />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Tech stack */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.title}
                variants={riseIn}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-accent-500/40 hover:bg-white/10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-transparent transition-transform duration-500 ease-standard group-hover:scale-x-100"
                />
                <span className="mb-4 inline-flex text-accent-500 transition-transform duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-110">
                  {tech.icon}
                </span>
                <h3 className="mb-1 text-[15px] font-bold">{tech.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/60">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <Reveal variants={riseIn}>
          <h2 className="mb-6 text-[32px] font-bold text-primary-700">
            Ready to empower your financial journey?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-[16px] text-text-secondary">
            Join the waitlist to be among the first to experience Bharat’s most
            intelligent financial companion.
          </p>
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div variants={fadeInUp}>
              <ButtonLink
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Join the waitlist
              </ButtonLink>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ButtonLink
                href="/about"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Learn about the labs
              </ButtonLink>
            </motion.div>
          </motion.div>
        </Reveal>
      </section>
    </Layout>
  );
}
