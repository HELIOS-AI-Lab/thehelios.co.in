'use client';

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Cookie, Settings, Activity } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export default function CookiesPage() {
  return (
    <Layout>
      <Head>
        <title>Cookie Policy | HELIOS AI Labs</title>
        <meta name="description" content="Cookie and Tracking Technology Policy for HELIOS AI Labs." />
      </Head>
      
      <section className="py-24 px-6 max-w-[840px] mx-auto">
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          
          <div className="mb-16 border-b border-border-default pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary-50 border border-primary-100 text-[12px] font-bold uppercase tracking-widest text-primary-700 mb-6">
  <Cookie className="w-4 h-4" /> Tracking Protocol
</div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-primary-700 mb-4 tracking-tight">Cookie Policy</h1>
<p className="text-text-secondary text-[15px] font-mono">Effective Date: April 2026 &nbsp;·&nbsp; Helios AI Labs Pvt Ltd</p>          </div>

          <div className="space-y-12 text-[15px] text-text-secondary leading-relaxed">
            
            <section>
              <p className="text-[16px] text-primary-800 font-medium">
                To provide a seamless, culturally-adapted, and secure AI companion, HELIOS AI Labs utilizes cookies and local storage mechanisms. This policy outlines what we track and why it is necessary for our intelligent agents to function.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 border border-border-default bg-surface-card rounded-lg">
                <Settings className="w-6 h-6 text-accent-500 mb-4" />
                <h3 className="text-[16px] font-bold text-primary-700 mb-2">Essential & Security</h3>
                <p className="text-[13px]">Strictly necessary for platform operation. This includes JWT tokens for secure authentication, preventing CSRF attacks, and maintaining active sessions while you interact with your financial portfolio.</p>
              </div>

              <div className="p-6 border border-border-default bg-surface-card rounded-lg">
                <Activity className="w-6 h-6 text-link-500 mb-4" />
                <h3 className="text-[16px] font-bold text-primary-700 mb-2">Agent Context & Preferences</h3>
                <p className="text-[13px]">We use local storage to cache your preferred local language (e.g., Hindi, Telugu) and temporary conversational context, ensuring our GPT-based agents respond rapidly without excessive server round-trips.</p>
              </div>
            </div>

            <section className="mt-12">
              <h2 className="text-[20px] font-bold text-primary-700 mb-4">Managing Your Preferences</h2>
              <p className="mb-4">
                You can control cookie settings directly through your browser. However, please be aware that disabling <strong>Essential Cookies</strong> will prevent you from logging into the HELIOS dashboard, and clearing <strong>Agent Context</strong> will reset your active chat session with the AI companion.
              </p>
              <p>
                By clicking "Accept" on our initial cookie banner, you consent to the aggregation of generalized, anonymized usage metrics which help our engineering team improve the UI/UX for Bharat's demographics.
              </p>
            </section>

          </div>
        </motion.div>
      </section>
    </Layout>
  );
}