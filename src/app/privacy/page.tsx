import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for The AI Guides. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-12 md:py-16">
        <Container size="narrow">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Privacy Policy</h1>
          <p className="text-[var(--color-text-muted)]">Last updated: January 2026</p>
        </Container>
      </section>

      {/* Content */}
      <Section background="white">
        <Container size="narrow">
          <div className="prose-blog space-y-8">
            <section>
              <h2>Introduction</h2>
              <p>
                The AI Guides (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website theaiguides.co or use our services.
              </p>
              <p>
                We are an Australian business and comply with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth).
              </p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <h3>Information You Provide</h3>
              <p>We collect information you voluntarily provide when you:</p>
              <ul>
                <li>Complete our contact form (name, email, phone, company, message)</li>
                <li>Take our AI Readiness Survey (name, email, phone, company, industry, survey responses)</li>
                <li>Subscribe to our newsletter</li>
                <li>Engage our services</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul>
                <li>Device and browser information</li>
                <li>IP address and general location</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and provide requested services</li>
                <li>Send your AI Readiness Survey results</li>
                <li>Improve our website and services</li>
                <li>Send occasional insights and updates (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2>Third-Party Services</h2>
              <p>We use the following third-party services to operate our website:</p>
              <ul>
                <li><strong>Formspree</strong> — Processes form submissions. Data is stored in accordance with their <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</li>
                <li><strong>Vercel</strong> — Hosts our website. See their <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2>Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.
              </p>
            </section>

            <section>
              <h2>Your Rights</h2>
              <p>Under Australian privacy law, you have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{' '}
                <a href="mailto:contact@theaiguides.co">contact@theaiguides.co</a>.
              </p>
            </section>

            <section>
              <h2>Cookies</h2>
              <p>
                Our website uses essential cookies to ensure basic functionality. We do not use tracking cookies or third-party advertising cookies.
              </p>
            </section>

            <section>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:contact@theaiguides.co">contact@theaiguides.co</a></li>
                <li>Location: Sydney, Australia</li>
              </ul>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
