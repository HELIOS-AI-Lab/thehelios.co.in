import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  LineChart,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/shared/Seo';
import { HeroSection } from '@/components/ui/HeroSection';
import { ButtonLink } from '@/components/ui/Button';
import { FeatureGrid, FeatureItem } from '@/components/ui/FeatureGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SpotlightCard } from '@/components/ui/Card';
import Marquee from '@/components/visuals/Marquee';
import MarketSparkline from '@/components/visuals/MarketSparkline';
import NeuralNetwork from '@/components/visuals/NeuralNetwork';
import { fadeInUp, riseIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motion';
import { siteConfig } from '@/lib/site';
import {
  buildJsonLd,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  'HELIOS AI Labs builds explainable, self-evolving AI agents across learning, wealth and innovation — designed to empower human decision-making, not replace it.';

const BUILT_WITH = ['AWS', 'Azure', 'RDKit', 'GPT-4', 'PyTorch', 'Kubernetes'];

const capabilities = [
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: 'AI intelligence',
    description:
      'GPT-based explainable agents featuring local language voice and chat, plus real-time market reasoning.',
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: 'Financial analytics',
    description:
      'Advanced portfolio tracking, SIP modelling and goal-based plans with built-in safety rails.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Behavioral nudging',
    description:
      "Emotion-aware nudges and frictionless, low-cost investment plans adapted for Bharat's culture.",
  },
];

const jsonLd = buildJsonLd(
  organizationSchema(),
  websiteSchema(),
  webPageSchema({
    path: '/',
    title: 'HELIOS AI Labs | Transform Your Financial Future',
    description: DESCRIPTION,
  })
);

export default function HomePage() {
  return (
    <Layout>
      <Seo
        title="HELIOS AI Labs | Transform Your Financial Future"
        description={DESCRIPTION}
        path="/"
        jsonLd={jsonLd}
      />

      {/* Hero — high-impact inverse theme */}
      <HeroSection
        theme="inverse"
        badge="Bharat’s Open AI Wealth Engine"
        title={
          <>
            <RevealText text="Transform your financial" />
            <br />
            <RevealText text="future with AI" className="text-accent-500" />
          </>
        }
        subtitle="HELIOS AI Labs is building the next era of intelligence — across learning, wealth, and innovation. We design self-evolving agents that empower human decision-making."
        primaryAction={
          <ButtonLink
            href={siteConfig.product.url}
            variant="primary"
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore Bharat’s AI
          </ButtonLink>
        }
        secondaryAction={
          <ButtonLink
            href="/developers"
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20"
          >
            Read the manifesto
          </ButtonLink>
        }
        footer={
          // Stacks below `sm` — three columns at 390px squeezes the labels to
          // three lines each and the numbers lose their impact
          <div className="mx-auto grid max-w-2xl grid-cols-1 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: 9, suffix: '+', label: 'Years of founder experience' },
              { value: 100, suffix: '%', label: 'Explainable decisions' },
              { value: 4, suffix: '', label: 'Active research tracks' },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-5 text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="block text-[26px] font-bold text-accent-500"
                />
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        }
      />

      {/* Trust strip */}
      <section
        aria-label="Technologies we build with"
        className="border-b border-border-subtle bg-neutral-50 py-8"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 md:flex-row md:gap-10">
          <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
            Built with
          </span>
          <Marquee className="flex-1" duration={28}>
            {BUILT_WITH.map((tech) => (
              <span
                key={tech}
                className="mx-8 font-mono text-lg font-bold text-text-tertiary transition-colors duration-300 hover:text-primary-700"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="mx-auto max-w-[1280px] px-6 py-24">
        <SectionHeading
          eyebrow="What we build"
          title="Core capabilities"
          description="We combine reinforcement learning, financial literacy, and local language AI to make wealth creation and decision-making accessible to all."
          action={
            <ButtonLink
              href="/product"
              variant="tertiary"
              trailingIcon={<ArrowRight className="h-4 w-4" />}
            >
              View technical specs
            </ButtonLink>
          }
          className="mb-16"
        />

        <FeatureGrid columns={3}>
          {capabilities.map((capability, i) => (
            <FeatureItem key={capability.title} index={i + 1} {...capability} />
          ))}
        </FeatureGrid>
      </section>

      {/* Compounding intelligence — domain visual */}
      <section className="border-y border-border-subtle bg-surface-sunken py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Compounding intelligence"
              title="Every decision the agent makes, it can explain"
              description="Our agents model your goals continuously, rebalance against risk, and show their reasoning in your own language — so the growth curve is something you understand rather than something you hope for."
              className="mb-8"
            />

            <motion.ul
              variants={staggerContainer(0.09)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="flex flex-col gap-4"
            >
              {[
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  text: 'Reasoning traces attached to every recommendation',
                },
                {
                  icon: <ShieldCheck className="h-4 w-4" />,
                  text: 'Hard risk thresholds the model cannot override',
                },
                {
                  icon: <LineChart className="h-4 w-4" />,
                  text: 'Goal-based projections that adapt as your life does',
                },
              ].map((item) => (
                <motion.li
                  key={item.text}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-[15px] font-medium text-text-primary"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                    {item.icon}
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Reveal variants={riseIn}>
            <SpotlightCard className="p-6" tilt={4}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                    Modelled portfolio
                  </p>
                  <p className="mt-1 text-[24px] font-bold text-primary-700">
                    <AnimatedCounter value={121} prefix="₹" suffix="K" />
                    <span className="ml-2 align-middle text-[13px] font-semibold text-success-500">
                      +218%
                    </span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-default bg-surface-sunken px-2.5 py-1 text-[11px] font-semibold text-text-secondary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-success-500 animate-ping-ring" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" />
                  </span>
                  Simulated
                </span>
              </div>

              <div className="h-[200px] w-full">
                <MarketSparkline />
              </div>

              <p className="mt-4 border-t border-border-subtle pt-4 text-[12px] leading-relaxed text-text-tertiary">
                Illustrative projection from a goal-based SIP model. Not
                investment advice, and not a forecast of returns.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* Mission callout */}
      <section className="relative overflow-hidden bg-primary-700 py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid mask-fade-edges"
        />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-16 px-6 md:grid-cols-2">
          <div>
            <Reveal>
              <span className="mb-6 inline-block rounded bg-accent-500 px-3 py-1 text-[11px] font-bold uppercase text-primary-700">
                Our deeper purpose
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <blockquote className="mb-6 text-[30px] font-bold leading-tight md:text-[36px]">
                <p>
                  “We’re not just building a product. We’re training a generation
                  of confident investors.”
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mb-8 text-[18px] leading-relaxed text-white/70">
                HELIOS empowers every Indian — regardless of income or education —
                to understand and grow their money. AI should feel personal, not
                robotic.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ButtonLink
                href="/about"
                variant="secondary"
                className="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20"
                trailingIcon={<ArrowRight className="h-4 w-4" />}
              >
                How we work
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal variants={riseIn} className="relative">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 px-2">
                <span className="h-2 w-2 rounded-full bg-accent-500" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Agent topology
                </span>
              </div>
              <div className="aspect-[4/3] w-full">
                <NeuralNetwork inverse />
              </div>
            </div>
            {/* Warm halo behind the diagram */}
            <div
              aria-hidden="true"
              className="aurora-blob animate-aurora absolute -inset-8 -z-10 bg-accent-500/20"
            />
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-24">
        <Reveal variants={riseIn}>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border-default bg-surface-card p-12 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent-50 to-transparent"
            />
            <div className="relative">
              <h2 className="mb-4 text-[32px] font-bold">
                Join the HELIOS journey
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-[16px] text-text-secondary">
                We’re a future-facing lab — open to collaborators, researchers,
                and believers in the power of intelligence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ButtonLink href="/contact" variant="primary" size="lg">
                  Get started today
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.socials.linkedin}
                  variant="secondary"
                  size="lg"
                >
                  Follow for updates
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
