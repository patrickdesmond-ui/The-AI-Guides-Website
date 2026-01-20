import Button from "@/components/Button";
import pages from "@/data/pages.json";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  const { services } = pages;
  return (
    <>
      <section className="section">
        <div className="container-pad space-y-6">
          <h1 className="text-4xl font-bold text-slate-900">{services.title}</h1>
          <p className="max-w-3xl text-lg text-slate-600">{services.hero.text}</p>
          <div className="flex flex-wrap gap-4">
            <Button href={services.hero.primaryCta.href}>{services.hero.primaryCta.label}</Button>
            <Button href={services.hero.secondaryCta.href} variant="secondary">
              {services.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad grid gap-6 lg:grid-cols-2">
          {services.services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-slate-100 bg-white p-6">
              <h2 className="text-2xl font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-3 text-sm font-semibold text-brand-600">Challenge</p>
              <p className="text-sm text-slate-600">{service.challenge}</p>
              <p className="mt-3 text-sm font-semibold text-brand-600">What we do</p>
              <p className="text-sm text-slate-600">{service.what}</p>
              <p className="mt-3 text-sm font-semibold text-brand-600">Outcomes</p>
              <p className="text-sm text-slate-600">{service.outcomes}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-pad space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-slate-900">Our Packages</h2>
            <p className="text-slate-600">Clear pathways depending on how far you want to go.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {services.packages.map((pkg) => (
              <div key={pkg.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{pkg.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{pkg.price} · {pkg.timeline}</p>
                {pkg.includes && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {pkg.includes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                )}
                {pkg.phases && (
                  <div className="mt-4 space-y-4 text-sm text-slate-600">
                    {Object.entries(pkg.phases).map(([phase, items]) => (
                      <div key={phase}>
                        <p className="font-semibold text-slate-800">{phase}</p>
                        <ul className="mt-2 space-y-1">
                          {items.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-4 text-sm text-slate-600"><span className="font-semibold">What you get:</span> {pkg.whatYouGet}</p>
                <p className="mt-2 text-sm text-slate-600"><span className="font-semibold">Best for:</span> {pkg.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {services.why.content.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Ready to plan your next AI move?</h3>
            <Button href={services.why.primaryCta.href}>{services.why.primaryCta.label}</Button>
            <Button href={services.why.secondaryCta.href} variant="secondary">
              {services.why.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
