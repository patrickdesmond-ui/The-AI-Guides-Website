import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import pages from "@/data/pages.json";
import posts from "@/data/posts.json";

export const metadata = {
  title: "Guides & Insights",
};

export default function ResourcesPage() {
  const { resources } = pages;
  return (
    <>
      <section className="section">
        <div className="container-pad grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">{resources.title}</h1>
            <p className="text-lg text-slate-600">{resources.subtitle}</p>
          </div>
          <Image
            src={resources.heroImage}
            alt="AI guides and insights"
            width={520}
            height={360}
            className="rounded-3xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">{resources.latest.heading}</h2>
            <p className="text-slate-600">{resources.latest.subheading}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/${post.slug}`} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">{post.date}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-brand-600">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">Featured Resources</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.featuredResources.map((resource) => (
              <Link key={resource.title} href={resource.href} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  width={320}
                  height={200}
                  className="h-40 w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{resource.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-600 text-white">
        <div className="container-pad text-center">
          <h2 className="text-3xl font-semibold">{resources.finalCta.headline}</h2>
          <p className="mt-3 text-brand-100">{resources.finalCta.subheading}</p>
          <div className="mt-6 flex justify-center">
            <Button href={resources.finalCta.cta.href} variant="secondary">
              {resources.finalCta.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
