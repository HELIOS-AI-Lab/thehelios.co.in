'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
  Network
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import { HeroSection } from '@/components/ui/HeroSection';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Motion variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About Us | HELIOS AI Labs</title>
        <meta name="description" content="Discover the mission, vision, and team behind HELIOS AI Labs." />
      </Head>

      {/* Hero Section */}
      <motion.div initial="initial" animate="whileInView" variants={staggerContainer}>
        <HeroSection
          theme="light"
          // badge="Who We Are"
          alignment="left"
          title="Welcome To HELIOS AI Labs"
          subtitle="We are a future-facing lab—open to collaborators, researchers, and believers in the power of intelligence."
        />
      </motion.div>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 max-w-[1280px] mx-auto border-b border-border-subtle">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Mission */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-accent-50 text-accent-700 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-[26px] font-bold text-primary-700">Our Mission</h2>
            </div>
            <div className="space-y-4 text-[15px] text-text-secondary leading-relaxed">
              <p>
                At HELIOS AI Labs, our mission is to build the next generation of intelligent, explainable, and self-evolving AI agents — capable of solving complex, real-world challenges across finance, education, public systems, and beyond.
              </p>
              <p>
                Rooted in deep reinforcement learning, generative AI, and modular architectures, we are designing systems that learn continuously, adapt responsibly, and empower human decision-making — not replace it.
              </p>
              <p className="font-medium text-text-primary">
                Starting with Bharat and scaling globally, HELIOS is committed to making AI not just powerful, but purposeful—a true companion in shaping the future of insight, action, and trust.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-link-50 text-link-700 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-[26px] font-bold text-primary-700">Our Vision</h2>
            </div>
            <div className="space-y-4 text-[15px] text-text-secondary leading-relaxed">
              <p>
                To lead Bharat’s transformation into an AI-empowered economy by building transparent, self-evolving agents that support decision-makers — not replace them. We envision a world where intelligent agents:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-text-primary font-medium mt-4">
                <li>Learn and adapt continuously</li>
                <li>Collaborate with humans, not override them</li>
                <li>Simplify complex financial and operational systems</li>
                <li>Act with transparency and explainability</li>
              </ul>
              <p className="mt-4">
                Whether it's optimizing portfolios, reducing risk exposure, or automating due diligence, HELIOS AI Labs is committed to human-centered AI that drives long-term value — not short-term hype.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="mb-16">
          <h2 className="text-[32px] font-bold tracking-tight mb-4 text-primary-700">Meet the Team</h2>
          <p className="text-text-secondary text-[16px] max-w-[720px]">
            We are a collective of engineers, researchers, and data scientists dedicated to building AI the right way.
          </p>
        </motion.div>

        {/* Founder Card (Prominent) */}
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="mb-12">
          <Card variant="flat" className="md:flex items-stretch">
            <div className="bg-neutral-100 md:w-[320px] shrink-0 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border-default">
              <h3 className="text-[22px] font-bold text-primary-700 mb-1">Srikanth Bommaraveni</h3>
              <p className="text-[13px] font-semibold uppercase tracking-wider text-accent-700 mb-4">Founder & Lead AI Architect</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-border-default text-[12px] font-medium w-fit">
                9+ Years Experience
              </div>
            </div>
            <CardBody className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
                Srikanth brings over 9+ years of experience in data science, machine learning, and intelligent systems. His work spans healthcare, telecom, and finance — integrating reinforcement learning, generative AI, and interpretable ML to build agents that adapt and act in dynamic, real-world environments.
              </p>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                At HELIOS, he leads the vision of creating modular, explainable, and self-evolving AI agents — designed to think, learn, and improve continuously across domains.
              </p>
            </CardBody>
          </Card>
        </motion.div>

        {/* Core Team Grid */}
        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          whileInView="whileInView" 
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* MLOps */}
          <motion.div variants={fadeInUp}>
            <Card variant="interactive" className="h-full">
              <CardBody className="p-6">
                <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center mb-5 text-text-primary">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-[16px] font-bold mb-3">AI & MLOps Engineers</h4>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  Our engineering team brings 4+ years of expertise in full-stack DevOps, backend systems, and MLOps. They specialize in the secure, scalable deployment of machine learning pipelines, including real-time analytics platforms for high-frequency data environments.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Data Science */}
          <motion.div variants={fadeInUp}>
            <Card variant="interactive" className="h-full">
              <CardBody className="p-6">
                <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center mb-5 text-text-primary">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="text-[16px] font-bold mb-3">Data Science & Analytics</h4>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  From anomaly detection to portfolio risk modeling, our data science unit combines deep mathematical modeling with real-time feedback systems and interpretable AI — ensuring all agent decisions stay aligned with evolving market and user behaviors.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* QA */}
          <motion.div variants={fadeInUp}>
            <Card variant="interactive" className="h-full">
              <CardBody className="p-6">
                <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center mb-5 text-text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-[16px] font-bold mb-3">Quality Assurance & Testing</h4>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  At HELIOS, quality is embedded from day one. Our QA engineers rigorously test every system for stability, performance, and safety — across edge cases, live deployments, and high-load conditions — to ensure our AI agents remain reliable, transparent, and robust.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Now, Why Us Section */}
      <section className="py-24 bg-primary-700 text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] font-bold mb-6">Why Now, Why Us?</h2>
            <p className="text-[18px] text-white/80 leading-relaxed mb-4">
              HELIOS AI Labs is still early in its journey — but we’re moving with intention.
            </p>
            <p className="text-[16px] text-white/70 leading-relaxed">
              Our prototypes are live, our research is in motion, and our vision aligns with the urgent need for intelligent, explainable systems across finance and beyond. We’re looking to connect with those who believe in building AI the right way.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {/* Investors */}
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded-lg p-8">
              <Handshake className="w-6 h-6 text-accent-500 mb-4" />
              <h4 className="text-[16px] font-bold mb-2">Strategic Investors</h4>
              <p className="text-[14px] text-white/70">Who value depth, research, and long-term vision over hype.</p>
            </motion.div>

            {/* Researchers */}
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded-lg p-8">
              <GraduationCap className="w-6 h-6 text-accent-500 mb-4" />
              <h4 className="text-[16px] font-bold mb-2">Researchers</h4>
              <p className="text-[14px] text-white/70">Passionate about ethical, interpretable, and reinforcement-driven AI.</p>
            </motion.div>

            {/* Partners */}
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded-lg p-8">
              <Network className="w-6 h-6 text-accent-500 mb-4" />
              <h4 className="text-[16px] font-bold mb-2">Partners & Collaborators</h4>
              <p className="text-[14px] text-white/70">Who want to shape the future of finance and intelligent decision-making.</p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="text-center">
            <div className="inline-flex flex-col items-center">
              <p className="text-[18px] font-semibold mb-6">If this resonates with you — we’d love to talk.</p>
              <Link href="/contact">
                <Button variant="primary" size="lg" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}