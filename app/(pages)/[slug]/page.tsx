import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import pages from "@/data/pages.json";
import posts from "@/data/posts.json";
import { getPostBySlug } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <section className="section">
      <div className="container-pad prose-links max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">{post.date} · {post.author}</p>
        <h1 className="text-4xl font-bold text-slate-900">{post.title}</h1>
        <p className="text-slate-600">{post.excerpt}</p>
        <ReactMarkdown className="prose max-w-none text-slate-700">{post.body}</ReactMarkdown>
        <div className="rounded-2xl bg-brand-50 p-6 text-slate-700">
          <p>{pages.resources.finalCta.headline}</p>
          <p className="mt-2 text-sm text-slate-600">{pages.resources.finalCta.subheading}</p>
        </div>
      </div>
    </section>
  );
}
