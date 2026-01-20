import Link from 'next/link';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { BlogPostMeta } from '@/types';

interface PostCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Card
      href={`/${post.slug}`}
      className={`group h-full flex flex-col ${featured ? 'md:flex-row md:col-span-2' : ''}`}
    >
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
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

        <CardTitle
          className={`mb-3 group-hover:text-[var(--color-primary)] transition-colors ${
            featured ? 'text-2xl' : ''
          }`}
        >
          {post.title}
        </CardTitle>

        <CardDescription className="flex-1">{post.excerpt}</CardDescription>

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.categories.map((category) => (
              <span
                key={category}
                className="text-xs px-2 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <span className="inline-flex items-center text-[var(--color-primary)] font-medium text-sm">
            Read article
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
      </div>
    </Card>
  );
}
