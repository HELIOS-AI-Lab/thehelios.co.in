import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Cpu,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Handshake,
  GraduationCap,
  Network,
  Check,
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/shared/Seo';
import { HeroSection } from '@/components/ui/HeroSection';
import { Card, CardBody, SpotlightCard } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  riseIn,
  staggerContainer,
  VIEWPORT_ONCE,
} from '@/lib/motion';
import { absoluteUrl } from '@/lib/site';
import {
  breadcrumbSchema,
  buildJsonLd,
  organizationSchema,
  webPageSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  'Discover the mission, vision and team behind HELIOS AI Labs — a research lab building explainable, self-evolving AI agents for finance, education and public systems.';

const leadership = [
  {
    name: 'Srikanth Bommaraveni',
    role: 'Founder & Lead AI Architect',
    years: 9,
    bio: [
      'Srikanth brings 9+ years of experience in data science, machine learning, and intelligent systems. His work spans healthcare, telecom, and finance — integrating reinforcement learning, generative AI, and interpretable ML to build agents that adapt and act in dynamic, real-world environments.',
      'At HELIOS, he leads the vision of creating modular, explainable, and self-evolving AI agents — designed to think, learn, and improve continuously across domains.',
    ],
  },
  {
    name: 'Srinivas Dharani',
    role: 'Partner & AI-Driven Data Architect',
    years: 8,
    bio: [
      'Srinivas brings 8+ years of expertise in data engineering, cloud architecture, and intelligent automation. His work spans large-scale data platforms, AWS ecosystems, and AI-powered solutions — transforming complex business challenges into scalable, production-ready systems.',
      'At HELIOS AI Labs, he focuses on building next-generation data and AI infrastructures that enable organisations to turn data into intelligence, automation, and measurable business impact.',
    ],
  },
];

const teams = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: 'AI & MLOps engineers',
    description:
      'Our engineering team brings 4+ years of expertise in full-stack DevOps, backend systems, and MLOps. They specialise in the secure, scalable deployment of machine learning pipelines, including real-time analytics platforms for high-frequency data environments.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Data science & analytics',
    description:
      'From anomaly detection to portfolio risk modelling, our data science unit combines deep mathematical modelling with real-time feedback systems and interpretable AI — ensuring all agent decisions stay aligned with evolving market and user behaviours.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Quality assurance & testing',
    description:
      'At HELIOS, quality is embedded from day one. Our QA engineers rigorously test every system for stability, performance, and safety — across edge cases, live deployments, and high-load conditions — to ensure our AI agents remain reliable, transparent, and robust.',
  },
];

const audiences = [
  {
    icon: <Handshake className="h-6 w-6" />,
    title: 'Strategic investors',
    description: 'Who value depth, research, and long-term vision over hype.',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Researchers',
    description:
      'Passionate about ethical, interpretable, and reinforcement-driven AI.',
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: 'Partners & collaborators',
    description:
      'Who want to shape the future of finance and intelligent decision-making.',
  },
];

const visionPoints = [
  'Learn and adapt continuously',
  'Collaborate with humans, not override them',
  'Simplify complex financial and operational systems',
  'Act with transparency and explainability',
];

// The founder/partner profiles are surfaced to search engines as Person nodes
// attached to the Organization, which is what powers knowledge-panel linkage.
const peopleSchema = leadership.map((person) => ({
  '@type': 'Person',
  name: person.name,
  jobTitle: person.role,
  worksFor: { '@id': `${absoluteUrl('/')}#organization` },
  description: person.bio[0],
}));

const jsonLd = buildJsonLd(
  organizationSchema(),
  ...peopleSchema,
  webPageSchema({
    path: '/about',
    title: 'About Us',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ])
);

