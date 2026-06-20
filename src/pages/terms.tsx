'use client';

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Scale, AlertTriangle, FileText } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export default function TermsPage() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service | HELIOS AI Labs</title>
        <meta name="description" content="Terms of Service and Financial Disclaimers for HELIOS AI Labs." />
      </Head>
      
      <section className="py-24 px-6 max-w-[840px] mx-auto">
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          
          <div className="mb-16 border-b border-border-default pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary-50 border border-primary-100 text-[12px] font-bold uppercase tracking-widest text-primary-700 mb-6">
              <Scale className="w-4 h-4" /> Legal Agreement
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-primary-700 mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-text-secondary text-[15px] font-mono">Effective Date: April 2026 &nbsp;·&nbsp; Helios AI Labs Pvt Ltd</p>
          </div>

          <div className="space-y-12 text-[15px] text-text-secondary leading-relaxed">
            
            <section className="p-6 bg-warning-500/10 border border-warning-500/20 rounded-lg">
              <h2 className="text-[18px] font-bold text-primary-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning-500" />
                Financial Disclaimer
              </h2>
              <p className="text-[14px] text-primary-800">
                HELIOS AI Labs provides AI-powered analytical tools, reinforcement learning projections, and behavioral nudges. <strong>We are not a SEBI-registered financial advisor.</strong> All investment tracking, SIP modeling, and risk assessments are for informational and educational purposes. You assume full responsibility for your financial decisions and wealth creation strategies.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4">1. Agreement & Platform Access</h2>
              <p>By accessing the HELIOS AI Wealth Engine, you agree to be bound by these Terms. The platform is operated by Helios AI Labs Pvt Ltd, registered in Bejjanki, Telangana. You agree to use the platform solely for its intended purpose: intelligent, human-centric financial tracking and education.</p>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4">2. Acceptable Use & System Integrity</h2>
              <p className="mb-4">You are strictly prohibited from:</p>
              <ul className="list-disc pl-5 space-y-2 text-[14px]">
                <li>Reverse-engineering our local language LLMs or Reinforcement Learning architectures.</li>
                <li>Conducting unauthorized port scanning or penetration testing against our AWS/Azure instances.</li>
                <li>Attempting to manipulate the vector stores or prompt-inject the explainable AI agents.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4">3. Intellectual Property</h2>
              <p>All software, architectures, visual designs, and algorithmic models—including but not limited to the HELIOS Buddy platform and DockX integrations—are the exclusive intellectual property of Helios AI Labs Pvt Ltd. You are granted a limited, non-exclusive license to use the interface for personal wealth management.</p>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-primary-700 mb-4">4. Limitation of Liability</h2>
              <p>Helios AI Labs Pvt Ltd shall not be liable for any direct, indirect, incidental, or consequential damages resulting from market volatility, system downtime, AI hallucination, or misinterpretation of the explainable UX. The system utilizes hardcoded safety rails, but financial markets carry inherent risk.</p>
            </section>

          </div>
        </motion.div>
      </section>
    </Layout>
  );
}