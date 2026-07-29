import React from 'react';
import { Scale, AlertTriangle } from 'lucide-react';

import Seo from '@/components/shared/Seo';
import LegalLayout, { LegalSection } from '@/components/shared/LegalLayout';
import { siteConfig } from '@/lib/site';
import {
  breadcrumbSchema,
  buildJsonLd,
  organizationSchema,
  webPageSchema,
} from '@/lib/structured-data';

const DESCRIPTION =
  'Terms of service and financial disclaimers for HELIOS AI Labs, including acceptable use, intellectual property and limitation of liability.';

const jsonLd = buildJsonLd(
  organizationSchema(),
  webPageSchema({
    path: '/terms',
    title: 'Terms of Service',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path: '/terms' },
  ])
);

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description={DESCRIPTION}
        path="/terms"
        type="article"
        jsonLd={jsonLd}
      />

      <LegalLayout
        eyebrow="Legal Agreement"
        icon={<Scale className="h-4 w-4" />}
        title="Terms of Service"
        effectiveDate="1 April 2026"
        effectiveDateISO="2026-04-01"
      >
        <LegalSection
          title="Financial disclaimer"
          icon={<AlertTriangle className="h-5 w-5 text-warning-500" />}
          className="rounded-lg border border-warning-500/20 bg-warning-500/10 p-6"
        >
          <p className="text-[14px] text-primary-800">
            HELIOS AI Labs provides AI-powered analytical tools, reinforcement
            learning projections, and behavioural nudges.{' '}
            <strong>We are not a SEBI-registered financial advisor.</strong> All
            investment tracking, SIP modelling, and risk assessments are for
            informational and educational purposes. You assume full
            responsibility for your financial decisions and wealth creation
            strategies.
          </p>
        </LegalSection>

        <LegalSection title="1. Agreement and platform access">
          <p>
            By accessing the HELIOS AI Wealth Engine, you agree to be bound by
            these Terms. The platform is operated by {siteConfig.legalName},
            registered in {siteConfig.address.locality},{' '}
            {siteConfig.address.region}. You agree to use the platform solely for
            its intended purpose: intelligent, human-centric financial tracking
            and education.
          </p>
        </LegalSection>

        <LegalSection title="2. Acceptable use and system integrity">
          <p className="mb-4">You are strictly prohibited from:</p>
          <ul className="list-disc space-y-2 pl-5 text-[14px]">
            <li>
              Reverse-engineering our local language LLMs or reinforcement
              learning architectures.
            </li>
            <li>
              Conducting unauthorised port scanning or penetration testing
              against our AWS or Azure instances.
            </li>
            <li>
              Attempting to manipulate the vector stores or prompt-inject the
              explainable AI agents.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Intellectual property">
          <p>
            All software, architectures, visual designs, and algorithmic models —
            including but not limited to the HELIOS Buddy platform and DockX
            integrations — are the exclusive intellectual property of{' '}
            {siteConfig.legalName}. You are granted a limited, non-exclusive
            licence to use the interface for personal wealth management.
          </p>
        </LegalSection>

        <LegalSection title="4. Limitation of liability">
          <p>
            {siteConfig.legalName} shall not be liable for any direct, indirect,
            incidental, or consequential damages resulting from market
            volatility, system downtime, AI hallucination, or misinterpretation
            of the explainable UX. The system uses hard-coded safety rails, but
            financial markets carry inherent risk.
          </p>
        </LegalSection>

        <LegalSection
          title="5. Questions about these terms"
          className="border-t border-border-subtle pt-8"
        >
          <p>
            Write to us at{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-link-600 hover:underline"
            >
              {siteConfig.email}
            </a>{' '}
            and we will respond in line with our operational protocol.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
