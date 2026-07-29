import { ArrowLeft, Compass } from 'lucide-react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/shared/Seo';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { riseIn } from '@/lib/motion';

const destinations = [
  { href: '/product', label: 'HELIOS Buddy', hint: 'The product' },
  { href: '/about', label: 'About the lab', hint: 'Mission and team' },
  { href: '/students', label: 'Fellowship', hint: 'For students' },
  { href: '/developers', label: 'Engineering', hint: 'For builders' },
];

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo
        title="Page not found"
        description="The page you were looking for does not exist. Head back to HELIOS AI Labs to find what you need."
        path="/404"
        noindex
      />

      <section className="relative flex flex-1 items-center overflow-hidden bg-primary-700 px-6 py-32 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid mask-fade-edges"
        />
        <div
          aria-hidden="true"
          className="aurora-blob animate-aurora pointer-events-none absolute -top-24 left-1/3 h-[26rem] w-[26rem] bg-accent-500/20"
        />

        <div className="relative mx-auto w-full max-w-[820px] text-center">
          <Reveal immediate>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-[12px] font-semibold uppercase tracking-widest ring-1 ring-inset ring-white/15">
              <Compass className="h-3.5 w-3.5 text-accent-500" />
              Error 404
            </p>
          </Reveal>

          <Reveal immediate variants={riseIn}>
            <h1 className="mb-5 text-[40px] font-bold leading-[1.1] tracking-tight md:text-[56px]">
              This route has no{' '}
              <span className="text-accent-500">reasoning trace</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.12}>
            <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/70">
              The page you asked for doesn&rsquo;t exist — it may have moved, or
              the link may be out of date. Here is where everything else lives.
            </p>
          </Reveal>

          <Reveal immediate delay={0.18}>
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              <ButtonLink
                href="/"
                variant="primary"
                size="lg"
                leadingIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Back to home
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
                className="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20"
              >
                Report a broken link
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal immediate delay={0.24}>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((destination) => (
                <li key={destination.href}>
                  <ButtonLink
                    href={destination.href}
                    variant="secondary"
                    fullWidth
                    className="h-auto flex-col items-start gap-0.5 border-white/10 bg-white/[0.04] px-4 py-3 text-left text-white hover:border-accent-500/40 hover:bg-white/10"
                  >
                    <span className="text-[14px] font-semibold">
                      {destination.label}
                    </span>
                  </ButtonLink>
                  <span className="mt-1.5 block px-4 text-[12px] text-white/40">
                    {destination.hint}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
