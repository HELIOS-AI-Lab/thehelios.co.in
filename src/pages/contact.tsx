'use client';

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageSquare, Phone, Globe } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/shared/ContactForm';

// Native SVGs to replace the removed Lucide brand icons
const LinkedInIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const XIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export default function ContactPage() {
  return (
    <Layout>
      <Head>
        <title>Contact | HELIOS AI Labs</title>
        <meta name="description" content="Get in touch with HELIOS AI Labs. Let's build the future of Bharat's AI together." />
      </Head>

      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Connection Details */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            
            <h2 className="text-[48px] font-bold leading-[1.1] text-primary-700 mb-6">
              Let’s start a <br />
              <span className="text-accent-500">conversation.</span>
            </h2>
            
            <p className="text-text-secondary text-[18px] mb-12 max-w-md">
              Whether you are a researcher looking to collaborate or a partner interested in our FinTech engine, we’re ready to talk.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded bg-neutral-50 border border-border-default flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] uppercase tracking-wider text-text-tertiary mb-1">Email Us</h4>
                  <p className="text-[16px] font-medium text-primary-700">info@thehelios.co.in</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded bg-neutral-50 border border-border-default flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] uppercase tracking-wider text-text-tertiary mb-1">Visit Us</h4>
                  <p className="text-[16px] font-medium text-primary-700 leading-relaxed">
                    Bejjanki, Telangana 505528, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof/Connect */}
            <div className="mt-16 pt-8 border-t border-border-subtle flex gap-6">
              <a href="https://www.linkedin.com/company/heliosailabs/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-link-600 transition-colors">
                <LinkedInIcon className="w-5 h-5" />
                <span className="text-[14px] font-bold">LinkedIn</span>
              </a>
              <a href="https://twitter.com/heliosailabs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-primary-700 transition-colors">
                <XIcon className="w-5 h-5" />
                <span className="text-[14px] font-bold">X</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white border border-border-default p-8 md:p-12 rounded-xl shadow-8 relative overflow-hidden"
          >
            {/* Visual background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full -mr-16 -mt-16" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                <span className="text-[12px] font-bold uppercase tracking-widest text-text-tertiary">Our lab is active</span>
              </div>
              
              <h3 className="text-[24px] font-bold text-primary-700 mb-8">Send a message</h3>
              <ContactForm variant="general" />
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-20 bg-primary-700 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[14px] font-mono text-accent-500 mb-6 uppercase tracking-[0.3em]">Operational Protocol</p>
          <h2 className="text-[28px] md:text-[36px] font-bold max-w-4xl mx-auto leading-tight">
            "Transparency is the foundation of intelligence. Every inquiry is handled with technical rigor and professional punctuality."
          </h2>
        </div>
      </section>
    </Layout>
  );
}