import React from 'react';
import { ShieldCheck, Database, Lock } from 'lucide-react';

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
  'Privacy protocol and data handling policy for HELIOS AI Labs — what we collect, how local and cloud processing differ, and how to request erasure.';

const jsonLd = buildJsonLd(
  organizationSchema(),
  webPageSchema({
    path: '/privacy',
    title: 'Privacy Policy',
    description: DESCRIPTION,
  }),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
  ])
);

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={DESCRIPTION}
        path="/privacy"
        type="article"
        jsonLd={jsonLd}
      />

      <LegalLayout
        eyebrow="Data Protocol"
        icon={<ShieldCheck className="h-4 w-4" />}
        title="Privacy Policy"
        effectiveDate="1 April 2026"
        effectiveDateISO="2026-04-01"
      >
        <LegalSection
          title="1. Information architecture and collection"
          icon={<Database className="h-5 w-5 text-accent-500" />}
        >
          <p className="mb-4">
            As an AI-powered financial companion, HELIOS AI Labs collects
            minimal, high-signal data required to optimise your investment
            intelligence. This includes:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[14px]">
            <li>
              <strong className="text-text-primary">Identity and contact:</strong>{' '}
              full name, email address, and authentication credentials.
            </li>
            <li>
              <strong className="text-text-primary">Financial context:</strong>{' '}
              portfolio allocations, SIP preferences, and risk tolerance metrics
              required for reinforcement learning models.
            </li>
            <li>
              <strong className="text-text-primary">Interaction data:</strong>{' '}
              chat logs, regional language preferences, and the behavioural
              nudges you interact with via our AI agents.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          title="2. Local versus cloud processing"
          icon={<Lock className="h-5 w-5 text-accent-500" />}
        >
          <p className="mb-4">
            We believe in privacy by design. To protect your financial reasoning
            data:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[14px]">
            <li>
              <strong className="text-text-primary">Local LLMs:</strong> certain
              explainable AI tasks and initial data parsing are performed using
              local AI models. This data does not reach third-party API
              endpoints.
            </li>
            <li>
              <strong className="text-text-primary">
                Cloud infrastructure:
              </strong>{' '}
              heavy compute tasks — such as market reasoning and RL rebalancing —
              are securely executed in our isolated AWS and Azure environments
              with strict port-access controls.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Ethical AI guardrails and usage">
          <p className="mb-4">
            Your data is never used to train generalised third-party models. We
            use your data strictly to:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[14px]">
            <li>Continuously evolve your personal portfolio tracking.</li>
            <li>
              Trigger emotion-aware SIP nudges tailored to your specific
              financial goals.
            </li>
            <li>
              Identify and patch software anomalies, for example MLOps deployment
              health checks.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Data retention and deletion">
          <p>
            You have the right to request full erasure of your financial and
            interaction data. Upon request, all active records will be purged
            from our vector stores and databases within 30 days, retaining only
            anonymised, aggregated mathematical models that cannot be
            reverse-engineered to identify you.
          </p>
        </LegalSection>

        <LegalSection
          title="5. Contact the data officer"
          className="border-t border-border-subtle pt-8"
        >
          <p>
            For privacy-related engineering or policy inquiries, contact the
            HELIOS AI Labs operations team at{' '}
            <a
              href={`mailto:${siteConfig.privacyEmail}`}
              className="font-medium text-link-600 hover:underline"
            >
              {siteConfig.privacyEmail}
            </a>
            .
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
