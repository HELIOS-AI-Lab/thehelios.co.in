'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BrainCircuit, 
  LineChart, 
  Zap, 
  Globe, 
  Link
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import { HeroSection } from '@/components/ui/HeroSection';
import { Button } from '@/components/ui/Button';
import { FeatureGrid, FeatureItem } from '@/components/ui/FeatureGrid';

// Animation variants for "Industry Motion" feel
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } // Custom ease-out expo
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>HELIOS AI Labs | Transform Your Financial Future</title>
        <meta name="description" content="HELIOS AI Labs is building the next era of intelligence across learning, wealth, and innovation." />
        <link rel="icon" type="image/png" href="/helios-ai-logo.png" />
      </Head>

      {/* Hero Section - High Impact Inverse Theme */}
      <motion.div 
        initial="initial" 
        animate="animate" 
        variants={staggerContainer}
      >
        <HeroSection
          theme="inverse"
          // badge="Now Live: Bharat's Open AI Wealth Engine"
          title={
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
              <span>
                Transform Your Financial <br />
                <span className="text-accent-500">Future with AI</span>
              </span>
            </motion.div>
          }
          subtitle={
            <motion.span variants={fadeInUp}>
              HELIOS AI Labs is building the next era of intelligence—across learning, 
              wealth, and innovation. We design self-evolving agents that empower 
              human decision-making.
            </motion.span>
          }
          primaryAction={
            <motion.div variants={fadeInUp}>
              <a href="https://helios-tech.co.in/">
              <Button variant="primary" size="lg" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Bharat's AI
              </Button>
              </a>
            </motion.div>
          }
          secondaryAction={
            <motion.div variants={fadeInUp}>
              <Button variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Read the Manifesto
              </Button>
            </motion.div>
          }
        />
      </motion.div>

      {/* Trust Bar / Stats - Utilitarian Style */}
      <section className="py-8 border-b border-border-subtle bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-text-tertiary">Trusted by builders at</span>
          <div className="flex gap-12 items-center">
            <span className="font-mono font-bold text-lg">AWS</span>
            <span className="font-mono font-bold text-lg">AZURE</span>
            <span className="font-mono font-bold text-lg">RDKIT</span>
            <span className="font-mono font-bold text-lg">GPT-4</span>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[32px] font-bold tracking-tight mb-4 text-primary-700">
              Core Capabilities
            </h2>
            <p className="text-text-secondary text-[16px] leading-relaxed">
              We combine Reinforcement Learning, Financial Literacy, and Local Language AI 
              to make wealth creation and decision-making accessible to all.
            </p>
          </div>
          <Button variant="tertiary" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            View technical specs
          </Button>
        </div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <FeatureGrid columns={3}>
            <motion.div variants={fadeInUp}>
              <FeatureItem 
                icon={<BrainCircuit className="w-5 h-5" />}
                title="AI Intelligence"
                description="GPT-based explainable agents featuring local language voice/chat and real-time market reasoning."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureItem 
                icon={<LineChart className="w-5 h-5" />}
                title="Financial Analytics"
                description="Advanced portfolio tracking, SIP modeling, and goal-based plans with built-in safety rails."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureItem 
                icon={<Zap className="w-5 h-5" />}
                title="Behavioural Nudging"
                description="Emotion-aware nudges and frictionless, low-cost investment plans adapted for Bharat’s culture."
              />
            </motion.div>
          </FeatureGrid>
        </motion.div>
      </section>

      {/* Mission Callout - Dense Border-based UI */}
      <section className="py-20 bg-primary-700 text-white overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded bg-accent-500 text-primary-700 font-bold text-[11px] uppercase mb-6">
              Our Deeper Purpose
            </div>
            <h3 className="text-[36px] font-bold leading-tight mb-6">
              "We’re not just building a product. We’re training a generation of confident investors."
            </h3>
            <p className="text-white/70 text-[18px] leading-relaxed mb-8">
              HELIOS empowers every Indian — regardless of income or education — 
              to understand and grow their money. AI should feel personal, not robotic.
            </p>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-accent-500 text-[24px] font-bold">9+ Years</span>
                <span className="text-white/50 text-[12px] uppercase font-semibold">AI Research</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-8">
                <span className="text-accent-500 text-[24px] font-bold">100%</span>
                <span className="text-white/50 text-[12px] uppercase font-semibold">Explainable AI</span>
              </div>
            </div>
          </div>
          
          {/* Abstract Technical Visual (CSS Only) */}
          <div className="relative aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center">
            <div className="absolute inset-0 animate-pulse bg-accent-500/5 rounded-full" />
            <div className="w-3/4 h-3/4 border border-white/20 rounded-full flex items-center justify-center rotate-45">
               <Globe className="w-24 h-24 text-accent-500 opacity-50" strokeWidth={1} />
            </div>
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent-500 rounded-full blur-sm" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto border border-border-default p-12 rounded-xl bg-surface-card">
          <h2 className="text-[32px] font-bold mb-4">Join the HELIOS Journey</h2>
          <p className="text-text-secondary mb-10 text-[16px]">
            We’re a future-facing lab — open to collaborators, researchers, and 
            believers in the power of intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg">Get Started Today</Button>
            <Button variant="secondary" size="lg">Follow for Updates</Button>
          </div>
        </div>
      </section>

    </Layout>
  );
}