export default function AboutPage() {
  return (
    <Layout>
      <Seo
        title="About Us"
        description={DESCRIPTION}
        path="/about"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <HeroSection
        theme="light"
        alignment="left"
        badge="Who we are"
        title={<RevealText text="Welcome to HELIOS AI Labs" />}
        subtitle="We are a future-facing lab — open to collaborators, researchers, and believers in the power of intelligence."
      />

      {/* Mission & vision */}
      <section className="mx-auto max-w-[1280px] border-b border-border-subtle px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Mission */}
          <Reveal variants={fadeInLeft}>
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-accent-50 text-accent-700">
                <Target className="h-5 w-5" />
              </span>
              <h2 className="text-[22px] font-bold text-primary-700 sm:text-[26px]">
                Our mission
              </h2>
            </div>
            <div className="space-y-4 text-[14px] leading-relaxed text-text-secondary sm:text-[15px]">
              <p>
                At HELIOS AI Labs, our mission is to build the next generation of
                intelligent, explainable, and self-evolving AI agents — capable
                of solving complex, real-world challenges across finance,
                education, public systems, and beyond.
              </p>
              <p>
                Rooted in deep reinforcement learning, generative AI, and modular
                architectures, we are designing systems that learn continuously,
                adapt responsibly, and empower human decision-making — not
                replace it.
              </p>
              <p className="font-medium text-text-primary">
                Starting with Bharat and scaling globally, HELIOS is committed to
                making AI not just powerful, but purposeful — a true companion in
                shaping the future of insight, action, and trust.
              </p>
            </div>
          </Reveal>

          {/* Vision */}
          <Reveal variants={fadeInRight}>
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-link-50 text-link-700">
                <Eye className="h-5 w-5" />
              </span>
              <h2 className="text-[22px] font-bold text-primary-700 sm:text-[26px]">
                Our vision
              </h2>
            </div>
            <div className="space-y-4 text-[14px] leading-relaxed text-text-secondary sm:text-[15px]">
              <p>
                To lead Bharat’s transformation into an AI-empowered economy by
                building transparent, self-evolving agents that support
                decision-makers — not replace them. We envision a world where
                intelligent agents:
              </p>

              <motion.ul
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="mt-4 space-y-2.5"
              >
                {visionPoints.map((point) => (
                  <motion.li
                    key={point}
                    variants={fadeInUp}
                    className="flex items-start gap-2.5 font-medium text-text-primary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                    {point}
                  </motion.li>
                ))}
              </motion.ul>

              <p className="mt-4">
                Whether it’s optimising portfolios, reducing risk exposure, or
                automating due diligence, HELIOS AI Labs is committed to
                human-centred AI that drives long-term value — not short-term
                hype.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="The people"
          title="Meet the team"
          description="We are a collective of engineers, researchers, and data scientists dedicated to building AI the right way."
          className="mb-10 sm:mb-12 lg:mb-16"
        />

        {leadership.map((person) => (
          <Reveal key={person.name} variants={riseIn} className="mb-8 sm:mb-12">
            <Card variant="flat" className="items-stretch md:flex">
              <div className="relative flex shrink-0 flex-col justify-center overflow-hidden border-b border-border-default bg-neutral-100 p-6 sm:p-8 md:w-[260px] md:border-b-0 md:border-r lg:w-[320px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-grid-light bg-grid-sm opacity-60"
                />
                <div className="relative">
                  <h3 className="mb-1 text-[20px] font-bold text-primary-700 sm:text-[22px]">
                    {person.name}
                  </h3>
                  <p className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-accent-700 sm:text-[13px]">
                    {person.role}
                  </p>
                  <p className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border-default bg-white px-2.5 py-1 text-[12px] font-medium">
                    <AnimatedCounter value={person.years} suffix="+" />
                    <span>years experience</span>
                  </p>
                </div>
              </div>
              <CardBody className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
                {person.bio.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[14px] leading-relaxed text-text-secondary sm:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </CardBody>
            </Card>
          </Reveal>
        ))}

        {/* Core team grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {teams.map((team) => (
            <motion.div key={team.title} variants={riseIn}>
              <SpotlightCard className="h-full p-5 sm:p-6" tilt={4}>
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded bg-neutral-100 text-text-primary transition-all duration-300 ease-spring group-hover/spot:scale-110 group-hover/spot:bg-accent-500 group-hover/spot:text-white">
                  {team.icon}
                </span>
                <h3 className="mb-3 text-[16px] font-bold">{team.title}</h3>
                <p className="text-[14px] leading-relaxed text-text-secondary">
                  {team.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why now, why us */}
      <section className="relative overflow-hidden bg-primary-700 py-16 text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid mask-fade-edges"
        />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why now"
            title="Why now, why us?"
            description="HELIOS AI Labs is still early in its journey — but we’re moving with intention."
            align="center"
            inverse
            className="mb-6"
          />

          <Reveal delay={0.1}>
            <p className="mx-auto mb-10 max-w-3xl text-center text-[15px] leading-relaxed text-white/70 sm:mb-12 sm:text-[16px] lg:mb-16">
              Our prototypes are live, our research is in motion, and our vision
              aligns with the urgent need for intelligent, explainable systems
              across finance and beyond. We’re looking to connect with those who
              believe in building AI the right way.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mb-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:mb-16 lg:grid-cols-3"
          >
            {audiences.map((audience) => (
              <motion.div
                key={audience.title}
                variants={riseIn}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-accent-500/40 hover:bg-white/10 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-transparent transition-transform duration-500 ease-standard group-hover:scale-x-100"
                />
                <span className="mb-4 inline-flex text-accent-500 transition-transform duration-300 ease-spring group-hover:-rotate-6 group-hover:scale-110">
                  {audience.icon}
                </span>
                <h3 className="mb-2 text-[16px] font-bold">{audience.title}</h3>
                <p className="text-[14px] text-white/70">
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <Reveal className="text-center">
            <div className="inline-flex w-full flex-col items-center sm:w-auto">
              <p className="mb-6 text-[16px] font-semibold sm:text-[18px]">
                If this resonates with you — we’d love to talk.
              </p>
              <ButtonLink
                href="/contact"
                variant="primary"
                size="lg"
                trailingIcon={<ArrowRight className="h-4 w-4" />}
              >
                Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
