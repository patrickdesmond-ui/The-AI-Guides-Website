import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

const featuredGuides = [
  {
    title: 'AI Implementation Guide',
    description:
      'Step-by-step guidance to help SMEs plan, pilot, and scale AI solutions efficiently and effectively.',
    href: '/ai-implementation-guide',
  },
  {
    title: 'AI Leadership Essentials',
    description:
      'A practical 7-module curriculum for executives navigating AI adoption — from foundations to implementation.',
    href: '/ai-leadership-essentials',
  },
  {
    title: 'Executive Guide to AI Governance (SME Edition)',
    description:
      'A comprehensive guide tailored for SME leaders to establish effective AI governance frameworks and manage risk.',
    href: '/executive-guide-to-ai-governance-sme-edition',
  },
  {
    title: 'SME AI Upskilling Playbook (2026)',
    description:
      'Your roadmap for building internal AI capability—covering skills, training pathways, and upskilling best practices.',
    href: '/sme-ai-upskilling-playbook-2026',
  },
];

export function FeaturedGuides() {
  return (
    <Section background="light">
      <SectionHeader
        title="Expert resources for practical AI adoption in your business"
        subtitle="Explore our most valuable guides and insights, designed to help Australian SMEs navigate AI strategy, governance, and upskilling. Each resource delivers clear, practical advice to drive confident decision-making and sustainable transformation."
      />

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {featuredGuides.map((guide) => (
          <Card key={guide.title} href={guide.href} className="group h-full flex flex-col">
            <div className="flex-1">
              <CardTitle className="mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {guide.title}
              </CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <span className="inline-flex items-center text-[var(--color-primary)] font-medium text-sm">
                Read guide
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/resources"
          className="inline-flex items-center text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)] transition-colors"
        >
          View all guides & insights
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}
