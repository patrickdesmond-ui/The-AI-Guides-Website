import Image from "next/image";
import Button from "@/components/Button";
import pages from "@/data/pages.json";

export const metadata = {
  title: "Executive Training",
};

export default function ExecutiveTrainingPage() {
  const { executiveTraining } = pages;
  return (
    <>
      <section className="section">
        <div className="container-pad grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-slate-900">{executiveTraining.hero.headline}</h1>
            <p className="text-lg text-slate-600">{executiveTraining.hero.text}</p>
            <div className="flex flex-wrap gap-4">
              <Button href={executiveTraining.hero.primaryCta.href}>{executiveTraining.hero.primaryCta.label}</Button>
              <Button href={executiveTraining.hero.secondaryCta.href} variant="secondary">
                {executiveTraining.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src={executiveTraining.image}
              alt="Executive AI training session"
              width={520}
              height={360}
              className="rounded-3xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-6">
          <p className="text-slate-600">{executiveTraining.overview}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {executiveTraining.benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-slate-100 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">{benefit.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{benefit.content}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {benefit.bullets.map((bullet) => (
                    <li key={bullet}>✓ {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">AI Training Formats for Leaders</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {executiveTraining.formats.map((format) => (
              <div key={format.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{format.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">Sample Half-Day Executive AI Training Agenda</h2>
          <ul className="space-y-3 text-slate-600">
            {executiveTraining.agenda.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-pad space-y-4">
          <p className="text-slate-600">{executiveTraining.closing}</p>
          <div className="rounded-2xl bg-brand-50 p-8">
            {executiveTraining.finalCta.content.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="text-slate-700">
                {paragraph}
              </p>
            ))}
            <div className="mt-6">
              <Button href={executiveTraining.finalCta.cta.href}>{executiveTraining.finalCta.cta.label}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
