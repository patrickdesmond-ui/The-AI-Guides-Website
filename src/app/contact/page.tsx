import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Contact The AI Guides - We'd love to hear from you!",
  description:
    "Get in touch with The AI Guides for AI strategy, training, and advisory services for Australian SMEs. We're here to help you navigate AI adoption.",
};

const faqs = [
  {
    question: 'What types of businesses does The AI Guides work with?',
    answer:
      'We specialise in supporting Australian SMEs across a range of industries, focusing on businesses seeking practical guidance for AI adoption, strategy, and workforce upskilling. If you are a business leader interested in leveraging AI, our services are tailored for your needs.',
    link: { text: 'Learn more about our services', href: '/services' },
  },
  {
    question: 'How do I know if my business is ready for AI?',
    answer:
      'Our AI Readiness Survey helps you assess your organisation\'s current state and identify opportunities for AI integration in your operations. The survey covers key areas including strategy, data, skills, and governance.',
    link: { text: 'Take the Readiness Survey', href: '/ai-readiness-survey' },
  },
  {
    question: 'What is included in your executive AI training?',
    answer:
      'Our executive training provides leaders with actionable insights on AI fundamentals, governance, ethical considerations, and strategic planning for successful adoption. Training sessions can be customised to your industry and leadership team needs.',
    link: { text: 'See Executive Training', href: '/executive-training' },
  },
  {
    question: 'How do I engage The AI Guides for advice?',
    answer:
      'Engaging us is simple: reach out via our contact form with your enquiry, and our team will respond promptly to discuss your needs and next steps. We are committed to providing timely support and clear guidance tailored to your business.',
  },
  {
    question: 'Can The AI Guides help with ongoing AI governance and strategy?',
    answer:
      'Yes, we offer advisory services to help you establish robust AI governance frameworks and ongoing strategies to ensure responsible, effective use of AI within your business. Our experts provide continued support as your AI journey evolves.',
    link: { text: 'Explore our services', href: '/services' },
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-6">Contact The AI Guides</h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              We&apos;d love to hear from you! Get in touch to discuss your AI needs and how we can
              help your business succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6">Send Us a Message</h2>
            <form className="space-y-6" action="https://formspree.io/f/xkooqgnj" method="POST">
              {/* Honeypot field for spam protection */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your AI needs..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <Card hover={false} className="bg-[var(--color-bg-secondary)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">Email</CardTitle>
                    <a
                      href="mailto:contact@theaiguides.co"
                      className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                    >
                      contact@theaiguides.co
                    </a>
                  </div>
                </div>
              </Card>

              <Card hover={false} className="bg-[var(--color-bg-secondary)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">Location</CardTitle>
                    <CardDescription>Sydney, Australia</CardDescription>
                  </div>
                </div>
              </Card>

              <div className="p-6 bg-[var(--color-primary)] text-white rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Ready to assess your AI readiness?</h3>
                <p className="text-blue-100 mb-4">
                  Take our quick survey to identify your organisation&apos;s AI opportunities and get
                  personalised recommendations.
                </p>
                <Button href="/ai-readiness-survey" variant="secondary">
                  Start the Survey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <SectionHeader title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <Card key={faq.question} hover={false}>
              <CardTitle className="text-lg mb-3">{faq.question}</CardTitle>
              <CardDescription>{faq.answer}</CardDescription>
              {faq.link && (
                <Link
                  href={faq.link.href}
                  className="inline-flex items-center mt-3 text-[var(--color-primary)] font-medium text-sm hover:text-[var(--color-primary-dark)]"
                >
                  {faq.link.text}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Ready to future-proof your business with AI?</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Connect with The AI Guides to discuss your goals, or complete our AI Readiness Survey to
            identify your organisation&apos;s opportunities. Let us help you build a confident,
            practical AI strategy tailored to your needs.
          </p>
          <Button href="/ai-readiness-survey" size="lg">
            Start the AI Readiness Survey
          </Button>
        </div>
      </Section>
    </>
  );
}
