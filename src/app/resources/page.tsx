import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/blog';
import { getAllPosts } from '@/lib/blog';
import { CtaBand } from '@/components/sections';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guides & Insights',
  description:
    'Practical AI guidance for Australian business leaders — blogs, checklists, and white papers you can read and use right away.',
};

const featuredResources = [
  {
    title: 'SME AI Upskilling Playbook (2025)',
    description:
      'Your roadmap for building internal AI capability—covering skills, training pathways, and upskilling best practices.',
    href: '/sme-ai-upskilling-playbook-2025',
  },
  {
    title: 'AI Readiness Checklist',
    description:
      "A practical checklist to assess your organisation's current AI capabilities and identify readiness gaps.",
    href: '/ai-readiness-checklist',
    target: '_blank' as const,
  },
  {
    title: 'AI Implementation Guide',
    description:
      'Step-by-step guidance to help SMEs plan, pilot, and scale AI solutions efficiently and effectively.',
    href: '/10-quick-wins-genai-services-finance-ops',
  },
  {
    title: 'AI Governance Best Practices',
    description:
      'An essential guide on establishing robust AI governance, ensuring ethical and compliant AI use in your organisation.',
    href: '/executive-guide-to-ai-governance-sme-edition',
  },
];

interface PageProps {
  searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function ResourcesPage({ searchParams }: PageProps) {
  const { category, tag } = await searchParams;
  const allPosts = getAllPosts();

  // Filter posts based on category or tag
  const posts = allPosts.filter((post) => {
    if (category) {
      return post.categories?.some((c) => c.toLowerCase() === category.toLowerCase());
    }
    if (tag) {
      return post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase());
    }
    return true;
  });

  const activeFilter = category || tag;
  const filterType = category ? 'category' : tag ? 'tag' : null;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-6">Guides & Insights</h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Practical AI guidance for Australian business leaders — blogs, checklists, and white
              papers you can read and use right away.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <Section background="white">
        <SectionHeader title="Featured Resources" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredResources.map((resource) => (
            <Card
              key={resource.title}
              href={resource.href}
              target={'target' in resource ? resource.target : undefined}
              className="h-full flex flex-col group"
            >
              <CardTitle className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {resource.title}
              </CardTitle>
              <CardDescription className="flex-1 text-sm">{resource.description}</CardDescription>
              <div className="mt-4">
                <span className="text-[var(--color-primary)] font-medium text-sm">
                  {'target' in resource && resource.target === '_blank' ? 'Open checklist ↗' : 'View resource →'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Latest Articles */}
      <Section background="light">
        <SectionHeader
          title={activeFilter ? `Articles: ${activeFilter}` : "Timely guidance and expert perspectives for SME leaders embracing AI"}
          subtitle={activeFilter ? undefined : "Explore our latest guides and thought leadership, designed to help Australian SME executives and teams navigate the evolving AI landscape. These insights offer practical, actionable advice for leveraging AI in your business."}
        />

        {activeFilter && (
          <div className="mb-8 flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-muted)]">
              Filtered by {filterType}:
            </span>
            <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-[var(--color-primary)] text-white">
              {activeFilter}
              <Link
                href="/resources"
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                aria-label="Clear filter"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </span>
          </div>
        )}

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">
              {activeFilter ? `No articles found for ${filterType} "${activeFilter}".` : 'No articles yet. Check back soon!'}
            </p>
            {activeFilter && (
              <Link href="/resources" className="text-[var(--color-primary)] hover:underline mt-2 inline-block">
                View all articles →
              </Link>
            )}
          </div>
        )}
      </Section>

      <CtaBand
        title="Want these guides tailored to your business?"
        subtitle="Custom Workshops & AI Training for Your Team"
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
        variant="primary"
      />
    </>
  );
}
