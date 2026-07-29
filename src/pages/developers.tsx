import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  BrainCircuit,
  Fingerprint,
  Target,
  GitBranch,
  ArrowRight,
  Code2,
  Workflow,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/shared/Seo';
import { HeroSection } from '@/components/ui/HeroSection';
import { Card, CardBody, SpotlightCard } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import Typewriter from '@/components/ui/Typewriter';
import { riseIn, staggerContainer, staggerFast, fadeInUp, VIEWPORT_ONCE } from '@/lib/motion';
import { siteConfig } from '@/lib/site';
import {
  breadcrumbSchema,
  buildJsonLd,
  organizationSchema,
  webPageSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  'Join HELIOS AI Labs to build ethical AI, explore reinforcement learning, and shape the future of finance. We hire engineers and researchers who question, shape and humanise AI.';

const researchAreas = [
  {
    title: 'Reinforcement learning',
    desc: 'For portfolio optimisation and dynamic risk modelling.',
  },
  {
    title: 'Generative AI',
    desc: 'Applied explicitly to scalable financial literacy and education.',
  },
  {
    title: 'Local language LLMs',
    desc: 'Coupled with explainable UX for Bharat’s diverse demographics.',
  },
  {
    title: 'Vector stores & memory',
    desc: 'Building long-term RL planning and persistent memory agents.',
  },
  {
    title: 'Human + AI co-pilots',
    desc: 'Systems designed for collaborative, better decision-making.',
  },
  {
    title: 'Behavioral alignment',
    desc: 'Research around regret bounds, reward shaping, and ethical nudges.',
  },
  {
    title: 'Humanised agents',
    desc: 'AI agents that feel native, transparent, and human — not robotic.',
  },
];

const researchTags = [
  'RL',
  'Federated Learning',
  'LLMs',
  'Embeddings',
  'Transformers',
  'Prompt Engineering',
  'Data Pipelines',
  'Interpretability',
];

const manifestoLines = [
  '01 / HELIOS runs on purpose-built code. We reject bloated frameworks in favour of precision, speed, and reliability.',
  '02 / It encourages safe, observable experiments. If an agent fails, we must know why, how, and exactly what parameter caused it.',
  '03 / It’s a playground for Bharat’s best minds to contribute to ethical AI finance. We build for the next billion users, not the top 1%.',
];

const jsonLd = buildJsonLd(
  organizationSchema(),
  webPageSchema({
    path: '/developers',
    title: 'Developers',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Developers', path: '/developers' },
  ])
);

export default function DevelopersPage() {
  return (
    <Layout>
      <Seo
        title="Developers"
        description={DESCRIPTION}
        path="/developers"
        jsonLd={jsonLd}
      />

      {/* Hero — deep technical vibe */}
      <HeroSection
        theme="inverse"
        badge="Engineering & Research"
        title={<RevealText text="HELIOS developers & thinkers" />}
        subtitle="We welcome engineers, researchers, and builders who care about the future of AI, intelligence, and meaningful design. We’re looking for people who don’t just want to “deploy a model” — but want to question, shape, and humanise AI in financial, educational, and social spaces."
        primaryAction={
          <ButtonLink
            href="/contact"
            variant="primary"
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" />}
          >
            Talk to us about roles
          </ButtonLink>
        }
        secondaryAction={
          <ButtonLink
            href={siteConfig.socials.github}
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20"
            leadingIcon={<GitBranch className="h-4 w-4" />}
          >
            Explore our GitHub
          </ButtonLink>
        }
      />

      {/* Research areas */}
      <section className="mx-auto max-w-[1280px] px-6 py-24">
        <SectionHeading
          eyebrow="Research surface"
          title={
            <span className="flex items-center gap-3">
              <Workflow className="h-6 w-6 shrink-0 text-accent-600" />
              What we explore together
            </span>
          }
          description="We operate at the intersection of complex data systems and human behavioural psychology. Our tech stack is built to support rigorous, scalable exploration."
          className="mb-12"
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {researchAreas.map((item) => (
            <motion.div
              key={item.title}
              variants={riseIn}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              className="group relative h-full overflow-hidden rounded-xl border border-border-default bg-surface-card p-5 transition-colors duration-300 hover:border-accent-500/40 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-transparent transition-transform duration-500 ease-standard group-hover:scale-x-100"
              />
              <Code2 className="mb-3 h-4 w-4 text-text-tertiary transition-colors duration-300 group-hover:text-accent-500" />
              <h3 className="mb-2 text-[14px] font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-text-secondary">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What we value */}
      <section className="border-y border-border-subtle bg-neutral-50 py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Principles"
            title="What we value"
            align="center"
            className="mb-16"
          />

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="grid gap-8 lg:grid-cols-3"
          >
            {/* Value 1 */}
            <motion.div variants={riseIn}>
              <Card
                variant="flat"
                className="h-full border-t-4 border-t-primary-700 bg-white"
              >
                <CardBody className="p-8">
                  <BrainCircuit className="mb-6 h-8 w-8 text-primary-700" />
                  <h3 className="mb-4 text-[20px] font-bold">
                    Research curiosity
                  </h3>
                  <p className="mb-6 text-[14px] leading-relaxed text-text-secondary">
                    We dig deep into the maths and the architecture. We don’t just
                    consume APIs; we build pipelines.
                  </p>
                  <motion.div
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="flex flex-wrap gap-2"
                  >
                    {researchTags.map((tag) => (
                      <motion.span
                        key={tag}
                        variants={fadeInUp}
                        className="cursor-default rounded bg-neutral-100 px-2 py-1 font-mono text-[11px] text-text-secondary transition-colors duration-200 hover:bg-accent-500 hover:text-white"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Value 2 */}
            <motion.div variants={riseIn}>
              <Card
                variant="flat"
                className="h-full border-t-4 border-t-accent-500 bg-white"
              >
                <CardBody className="p-8">
                  <Target className="mb-6 h-8 w-8 text-accent-600" />
                  <h3 className="mb-4 text-[20px] font-bold">Clean thought</h3>
                  <p className="mb-6 text-[14px] leading-relaxed text-text-secondary">
                    Simplicity over hype. Ethics and purpose. We write code that
                    is observable, maintainable, and explicitly designed to do no
                    harm.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[13px] font-medium">
                      <ShieldCheck className="h-4 w-4 text-success-500" /> Secure
                      architectures
                    </li>
                    <li className="flex items-center gap-2 text-[13px] font-medium">
                      <ShieldCheck className="h-4 w-4 text-success-500" />{' '}
                      Explicit fail-safes
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </motion.div>

            {/* Value 3 */}
            <motion.div variants={riseIn}>
              <Card
                variant="flat"
                className="h-full border-t-4 border-t-link-500 bg-white"
              >
                <CardBody className="p-8">
                  <Fingerprint className="mb-6 h-8 w-8 text-link-600" />
                  <h3 className="mb-4 text-[20px] font-bold">AI with soul</h3>
                  <p className="mb-6 text-[14px] leading-relaxed text-text-secondary">
                    Build agents that reflect, learn, and grow. Think like a
                    designer, act like an engineer.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[13px] font-medium">
                      <Sparkles className="h-4 w-4 text-link-500" />{' '}
                      Human-centred feedback loops
                    </li>
                    <li className="flex items-center gap-2 text-[13px] font-medium">
                      <Sparkles className="h-4 w-4 text-link-500" /> Culturally
                      aware responses
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Developer manifesto — terminal */}
      <section className="mx-auto max-w-[1024px] px-6 py-24">
        <Reveal variants={riseIn}>
          <SpotlightCard
            tilt={3}
            inverse
            glow="rgba(249, 115, 22, 0.22)"
            className="overflow-hidden border-primary-600 bg-primary-800 shadow-8"
          >
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 border-b border-primary-700 bg-primary-900 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-error-500" />
              <span className="h-3 w-3 rounded-full bg-warning-500" />
              <span className="h-3 w-3 rounded-full bg-success-500" />
              <span className="ml-4 font-mono text-[12px] text-white/50">
                MANIFESTO.md
              </span>
            </div>

            {/* Terminal body */}
            <div className="flex flex-col gap-8 p-8 font-mono text-white md:p-12">
              <div>
                <div className="mb-4 flex items-center gap-3 text-accent-500">
                  <Terminal className="h-6 w-6" />
                  <h2 className="font-sans text-[24px] font-bold tracking-tight">
                    Developer manifesto
                  </h2>
                </div>
                <div className="h-1 w-12 bg-accent-500/50" />
              </div>

              <Typewriter
                lines={manifestoLines}
                className="text-[14px] leading-relaxed text-white/80"
              />

              <div className="border-t border-primary-700 pt-8">
                <p className="mb-4 text-[12px] text-white/40">
                  ~ % ./join_mission.sh
                </p>
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  className="font-sans"
                  trailingIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Apply as an engineer
                </ButtonLink>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </section>
    </Layout>
  );
}
