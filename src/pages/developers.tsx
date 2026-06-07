'use client';

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Database, 
  BrainCircuit, 
  Fingerprint, 
  Target, 
  GitBranch,
  ArrowRight,
  Code2,
  Workflow,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import { HeroSection } from '@/components/ui/HeroSection';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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

export default function DevelopersPage() {
  return (
    <Layout>
      <Head>
        <title>Developers | HELIOS AI Labs</title>
        <meta name="description" content="Join HELIOS AI Labs to build ethical AI, explore reinforcement learning, and shape the future of finance." />
      </Head>

      {/* Hero Section - Deep Technical Vibe */}
      <HeroSection
        theme="inverse"
        badge="Engineering & Research"
        title="HELIOS Developers & Thinkers"
        subtitle="We welcome engineers, researchers, and builders who care about the future of AI, intelligence, and meaningful design. We're looking for people who don’t just want to 'deploy a model' — but want to question, shape, and humanize AI in financial, educational, and social spaces."
        primaryAction={
          <Button variant="primary" size="lg" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            View Open Roles
          </Button>
        }
        secondaryAction={
          <Button variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" leadingIcon={<GitBranch className="w-4 h-4" />}>
            Read the Docs
          </Button>
        }
      />

      {/* What We Explore Together - Tech Stack / Research Areas */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="mb-12">
          <h2 className="text-[28px] font-bold text-primary-700 mb-4 flex items-center gap-3">
            <Workflow className="w-6 h-6 text-accent-600" />
            What We Explore Together
          </h2>
          <p className="text-text-secondary max-w-2xl text-[15px]">
            We operate at the intersection of complex data systems and human behavioral psychology. Our tech stack is built to support rigorous, scalable exploration.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          whileInView="whileInView" 
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            { title: 'Reinforcement Learning', desc: 'For portfolio optimization and dynamic risk modeling.' },
            { title: 'Generative AI', desc: 'Applied explicitly for scalable financial literacy and education.' },
            { title: 'Local Language LLMs', desc: 'Coupled with explainable UX for Bharat’s diverse demographics.' },
            { title: 'Vector Stores & Memory', desc: 'Building long-term RL planning and persistent memory agents.' },
            { title: 'Human + AI Co-pilots', desc: 'Systems designed for collaborative, better decision making.' },
            { title: 'Behavioral Alignment', desc: 'Research around regret bounds, reward shaping, and ethical nudges.' },
            { title: 'Humanized Agents', desc: 'AI agents that feel native, transparent, and human — not robotic.' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="p-5 border border-border-default bg-surface-card hover:border-border-strong transition-colors h-full rounded">
                <Code2 className="w-4 h-4 text-text-tertiary mb-3" />
                <h4 className="text-[14px] font-bold text-text-primary mb-2">{item.title}</h4>
                <p className="text-[13px] text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What We Value Section */}
      <section className="py-24 bg-neutral-50 border-y border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-primary-700">What We Value</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView" 
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Value 1 */}
            <motion.div variants={fadeInUp}>
              <Card variant="flat" className="h-full bg-white border-t-4 border-t-primary-700">
                <CardBody className="p-8">
                  <BrainCircuit className="w-8 h-8 text-primary-700 mb-6" />
                  <h3 className="text-[20px] font-bold mb-4">Research Curiosity</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                    We dig deep into the math and the architecture. We don't just consume APIs; we build pipelines.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['RL', 'Federated Learning', 'LLMs', 'Embeddings', 'Transformers', 'Prompt Engineering', 'Data Pipelines', 'Interpretability'].map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-neutral-100 text-text-secondary text-[11px] font-mono rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Value 2 */}
            <motion.div variants={fadeInUp}>
              <Card variant="flat" className="h-full bg-white border-t-4 border-t-accent-500">
                <CardBody className="p-8">
                  <Target className="w-8 h-8 text-accent-600 mb-6" />
                  <h3 className="text-[20px] font-bold mb-4">Clean Thought</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                    Simplicity over hype. Ethics + Purpose. We write code that is observable, maintainable, and explicitly designed to do no harm.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[13px] font-medium"><ShieldCheck className="w-4 h-4 text-success-500" /> Secure architectures</li>
                    <li className="flex items-center gap-2 text-[13px] font-medium"><ShieldCheck className="w-4 h-4 text-success-500" /> Explicit fail-safes</li>
                  </ul>
                </CardBody>
              </Card>
            </motion.div>

            {/* Value 3 */}
            <motion.div variants={fadeInUp}>
              <Card variant="flat" className="h-full bg-white border-t-4 border-t-link-500">
                <CardBody className="p-8">
                  <Fingerprint className="w-8 h-8 text-link-600 mb-6" />
                  <h3 className="text-[20px] font-bold mb-4">AI With Soul</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                    Build agents that reflect, learn, and grow. Think like a designer, act like an engineer.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[13px] font-medium"><Sparkles className="w-4 h-4 text-link-500" /> Human-centered feedback loops</li>
                    <li className="flex items-center gap-2 text-[13px] font-medium"><Sparkles className="w-4 h-4 text-link-500" /> Culturally aware responses</li>
                  </ul>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Developer Manifesto - Terminal Style */}
      <section className="py-24 px-6 max-w-[1024px] mx-auto">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          <div className="bg-primary-800 rounded-lg overflow-hidden shadow-8 border border-primary-600">
            {/* Terminal Header */}
            <div className="bg-primary-900 px-4 py-3 border-b border-primary-700 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error-500" />
              <div className="w-3 h-3 rounded-full bg-warning-500" />
              <div className="w-3 h-3 rounded-full bg-success-500" />
              <span className="ml-4 font-mono text-[12px] text-white/50">MANIFESTO.md</span>
            </div>
            
            {/* Terminal Body */}
            <div className="p-8 md:p-12 text-white font-mono flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 text-accent-500 mb-4">
                  <Terminal className="w-6 h-6" />
                  <h2 className="text-[24px] font-bold tracking-tight font-sans">Developer Manifesto</h2>
                </div>
                <div className="w-12 h-1 bg-accent-500/50" />
              </div>
              
              <div className="space-y-6 text-[14px] leading-relaxed text-white/80">
                <p className="flex items-start gap-4">
                  <span className="text-accent-500 shrink-0">01 /</span>
                  <span>HELIOS runs on purpose-built code. We reject bloated frameworks in favor of precision, speed, and reliability.</span>
                </p>
                <p className="flex items-start gap-4">
                  <span className="text-accent-500 shrink-0">02 /</span>
                  <span>It encourages safe, observable experiments. If an agent fails, we must know why, how, and exactly what parameter caused it.</span>
                </p>
                <p className="flex items-start gap-4">
                  <span className="text-accent-500 shrink-0">03 /</span>
                  <span>It’s a playground for Bharat’s best minds to contribute to ethical AI finance. We build for the next billion users, not the top 1%.</span>
                </p>
              </div>

              <div className="pt-8 border-t border-primary-700">
                <p className="text-[12px] text-white/40 mb-4">~ % ./join_mission.sh</p>
                <Button variant="primary" size="md" className="font-sans">
                  Apply as an Engineer
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </Layout>
  );
}