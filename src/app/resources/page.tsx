import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/blog';
import { getAllPosts } from '@/lib/blog';
import { CtaBand } from '@/components/sections';

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
    href: '/ai-readiness-survey',
  },
  {
    title: 'AI Implementation Guide',
    description:
      'Step-by-step guidance to help SMEs plan, pilot, and scale AI solutions efficiently and effectively.',
    href: '/executive-training',
  },
  {
    title: 'AI Governance Best Practices',
    description:
      'An essential guide on establishing robust AI governance, ensuring ethical and compliant AI use in your organisation.',
    href: '/executive-guide-to-ai-governance-sme-edition',
  },
];

export default function ResourcesPage() {
  const posts = getAllPosts();

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
            <Card key={resource.title} href={resource.href} className="h-full flex flex-col group">
              <CardTitle className="text-lg mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {resource.title}
              </CardTitle>
              <CardDescription className="flex-1 text-sm">{resource.description}</CardDescription>
              <div className="mt-4">
                <span className="text-[var(--color-primary)] font-medium text-sm">
                  View resource →
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Latest Articles */}
      <Section background="light">
        <SectionHeader
          title="Timely guidance and expert perspectives for SME leaders embracing AI"
          subtitle="Explore our latest guides and thought leadership, designed to help Australian SME executives and teams navigate the evolving AI landscape. These insights offer practical, actionable advice for leveraging AI in your business."
        />

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">No articles yet. Check back soon!</p>
          </div>
        )}
      </Section>

      <CtaBand
        title="Want these guides tailored to your business?"
        subtitle="Custom Workshops & AI Training for Your Team"
        primaryCta={{ text: 'Talk to an AI Guide', href: '/contact' }}
        variant="primary"
      />
    </>
  );
}
