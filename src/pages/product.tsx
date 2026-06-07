'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
  ShieldCheck
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import { HeroSection } from '@/components/ui/HeroSection';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
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

export default function ProductPage() {
  return (
    <Layout>
      <Head>
        <title>HELIOS Buddy | Your AI Financial Companion</title>
        <meta name="description" content="Bharat's Open AI Wealth Engine. HELIOS is an evolving AI-powered ecosystem designed to help you think, invest, and grow." />
      </Head>

      {/* Hero Section */}
      <motion.div initial="initial" animate="whileInView" variants={staggerContainer}>
        <HeroSection
          theme="light"
          alignment="center"
          // badge="Bharat's Open AI Wealth Engine"
          title={
            <>
              Your Local, Trusted,<br />
              <span className="text-accent-700">AI Financial Buddy</span>
            </>
          }
          subtitle="HELIOS is more than an app. It’s an evolving AI-powered ecosystem designed to help Bharat’s people think, invest, and grow—intelligently. We bring together Reinforcement Learning, Financial Literacy, and Local Language AI to make wealth creation accessible to all."
          primaryAction={
            <Button variant="primary" size="lg" trailingIcon={<ArrowRight className="w-4 h-4" />}>
              Get Early Access
            </Button>
          }
        />
      </motion.div>

      {/* Manifesto / Quote Section */}
      <section className="py-16 border-b border-border-default bg-surface-sunken">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <h3 className="text-[24px] md:text-[28px] font-bold text-primary-700 leading-snug">
              "We’re not just building a product. We’re training a generation of confident, culturally-aware AI-powered investors."
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Detailed */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[32px] font-bold text-primary-700 mb-4">Core Capabilities</h2>
          <p className="text-text-secondary text-[16px]">
            Engineered for Bharat. Combining deep technical rigor with frictionless, human-centered design.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          whileInView="whileInView" 
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* AI Intelligence */}
          <motion.div variants={fadeInUp}>
            <Card variant="flat" className="h-full flex flex-col">
              <CardHeader className="border-b border-border-subtle bg-neutral-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary-100 text-primary-700 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-bold">AI Intelligence</h3>
              </CardHeader>
              <CardBody className="flex-1 flex flex-col gap-6">
                <p className="text-[14px] text-text-secondary">
                  HELIOS is an AI-powered, multilingual investment assistant built specifically for Bharat's unique linguistic and cultural landscape.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    'GPT-based explainable agents',
                    'Local language voice & chat interfaces',
                    'Real-time market reasoning and logic'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-text-primary">
                      <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </motion.div>

          {/* Financial Analytics */}
          <motion.div variants={fadeInUp}>
            <Card variant="flat" className="h-full flex flex-col">
              <CardHeader className="border-b border-border-subtle bg-neutral-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary-100 text-primary-700 flex items-center justify-center">
                  <LineChart className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-bold">Financial Analytics</h3>
              </CardHeader>
              <CardBody className="flex-1 flex flex-col gap-6">
                <p className="text-[14px] text-text-secondary">
                  Combines AI data crunching with Human support to guide users through personalized, goal-based portfolios.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    'Automated portfolio tracking & rebalancing',
                    'Advanced Risk & SIP modeling',
                    'Goal-based plans with strict safety rails'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-text-primary">
                      <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </motion.div>

          {/* Behavioural Nudging */}
          <motion.div variants={fadeInUp}>
            <Card variant="flat" className="h-full flex flex-col">
              <CardHeader className="border-b border-border-subtle bg-neutral-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary-100 text-primary-700 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-bold">Behavioural Nudging</h3>
              </CardHeader>
              <CardBody className="flex-1 flex flex-col gap-6">
                <p className="text-[14px] text-text-secondary">
                  Built-in education, SIP nudges, rebalancing alerts, and emotion-aware flows that drive long-term financial continuity.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    'Emotion-aware SIP nudges',
                    'Frictionless, low-cost plans (₹50 starter)',
                    'Deep cultural adaptation for Bharat'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] font-medium text-text-primary">
                      <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works - Technical Breakdown */}
      <section className="py-24 bg-primary-700 text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <div className="inline-block px-3 py-1 rounded bg-white/10 text-white font-bold text-[11px] uppercase mb-6 tracking-widest border border-white/20">
                Architecture
              </div>
              <h2 className="text-[32px] md:text-[40px] font-bold mb-6 leading-tight">
                How HELIOS Works
              </h2>
              <p className="text-[16px] text-white/70 leading-relaxed mb-6">
                We combine cutting-edge tech to deliver trustworthy intelligence for everyday people. The AI doesn’t just predict — it reflects, adapts, and aligns with your life goals.
              </p>
              <p className="text-[16px] text-white/70 leading-relaxed mb-8">
                The future isn’t just coded. It’s felt. HELIOS is AI with a human heartbeat, explaining itself clearly, and helping you act wisely.
              </p>
              <Button variant="primary" size="md">
                Read our technical whitepaper
              </Button>
            </motion.div>

            {/* Tech Stack Grid */}
            <motion.div 
              variants={staggerContainer} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors">
                <Cpu className="w-6 h-6 text-accent-500" />
                <div>
                  <h4 className="font-bold text-[15px] mb-1">Reinforcement Learning</h4>
                  <p className="text-[13px] text-white/60">Self-evolving algorithms that optimize for long-term portfolio health.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors">
                <Languages className="w-6 h-6 text-accent-500" />
                <div>
                  <h4 className="font-bold text-[15px] mb-1">Local NLP Models</h4>
                  <p className="text-[13px] text-white/60">Custom trained LLMs to understand nuance in regional languages.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors">
                <Database className="w-6 h-6 text-accent-500" />
                <div>
                  <h4 className="font-bold text-[15px] mb-1">Data Visuals</h4>
                  <p className="text-[13px] text-white/60">Translating complex market data into simple, actionable visual insights.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors">
                <ShieldCheck className="w-6 h-6 text-accent-500" />
                <div>
                  <h4 className="font-bold text-[15px] mb-1">Safety & Guardrails</h4>
                  <p className="text-[13px] text-white/60">Hardcoded risk thresholds to protect wealth from market volatility.</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          <h2 className="text-[32px] font-bold text-primary-700 mb-6">Ready to empower your financial journey?</h2>
          <p className="text-[16px] text-text-secondary max-w-2xl mx-auto mb-10">
            Join the waitlist to be among the first to experience Bharat's most intelligent financial companion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Join the Waitlist
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Learn about the Labs
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

    </Layout>
  );
}