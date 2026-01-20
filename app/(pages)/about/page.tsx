import Image from "next/image";
import Button from "@/components/Button";
import pages from "@/data/pages.json";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const { about } = pages;
  return (
    <>
      <section className="section">
        <div className="container-pad space-y-6">
          <h1 className="text-4xl font-bold text-slate-900">{about.title}</h1>
          <p className="max-w-3xl text-lg text-slate-600">{about.hero.text}</p>
          <div className="flex flex-wrap gap-4">
            <Button href={about.hero.primaryCta.href}>{about.hero.primaryCta.label}</Button>
            <Button href={about.hero.secondaryCta.href} variant="secondary">
              {about.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900">Who We Are</h2>
          {about.whoWeAre.split("\n\n").map((paragraph) => (
            <p key={paragraph} className="text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-pad space-y-10">
          <h2 className="text-3xl font-semibold text-slate-900">Our Founders</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {about.founders.map((founder) => (
              <div key={founder.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={480}
                  height={320}
                  className="h-48 w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{founder.name}</h3>
                <p className="text-sm font-semibold text-brand-600">{founder.title}</p>
                <p className="mt-3 text-sm text-slate-600">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-8">
          <h2 className="text-3xl font-semibold text-slate-900">How We Work</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {about.howWeWork.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-100 bg-white p-6">
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{step.content}</p>
                <Button href={step.cta.href} variant="ghost">
                  {step.cta.label} →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <p className="text-slate-600">{about.where.content}</p>
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Where we work</h3>
            <p className="mt-3 text-sm text-slate-600">Australia & New Zealand with Sydney as our home base.</p>
            <Button href={about.where.cta.href}>{about.where.cta.label}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
