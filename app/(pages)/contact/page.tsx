import Button from "@/components/Button";
import pages from "@/data/pages.json";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const { contact } = pages;
  return (
    <>
      <section className="section">
        <div className="container-pad grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">{contact.title}</h1>
            <p className="text-slate-600">{contact.note}</p>
            <p className="text-slate-600">Email us at <a className="font-semibold text-brand-600" href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <form action="/api/contact" method="post" className="space-y-4">
              <div className="hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700" htmlFor="name">Name</label>
                <input id="name" name="name" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700" htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={4} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
              <button type="submit" className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {contact.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-100 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
                {faq.link && (
                  <Button href={faq.link.href} variant="ghost">
                    {faq.link.label} →
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pad rounded-2xl bg-brand-50 p-8 text-slate-700">
          <p className="text-lg">{contact.finalCta.content}</p>
          <div className="mt-6">
            <Button href={contact.finalCta.cta.href}>{contact.finalCta.cta.label}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
