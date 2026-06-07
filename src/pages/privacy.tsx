'use client';

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Lock } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export default function PrivacyPage() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | HELIOS AI Labs</title>
        <meta name="description" content="Privacy Protocol and Data Handling Policy for HELIOS AI Labs." />
      </Head>
      
      <section className="py-24 px-6 max-w-[840px] mx-auto">
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          
          <div className="mb-16 border-b border-border-default pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary-50 border border-primary-100 text-[12px] font-bold uppercase tracking-widest text-primary-700 mb-6">
              <ShieldCheck className="w-4 h-4" /> Data Protocol
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-primary-700 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-text-secondary text-[15px] font-mono">Effective Date: April 2026 · Helios AI Labs Pvt Ltd</p>
          </div>

          <div className="space-y-12 text-[15px] text-text-secondary leading-relaxed">
            
            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-accent-500" />
                1. Information Architecture & Collection
              </h2>
              <p className="mb-4">As an AI-powered financial companion, HELIOS AI Labs collects minimal, high-signal data required to optimize your investment intelligence. This includes:</p>
              <ul className="list-disc pl-5 space-y-2 text-[14px]">
                <li><strong className="text-text-primary">Identity & Contact:</strong> Full name, email address, and authentication credentials.</li>
                <li><strong className="text-text-primary">Financial Context:</strong> Portfolio allocations, SIP preferences, and risk tolerance metrics required for reinforcement learning models.</li>
                <li><strong className="text-text-primary">Interaction Data:</strong> Chat logs, regional language preferences, and behavioral nudges interacted with via our AI agents.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-accent-500" />
                2. Local vs. Cloud Processing
              </h2>
              <p className="mb-4">We believe in privacy by design. To protect your financial reasoning data:</p>
              <ul className="list-disc pl-5 space-y-2 text-[14px]">
                <li><strong className="text-text-primary">Local LLMs:</strong> Certain explainable AI tasks and initial data parsing are performed using local AI models. This data does not hit third-party API endpoints.</li>
                <li><strong className="text-text-primary">Cloud Infrastructure:</strong> Heavy compute tasks (like market reasoning and RL rebalancing) are securely executed in our isolated AWS/Azure environments with strict port-access controls.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4">3. Ethical AI Guardrails & Usage</h2>
              <p className="mb-4">Your data is never used to train generalized third-party models. We use your data strictly to:</p>
              <ul className="list-disc pl-5 space-y-2 text-[14px]">
                <li>Continuously evolve your personal portfolio tracking.</li>
                <li>Trigger emotion-aware SIP nudges tailored to your specific financial goals.</li>
                <li>Identify and patch software anomalies (e.g., MLOps deployment health checks).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4">4. Data Retention and Deletion</h2>
              <p>You have the right to request full erasure of your financial and interaction data. Upon request, all active records will be purged from our vector stores and databases within 30 days, retaining only anonymized, aggregated mathematical models that cannot be reverse-engineered to identify you.</p>
            </section>

            <section className="pt-8 border-t border-border-subtle">
              <h2 className="text-[20px] font-bold text-primary-700 mb-3">5. Contact the Data Officer</h2>
              <p>For privacy-related engineering or policy inquiries, contact our Helios AI operations team at: <a href="mailto:privacy@thehelios.co.in" className="text-link-600 font-medium hover:underline">privacy@thehelios.co.in</a>.</p>
            </section>

          </div>
        </motion.div>
      </section>
    </Layout>
  );
}