import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { getPostBySlug, getAllPosts, getPostSlugs } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { CtaBand } from '@/components/sections';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      {/* Article Header */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-12 md:py-16">
        <Container size="narrow">
          <div className="mb-6">
            <Link
              href="/resources"
              className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Guides & Insights
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <time dateTime={post.date} className="text-sm text-[var(--color-text-muted)]">
              {formatDate(post.date)}
            </time>
            {post.readingTime && (
              <>
                <span className="text-[var(--color-text-muted)]">·</span>
                <span className="text-sm text-[var(--color-text-muted)]">{post.readingTime}</span>
              </>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-6 text-[var(--color-text-primary)]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[var(--color-border)]">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-semibold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">{post.author}</p>
              <p className="text-sm text-[var(--color-text-muted)]">The AI Guides</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <Section background="white">
        <Container size="narrow">
          <article className="prose-blog">
            {/* Render MDX content as HTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
                  .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
                  .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
                  .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
                  .replace(/^-\s+(.+)$/gm, '<li>$1</li>')
                  .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                  .replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
                  .replace(/^>\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(?!<[hulo]|<block|<li)(.+)$/gm, '<p>$1</p>')
                  .replace(/<p><\/p>/g, '')
                  .replace(/<p>(<[hulo])/g, '$1')
                  .replace(/(<\/[hulo][^>]*>)<\/p>/g, '$1'),
              }}
            />
          </article>

          {/* Categories and Tags */}
          {((post.categories && post.categories.length > 0) || (post.tags && post.tags.length > 0)) && (
            <div className="mt-16 pt-10 border-t border-[var(--color-border)]">
              {post.categories && post.categories.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[var(--color-text-primary)] mr-3">
                    Categories:
                  </span>
                  <div className="inline-flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <Link
                        key={category}
                        href={`/resources?category=${encodeURIComponent(category)}`}
                        className="text-sm px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)] mr-3">
                    Tags:
                  </span>
                  <div className="inline-flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/resources?tag=${encodeURIComponent(tag)}`}
                        className="text-sm px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section background="light">
          <Container>
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-10 text-[var(--color-text-primary)]">More from The AI Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/${relatedPost.slug}`}
                  className="bg-white rounded-xl border border-[var(--color-border)] p-6 hover:shadow-lg hover:border-[var(--color-primary-light)] transition-all group"
                >
                  <time dateTime={relatedPost.date} className="text-sm text-[var(--color-text-muted)]">
                    {formatDate(relatedPost.date)}
                  </time>
                  <h3 className="text-lg font-semibold mt-2 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand
        title="Need help implementing these ideas?"
        subtitle="Let's discuss how The AI Guides can support your AI journey."
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
      />
    </>
  );
}
