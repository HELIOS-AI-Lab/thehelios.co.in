'use client';

import React from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';
import { 
  GraduationCap, 
  Code2, 
  Microscope, 
  Cpu, 
  Lightbulb, 
  FileSearch,
  ArrowDown
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import { HeroSection } from '@/components/ui/HeroSection';
import { FeatureGrid, FeatureItem } from '@/components/ui/FeatureGrid';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ContactForm from '@/components/shared/ContactForm';

// Upgraded to Industry Standard Framer Motion Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      // Strictly type the cubic-bezier array to resolve the TS error
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
    } 
  }
};

export default function StudentsPage() {
  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <Head>
        <title>Student Fellowship | HELIOS AI Labs</title>
        <meta name="description" content="Join the HELIOS Student Fellowship. Work on Reinforcement Learning, MLOps, and FinTech AI." />
      </Head>

      {/* Hero Section */}
      <HeroSection
        theme="inverse"
        badge="Academic Collaboration"
        title="Building the Next Generation of AI Researchers"
        subtitle="The HELIOS Student Fellowship is an elite program for undergraduate and graduate students to work on frontier AI problems in Finance, Healthcare, and Deep Tech."
        primaryAction={
          <Button variant="primary" size="lg" onClick={scrollToApply}>
            Apply for Summer 2026
          </Button>
        }
        secondaryAction={
          <Button variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" leadingIcon={<ArrowDown className="w-4 h-4" />} onClick={scrollToApply}>
  Explore Curriculum
</Button>
        }
      />

      {/* Program Tracks */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeInUp} 
          className="mb-16"
        >
          <h2 className="text-[32px] font-bold text-primary-700 mb-4">Research Tracks</h2>
          <p className="text-text-secondary text-[16px] max-w-2xl">
            Fellows are embedded directly into our lab teams, working on production-grade AI infrastructure and research papers.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <FeatureGrid columns={3}>
            <motion.div variants={fadeInUp}>
              <FeatureItem 
                icon={<Cpu className="w-5 h-5" />}
                title="MLOps & Infrastructure"
                description="Build scalable GPU scheduling systems, serverless LLM deployment pipelines, and automated model monitoring tools on AWS and Azure."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureItem 
                icon={<Microscope className="w-5 h-5" />}
                title="Scientific Computing"
                description="Contribute to our DockX platform, utilizing RDKit and AutoDock Vina for molecular docking and ADMET profiling research."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureItem 
                icon={<Code2 className="w-5 h-5" />}
                title="Explainable FinTech"
                description="Develop interpretable reinforcement learning agents for Bharat’s wealth engine, focusing on local language reasoning."
              />
            </motion.div>
          </FeatureGrid>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-50 border-y border-border-subtle overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.h3 variants={fadeInUp} className="text-[28px] font-bold text-primary-700 mb-2">
                Why Fellow with HELIOS?
              </motion.h3>
              
              <motion.div variants={fadeInUp} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-700">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] mb-1">Direct Mentorship</h4>
                  <p className="text-[14px] text-text-secondary leading-relaxed">Weekly 1-on-1 sessions with Srikanth and our lead engineers to guide your technical growth.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-700">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] mb-1">Paper Publication</h4>
                  <p className="text-[14px] text-text-secondary leading-relaxed">Opportunities to co-author research papers and contribute to open-source scientific software.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-700">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] mb-1">Career Pathway</h4>
                  <p className="text-[14px] text-text-secondary leading-relaxed">Top-performing fellows receive pre-placement offers (PPOs) for full-time roles at HELIOS AI Labs.</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="relative mt-8 md:mt-0">
              <Card variant="flat" className="p-8 bg-white border-2 border-accent-500/20 shadow-8 relative z-10">
                <blockquote className="text-[18px] italic text-primary-700 mb-8 leading-relaxed">
                  "The fellowship isn't about fetching coffee. It's about solving the port scanning abuse alerts on EC2, optimizing RDKit kernels, and building the future of Bharat's AI."
                </blockquote>
                <div className="flex items-center gap-4 pt-6 border-t border-border-subtle">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold font-mono">FA</div>
                  <div>
                    <p className="text-[14px] font-bold text-primary-700">Fellowship Alumni</p>
                    <p className="text-[12px] text-text-tertiary uppercase tracking-wider font-semibold">Class of 2025</p>
                  </div>
                </div>
              </Card>
              {/* Decorative technical grid element */}
              <div className="absolute -bottom-6 -right-6 z-0 w-full h-full border border-dashed border-border-strong bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 rounded" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-24 px-6 max-w-[1024px] mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid md:grid-cols-3 gap-12"
        >
          <div className="md:col-span-1">
            <h2 className="text-[28px] font-bold text-primary-700 mb-4">Apply for the Fellowship</h2>
            <p className="text-text-secondary text-[14px] leading-relaxed mb-6">
              We accept applications on a rolling basis. Please ensure your GitHub profile or research portfolio is up to date.
            </p>
            <div className="p-5 rounded-lg bg-primary-50 border border-primary-100">
              <p className="text-[12px] font-bold text-primary-700 uppercase tracking-wider mb-3">Requirements</p>
              <ul className="text-[13px] text-primary-800 space-y-2.5 list-disc pl-4 font-medium">
                <li>Currently enrolled in B.Tech / M.Tech (CSE / IT / EEE)</li>
                <li>Proficiency in Python, React, or MLOps</li>
                <li>Strong foundation in Data Structures</li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Card variant="flat" className="p-8 shadow-8 bg-white">
              <ContactForm variant="student" />
            </Card>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}