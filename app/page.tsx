import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import pages from "@/data/pages.json";

export default function HomePage() {
  const { home } = pages;
  return (
    <>
      <section className="section">
        <div className="container-pad grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              The AI Guides
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              {home.hero.headline}
            </h1>
            <p className="text-lg text-slate-600">{home.hero.subheading}</p>
            <div className="flex flex-wrap gap-4">
              <Button href={home.hero.primaryCta.href}>{home.hero.primaryCta.label}</Button>
              <Button href={home.hero.secondaryCta.href} variant="secondary">
                {home.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-brand-50" />
            <Image
              src={home.hero.image}
              alt="AI strategy workshop"
              width={560}
              height={420}
              className="relative rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">{home.whatWeDo.heading}</h2>
            <p className="text-slate-600">{home.whatWeDo.intro}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {home.whatWeDo.services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{service.description}</p>
                <p className="mt-4 text-sm font-semibold text-brand-600">{service.cta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">{home.process.heading}</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {home.process.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-100 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">{home.why.heading}</h2>
            {home.why.content.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Build AI confidence</h3>
            <p className="mt-3 text-sm text-slate-600">
              Practical frameworks, governance guardrails, and training that is built for Australian SMEs.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button href="/services">Explore Our Services</Button>
              <Button href="/contact" variant="secondary">
                Talk to an AI Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-slate-900">{home.featuredGuides.heading}</h2>
            <p className="text-slate-600">{home.featuredGuides.subheading}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {home.featuredGuides.posts.map((post) => (
              <Link key={post.title} href={post.href} className="rounded-2xl border border-slate-100 p-6 transition hover:border-brand-200">
                <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{post.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-brand-600">Read the guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-600 text-white">
        <div className="container-pad text-center">
          <h2 className="text-3xl font-semibold">{home.ctaBand.heading}</h2>
          <p className="mt-3 text-lg text-brand-100">{home.ctaBand.subheading}</p>
          <div className="mt-6 flex justify-center">
            <Button href={home.ctaBand.cta.href} variant="secondary">
              {home.ctaBand.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
